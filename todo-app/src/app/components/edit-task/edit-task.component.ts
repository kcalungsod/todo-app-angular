import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { TaskContentService } from 'src/app/dependencies/task-content.service';
import { TaskControls } from 'src/app/models/task-controls.model';
import { lastValueFrom } from 'rxjs';
import { MessagesService } from 'src/app/dependencies/messages.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent extends TaskControls implements OnInit {

  constructor(
    private taskApiService: TaskService,
    private taskContentService: TaskContentService,
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

  ngOnInit(): void {
    const selectedTask = this.taskContentService.onTaskReceived();
    const oldDateDue = selectedTask?.dateDue ? new Date(selectedTask?.dateDue as Date) : null;
    console.log(selectedTask.subTasks);

    this.dateDueValidator();

    this.oldTaskID = selectedTask?.id;
    this.taskName.setValue(selectedTask?.name);
    this.taskDescription.setValue(selectedTask?.description);
    this.withDateDue.setValue(selectedTask?.withDateDue);
    this.dateDue.setValue(oldDateDue);
    this.subTasksReceived = selectedTask?.subTasks;
  }

  async onSubmit(): Promise<void> {
    if (this.taskForm.valid) {
      await lastValueFrom(this.taskApiService.editTask(this.editActiveTask()));
      this.message.openSnackBar("Successfully edited the task!");
      this.router.navigate(['task/active']);
    }
  }

  private editActiveTask(): TaskEntry {
    const withDateDueChecker: boolean = this.withDateDue.value ? true : false;
    const dueDateChecker: Date = withDateDueChecker && this.dateDue.value ? this.dateDue.value.toLocaleDateString() : null;
    const priorityTagValue: string = this.priorityTag.value === "" ? "No priority tag" : this.priorityTag.value;

    this.subTasks.value.map((subTask: object) => (!subTask.hasOwnProperty('done') ? Object.assign(subTask, { done: false }) : subTask));

    return {
      id: this.oldTaskID,
      name: this.taskName.value,
      description: this.taskDescription.value,
      withDateDue: withDateDueChecker,
      dateDue: dueDateChecker,
      isCompleted: false,
      priorityTag: priorityTagValue,
      subTasks: this.subTasks.value
    }
  }
}
