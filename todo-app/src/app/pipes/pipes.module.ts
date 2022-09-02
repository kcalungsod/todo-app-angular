import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByDatePipe } from './filterByDate.pipe';
import { TaskNameErrorMessagePipe } from './taskNameErrorMessage.pipe';
import { DateDueErrorMessagePipe } from './dateDueErrorMessage.pipe';
import { TaskDescriptionErrorMessagePipe } from './taskDescriptionErrorMessage.pipe';


@NgModule({
  declarations: [
    FilterByDatePipe,
    TaskNameErrorMessagePipe,
    DateDueErrorMessagePipe,
    TaskDescriptionErrorMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FilterByDatePipe, TaskNameErrorMessagePipe, DateDueErrorMessagePipe, TaskDescriptionErrorMessagePipe]
})
export class PipeModule { }
