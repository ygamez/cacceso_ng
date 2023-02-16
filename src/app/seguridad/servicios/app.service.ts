import { DpFu, DtosVisitante, Equipo } from './../../logged/modelos/dtosVisitante';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CancelReuni, DtosReunion } from 'src/app/logged/modelos/dtosReunion';
import { environment } from 'src/environments/environment';
import { DpFU } from 'src/app/logged/modelos/DpFU';
import { Direccion } from 'src/app/logged/modelos/direccion';

export class ConsultaFU{

  Ci:string;
   Nombre: string;
   SegundoNombre: string;
   Apellido1: string;
   Apellido2: string;
   token:""
}



@Injectable({
  providedIn: 'root'
})
export class AppService {


  public listaReunionesSubject = new BehaviorSubject<DtosReunion[]>([]);
  public listaReunionesSubject$ = this.listaReunionesSubject.asObservable();





  constructor( private http: HttpClient, private router : Router) {}

    

    setListaReunionesSubject(listaReuniones:DtosReunion[]){
        this.listaReunionesSubject.next(listaReuniones);
    }

    getAllReunionesDelDia(): Observable <DtosReunion []> {

         return this.http.get<DtosReunion []>(environment.backend  + '/Reunion/getReuDelDia');
    }


    getListReunionXuser(): Observable <DtosReunion []> {

      return this.http.get<DtosReunion []>(environment.backend  + '/Reunion/getListReunionXusern');
    }

    getAllDirecciones(): Observable <Direccion []>{
      return this.http.get<Direccion []>(environment.backend  + '/Reunion/getAllDirecc');
    }

    saveReunion(reunion: DtosReunion):Observable<any>{
      return this.http.post(environment.backend  + '/Reunion/addReunion',  JSON.stringify(reunion))
    }


    delReunion(idReunion: number):Observable<any>{
      return this.http.get(environment.backend  + '/Reunion/delReunion/'+idReunion);
    }


    saveVisitante( visitante: DtosVisitante):Observable<any> {

        // console.log( 'El visitante   ',JSON.stringify(visitante))
      return  this.http.post(environment.backend  + '/Visitante/addVisitante',  JSON.stringify(visitante))
    }

    getAllVisitantesXIdReunion( id: number):Observable<any> {
      return this.http.get<DtosVisitante []>(environment.backend  + '/Visitante/getxIdReunion/'+id);
    }


    delEquipo(idEquipo: number):Observable<any>{
      return this.http.get(environment.backend  + '/Visitante/delEquipo/'+idEquipo);
    }


    delVisitante(idVisitante: number):Observable<any>{
      return this.http.get(environment.backend  + '/Visitante/delVisitante/'+idVisitante);
    }



    actuHoraSaliVisitante(IdVisitante: number):Observable<any>{
      return this.http.get(environment.backend  + '/Visitante/actuHoraSaliVisitante/'+IdVisitante);
    }


    getFu(ci: string):Observable<DpFu>{
      return this.http.get<DpFu>(environment.backend  + '/PropGeneral/fu/'+ci);
    }


    cancelReunion( cancelR:CancelReuni ):Observable<any>{
      return  this.http.post(environment.backend  + '/Reunion/cancelReunion',cancelR )
    }


}
