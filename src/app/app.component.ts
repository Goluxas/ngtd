import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selected_list: string = "next";

  summary: string = '';
  new_task: Task = new Task(0);

  constructor(private task_svc: TaskService) {}

  ngOnInit(): void {
  }

  addTask(): void {
    // adds the task and since the task-list uses an observable,
    // automatically refreshes the list
    this.task_svc.addTask(this.summary);
    this.summary = '';
  }

  changeList(list: string): void {
    this.selected_list = list;
  }

}
