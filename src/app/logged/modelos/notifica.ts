export class Notifica {
  idNotifica: number;
  NomUserRemitente: string;
  NomUserDestino:string;
  mensaje: string;
  recibido: boolean;
  visto: boolean;

  constructor(
    idnotifica: number,
    userRemitente: string,
    userDestino: string,
    mensaje: string,
    recibido: boolean,
    visto: boolean
  ) {
    this.idNotifica = idnotifica;
    this.NomUserRemitente = userRemitente;
    this.NomUserDestino=userDestino;
    this.mensaje = mensaje;
    this.recibido = recibido;
    this.visto = visto;
  }
}
