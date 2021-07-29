import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesModule } from './components/list-movies/list-movies.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListMoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
