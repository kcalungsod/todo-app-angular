import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMovieComponent } from './edit-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EditMovieComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [EditMovieComponent]
})
export class EditMovieModule { }
