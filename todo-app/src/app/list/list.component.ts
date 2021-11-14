import { Component, OnInit } from '@angular/core';
import { todosService } from '../todos.service';
import { todo } from '../model/todos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todoList!: todo[];
  constructor(private todoService: todosService,private router: Router) {
   }

  ngOnInit() {
    this.todoService.getTodoList()
    .subscribe((todo) => {
       this.todoList = todo;
    });
  }

  onButtonClick(todo: todo,routeChosen: string){
    this.router.navigate(['/'+routeChosen,{Id: todo.id}]);
  }

  onCreateButtonClick(){
    this.router.navigate(['/create']);
  }

}
