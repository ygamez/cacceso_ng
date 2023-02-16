import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DtosVisitante } from 'src/app/logged/modelos/dtosVisitante';
import { AppService } from 'src/app/seguridad/servicios/app.service';

@Component({
  selector: 'app-detalles-visitante',
  templateUrl: './detalles-visitante.component.html',
  styleUrls: ['./detalles-visitante.component.css'],
})
export class DetallesVisitanteComponent implements OnInit {
  listaVisitantes?: DtosVisitante;
  idReunion: number;
  idVisitante: number;
  constructor(
    private route: ActivatedRoute,
    private servicioGeneral: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('idReunion')) {
        this.idReunion = Number(params.get('idReunion'));
      }

      if (params.has('idVisitante')) {
        this.idVisitante = Number(params.get('idVisitante'));
      }
    });

    this.servicioGeneral.listaReunionesSubject$.subscribe((datos) => {
      if (datos == null) {
        this.router.navigate(['/home']);
      } else {
        // let ss = datos.findIndex((x) => {
        //   x.idReunion == 8;
        // });



        datos.forEach((x) => {
          if (x.idReunion == this.idReunion) {
            if(x.listaVisitantes!==null){
              x.listaVisitantes.forEach( lista=>{
                if( lista.idVisitante==this.idVisitante){
                  this.listaVisitantes=lista;
                //  console.log(this.listaVisitantes)
                }
              });
            }
          }
        });

        // console.log('la reunión es : ', ss);
        // console.log('la reunión ssssses : ', reunion);

        //  let dd: number = datos.findIndex( (x)=> x.idReunion === this.datosVisitante.idReunion );

        // console.log('paso por aui');
        //   if(dd === -1){
        //   this.router.navigate(['/home']);
      }
    });
  }
}
