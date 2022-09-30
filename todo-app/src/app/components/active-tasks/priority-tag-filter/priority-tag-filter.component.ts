import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-priority-tag-filter',
  templateUrl: './priority-tag-filter.component.html',
  styleUrls: ['./priority-tag-filter.component.scss']
})
export class PriorityTagFilterComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  selectedPriorityTagEvent = new EventEmitter<string[]>();

  selectedPriorityTag: string[] = [];

  checkIfTagIsSelected(tag: string): void {
    this.selectedPriorityTag.includes(tag) ? this.selectedPriorityTag.splice(this.selectedPriorityTag.indexOf(tag), 1) : this.selectedPriorityTag.push(tag);
    this.selectedPriorityTagEvent.emit(this.selectedPriorityTag);
  }
}
