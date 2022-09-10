import { Component, HostListener, OnInit } from '@angular/core';
import { IdGeneratorService } from 'src/app/dependencies/id-generator.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TaskControls } from 'src/app/models/task-controls.model';
import { MessagesService } from 'src/app/dependencies/messages.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent extends TaskControls implements OnInit {

  constructor(
    private idService: IdGeneratorService,
    private taskApiService: TaskService,
    private router: Router,
    private message: MessagesService) {
    super();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander() {
    return window.confirm();
  }

  ngOnInit(): void {
    this.dateDueValidator();
    this.scheduleValidator();
  }

  async onSubmit(): Promise<void> {
    if (this.taskForm.valid) {
      await lastValueFrom(this.taskApiService.addTask(this.createNewTask()));
      this.message.openSnackBar("Created a task!");
      this.taskForm.reset();
      this.router.navigate(['task/active']);
    }
  }

  private createNewTask(): TaskEntry {
    let withDateDueValue: boolean = this.withDateDue.value ? true : false;
    let dueDateValue: Date = withDateDueValue && this.dateDue.value ? this.dateDue.value.toLocaleDateString() : null;
    let priorityTagValue: string = this.priorityTag.value === "" ? "No priority tag" : this.priorityTag.value;
    let recurringTaskValue: boolean = this.recurringTask.value ? true : false;
    let recurringTaskIDValue: string = recurringTaskValue ? this.idService.generateUniqueId() : "";
    let dateCreated: Date = new Date().toLocaleDateString() as unknown as Date;

    this.subTasks.value.map((subTask: object) => (Object.assign(subTask, { done: false })));

    if (recurringTaskValue && !dueDateValue) {
      withDateDueValue = true;
      dueDateValue = new Date().toLocaleDateString() as unknown as Date;
    }

    return {
      id: this.idService.generateUniqueId(),
      taskName: this.taskName.value,
      description: this.taskDescription.value,
      withDateDue: withDateDueValue,
      dateDue: dueDateValue,
      isCompleted: false,
      priorityTag: priorityTagValue,
      subTasks: this.subTasks.value,
      recurringTask: recurringTaskValue,
      recurringTaskID: recurringTaskIDValue,
      schedule: this.schedule.value,
      dateCreated: dateCreated
    }
  }
}
