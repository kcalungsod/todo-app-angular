import { Pipe, PipeTransform } from '@angular/core';
import { TaskEntry } from '../models/task.model';

@Pipe({
  name: 'filterByPriorityTag',
  pure: false
})
export class FilterByPriorityTagPipe implements PipeTransform {

  transform(taskEntries: TaskEntry[], priorityTags: string[]): any {
    if (priorityTags.length < 1) { return taskEntries; }
    return taskEntries.filter((taskEntry) => {
      return !taskEntry.priorityTag ? false : (priorityTags.includes(taskEntry.priorityTag) ? true : false);
    })
  }
}
