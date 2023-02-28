import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../servicios/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecepAuthGuard implements CanActivate {

  constructor(private router : Router,private Au : AuthenticationService ){}

  canActivate  (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(this.Au.tipoUserSubject.value ==="1"){
        console.log('RecepAuthGuard      trueeeeee'   , this.Au.tipoUserSubject.value  )
        return true;
      }

      console.log('RecepAuthGuard      falseeeeee'    )
      this.router.navigate([ '/home']);
      return false;
  }

}
