import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActiveTasksComponent } from './active-tasks.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { EditTaskModule } from '../edit-task/edit-task.module';
import { PipeModule } from 'src/app/pipes/pipes.module';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { PriorityTagFilterComponent } from './priority-tag-filter/priority-tag-filter.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCardActiveButtonsComponent } from './task-card/task-card-active-buttons/task-card-active-buttons.component';
import { TaskCardActiveSubtasksComponent } from './task-card/task-card-active-subtasks/task-card-active-subtasks.component';
import { TaskCardActiveChipsComponent } from './task-card/task-card-active-chips/task-card-active-chips.component';


@NgModule({
  declarations: [ActiveTasksComponent, DateFilterComponent, PriorityTagFilterComponent, TaskCardComponent, TaskCardActiveButtonsComponent, TaskCardActiveSubtasksComponent, TaskCardActiveChipsComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditTaskModule,
    PipeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    DragDropModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [ActiveTasksComponent]
})
export class ActiveTasksModule { }
