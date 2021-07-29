import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { MOVIES_URL } from '../tokens/token';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    @Inject(MOVIES_URL) private moviesUrl: string
  ) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap((movies: Movie[]) => console.log(`retrieved ${movies.length} movie`)),
        catchError(this.handleError<Movie[]>([]))
      );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.moviesUrl}/${id}`)
      .pipe(
        tap((movie: Movie) => console.log(`retrieved movie id#${id}`)),
        catchError(this.handleError<Movie>())
      );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions).pipe(
      tap((newMovie: Movie) => console.log(`added movie w/ id=${newMovie.id}`)),
      catchError(this.handleError<Movie>())
    );
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.moviesUrl}/${movie.id}`, movie, this.httpOptions).pipe(
      tap(() => console.log(`edited movie w/ id=${movie.id}`)),
      catchError(this.handleError<Movie>())
    );
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(`${this.moviesUrl}/${movie.id}`, this.httpOptions).pipe(
      tap(() => console.log(`delete movie w/ id=${movie.id}`)),
      catchError(this.handleError<Movie>())
    );
  }

  private handleError<T>(result?: T ) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
