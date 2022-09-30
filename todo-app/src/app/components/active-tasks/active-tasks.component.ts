import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss']
})
export class ActiveTasksComponent implements OnInit {

  panelOpenState: boolean = false;

  constructor(
    private taskApiService: TaskService) { }

  ngOnInit(): void {
    this.getActiveTasks();
  }

  selectedDateFilter: boolean | null = null;
  selectDateFilter(dateFilter: string): void {
    if (dateFilter === "none") {
      this.selectedDateFilter = null;
    }
    else if (dateFilter === "true") {
      this.selectedDateFilter = true;
    }
    else {
      this.selectedDateFilter = false;
    }
  }

  selectedPriorityTag: string[] = [];
  selectPriorityTag(priorityTags: string[]): void {
    this.selectedPriorityTag = priorityTags;
  }

  activeTasks: TaskEntry[] = [];
  getActiveTasks(): void {
    const completionStatus: boolean = false;
    this.taskApiService.getRelevantTasks(completionStatus).subscribe((data) => (this.activeTasks = data));
  }

  getCurrentTasks(currentTasks: TaskEntry[]): void {
    this.activeTasks = currentTasks;
  }
}
