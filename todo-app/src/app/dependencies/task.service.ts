import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TaskEntry } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  todoApi: string = "http://localhost:3000/todos";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(protected http: HttpClient) { }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getRelevantTasks(completionStatus: boolean, recurringTaskValue?: boolean): Observable<TaskEntry[]> {
    let filterTasks = { isCompleted: completionStatus };
    if (typeof recurringTaskValue !== "undefined") { Object.assign(filterTasks, { recurringTask: recurringTaskValue }); }

    return this.http.get<TaskEntry[]>(this.todoApi, { params: filterTasks })
      .pipe(
        tap((taskEntries: TaskEntry[]) => console.log(`Retrieved ${taskEntries.length} where completion status = ${completionStatus}`)),
        catchError(this.handleError<TaskEntry[]>())
      );
  }

  checkNewTaskId(newId: string): boolean {
    const data: { id: string } = { id: newId };
    let isValid: boolean = true;

    this.http.get<TaskEntry[]>(this.todoApi, { params: data })
      .pipe(
        map(() => isValid = false),
        catchError(this.handleError<TaskEntry[]>())
      );

    return isValid;
  }

  addTask(task: TaskEntry): Observable<TaskEntry> {
    return this.http.post<TaskEntry>(this.todoApi, task, this.httpOptions)
      .pipe(
        tap((newTask: TaskEntry) => console.log(`Added task with id = ${newTask.id}, name = ${newTask.taskName}`)),
        catchError(this.handleError<TaskEntry>())
      );
  }

  toggleTaskCompletion(task: Partial<TaskEntry>, status: boolean, dateCompletedValue: Date): Observable<TaskEntry> {
    let toggableStatus = { isCompleted: status, dateCompleted: dateCompletedValue };
    return this.http.patch<TaskEntry>(`${this.todoApi}/${task.id}`, toggableStatus, this.httpOptions)
      .pipe(
        tap((toggledTask: TaskEntry) => console.log(`Updated task isCompleted to = ${toggledTask.isCompleted}`)),
        catchError(this.handleError<TaskEntry>())
      );
  }

  toggleSubTaskCompletion(task: TaskEntry, subTaskValue: string | undefined, status: boolean, dateCompletedValue: Date): Observable<TaskEntry> {
    const subTasksJSON = JSON.stringify(task.subTasks);
    const subTasks = JSON.parse(subTasksJSON);

    if (task.subTasks) {
      for (let x = 0; x < task.subTasks?.length; x++) {
        if (subTasks[x].subTask === subTaskValue) {
          subTasks[x].done = status;
          subTasks[x].dateCompleted = dateCompletedValue;
        }
      }
    }

    const updatedSubTaskArray = { subTasks: subTasks };

    return this.http.patch<TaskEntry>(`${this.todoApi}/${task.id}`, updatedSubTaskArray, this.httpOptions)
      .pipe(
        tap(() => console.log(`Toggled subtask done status to = ${status}`)),
        catchError(this.handleError<TaskEntry>())
      );
  }

  editTask(task: TaskEntry): Observable<TaskEntry> {
    return this.http.put<TaskEntry>(`${this.todoApi}/${task.id}`, task, this.httpOptions)
      .pipe(
        tap((editedTask: TaskEntry) => console.log(`Successfully edited Task: ${editedTask.taskName}`)),
        catchError(this.handleError<TaskEntry>())
      )
  }

  deleteTask(task: TaskEntry): Observable<TaskEntry> {
    return this.http.delete<TaskEntry>(`${this.todoApi}/${task.id}`, this.httpOptions)
      .pipe(
        tap(() => console.log("Deleted task from database.")),
        catchError(this.handleError<TaskEntry>())
      );
  }

  getRecurringTask(recurringTask: TaskEntry, completionStatus: boolean): Observable<TaskEntry[]> {
    const data = { recurringTaskID: recurringTask.recurringTaskID, isCompleted: completionStatus };

    return this.http.get<TaskEntry[]>(this.todoApi, { params: data })
      .pipe(
        tap(() => console.log("Successfully fetched recurring task")),
        catchError(this.handleError<TaskEntry[]>())
      );
  }

}
