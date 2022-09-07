import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './new-task.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { NewSubtaskModule } from '../new-subtask/new-subtask.module';

import { RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [NewTaskComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PipeModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    NewSubtaskModule
  ],
  exports: [NewTaskComponent]
})
export class NewTaskModule { }
