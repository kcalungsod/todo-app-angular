import { Injectable } from "@angular/core";
import { todo } from "./model/todos";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })

  
export class todosService {
private todoListUrl!: 'api/todos'
httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    constructor(private http: HttpClient){ 
    }

    getTodoList(): Observable<todo[]> {
        return this.http.get<todo[]>(this.todoListUrl);
        }

    getTodo(id: number): Observable<todo> {
        const url = `${this.todoListUrl}/${id}`;
        return this.http.get<todo>(url);
        }

    updateTodo(todo: todo): Observable<any> {
        return this.http.put(this.todoListUrl, todo, this.httpOptions);
        }

    createTodo(todo: todo): Observable<todo> {
        return this.http.post<todo>(this.todoListUrl, todo, this.httpOptions);
        }

    deleteTodo(id: number): Observable<todo> {
        const url = `${this.todoListUrl}/${id}`;        
        return this.http.delete<todo>(url, this.httpOptions);
        }
}

