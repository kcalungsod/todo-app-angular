import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'subTaskErrorMessage'
})
export class SubTaskErrorMessagePipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined): any {
    if (!validationErrors) { return ""; }
    else if (validationErrors['required']) {
      return "This field is required.";
    }
    else if (validationErrors) {
      return "This field only accepts a maximum of 50 characters";
    }
    return "";

  }

}
