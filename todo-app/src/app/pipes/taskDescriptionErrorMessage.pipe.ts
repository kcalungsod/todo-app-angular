import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'taskDescriptionErrorMessage'
})
export class TaskDescriptionErrorMessagePipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined): string {
    if (!validationErrors) {
      return "";
    }
    else if (validationErrors) {
      return "This field only accepts a maximum of 500 characters."
    }
    return "";
  }

}
