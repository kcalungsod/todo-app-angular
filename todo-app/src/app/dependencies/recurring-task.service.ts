import { Injectable } from '@angular/core';
import { TaskEntry } from '../models/task.model';
import { IdGeneratorService } from './id-generator.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class RecurringTaskService {

  constructor(private taskApiService: TaskService, private idService: IdGeneratorService) { }

  createRecurringTask(recurringTask: TaskEntry): Date | undefined {
    recurringTask.id = this.idService.generateUniqueId();
    recurringTask.dateDue = this.checkSchedule(recurringTask.dateDue, recurringTask.schedule);

    this.taskApiService.addTask(recurringTask).subscribe();
    return recurringTask.dateDue;
  }

  getAndDeleteRecurringTask(recurringTask: TaskEntry, completionStatus: boolean): void {
    this.taskApiService.getRecurringTask(recurringTask, completionStatus)
      .subscribe({
        next: (fetchedRecurringTask: TaskEntry[]) => (
          this.deleteRecurringTask(fetchedRecurringTask, recurringTask)),
        error: () => (console.log("An error occured")),
        complete: () => (console.log("Done!"))
      });
  }

  deleteRecurringTask(fetchedRecurringTask: TaskEntry[], recurringTask: TaskEntry): void {
    let filteredTasks = fetchedRecurringTask.filter((task: TaskEntry) => task.id != recurringTask.id);

    if (filteredTasks.length > 0) {
      this.taskApiService.deleteTask(filteredTasks[filteredTasks.length - 1]).subscribe();
    }
  }

  checkSchedule(dateBasis: Date | undefined, schedule: string | undefined): Date | any {
    let dateDue: Date = dateBasis ? new Date(dateBasis) : new Date();

    if (dateBasis)
      switch (schedule) {
        case "Daily": {
          dateDue = new Date(dateDue.setDate(dateDue.getDate() + 1));
          return dateDue.toLocaleDateString() as unknown as Date;
        }
        case "Weekly": {
          dateDue = new Date(dateDue.setDate(dateDue.getDate() + 7));
          return dateDue.toLocaleDateString() as unknown as Date;
        }
        case "Monthly": {
          dateDue = new Date(dateDue.setMonth(dateDue.getMonth() + 1));
          return dateDue.toLocaleDateString() as unknown as Date;
        }
        case "Yearly": {
          dateDue = new Date(dateDue.setFullYear(dateDue.getFullYear() + 1));
          return dateDue.toLocaleDateString() as unknown as Date;
        }
        default:
          return;
      }
    else return;
  }
}
