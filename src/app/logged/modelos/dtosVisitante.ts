
export class DtosVisitante{

  idVisitante : number;
  idReunion: number ;
  organismo: string;
  entidad : string;
  fechaReg:string;
  horaReg:string;
  horaSali:string;
  dpersonales:DpFu;
  listaEquipos: Equipo[];
}

export class DpFu{
  ci: string;
  nombre:string;
  nombre2: string;
  apellido1:string;
  apellido2:string;
  fullnombre:string;

}

export class Equipo{
  idEquipo?:number;
  idVisitante?: number;
  tipoEquipo:string;
  numSerie:string;
}
