import { Component } from '@angular/core';

import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  master_list: Task[] = [];

  new_task: Task = new Task(0);
  auto_id: number = 1;

  addTask(): void {
    this.new_task.parseTags();
    this.new_task.processSpecialTags();

    this.master_list.push(this.new_task);

    this.new_task = new Task(this.auto_id);
    this.auto_id++;
  }

  writeMasterList(): void {
    let outfile = 'masterlist.json';
  }
}
