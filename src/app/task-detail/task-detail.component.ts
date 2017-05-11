import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input()
  task: Task;

  @Output()
  changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  moveToTrash() {
    this.task.category = 'trash';
    console.log('trashed task');
    console.log(this.task)
    this.changed.emit(true);
  }

  moveToCompleted() {
    this.task.category = 'completed';
    console.log('completed task');
    console.log(this.task)
    this.changed.emit(true);
  }
}
