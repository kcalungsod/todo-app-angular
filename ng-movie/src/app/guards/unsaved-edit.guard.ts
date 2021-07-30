import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditMovieComponent } from '../components/edit-movie/edit-movie.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedEditGuard implements CanDeactivate<EditMovieComponent> {

  canDeactivate(
    component: EditMovieComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    return confirm('There are unsaved edits. Are you sure you want to leave?');
  }

}
