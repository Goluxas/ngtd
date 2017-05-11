import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';

import { TaskService } from './task.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
  ],
  providers: [TaskService],
  exports: [
    TaskListComponent,
  ],
})
export class TaskModule { }
