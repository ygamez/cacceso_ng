import { AuthenticationService } from '../../../../seguridad/servicios/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  usuarioLogueado=false;
  constructor( public aut: AuthenticationService ) { }

  ngOnInit(): void {
    this.usuarioLogueado=this.aut.isLoggedIn('');
    this.aut.changeLoginStatus$.subscribe((logue)=>{
      this.usuarioLogueado = logue;
    });
  }

   logout(){
      this.aut.logout();
   }
}
