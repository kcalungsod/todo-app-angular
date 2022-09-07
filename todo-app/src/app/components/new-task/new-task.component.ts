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
    const withDateDueChecker: boolean = this.withDateDue.value ? true : false;
    const dueDateChecker: Date = withDateDueChecker && this.dateDue.value ? this.dateDue.value.toLocaleDateString() : null;
    const priorityTagValue: string = this.priorityTag.value === "" ? "No priority tag" : this.priorityTag.value;
    this.subTasks.value.map((subTask: object) => (Object.assign(subTask, { done: false })));

    return {
      id: this.idService.generateUniqueId(),
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
