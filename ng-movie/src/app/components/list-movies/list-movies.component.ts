import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit, OnDestroy {

  selectedPhase!: string;

  @Input()
  movies: Movie[] = [];

  @Output()
  viewMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  @Output()
  editMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
    console.log(`ListMoviesComponent - ngOnInit - ${this.movies ? this.movies.length : 0} movies`);
  }

  ngOnDestroy(): void {
    this.movies = [];
    console.log(`ListMoviesComponent - ngOnDestroy - ${this.movies ? this.movies.length : 0} movies`);
  }

}
