import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { TaskContentService } from 'src/app/dependencies/task-content.service';
import { TaskControls } from 'src/app/models/task-controls.model';
import { lastValueFrom } from 'rxjs';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { IdGeneratorService } from 'src/app/dependencies/id-generator.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent extends TaskControls implements OnInit {

  constructor(
    private taskApiService: TaskService,
    private taskContentService: TaskContentService,
    private idService: IdGeneratorService,
    private router: Router,
    private message: MessagesService) {
    super();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander() {
    return window.confirm();
  }

  oldTaskID!: string;
  subTasksReceived!: object[] | undefined;
  currentRecurringTaskID!: string;
  dateCreatedValue!: Date;

  ngOnInit(): void {
    const selectedTask = this.taskContentService.onTaskReceived();
    const oldDateDue = selectedTask?.dateDue ? new Date(selectedTask?.dateDue as Date) : null;

    this.dateDueValidator();
    this.scheduleValidator();

    this.oldTaskID = selectedTask?.id;
    this.taskName.setValue(selectedTask?.taskName);
    this.taskDescription.setValue(selectedTask?.description);
    this.withDateDue.setValue(selectedTask?.withDateDue);
    this.dateDue.setValue(oldDateDue);
    this.subTasksReceived = selectedTask?.subTasks;
    this.recurringTask.setValue(selectedTask?.recurringTask);
    this.schedule.setValue(selectedTask?.schedule);
    this.currentRecurringTaskID = selectedTask?.recurringTaskID;
    this.dateCreatedValue = selectedTask?.dateCreated;
  }

  async onSubmit(): Promise<void> {
    if (this.taskForm.valid) {
      await lastValueFrom(this.taskApiService.editTask(this.editActiveTask()));
      this.message.openSnackBar("Successfully edited the task!");
      this.router.navigate(['task/active']);
    }
  }

  private editActiveTask(): TaskEntry {
    let withDateDueValue: boolean = this.withDateDue.value ? true : false;
    let dueDateValue: Date = withDateDueValue && this.dateDue.value ? this.dateDue.value.toLocaleDateString() : null;
    let priorityTagValue: string = this.priorityTag.value === "" ? "No priority tag" : this.priorityTag.value;
    let recurringTaskValue: boolean = this.recurringTask.value ? true : false;
    let recurringTaskIDValue: string = recurringTaskValue ? this.idService.generateUniqueId() : "";

    this.subTasks.value.map((subTask: object) => (!subTask.hasOwnProperty('done') ? Object.assign(subTask, { done: false }) : subTask));

    return {
      id: this.oldTaskID,
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
      dateCreated: this.dateCreatedValue
    }
  }
}
