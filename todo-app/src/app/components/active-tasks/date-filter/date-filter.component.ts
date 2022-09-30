import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  @Output()
  selectedDateFilterEvent = new EventEmitter<string>();

  selectedDateFilter!: string;

  selectDateFilter(dateFilter: string): void {
    this.selectedDateFilter = dateFilter;
    this.selectedDateFilterEvent.emit(this.selectedDateFilter);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
