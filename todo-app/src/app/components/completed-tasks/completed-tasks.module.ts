import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedTasksComponent } from './completed-tasks.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { PipeModule } from 'src/app/pipes/pipes.module';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCardCompletedSubtasksComponent } from './task-card/task-card-completed-subtasks/task-card-completed-subtasks.component';
import { TaskCardCompletedButtonsComponent } from './task-card/task-card-completed-buttons/task-card-completed-buttons.component';
import { TaskCardCompletedChipsComponent } from './task-card/task-card-completed-chips/task-card-completed-chips.component';

@NgModule({
  declarations: [CompletedTasksComponent, TaskCardComponent, TaskCardCompletedSubtasksComponent, TaskCardCompletedButtonsComponent, TaskCardCompletedChipsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    PipeModule
  ],
  exports: [CompletedTasksComponent]
})
export class CompletedTasksModule { }
