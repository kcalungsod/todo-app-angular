import { Component, Input, OnInit } from '@angular/core';
import { subTaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card-completed-subtasks',
  templateUrl: './task-card-completed-subtasks.component.html',
  styleUrls: ['./task-card-completed-subtasks.component.scss']
})
export class TaskCardCompletedSubtasksComponent implements OnInit {

  @Input() 
  subTasks!: subTaskEntry[];

  constructor() { }

  ngOnInit(): void {
  }

}
