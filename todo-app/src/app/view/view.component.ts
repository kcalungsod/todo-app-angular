import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {todo} from '../model/todos';
import { todosService } from '../todos.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
 selectedTask! : todo;
 selectedId!: number;
 private todoList!: Observable<todo[]>;
  constructor(private todoService: todosService) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
  }

}
