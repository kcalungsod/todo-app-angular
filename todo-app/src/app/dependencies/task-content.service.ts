import { Injectable } from '@angular/core';
import { TaskEntry } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskContentService {

  constructor() { }

  private taskToEdit!: TaskEntry;

  sendTaskToEdit(selectedTask: TaskEntry) {
    this.taskToEdit = selectedTask;
  }

  onTaskReceived(): TaskEntry {
    return this.taskToEdit;
  }
}
