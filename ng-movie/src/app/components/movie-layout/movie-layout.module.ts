import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieLayoutComponent } from './movie-layout.component';
import { RouterModule } from '@angular/router';
import { CreateMovieModule } from '../create-movie/create-movie.module';
import { EditMovieModule } from '../edit-movie/edit-movie.module';
import { ListMoviesModule } from '../list-movies/list-movies.module';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListMoviesModule,
    CreateMovieModule,
    EditMovieModule,
    MovieRoutingModule
  ],
  declarations: [MovieLayoutComponent]
})
export class MovieLayoutModule { }