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

  ngOnInit(): void {
    const selectedTask = this.taskContentService.onTaskReceived();
    const oldDateDue = selectedTask?.dateDue ? new Date(selectedTask?.dateDue as Date) : null;

    this.dateDueValidator();

    this.oldTaskID = selectedTask?.id;
    this.taskName.setValue(selectedTask?.name);
    this.taskDescription.setValue(selectedTask?.description);
    this.withDateDue.setValue(selectedTask?.withDateDue);
    this.dateDue.setValue(oldDateDue);
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

    return {
      id: this.oldTaskID,
      name: this.taskName.value,
      description: this.taskDescription.value,
      withDateDue: withDateDueChecker,
      dateDue: dueDateChecker,
      isCompleted: false,
    }
  }
}
