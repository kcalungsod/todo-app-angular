import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: TaskEntry;
  @Output() refreshTasksEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  refreshCompletedTasks(): void {
    this.refreshTasksEvent.emit();
  }

}
