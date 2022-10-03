import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card-completed-chips',
  templateUrl: './task-card-completed-chips.component.html',
  styleUrls: ['./task-card-completed-chips.component.scss']
})
export class TaskCardCompletedChipsComponent implements OnInit {

  @Input() recurringTask !: boolean | undefined;
  @Input() withDateDue !: boolean | undefined;
  @Input() dateDue !: Date | undefined;
  @Input() dateCompleted !: Date | undefined;
  @Input() nextDueDate !: Date | undefined;
  @Input() schedule !: string | undefined;

  constructor() { }

  ngOnInit(): void {
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
