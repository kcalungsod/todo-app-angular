import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MoviesApiService } from '../services/movies-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoadMoviesResolver implements Resolve<Movie[]> {
  constructor(protected moviesApi: MoviesApiService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Movie[]> {
    return this.moviesApi.getMovies();
  }
}
