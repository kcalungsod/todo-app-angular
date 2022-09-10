import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TaskEntry } from '../models/task.model';
import { IdGeneratorService } from './id-generator.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class RecurringTaskService {

  constructor(private taskApiService: TaskService, private idService: IdGeneratorService) { }

  createRecurringTask(recurringTask: TaskEntry): void {
    recurringTask.id = this.idService.generateUniqueId();
    recurringTask.dateDue = this.checkSchedule(recurringTask.dateDue, recurringTask.schedule);

    this.taskApiService.addTask(recurringTask).subscribe();
  }

  deleteRecurringTask(recurringTask: TaskEntry): void {
    let activeRecurringTask!: TaskEntry[];

    this.taskApiService.getRecurringTaskFromActive(recurringTask)
      .pipe(
        tap((activeRecurringTask: TaskEntry[]) =>
          activeRecurringTask.length > 0 ?
            this.taskApiService.deleteTask(activeRecurringTask[0]).subscribe() :
            null
        )
      ).subscribe((data: TaskEntry[]) => (activeRecurringTask = data));
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
