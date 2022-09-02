import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskLayoutComponent } from './task-layout.component';
import { RouterModule } from '@angular/router';

import { NewTaskModule } from '../new-task/new-task.module';
import { ActiveTasksModule } from '../active-tasks/active-tasks.module';
import { EditTaskModule } from '../edit-task/edit-task.module';
import { CompletedTasksModule } from '../completed-tasks/completed-tasks.module';
import { TaskRoutingModule } from './task-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TaskLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NewTaskModule,
    ActiveTasksModule,
    EditTaskModule,
    CompletedTasksModule,
    TaskRoutingModule,
    MatTabsModule
  ],
  exports: [TaskLayoutComponent]
})
export class TaskLayoutModule { }
