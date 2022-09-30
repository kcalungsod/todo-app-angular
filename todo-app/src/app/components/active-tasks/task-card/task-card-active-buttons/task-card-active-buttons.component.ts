import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { RecurringTaskService } from 'src/app/dependencies/recurring-task.service';
import { TaskContentService } from 'src/app/dependencies/task-content.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card-active-buttons',
  templateUrl: './task-card-active-buttons.component.html',
  styleUrls: ['./task-card-active-buttons.component.scss']
})
export class TaskCardActiveButtonsComponent implements OnInit {

  @Input()
  task!: TaskEntry;

  @Output()
  refreshTaskEvent = new EventEmitter<void>();

  constructor(
    private taskApiService: TaskService,
    private recurringTaskService: RecurringTaskService,
    private taskContentService: TaskContentService,
    private router: Router,
    private message: MessagesService) { }

  ngOnInit(): void {
  }

  markDone(selectedTask: TaskEntry): void {
    const status: boolean = true;
    const dateCompleted: Date = new Date().toLocaleDateString() as unknown as Date;

    if (selectedTask.recurringTask) {
      const nextDueDateValue = this.recurringTaskService.createRecurringTask({ ...selectedTask });
      Object.assign(selectedTask, { nextDueDate: nextDueDateValue });
      this.taskApiService.editTask(selectedTask).subscribe();
      this.recurringTaskService.getAndDeleteRecurringTask(selectedTask, true);
    }

    this.taskApiService.toggleTaskCompletion(selectedTask, status, dateCompleted).subscribe(() => (this.refreshTaskEvent.emit()));
    this.message.openSnackBar("Marked task as complete!");
  }

  deleteActiveTask(selectedTask: TaskEntry): void {
    this.taskApiService.deleteTask(selectedTask).subscribe(() => (this.refreshTaskEvent.emit()));
    this.message.openSnackBar("Deleted a task!");
  }

  goToEdit(selectedTask: TaskEntry): void {
    this.taskContentService.sendTaskToEdit(selectedTask);
    this.router.navigate(["task/edit"]);
  }

}
