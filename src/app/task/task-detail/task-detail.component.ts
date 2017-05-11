import { 
  Component, 
  OnInit, 
  Input,
} from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input()
  task: Task;

  constructor(private task_svc: TaskService) { }

  ngOnInit() {
  }

  moveToTrash() {
    this.task.category = 'trash';
    console.log('trashed task');
    console.log(this.task)
    this.task_svc.updateTask(this.task);
  }

  moveToCompleted() {
    this.task.category = 'completed';
    console.log('completed task');
    console.log(this.task)
    this.task_svc.updateTask(this.task);
  }
}
