import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'taskNameErrorMessage'
})
export class TaskNameErrorMessagePipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined): string {
    if (!validationErrors) {
      return "";
    }
    else if (validationErrors['required']) {
      return "Task Name is required";
    }
    return "";
  }

}
