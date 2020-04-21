import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { query } from '@angular/core/src/render3/query';

@Injectable({
  providedIn: 'root'
})
export class TFTguardGuard implements CanActivate {
  constructor(private router: Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(sessionStorage.getItem('currentUser')){
        return true;
      }
    this.router.navigate(['\homepage'], {queryParams: { returnUrl: state.url }});
    return false;
  }
}
