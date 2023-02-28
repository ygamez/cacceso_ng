import { JwtRespuesta } from '../../modelos/jwt-respuesta';
import { CUserInfo } from '../../modelos/cuser-info';
import { AuthenticationService } from '../../servicios/authentication.service';

import Swal from "sweetalert2";

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { json } from 'stream/consumers';
// import test from 'node:test';



// declare var require: any;
// const sha1 = require("sha1");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formlogin: FormGroup;
  formSubmitted: boolean = false; // para saber que se esta procesando el formulario(click al botón aceptar)
  errores: string;
  private userSubcription: Subscription;


  // referencia al BOTÓN Registro DEL DOM para poder cambiar su propiedad
  //disable
  @ViewChild('user') user: ElementRef;
  @ViewChild('pass') pass: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private  router: Router ,
    ) {

    //  let pepe:  CUserInfo [];
    //  pepe=[ new CUserInfo( 'geo','123' ),new CUserInfo('ssss','asasa')  ]

    //  let  ppp= JSON.stringify(pepe)

    //     localStorage.setItem('pepppp',ppp);

    //      console.log(  JSON.parse(localStorage.getItem('pepppp')));


    //    let temp  :  CUserInfo [] =    JSON.parse(localStorage.getItem('pepppp'));

    //   temp.push(new CUserInfo('Nuevo','12344444444'));

    //   localStorage.removeItem('pepppp');

    //   localStorage.setItem('pepppp',JSON.stringify(temp));

    //   console.log(JSON.parse(localStorage.getItem('pepppp')));

    }



  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formlogin = this.fb.group({
      user: new FormControl('', Validators.required),
      pass: ['', Validators.required],
    });
    // console.log(this.sha1.sync('hey there'))
  }


  routerRedirect='';

  'debugger'
  onSubmit(valores: CUserInfo) {
    this.formSubmitted = true;
    this.bloquearControles(true);
    this.routerRedirect='';
    // console.log("entroAntes");

    if (this.formlogin.valid) {
      console.log("entro");
      // validaciones aqui
      // convirtiendo a base64
       valores.pass=btoa(valores.pass);

      //  console.log(valores);


       let user$ = this.auth.login(valores);
       this.userSubcription =
       user$.subscribe((respuesta: JwtRespuesta)=>{

        // console.log("Respuesta",   respuesta);

        // pasar a otra pagina
        //this.router.navigateByUrl('/home');
        this.routerRedirect = this.auth.urlUsuarioIntentaAcceder;
        this.auth.urlUsuarioIntentaAcceder='';
        if(this.routerRedirect==='')
            this.router.navigate(['/home']);
        else
            this.router.navigate([this.routerRedirect]);

       },error=>{

        //  console.error('error por aquiiiiiiiiiiiiiiiii',error.error.message );

         //TODO: mostrar msj de error
          Swal.fire('Revise', String(error.error.message)  ,  'error') 
          // this.errores= error.error.message ;
          this.formSubmitted = false;
          this.bloquearControles(false);
       },()=>{
         // console.error('eFINAL');
          this.formSubmitted = false;
          this.bloquearControles(false);
        }) ;
    }

    // this.bloquearControles(false);
  }

  bloquearControles(bloquear: boolean) {
    this.user.nativeElement.disabled = bloquear;
    this.pass.nativeElement.disabled = bloquear;
  }

  ngOnDestroy(): void {

    if(this.userSubcription!=null){
      this.userSubcription.unsubscribe();
  }
   // throw new Error('Method not implemented.');
  }

  login (){        

    // this.authService.validarToken()
    //     .subscribe( resp => console.log( resp ));
    // console.log(this.formlogin.value);

    const { nombre, password } = this.formlogin.value;

    this.auth.loginYariel( nombre, password )
    .subscribe( ok =>{
      //  console.log(ok)
      if ( ok === true ){
        this.router.navigateByUrl('/home');
      }
      else {
        //TODO: mostrar msj de error
        Swal.fire('Revise', ok, 'error') 
      }
    })
  }   

  ingresarSinLogin() {
    this.auth.logout();
    this.router.navigate(['./home']);
  }
}
