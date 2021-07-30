import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMovieComponent } from './../create-movie/create-movie.component';
import { EditMovieComponent } from './../edit-movie/edit-movie.component';
import { ListMoviesComponent } from './../list-movies/list-movies.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateMovieComponent,
  },
  {
    path: 'edit/:id',
    component: EditMovieComponent
  },
  {
    path: 'edit',
    component: EditMovieComponent
  },
  {
    path: 'list',
    component: ListMoviesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
