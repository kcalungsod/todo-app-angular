import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'phase'
})
export class PhasePipe implements PipeTransform {
  transform(movies: Movie[], phase?: string): Movie[] {
    if (movies && phase && phase !== 'All') {
      return movies.filter(movie => movie.phase === phase);
    }
    return movies ? movies : [];
  }
}
