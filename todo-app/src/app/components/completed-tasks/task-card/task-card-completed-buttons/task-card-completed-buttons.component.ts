import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { RecurringTaskService } from 'src/app/dependencies/recurring-task.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card-completed-buttons',
  templateUrl: './task-card-completed-buttons.component.html',
  styleUrls: ['./task-card-completed-buttons.component.scss']
})
export class TaskCardCompletedButtonsComponent implements OnInit {

  @Input() task!: TaskEntry;
  @Output() refreshTasksEvent = new EventEmitter<void>();


  constructor(
    private taskApiService: TaskService,
    private recurringTaskService: RecurringTaskService,
    private message: MessagesService) { }

  ngOnInit(): void {
  }

  revertToActive(selectedTask: TaskEntry): void {
    const status: boolean = false;
    const dateCompleted: Date = null as unknown as Date;

    if (selectedTask.recurringTask) {
      this.recurringTaskService.getAndDeleteRecurringTask(selectedTask, status);
    }

    this.taskApiService.toggleTaskCompletion(selectedTask, status, dateCompleted).subscribe(() => this.refreshTasksEvent.emit());
    this.message.openSnackBar("Reverted a task back to active!");
  }

  deleteCompletedTask(selectedTask: TaskEntry): void {
    this.taskApiService.deleteTask(selectedTask).subscribe(() => this.refreshTasksEvent.emit());
    this.message.openSnackBar("Deleted a task!");
  }

}
