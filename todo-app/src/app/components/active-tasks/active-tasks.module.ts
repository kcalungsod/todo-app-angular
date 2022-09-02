import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActiveTasksComponent } from './active-tasks.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { EditTaskModule } from '../edit-task/edit-task.module';
import { PipeModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ActiveTasksComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditTaskModule,
    PipeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    DragDropModule
  ],
  exports: [ActiveTasksComponent]
})
export class ActiveTasksModule { }