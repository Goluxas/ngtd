import { Component, OnInit } from '@angular/core';

import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selected_list: string = "next";

  summary: string = '';

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
