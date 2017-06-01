import { 
  Component, 
  OnInit, 
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input('list')
  selected_name: string = 'none';

  list: Task[];

  constructor(private task_svc: TaskService) {}

  ngOnInit(): void {
    //this.task_svc.parseInitialTasks();
    //this.task_svc.getTaskList(this.selected_name)
    //.then(tasks => this.list = tasks);
    this.changeList('next');
  }

  ngOnChanges(changes: SimpleChanges): void {
    let selected_list: SimpleChange = changes.selected_name;

    if (selected_list) {
      console.log("Changing from " + selected_list.previousValue + " to " + selected_list.currentValue);
      this.changeList( selected_list.currentValue );
    }
  }

  changeList(list: string): void {
    this.selected_name = list;
    this.task_svc.getTaskList(this.selected_name)
      .subscribe(tasks => this.list = tasks);
  }
}

