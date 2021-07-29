import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesModule } from './components/list-movies/list-movies.module';
import { MOVIES_URL } from './tokens/token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CreateMovieModule } from './components/create-movie/create-movie.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListMoviesModule,
    CreateMovieModule,
    HttpClientModule
  ],
  providers: [{
    provide: MOVIES_URL,
    useValue: environment.url
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
