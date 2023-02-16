export interface JwtRespuesta {
  token:string;
  usuario: usuario;

}
export interface usuario {
  fullName:string;
  Usuario: string
  tipo: string;
}
