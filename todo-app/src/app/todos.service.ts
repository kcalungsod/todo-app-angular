import { Injectable } from "@angular/core";
import { todo } from "./model/todos";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Logger } from './logger.service';

@Injectable({
    providedIn: 'root',
  })

export class todosService {
public todoListUrl: string = 'http://localhost:3000/';

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    constructor(private http: HttpClient, private logger: Logger){ 
    }
 
    getTodoList(): Observable<todo[]> {
        var api = this.todoListUrl +'todos';   
        return this.http.get<todo[]>(api);
        }

    getTodo(id: number): Observable<todo> {
        var api = this.todoListUrl +'todos';  
        const url = `${api}/${id}`;
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

