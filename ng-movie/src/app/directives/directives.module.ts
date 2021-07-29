import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideMovieDirective } from './hide-movie.directive';
import { FilterPhaseDirective } from './filter-phase.directive';
import { UnsignedNumberDirective } from './unsigned-number.directive';

@NgModule({
  declarations: [HideMovieDirective, FilterPhaseDirective, UnsignedNumberDirective],
  imports: [
    CommonModule
  ],
  exports: [HideMovieDirective, FilterPhaseDirective, UnsignedNumberDirective]
})
export class DirectivesModule { }
