import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {

  completedTasks: TaskEntry[] = [];
  panelOpenState: boolean = false;
  selectedDateFilter: boolean | null = null;
  selectedPriorityTag: string[] = [];

  constructor(
    private taskApiService: TaskService,
    private message: MessagesService) { }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  checkIfTagIsSelected(tag: string): void {
    this.selectedPriorityTag.includes(tag) ? this.selectedPriorityTag.splice(this.selectedPriorityTag.indexOf(tag), 1) : this.selectedPriorityTag.push(tag);
  }

  getCompletedTasks(): void {
    const completionStatus: boolean = true;
    this.taskApiService.getRelevantTasks(completionStatus).subscribe((data) => (this.completedTasks = data));
  }

  revertToActive(selectedTask: TaskEntry): void {
    const status: boolean = false;
    const dateCompleted: Date = null as unknown as Date;

    this.taskApiService.toggleTaskCompletion(selectedTask, status, dateCompleted).subscribe(() => (this.getCompletedTasks()));
    this.message.openSnackBar("Reverted a task back to active!");
  }

  deleteCompletedTask(selectedTask: TaskEntry): void {
    this.taskApiService.deleteTask(selectedTask).subscribe(() => this.getCompletedTasks());
    this.message.openSnackBar("Deleted a task!");
  }

}
