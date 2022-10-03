import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {

  completedOneTimeTasks: TaskEntry[] = [];
  completedRecurringTasks: TaskEntry[] = [];

  constructor(
    private taskApiService: TaskService) { }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  getCompletedTasks(): void {
    this.getCompletedOneTimeTasks();
    this.getCompletedRecurringTasks();
  }

  getCompletedOneTimeTasks(): void {
    const completionStatus: boolean = true;
    const recurringTaskValue: boolean = false;
    this.taskApiService.getRelevantTasks(completionStatus, recurringTaskValue).subscribe((data) => (this.completedOneTimeTasks = data));
  }

  getCompletedRecurringTasks(): void {
    const completionStatus: boolean = true;
    const recurringTaskValue: boolean = true;
    this.taskApiService.getRelevantTasks(completionStatus, recurringTaskValue).subscribe((data) => (this.completedRecurringTasks = data));
  }

}
