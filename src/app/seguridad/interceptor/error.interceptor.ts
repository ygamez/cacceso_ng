import { AuthenticationService } from 'src/app/seguridad/servicios/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private servicio : AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
        catchError((error: HttpErrorResponse ) => {

          // console.log('EL ERRROR ',error)
            if(error && error.status===401){
             // console.log('EL ERRROR ',error)

              this.servicio.logout();
            }
            else{
              // console.log(error.message);
            }
            return throwError(()=> error);
        })
    );
  }
}
