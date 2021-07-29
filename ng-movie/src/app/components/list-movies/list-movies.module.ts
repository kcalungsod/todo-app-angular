import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMoviesComponent } from './list-movies.component';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [ListMoviesComponent],
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [ListMoviesComponent]
})
export class ListMoviesModule { }
