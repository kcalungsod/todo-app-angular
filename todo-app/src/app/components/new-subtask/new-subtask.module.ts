import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSubtaskComponent } from './new-subtask.component';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PipeModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [NewSubtaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [FormGroupDirective],
  exports: [NewSubtaskComponent]
})
export class NewSubtaskModule { }
