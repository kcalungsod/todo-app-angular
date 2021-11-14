import { Component, OnInit } from '@angular/core';
import { todosService } from '../todos.service';
import { todo } from '../model/todos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private todoList!: Observable<todo[]>;
  constructor(private todoService: todosService) {
    
   }

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
  }

}
