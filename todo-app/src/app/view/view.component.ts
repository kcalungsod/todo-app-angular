import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {todo} from '../model/todos';
import { todosService } from '../todos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
 selectedTask! : todo;
 selectedId!: number;
 private todoList!: Observable<todo[]>;
  constructor(private todoService: todosService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get('Id') as any;
    this.todoService.getTodo(this.selectedId)
    .subscribe((todo) => {
      this.selectedTask = todo;
    });
  }
  

  onBackButtonClick(){
    this.router.navigate(['/list']);
  }

}
