import { FormControl, FormGroup, Validators } from "@angular/forms";

export abstract class TaskControls {
    currentDate: Date = new Date();

    priorityTags: string[] = ["", "Important and urgent", "Important but not urgent", "Urgent but not important", "Not important or urgent"];

    taskForm = new FormGroup({
        taskName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        taskDescription: new FormControl('', [Validators.maxLength(500)]),
        withDateDue: new FormControl(''),
        dateDue: new FormControl(''),
        priorityTag: new FormControl(''),
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

    get priorityTag(): FormControl {
        return this.taskForm.get('priorityTag') as FormControl;
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
}