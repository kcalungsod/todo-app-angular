import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdGeneratorService } from 'src/app/dependencies/id-generator.service';
import { TaskService } from 'src/app/dependencies/task.service';
import { TaskEntry } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TaskControls } from 'src/app/models/task-controls.model';
import { MessagesService } from 'src/app/dependencies/messages.service';
import { BuiltinTypeName } from '@angular/compiler';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent extends TaskControls implements OnInit {
  constructor(private idService: IdGeneratorService, private taskApiService: TaskService, private router: Router, private message: MessagesService, private element: ElementRef) {
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

    return {
      id: this.idService.generateUniqueId(),
      name: this.taskName.value,
      description: this.taskDescription.value,
      withDateDue: withDateDueChecker,
      dateDue: dueDateChecker,
      isCompleted: false,
    }
  }
}
