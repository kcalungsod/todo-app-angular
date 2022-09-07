import { Input, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskControls } from 'src/app/models/task-controls.model';

@Component({
  selector: 'app-new-subtask',
  templateUrl: './new-subtask.component.html',
  styleUrls: ['./new-subtask.component.scss'],
})
export class NewSubtaskComponent extends TaskControls implements OnInit {

  @Input()
  parentForm!: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.taskForm = this.parentForm;
    this.subTasks.valueChanges.subscribe(() => console.log(this.subTasks.value));
  }

  addSubTask(): void {
    this.subTasks.push(this.newSubTask());
  }

  newSubTask(): FormGroup {
    return new FormGroup({
      subTask: new FormControl("", [Validators.required, Validators.maxLength(50)])
    });
  }

  deleteBtn(index: number): void {
    this.subTasks.removeAt(index);
  }
}
