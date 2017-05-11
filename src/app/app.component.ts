import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  master_list: Task[];
  selected_list: Task[];
  selected_name: string = 'inbox';

  summary: string = '';
  new_task: Task = new Task(0);
  auto_id: number = 1;

  constructor(private task_svc: TaskService) {}

  ngOnInit(): void {
    this.task_svc.parseInitialTasks();
    this.getTasks();
  }

  getTasks(): void {
    this.task_svc.getTasks()
      .then(tasks => {
        this.master_list = tasks;
      });
  }

  addTask(): void {
    // automatically updates our local master_list too!
    this.task_svc.addTask(this.summary);
    this.summary = '';
    if (this.selected_name == 'inbox') {
      // refresh the list so it refreshes the display
      this.selectList('inbox');
    }
  }

  selectList(list: string): void {
    this.selected_name = list;
    this.selected_list = this.master_list.filter( task => task.category == list );
  }

  taskListChanged(evt: boolean): void {
    if (evt) {
      // refresh the current list
      this.selectList(this.selected_name);
    }
  }
}
