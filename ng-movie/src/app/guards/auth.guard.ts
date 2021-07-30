import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    const result = confirm('Do you have access on this page?');
    if(result) {
      return true;
    } else {
      return this.router.createUrlTree(['/access-denied']);
    }
  }
}
