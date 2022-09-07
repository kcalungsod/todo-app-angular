import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByDatePipe } from './filterByDate.pipe';
import { TaskNameErrorMessagePipe } from './taskNameErrorMessage.pipe';
import { DateDueErrorMessagePipe } from './dateDueErrorMessage.pipe';
import { TaskDescriptionErrorMessagePipe } from './taskDescriptionErrorMessage.pipe';
import { FilterByPriorityTagPipe } from './filterByPriorityTag.pipe';
import { SubTaskErrorMessagePipe } from './subTaskErrorMessage.pipe';


@NgModule({
  declarations: [
    FilterByDatePipe,
    TaskNameErrorMessagePipe,
    DateDueErrorMessagePipe,
    TaskDescriptionErrorMessagePipe,
    FilterByPriorityTagPipe,
    SubTaskErrorMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FilterByDatePipe, TaskNameErrorMessagePipe, DateDueErrorMessagePipe, TaskDescriptionErrorMessagePipe, FilterByPriorityTagPipe, SubTaskErrorMessagePipe]
})
export class PipeModule { }
