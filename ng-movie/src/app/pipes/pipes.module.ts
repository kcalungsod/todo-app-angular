import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhasePipe } from './phase.pipe';

@NgModule({
  declarations: [PhasePipe],
  imports: [
    CommonModule
  ],
  exports: [PhasePipe]
})
export class PipesModule { }
