import { Pipe, PipeTransform } from '@angular/core';
import { MaxLengthValidator, RequiredValidator, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'taskNameErrorMessage'
})
export class TaskNameErrorMessagePipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined): string {
    console.log(validationErrors);

    if (!validationErrors) {
      return "";
    }
    else if (validationErrors['required']) {
      return "Task Name is required";
    }
    else if (validationErrors) {
      return "This field only accepts a maximum of 100 characters";
    }
    return "";
  }

}
