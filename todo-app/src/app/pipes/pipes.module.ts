import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByDatePipe } from './filterByDate.pipe';
import { TaskNameErrorMessagePipe } from './taskNameErrorMessage.pipe';
import { DateDueErrorMessagePipe } from './dateDueErrorMessage.pipe';


@NgModule({
  declarations: [
    FilterByDatePipe,
    TaskNameErrorMessagePipe,
    DateDueErrorMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FilterByDatePipe, TaskNameErrorMessagePipe, DateDueErrorMessagePipe]
})
export class PipeModule { }
