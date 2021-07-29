import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideMovieDirective } from './hide-movie.directive';
import { FilterPhaseDirective } from './filter-phase.directive';



@NgModule({
  declarations: [HideMovieDirective, FilterPhaseDirective],
  imports: [
    CommonModule
  ],
  exports: [HideMovieDirective, FilterPhaseDirective]
})
export class DirectivesModule { }
