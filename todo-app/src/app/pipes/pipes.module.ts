import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByDatePipe } from './filterByDate.pipe';


@NgModule({
  declarations: [
    FilterByDatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [FilterByDatePipe]
})
export class PipeModule { }
