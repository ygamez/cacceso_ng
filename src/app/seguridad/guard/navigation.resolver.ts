import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthenticationService } from '../servicios/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationResolver implements Resolve<string> {
  constructor(private servi: AuthenticationService,) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {

      return this.servi.tipoUsuario().pipe(
        tap((x)=>{

              this.servi.tipoUserSubject.next( JSON.stringify(x));
        })
      );

    // return of('');
  }
}
