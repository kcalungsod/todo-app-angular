import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { RecurringTaskService } from 'src/app/dependencies/recurring-task.service';
import { TaskContentService } from 'src/app/dependencies/task-content.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input()
  task!: TaskEntry;
  subTaskChecked!: boolean;

  @Output()
  refreshTasksEvent = new EventEmitter<TaskEntry[]>();

  constructor() { }

  ngOnInit(): void {
  }

  refreshActiveTasks(): void {
    this.refreshTasksEvent.emit();
  }

}
