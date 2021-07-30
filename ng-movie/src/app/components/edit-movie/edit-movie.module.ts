import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMovieComponent } from './edit-movie.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditMovieComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EditMovieComponent]
})
export class EditMovieModule { }
