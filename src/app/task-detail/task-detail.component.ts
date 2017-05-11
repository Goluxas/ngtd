import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
  }

}
