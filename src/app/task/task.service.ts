import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Task } from './task';

@Injectable()
export class TaskService {

  index: number = 0;
  tasklist$: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  BASE_API: string = '/api/tasks'
  GET_API: string = `${this.BASE_API}/get`;
  NEW_TASK_API: string = `${this.BASE_API}/post`;
  UPDATE_TASK_API: string = `${this.BASE_API}/update`;

  constructor(private _http: Http) {
    this.getTasks();
  }

  getTasks(): void {
    this._http.get(this.GET_API)
      .map( (res: Response) => <Task[]>res.json() )
      .catch(this.handleError)
      .subscribe( (tasklist: Task[]) => {
        this.tasklist$.next(tasklist);
      });
  }

  /*
  postTasks(): Observable<boolean> {
    return this._http.post(this.GET_API, this.tasks.getValue())
      .map( (res: Response) => <boolean>res.json().status )
      .catch(this.handleError);
  }
  */

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('the following is an error message:');
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /*
  getTaskList(list: string): Observable<Task[]> {
    return this.getTasks().map(
      tasks => tasks.filter(task => task.category == list)
    );
  }
  */


  addTask(summary: string): void {

    // Create the new task object
    let new_task = new Task();
    new_task.summary = summary;
    new_task.category = 'inbox';
    new_task.parseTags();

    // Upload the new task to the API
    this._http.post(this.NEW_TASK_API, new_task)
      .map( (res: Response) => <boolean>res.json().status )
      .subscribe(
        (status) => {
          if (!status) {
            return console.error('Failed to post new task');
          }
          
          // Refresh the canonical task list
          //let new_tasklist = this.tasklist$.getValue();
          //new_tasklist.push(new_task);
          this.getTasks();
        },
        console.error,
      );

  }

  updateTask(updated_task: Task): void {
    /*
    let master_list = this.tasks.getValue();
    master_list[updated_task.id] = updated_task;
    this.tasks.next( master_list );
     */
    this._http.post(this.UPDATE_TASK_API, updated_task)
      .map( (res: Response) => <boolean>res.json().status )
      .subscribe(
        (status) => {
          if (!status) return console.error('Failed to update task');
          this.getTasks(); // refresh canonical list
        },
        console.error,
      );
  }
}
