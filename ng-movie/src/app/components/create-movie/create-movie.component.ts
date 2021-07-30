import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent {

  @ViewChild('movieForm')
  form!: NgForm;

  @Output()
  movieCreated: EventEmitter<Movie> = new EventEmitter<Movie>();

  movie: Movie = this.createNewMovie();

  constructor(
    protected moviesApiService: MoviesApiService,
    private router: Router
  ) { }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const newMovie = await this.moviesApiService.addMovie(this.movie).toPromise();
      this.form.resetForm();
      this.movieCreated.emit(newMovie);;
      this.router.navigate(['/']);
    }
  }

  private createNewMovie(): Movie {
    return {
      title: '',
      phase: '',
    }
  }
}
