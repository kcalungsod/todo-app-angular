import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { TaskContentService } from 'src/app/dependencies/task-content.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss']
})
export class ActiveTasksComponent implements OnInit {

  activeTasks: TaskEntry[] = [];
  selectedDateFilter: boolean | null = null;

  constructor(private taskApiService: TaskService, private router: Router, private taskContentService: TaskContentService, private message: MessagesService) { }

  ngOnInit(): void {
    this.getActiveTasks();
  }

  getActiveTasks(): void {
    this.taskApiService.getActiveTasks().subscribe((data) => (this.activeTasks = data));
  }

  markDone(selectedTask: TaskEntry): void {
    const status: boolean = true;
    const dateCompleted: Date = new Date().toLocaleDateString() as unknown as Date;
    this.taskApiService.toggleTaskCompletion(selectedTask, status, dateCompleted).subscribe(() => (this.getActiveTasks()));
    this.message.openSnackBar("Marked task as complete!");
  }

  deleteActiveTask(selectedTask: TaskEntry): void {
    this.taskApiService.deleteTask(selectedTask).subscribe(() => (this.getActiveTasks()));
    this.message.openSnackBar("Deleted a task!");
  }

  goToEdit(selectedTask: TaskEntry): void {
    this.taskContentService.sendTaskToEdit(selectedTask);
    this.router.navigate(["task/edit"]);
  }
}
