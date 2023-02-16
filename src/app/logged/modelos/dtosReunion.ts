import { DtosVisitante } from "./dtosVisitante";

export class DtosReunion{

  idReunion:number;
  idDireccion:number;
  tema:string;
  fecha:string;
  hora:string;
  horaSali:string;
  // hasta aqui
  nomUsuarioResp: string;
  cancel: boolean;
  mcancel: string;

  direccion:string;

  listaVisitantes? : DtosVisitante[];

}

export class respoReunion{
  idUsuario:string;
}


export class  CancelReuni {
  id: number;
  mcancel : string;
}
