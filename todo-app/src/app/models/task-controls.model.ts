import { ControlContainer, Form, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export abstract class TaskControls {
    currentDate: Date = new Date();

    priorityTags: string[] = ["", "Important and urgent", "Important but not urgent", "Urgent but not important", "Not important or urgent"];

    scheduleChoices: string[] = ["Daily", "Weekly", "Monthly", "Yearly"];

    taskForm = new FormGroup({
        taskName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        taskDescription: new FormControl('', [Validators.maxLength(500)]),
        withDateDue: new FormControl(''),
        dateDue: new FormControl(''),
        priorityTag: new FormControl(''),
        subTasks: new FormArray([]),
        recurringTask: new FormControl(''),
        schedule: new FormControl('')
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

    get subTasks(): FormArray {
        return this.taskForm.get('subTasks') as FormArray;
    }

    get recurringTask(): FormControl {
        return this.taskForm.get('recurringTask') as FormControl;
    }

    get schedule(): FormControl {
        return this.taskForm.get('schedule') as FormControl;
    }

    checkboxEvent(event: any): void {
        console.log(event.checked)
    }

    dateDueValidator(): void {
        this.withDateDue.valueChanges.subscribe(() => {
            if (this.withDateDue.value === true) { this.dateDue.setValidators(Validators.required); }
            else { this.dateDue.clearValidators(); }
            this.dateDue.updateValueAndValidity();
        });
    }

    scheduleValidator(): void {
        this.recurringTask.valueChanges.subscribe(() => {
            if (this.recurringTask.value === true) { this.recurringTask.setValidators(Validators.required); }
            else { this.recurringTask.clearValidators(); }
            this.schedule.updateValueAndValidity();
        })
    }

}