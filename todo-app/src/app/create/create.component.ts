import { Component, OnInit } from '@angular/core';
import {todo} from '../model/todos';
import { todosService } from '../todos.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private todoService: todosService) { }
public todoNew!: todo;

  ngOnInit() {
    this.todoNew = {"id": 1, "name": "Sample todo 1", "description": "Sample todo 1 description", "dueDate": "2021-8-30", "isCompleted": false }
    this.todoService.createTodo(this.todoNew);
  }

}
