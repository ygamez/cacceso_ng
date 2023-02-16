import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../servicios/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private router : Router, private Au : AuthenticationService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.Au.isLoggedIn(state.url)){
          return true;
      }
      this.Au.logout();
      this.router.navigate(['/login']);
    return false;
  }

}
