import { AppService } from 'src/app/seguridad/servicios/app.service';
import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { DpFu, DtosVisitante, Equipo } from 'src/app/logged/modelos/dtosVisitante';




@Component({
  selector: 'app-list-visitantes',
  templateUrl: './tabla-Equiposvisitantes.component.html',
  styleUrls: ['./tabla-Equiposvisitantes.component.css']
})
export class TablaEquiposVisitantesComponent implements OnInit,OnDestroy {

   private eventSubsCription: Subscription;
  // ciOK: boolean = true;

  // datosVisitante: DtosVisitante;
  // dpFu:DpFu;

  @Input()
  datosEquipo: Equipo []=[];

  @Input()
  events:Observable<Equipo>;

  @Output()
  onMouseClick = new EventEmitter<Equipo>();

  datasource= []


  displayedColumns: string[] = ['tipoEquipo', 'numSerie'];
  clickedRows = new Set<Equipo>();
    constructor() { }


  ngOnInit(): void {
    // cargando os datos
    this.datasource= [... this.datosEquipo];

    this.eventSubsCription = this.events.subscribe((x)=>{

      // console.log('el equipo a eliminar ', x);
      // console.log('los datos ',this.datosEquipo);
        var indice=   this.datosEquipo.indexOf(x);
        this.datosEquipo.splice(indice,1); // 1 es la cantidad de elementos a eliminar

        // actualizando los datos de la tabla
        this.datasource= [... this.datosEquipo];

        // console.log('los datos ya final ',this.datosEquipo);
        //this.clickedRows.delete(x);


    });
  }

  ngOnDestroy(): void {
    this.eventSubsCription.unsubscribe();
  }

  clicked(valor: Equipo){
   this.clickedRows = new Set<Equipo>();
   this.clickedRows.add(valor)

    // console.log('clikeddddd',valor);
    this.onMouseClick.emit(valor) ;
    // console.log('los equipossssss',this.datosEquipo);



  }

}




