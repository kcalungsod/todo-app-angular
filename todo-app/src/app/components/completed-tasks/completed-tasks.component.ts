import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { RecurringTaskService } from 'src/app/dependencies/recurring-task.service';
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
  panelOpenState: boolean = false;
  selectedDateFilter: boolean | null = null;
  selectedPriorityTag: string[] = [];

  constructor(
    private taskApiService: TaskService,
    private recurringTaskService: RecurringTaskService,
    private message: MessagesService) { }

  ngOnInit(): void {
    this.getCompletedTasks();
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

  revertToActive(selectedTask: TaskEntry): void {
    const status: boolean = false;
    const dateCompleted: Date = null as unknown as Date;

    if (selectedTask.recurringTask) {
      this.recurringTaskService.getAndDeleteRecurringTask(selectedTask, status);
    }

    this.taskApiService.toggleTaskCompletion(selectedTask, status, dateCompleted).subscribe(() => (this.getCompletedTasks()));
    this.message.openSnackBar("Reverted a task back to active!");
  }

  deleteCompletedTask(selectedTask: TaskEntry): void {
    this.taskApiService.deleteTask(selectedTask).subscribe(() => this.getCompletedTasks());
    this.message.openSnackBar("Deleted a task!");
  }

}
