import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMovieComponent } from './create-movie.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateMovieComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CreateMovieComponent]
})
export class CreateMovieModule { }
