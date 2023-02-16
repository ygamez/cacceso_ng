import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/seguridad/servicios/authentication.service';

@Component({
  selector: 'app-usuarios-linea',
  templateUrl: './usuarios-linea.component.html',
  styleUrls: ['./usuarios-linea.component.css']
})
export class UsuariosLIneaComponent implements OnInit {

  listaUserConnected: string[];

  constructor(private servi: AuthenticationService) { }

  ngOnInit(): void {
    this.servi.listaUserConnectedSubject$.subscribe(
      (lista: string [])=>{
        this.listaUserConnected=lista;
      }
    );
  }

}
