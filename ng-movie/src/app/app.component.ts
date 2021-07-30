import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { Movie } from './models/movie';
import { MoviesApiService } from './services/movies-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(ListMoviesComponent)
  childComponent!: ListMoviesComponent;

  sourceMovies: Movie[] = [
    { id: 1, title: "Iron Man", phase: "Phase One", categoryName: "Action", releaseYear: 2015, runningTime: 126, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "May 2, 2008", budget: "140000000", gross: "318298180", timeStamp: "2015-05-03" },
    { id: 2, title: "The Incredible Hulk", phase: "Phase One", categoryName: "Action", releaseYear: 2008, runningTime: 112, ratingName: "PG-13", discFormatName: "DVD", numberDiscs: 3, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "June 13, 2008", budget: "150000000", gross: "134518390", timeStamp: "2008-10-21" },
    { id: 3, title: "Iron Man 2", phase: "Phase One", categoryName: "Action", releaseYear: 2015, runningTime: 124, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "May 7, 2010", budget: "200000000", gross: "312057433", timeStamp: "2015-05-03" },
    { id: 4, title: "Thor", phase: "Phase One", categoryName: "Action", releaseYear: 2011, runningTime: 115, ratingName: "PG-13", discFormatName: "Blu-ray + DVD", numberDiscs: 2, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "May 6, 2011", budget: "150000000", gross: "181015141", timeStamp: "2011-10-30" },
    { id: 5, title: "Captain America", phase: "Phase One", categoryName: "Action", releaseYear: 2011, runningTime: 124, ratingName: "PG-13", discFormatName: "Blu-ray + DVD", numberDiscs: 2, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "July 22, 2011", budget: "140000000", gross: "176636816", timeStamp: "2011-10-30" },
    { id: 6, title: "Avengers, The", phase: "Phase One", categoryName: "Science Fiction", releaseYear: 2012, runningTime: 143, ratingName: "PG-13", discFormatName: "Blu-ray + DVD", numberDiscs: 2, viewingFormatName: "Widescreen", aspectRatioName: "1.85:1", status: 1, releaseDate: "May 4, 2012", budget: "220000000", gross: "623279547", timeStamp: "2012-10-20" },
    { id: 7, title: "Iron Man 3", phase: "Phase Two", categoryName: "Action", releaseYear: 2015, runningTime: 130, ratingName: "PG-13", discFormatName: "Blu-ray + DVD", numberDiscs: 2, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "May 3, 2013", budget: "200000000", gross: "408992272", timeStamp: "2015-05-03" },
    { id: 8, title: "Thor: The Dark World", phase: "Phase Two", categoryName: "Science Fiction", releaseYear: 2013, runningTime: 112, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 2, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "November 8, 2013", budget: "170000000", gross: "206360018", timeStamp: "2014-03-04" },
    { id: 9, title: "Captain America: The Winter Soldier", phase: "Phase Two", edition: "Blu-ray Edition", releaseYear: 2014, runningTime: 136, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "April 4, 2014", budget: "170000000", gross: "259746958", timeStamp: "2014-09-19" },
    { id: 10, title: "Guardians of the Galaxy", phase: "Phase Two", categoryName: "Science Fiction", releaseYear: 2014, runningTime: 121, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "August 1, 2014", budget: "170000000", gross: "333130696", timeStamp: "2014-12-07" },
    { id: 11, title: "Avengers: Age of Ultron", phase: "Phase Two", categoryName: "Science Fiction", releaseYear: 2015, runningTime: 141, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "May 1, 2015", budget: "250000000", gross: "458991599", timeStamp: "2015-12-07" },
    { id: 12, title: "Ant-Man", phase: "Phase Two", categoryName: "Science Fiction", releaseYear: 2015, runningTime: 132, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "1.85:1", status: 1, releaseDate: "July 17, 2015", budget: "130000000", gross: "179017481", timeStamp: "2015-12-07" },
    { id: 13, title: "Captain America: Civil War", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2016, runningTime: 147, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "May 6, 2016", budget: "25000000", gross: "408084349", timeStamp: "2017-11-09" },
    { id: 14, title: "Doctor Strange", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2016, runningTime: 115, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "November 4, 2016", budget: "165000000", gross: "232641920", timeStamp: "2017-11-09" },
    { id: 15, title: "Guardians of the Galaxy Vol. 2", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2017, runningTime: 136, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "May 5, 2017", budget: "200000000", gross: "389213281", timeStamp: "2017-11-09" },
    { id: 16, title: "Spider-Man: Homecoming", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2017, runningTime: 133, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "July 7, 2017", budget: "175000000", gross: "314057748", timeStamp: "2017-11-09" },
    { id: 17, title: "Thor: Ragnarok", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2017, runningTime: 130, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.35:1", status: 1, releaseDate: "November 3, 2017", budget: "180000000", gross: "315058289", timeStamp: "2017-11-09" },
    { id: 18, title: "Black Panther", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2018, runningTime: 0, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "February 16, 2018", budget: "200000000", gross: "700059566", timeStamp: "2018-01-09" },
    { id: 19, title: "Avengers: Infinity War", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2018, runningTime: 0, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "May 4, 2018", budget: "300000000", gross: "678815482", timeStamp: "2018-01-09" },
    { id: 20, title: "Ant-Man and the Wasp", phase: "Phase Three", categoryName: "Science Fiction", releaseYear: 2018, runningTime: 0, ratingName: "PG-13", discFormatName: "Blu-ray", numberDiscs: 1, viewingFormatName: "Widescreen", aspectRatioName: "2.39:1", status: 1, releaseDate: "July 6, 2018", budget: "130000000", gross: "216648740", timeStamp: "2018-01-09" }];

  selectedMovie: Movie | undefined;
  editMovie: Movie | undefined;

  showList: boolean = true;
  showCreate: boolean = false;
  showEdit: boolean = false;

  title = 'ng-movie';

  constructor(
    protected moviesApiService: MoviesApiService
  ) {
  }

  onViewMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  onEditMovie(movie: Movie): void {
    this.editMovie = movie;
    this.showEditComponent();
  }

  onMovieCreated(movie: Movie) {
    this.sourceMovies = [...this.sourceMovies, movie];
    this.hideCreateComponent();
  }

  
  onMovieUpdated(newMovie: Movie) {
    const oldMovie = this.sourceMovies.find(m => m.id === newMovie.id);
    if (oldMovie) {
      const index = this.sourceMovies.indexOf(oldMovie);
      this.sourceMovies[index] = newMovie;
    }
    this.hideEditComponent();
  }

  ngOnInit(): void {
    this.moviesApiService.getMovies()
      .subscribe((movies) => {
        this.sourceMovies = movies;
        console.log(`Source Movies: ${this.sourceMovies.length} loaded`);
      });
  }

  showCreateComponent(): void {
    this.showCreate = true;
    this.showList = false;
    this.showEdit = false;
  }

  showEditComponent(): void {
    this.showEdit = true;
    this.showCreate = false;
    this.showList = false;
  }

  hideCreateComponent(): void {
    this.showList = true;
    this.showCreate = false;
    this.showEdit = false;
  }

  hideEditComponent(): void {
    this.showList = true;
    this.showCreate = false;
    this.showEdit = false;
  }

  ngAfterViewInit(): void {
    if (this.childComponent) {
      console.log(`AppComponent - ngAfterViewInit - ${this.childComponent.movies.length} movies`);
    }
  }

}
