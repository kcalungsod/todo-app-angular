import { Pipe, PipeTransform } from '@angular/core';
import { TaskEntry } from '../models/task.model';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(taskEntries: TaskEntry[], filterByDate: boolean | null): any {
    if (!filterByDate) { return taskEntries };
    return taskEntries ? taskEntries.filter((taskEntry) => (taskEntry.withDateDue === filterByDate)) : [];
  }
}
