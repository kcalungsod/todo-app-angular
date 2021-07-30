import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMovieComponent } from './create-movie.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateMovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    RouterModule
  ],
  exports: [CreateMovieComponent]
})
export class CreateMovieModule { }
