import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  selectedPriorityTag: string[] = [];
  panelOpenState: boolean = false;
  subTaskChecked!: boolean;

  constructor(
    private taskApiService: TaskService,
    private taskContentService: TaskContentService,
    private router: Router,
    private message: MessagesService) { }

  ngOnInit(): void {
    this.getActiveTasks();
  }

  drop(event: CdkDragDrop<TaskEntry>): void {
    moveItemInArray(this.activeTasks, event.previousIndex, event.currentIndex);
  }

  stylePriorityTag(priorityTag: string): any {
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

  checkIfTagIsSelected(tag: string): void {
    this.selectedPriorityTag.includes(tag) ? this.selectedPriorityTag.splice(this.selectedPriorityTag.indexOf(tag), 1) : this.selectedPriorityTag.push(tag);
  }

  checkIfOverdue(taskDateDue: Date): boolean {
    if (new Date(taskDateDue) < (new Date())) { return true; }
    return false;
  }

  getActiveTasks(): void {
    const completionStatus: boolean = false;
    this.taskApiService.getRelevantTasks(completionStatus).subscribe((data) => (this.activeTasks = data));
  }

  toggleCheckBox(event: any, taskEntry: TaskEntry, subTask: string): void {
    event.checked ? this.subTaskChecked = true : this.subTaskChecked = false;
    this.toggleSubTaskValueInDB(this.subTaskChecked, taskEntry, subTask);
  }

  toggleSubTaskValueInDB(doneStatus: boolean, taskEntry: TaskEntry, subTask: string): void {
    const dateCompleted: Date = doneStatus ? new Date().toLocaleDateString() as unknown as Date : null as unknown as Date;
    this.taskApiService.toggleSubTaskCompletion(taskEntry, subTask, doneStatus, dateCompleted).subscribe(() => this.getActiveTasks());
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
