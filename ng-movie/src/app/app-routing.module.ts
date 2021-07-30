import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieLayoutComponent } from './components/movie-layout/movie-layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieLayoutComponent,
    loadChildren: () => import('./components/movie-layout/movie-layout.module').then(m => m.MovieLayoutModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
