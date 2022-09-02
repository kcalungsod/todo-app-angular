import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'dateDueErrorMessage'
})
export class DateDueErrorMessagePipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined): string {
    if (!validationErrors) {
      return "";
    }
    else if (validationErrors['required']) {
      return "Due Date is required."
    }
    return "";
  }

}
