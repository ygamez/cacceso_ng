import { Direccion } from '../../../../modelos/direccion';
import { Router } from '@angular/router';
import { AppService } from '../../../../../seguridad/servicios/app.service';
import { DtosReunion } from '../../../../modelos/dtosReunion';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DtosVisitante } from 'src/app/logged/modelos/dtosVisitante';
import { AuthenticationService } from 'src/app/seguridad/servicios/authentication.service';
// import { AuthenticationService } from 'src/app/seguridad/servicios/authentication.service';

@Component({
  selector: 'app-list-reuniones',
  templateUrl: './list-reuniones.component.html',
  styleUrls: ['./list-reuniones.component.css']
})
export class ListReunionesComponent implements OnInit,OnDestroy {

  datosReunion: DtosReunion[];
  panelOpenState = true;
  cargando: boolean=false;
    // datosVisitante: DtosVisitante ;
  errores: string='';
  constructor(private servicioGeneral: AppService,private router: Router, private authe: AuthenticationService  ) { }




  ngOnInit(): void {

    this.buscarDatos();
    this.actualizarl();

  }


  actualizarl(){
    this.authe.actuCancelRe$.subscribe(()=>{
      this.errores='';
      this.datosReunion=null;
      this.buscarDatos();


     // this.authe.setActiCancelReunion(false);

     // console.log('lo manod yo lis-reuniones componente')


    })
  }


  buscarDatos(){

    this.cargando=true;
    this.servicioGeneral.getAllReunionesDelDia().subscribe((data)=>{
     // console.log('REUNIONESSSSSS', data);
       //console.log(data);
      // data.forEach((x:DtosReunion )=>{
      //  // console.log('Nombre de responsable', x.nomUsuarioResp)
      // })
      if(data!==null){
        this.datosReunion=data;
        this.servicioGeneral.setListaReunionesSubject(this.datosReunion);
        this.cargando=false;
      // console.log( 'Reunión con visitantes',this.datosReunion);
      }
      else{
        this.cargando=false;
        this.errores='No se encontraron reuniones registradas para hoy.';
       // this.router.navigate(['/home']);
      }

    },err=>{
        this.cargando=false;
        this.errores=err.message;

    });
  }


  ver(idReunion:number){
    //console.log('valor para llamar el componente idReunion addVisitante', idReunion);
    this.router.navigate(["home/reuniones",idReunion,'addEditVisitante' ]);
    // /home/1/addVisitante
  }


  actuHoraSaliVisitante(IdVisitante:number){
    this.servicioGeneral.actuHoraSaliVisitante(IdVisitante).subscribe();
    this.buscarDatos();

  }


  eliminarVisitante(idVisitante){
    this.servicioGeneral.delVisitante(idVisitante).subscribe( result=>{
      this.buscarDatos();
      // this.authe.setActiCancelReunion(true);
      // this.authe.setActiCancelReunion(false);
      // this.authe.setActiCancelReunion(true);
    },err=>{
      this.errores=err.message;
    });

    // preguntar confirmación de eliminación de registro


   /// this.router.navigate(['/home/reuniones']);
  }



  ngOnDestroy(): void {
   // console.log('cerrando ListReunionesComponent')
  }
}
