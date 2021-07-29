import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMoviesComponent } from './list-movies.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ListMoviesComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [ListMoviesComponent]
})
export class ListMoviesModule { }
