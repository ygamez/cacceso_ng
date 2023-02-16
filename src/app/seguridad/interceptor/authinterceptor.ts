import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../servicios/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private Au : AuthenticationService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.Au.isLoggedIn('')){
      request = request.clone({
        setHeaders : {
          Authorization:`Bearer ${ this.Au.getToken()}`
        }});

        if(!request.headers.has('Content-Type')){
          request=request.clone({
            headers: request.headers.set('Content-Type','application/json')} );
        }
    }
    return next.handle(request);
  }
}
