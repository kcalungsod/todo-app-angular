import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { subTaskEntry, TaskEntry } from 'src/app/models/task.model';
import { TaskService } from 'src/app/dependencies/task.service';

@Component({
  selector: 'app-task-card-active-subtasks',
  templateUrl: './task-card-active-subtasks.component.html',
  styleUrls: ['./task-card-active-subtasks.component.scss']
})
export class TaskCardActiveSubtasksComponent implements OnInit {

  @Input()
  subTasks!: subTaskEntry[] | undefined;
  task!: TaskEntry;
  subTaskChecked!: boolean;

  @Output()
  refreshTaskEvent = new EventEmitter<void>();

  constructor(private taskApiService: TaskService) { }

  ngOnInit(): void {
  }

  toggleCheckBox(event: any, taskEntry: TaskEntry, subTask: string | undefined): void {
    event.checked ? this.subTaskChecked = true : this.subTaskChecked = false;
    this.toggleSubTaskValueInDB(this.subTaskChecked, taskEntry, subTask);
  }

  toggleSubTaskValueInDB(doneStatus: boolean, taskEntry: TaskEntry, subTask: string | undefined): void {
    const dateCompleted: Date = doneStatus ? new Date().toLocaleDateString() as unknown as Date : null as unknown as Date;
    this.taskApiService.toggleSubTaskCompletion(taskEntry, subTask, doneStatus, dateCompleted).subscribe(() => this.refreshTaskEvent.emit());
  }
}
