import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMovieComponent } from './../create-movie/create-movie.component';
import { EditMovieComponent } from './../edit-movie/edit-movie.component';
import { ListMoviesComponent } from './../list-movies/list-movies.component';
import { CanEditGuard } from '../../guards/can-edit.guard';
import { UnsavedEditGuard } from '../../guards/unsaved-edit.guard';
import { LoadMoviesResolver } from '../../guards/load-movies.resolver';

const routes: Routes = [
  {
    path: 'create',
    component: CreateMovieComponent,
  },
  {
    path: 'edit/:id',
    component: EditMovieComponent,
    canActivate: [CanEditGuard],
    canDeactivate: [UnsavedEditGuard]
  },
  {
    path: 'edit',
    component: EditMovieComponent,
    canActivate: [CanEditGuard],
    canDeactivate: [UnsavedEditGuard]
  },
  {
    path: 'list',
    component: ListMoviesComponent,
    resolve: {
      movies: LoadMoviesResolver
    }
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
