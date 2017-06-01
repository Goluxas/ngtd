import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Task } from './task';

@Injectable()
export class TaskService {

  index: number = 0;
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  API: string = 'http://localhost:3000/api/tasks';

  constructor(private _http: Http) { }

  getTasks(): Observable<Task[]> {
    this._http.get(this.API)
      .map( (res: Response) => <Task[]>res.json() )
      .catch(this.handleError)
      .subscribe( (tasklist: Task[]) => {
        this.tasks.next(tasklist);
      });

    return this.tasks.asObservable();
  }

  postTasks(): Observable<boolean> {
    return this._http.post(this.API, this.tasks.getValue())
      .map( (res: Response) => <boolean>res.json().status )
      .catch(this.handleError);
  }

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
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  getTaskList(list: string): Observable<Task[]> {
    return this.getTasks().map(
      tasks => tasks.filter(task => task.category == list)
    );
  }


  addTask(summary: string): void {
    let new_task = new Task();
    new_task.summary = summary;
    new_task.category = 'inbox';
    new_task.parseTags();

    this.tasks.getValue().push(new_task);
    this.tasks.next( this.tasks.getValue() );
  }

  updateTask(updated_task: Task): void {
    /*
    let master_list = this.tasks.getValue();
    master_list[updated_task.id] = updated_task;
    this.tasks.next( master_list );
     */
    // TODO - update this using the express API
  }
}
