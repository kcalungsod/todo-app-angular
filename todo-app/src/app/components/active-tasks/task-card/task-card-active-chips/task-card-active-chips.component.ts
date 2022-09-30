import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card-active-chips',
  templateUrl: './task-card-active-chips.component.html',
  styleUrls: ['./task-card-active-chips.component.scss']
})
export class TaskCardActiveChipsComponent implements OnInit {

  @Input() withDateDue!: boolean | undefined;
  @Input() dateDue!: Date | undefined;
  @Input() schedule!: string | undefined;
  @Input() priorityTag!: string | undefined;
  @Input() recurringTask!: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  checkIfOverdue(taskDateDue: Date | undefined): boolean {
    if (taskDateDue === undefined) { return false; }
    if (this.checkIfDueToday(taskDateDue)) { return false; }
    if (new Date(taskDateDue) < (new Date())) { return true; }
    return false;
  }

  checkIfDueToday(taskDateDue: Date | undefined): boolean {
    if (taskDateDue === undefined) { return false; }
    if (new Date(taskDateDue).toLocaleDateString() === (new Date().toLocaleDateString())) { return true; }
    return false;
  }

  stylePriorityTag(priorityTag: string | undefined): any {
    switch (priorityTag) {
      case "Important and urgent":
        return { 'background-color': 'red', 'color': 'white' };
      case "Important but not urgent":
        return { 'background-color': 'green', 'color': 'white' };
      case "Urgent but not important":
        return { 'background-color': 'orange', 'color': 'white' };
      case "Not important or urgent":
        return { 'background-color': 'purple', 'color': 'white' };
      default:
        return { 'background-color': 'black', 'color': 'white' };
    }
  }

  styleRecurringTag(schedule: string | undefined): any {
    switch (schedule) {
      case "Daily":
        return { 'background-color': 'cadetblue', 'color': 'white' };
      case "Weekly":
        return { 'background-color': 'indigo', 'color': 'white' };
      case "Monthly":
        return { 'background-color': 'coral', 'color': 'white' };
      case "Yearly":
        return { 'background-color': 'olivedrab', 'color': 'white' };
    }
  }
}
