import { Input, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskControls } from 'src/app/models/task-controls.model';

@Component({
  selector: 'app-new-subtask',
  templateUrl: './new-subtask.component.html',
  styleUrls: ['./new-subtask.component.scss'],
})
export class NewSubtaskComponent extends TaskControls implements OnInit {

  @Input()
  parentForm!: FormGroup;

  @Input()
  subTasksArray!: object[] | undefined;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.taskForm = this.parentForm;

    if (this.subTasksArray) {
      this.listSubTasks(this.subTasksArray);
    }
  }

  listSubTasks(subTasksArray: object[]): void {
    const subTasksJSON = JSON.stringify(subTasksArray);
    const subTasks = JSON.parse(subTasksJSON);

    for (let x = 0; x < subTasksArray.length; x++) {
      this.subTasks.push(
        new FormGroup({
          subTask: new FormControl(subTasks[x].subTask, [Validators.required, Validators.maxLength(50)])
        }));
    }
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
