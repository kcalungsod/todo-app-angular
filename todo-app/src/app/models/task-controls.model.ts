import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export abstract class TaskControls {
    currentDate: Date = new Date();

    taskForm = new FormGroup({
        taskName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        taskDescription: new FormControl(''),
        withDateDue: new FormControl(''),
        dateDue: new FormControl(''),
    });

    get taskName(): FormControl {
        return this.taskForm.get('taskName') as FormControl;
    }

    get taskDescription(): FormControl {
        return this.taskForm.get('taskDescription') as FormControl;
    }

    get withDateDue(): FormControl {
        return this.taskForm.get('withDateDue') as FormControl;
    }

    get dateDue(): FormControl {
        return this.taskForm.get('dateDue') as FormControl;
    }

    dateDueCheckBox(event: any): void {
        console.log(event.checked)
    }

    dateDueValidator(): void {
        this.taskForm?.controls['withDateDue'].valueChanges.subscribe(() => {
            console.log(this.withDateDue.value);
            if (this.withDateDue.value === true) { this.dateDue.setValidators(Validators.required); }
            else { this.dateDue.clearValidators(); }
            this.dateDue.updateValueAndValidity();
        });
    }

    // dateDueValidator(): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //         this.taskForm?.controls['withDateDue'].valueChanges.subscribe(() => {
    //             return this.taskForm?.controls['withDateDue'].value !== 'true' ? null : Validators.required(control);
    //         });
    //         return null;
    //     }
    // }
}