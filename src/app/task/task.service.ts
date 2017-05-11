import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Task } from './task';

@Injectable()
export class TaskService {

  TASKS = [
    'get mac from car #home #gtd #next',
    'create new ng project for GTD app #anywhere #mac #gtd #next',
    'write more vira notes #anywhere #writing #next',
    'beat nier automata a couple more times #home #games #next',
    'clean litterbox #home #cleaning #recurring #daily #next',
    'set out trash for valet #home #cleaning #recurring #days-UMTWR #next',
    'empty dishwasher #home #cleaning #next',
    'take out cardboard trash and blue tote #home #cleaning #next',
    'make grocery list #home #next',
    'move tenable into its own component #work #ng #next',
    'unpack footlockers #home #unpacking #next',
    'create index view with skeleton navigation links #anywhere #mac #gtd #some',
    'buy mounts for posters #home #unpacking #some',
    'unpack remaining boxes in living room #home #unpacking #some',
    'unpack clothes bags in closet #home #unpacking #some',
    'move consoles into footlockers #home #unpacking #some',
    'create knowb4 component #work #ng  #some',
    'unpack ottoman #home #unpacking #some',
    'clean kitchen counters #home #cleaning #complete',
    'run dishwasher #home #cleaning #complete',
    'get week 3 hots rewards #starting-on #5/9 #calendar',
  ];

  index: number = 0;
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  getTaskList(list: string): Observable<Task[]> {
    return this.getTasks().map(
      tasks => tasks.filter(task => task.category == list)
    );
  }

  parseInitialTasks(): void {
    for (let summary of this.TASKS) {
      this.addTask(summary);
    }
  }

  addTask(summary: string): void {
    let task_id = this.tasks.getValue().length;
    let new_task = new Task(task_id);
    new_task.summary = summary;
    new_task.captured_date = new Date();
    new_task.category = 'inbox';
    new_task.parseTags();

    this.tasks.getValue().push(new_task);
    this.tasks.next( this.tasks.getValue() );
  }

  updateTask(updated_task: Task): void {
    let master_list = this.tasks.getValue();
    master_list[updated_task.id] = updated_task;
    this.tasks.next( master_list );
  }
}
