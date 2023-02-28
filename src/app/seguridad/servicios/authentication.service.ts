import { environment } from '../../../environments/environment';
import { JwtRespuesta } from '../modelos/jwt-respuesta';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { AuthResponse, CUserInfo } from '../modelos/cuser-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeService } from './mensaje.service';


const TOKEN_ACCESS = 'token';
const Full_NAME='nombrecompleto';
// const TIPO_USER='tipoUser'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private mensajeService =new MensajeService(this);

  private baseUrl: string = environment.backend;
  private _usuario: AuthResponse | undefined ;

  constructor(
    private http: HttpClient,
    private router : Router,
     ) {}


  public urlUsuarioIntentaAcceder='';
  public urlUser


  // variable de tipo Subject(para crear observable)
  // para saber cuando cambia el estado del usuario (conectado - desconectado)
  public cambioStatusLoginSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.cambioStatusLoginSubject.asObservable();
  /////---------------------------------------------------------------------------------

  // variable de tipo Subject(para crear observable)
  // para saber el tipo de usuario(Recepcionista - usuario )

  public tipoUserSubject = new BehaviorSubject<string>('');



  public cancelRe = new Subject<boolean>()
  public actuCancelRe$=this.cancelRe.asObservable();



  setActiCancelReunion(valor:boolean){
    // no modifica nada , solamente actualiza desde BD
    this.cancelRe.next(valor);
    console.log('mandando a true el cancel')
  }
  //--------------------------------------------------------------------------------------



  login(usuario: CUserInfo): Observable<JwtRespuesta> {
    return this.http
    // .post<JwtRespuesta>('https://localhost:44392/Account/login', usuario)
      .post<JwtRespuesta>(environment.backend + '/Seguridad/login', usuario)
      .pipe(
        tap((resp: JwtRespuesta) => {
          // console.log('respuesta', resp);
      //#region código  no usuado
                   // if(this.mensajeService.connectionStart(resp.token)){
                    //    // guardando los tokens en la tienda
                    //   this.setSession(resp);
                    // }
                    // else{
                    //   throw new Error('Error cojoneeeee');
                    // }
      //#endregion
          this.mensajeService.connectionStart(resp.token)
          .then(()=>{

            this.setSession(resp);

          }
          ).catch((error)=>{
             console.error( 'ERRORRRRRRRRRRRRRR');
           // throw new Error('Error ' + error)
          });
        })
      );
  }

  loginYariel( nombre: string, password : string ){

    const url = `${ this.baseUrl }/Account/login`;
    const body = { nombre, password };

    return this.http.post<AuthResponse>( url, body)
        .pipe(
          tap( resp =>
             {
              if (resp.ok){
                localStorage.setItem( 'token', resp.token );
                // localStorage.setItem( 'x-token', resp.refreshToken );
                this._usuario =
                {
                  ok:     resp.ok ,
                  id:     resp.id ,
                  nombre: resp.nombre ,
                  token:  resp.token ,
                  tipo:   resp.tipo ,
                }
              }
              }),
          map( resp => resp.ok ),
          catchError( err => of( err.error.message ) )
        )
  }

  cambioStatus(valor: boolean ){

    // console.log('CAMBIO STATUS DESDE SERVICIO ',valor )
    this.cambioStatusLoginSubject.next(valor);
  }

  logout(){
    this.removeSession();
    this.cambioStatus(false);

    this.mensajeService.connectionStop();
    // window.location.reload();
    this.router.navigate(['/login']);

    // console.log('LOGOUT')

  }

  getToken(): string{

       if(localStorage.getItem(TOKEN_ACCESS) ){
          return localStorage.getItem(TOKEN_ACCESS);
       }
       return null;

  }

  public getFullNAme(){
    return localStorage.getItem(Full_NAME);
  }

  private setSession(_authResult: JwtRespuesta) {
    localStorage.setItem(TOKEN_ACCESS, _authResult.token);
    localStorage.setItem(Full_NAME, _authResult.usuario.fullName);

    this.cambioStatus(true);

  }

  private removeSession() {
    localStorage.removeItem(TOKEN_ACCESS);
    localStorage.removeItem(Full_NAME);
    // Full_NAME

  }


  tipoUsuario() :Observable<any> {
    return this.http.get(environment.backend + '/Seguridad/tipoUser');
  }

  isLoggedIn(url: string): boolean {

    const islogged = this.getToken();
    if(!islogged){
      if(url !==''){
        this.urlUsuarioIntentaAcceder=url;
      }
      return false;
    }
    return true;
  }

  public listaUserConnectedSubject = new BehaviorSubject<string[]>(['']);
  public listaUserConnectedSubject$ = this.listaUserConnectedSubject.asObservable();


  setListUserConnectedSubject(listaUserConnected:string []){
    this.listaUserConnectedSubject.next(listaUserConnected);
}

}
