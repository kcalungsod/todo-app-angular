import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { MovieLayoutComponent } from './components/movie-layout/movie-layout.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieLayoutComponent,
    children:  [
      {
        path: 'create',
        component: CreateMovieComponent,
      },
      {
        path: 'edit/:id',
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
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
