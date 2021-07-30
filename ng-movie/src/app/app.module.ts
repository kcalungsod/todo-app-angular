import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesModule } from './components/list-movies/list-movies.module';
import { MOVIES_URL } from './tokens/token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CreateMovieModule } from './components/create-movie/create-movie.module';
import { EditMovieModule } from './components/edit-movie/edit-movie.module';
import { MovieLayoutModule } from './components/movie-layout/movie-layout.module';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListMoviesModule,
    CreateMovieModule,
    EditMovieModule,
    HttpClientModule,
    MovieLayoutModule,
    PageNotFoundModule
  ],
  providers: [{
    provide: MOVIES_URL,
    useValue: environment.url
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
