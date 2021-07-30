import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit, OnDestroy {

  selectedPhase!: string;

  selectedMovie!: Movie;
   
  @Input()
  movies: Movie[] = [];

  @Output()
  viewMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  @Output()
  editMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor(
    protected moviesApiService: MoviesApiService,
    protected router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.movies = this.route.snapshot.data.movies;
    console.log(`Source Movies: ${this.movies.length} loaded from resolver`);

    this.editMovie.subscribe(m => {
      this.router.navigate(['/movies/edit', m.id]);
    })
    this.viewMovie.subscribe(m => {
      this.selectedMovie = m;
    })
    console.log(`ListMoviesComponent - ngOnInit - ${this.movies ? this.movies.length : 0} movies`);

  }

  ngOnDestroy(): void {
    this.movies = [];
    console.log(`ListMoviesComponent - ngOnDestroy - ${this.movies ? this.movies.length : 0} movies`);
  }

  fetchMovies(): void {
    this.moviesApiService.getMovies()
      .subscribe((movies) => {
        this.movies = movies;
        console.log(`Source Movies: ${this.movies.length} loaded`);
      });
  }

}
