import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieLayoutComponent } from './movie-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MovieLayoutComponent]
})
export class MovieLayoutModule { }