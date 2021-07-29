import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMoviesComponent } from './list-movies.component';



@NgModule({
  declarations: [ListMoviesComponent],
  imports: [
    CommonModule
  ],
  exports: [ListMoviesComponent]
})
export class ListMoviesModule { }
