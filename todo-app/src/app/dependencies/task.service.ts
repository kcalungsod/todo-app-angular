import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
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

  getRelevantTasks(completionStatus: boolean): Observable<TaskEntry[]> {
    let filterTasks = { isCompleted: completionStatus };
    return this.http.get<TaskEntry[]>(this.todoApi, { params: filterTasks })
      .pipe(
        tap((taskEntries: TaskEntry[]) => console.log(`Retrieved ${taskEntries.length} where completion status = ${completionStatus}`)),
        catchError(this.handleError<TaskEntry[]>())
      );
  }

  checkNewTaskId(newId: string): boolean {
    const data = { id: newId };
    let isValid = true;

    this.http.get<TaskEntry[]>(this.todoApi, { params: data })
      .pipe(
        tap(() => isValid = false)
      );

    return isValid;
  }

  addTask(task: TaskEntry): Observable<TaskEntry> {
    return this.http.post<TaskEntry>(this.todoApi, task, this.httpOptions)
      .pipe(
        tap((newTask: TaskEntry) => console.log(`Added task with id = ${newTask.id}, name = ${newTask.name}`)),
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

  editTask(task: TaskEntry): Observable<TaskEntry> {
    return this.http.put<TaskEntry>(`${this.todoApi}/${task.id}`, task, this.httpOptions)
      .pipe(
        tap((editedTask: TaskEntry) => console.log(`Successfully edited Task: ${editedTask.name}`)),
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

}
