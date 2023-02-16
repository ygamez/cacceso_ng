import { AppService } from 'src/app/seguridad/servicios/app.service';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { timer } from 'rxjs';
import { Notifica } from 'src/app/logged/modelos/notifica';

const MSG = 'mensajes';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private hubConnection: HubConnection;
  private builder: HubConnectionBuilder;

  constructor(private servi: AuthenticationService) {
    if (this.servi.isLoggedIn('')) {
      this.connectionStart(this.servi.getToken());

    }
  }

  async connectionStart(accessToken: string): Promise<boolean> {
    this.builder = new HubConnectionBuilder();

    this.hubConnection = this.builder
      .withUrl(environment.backend + '/mensajes', {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // métodos de escuchas
    this.startEscuchaMetodos();



    // start hub
    this.hubConnection.start()
      .then(() => {
        //SIMULANDO ERROR AL CONECTAR AL HUB EN UN INICIO
        //throw new Error('sasasas');
          // ...
          // algo
        //this.startEscuchaMetodos();
      })
      .catch(() => {
        // console.log('no puedoooooooooooooo');
        if (this.servi.isLoggedIn('')) {
          this.servi.logout();
        }
        return false;
      });




    this.hubConnection.onreconnecting((error) => {
      // poner un cartel fuera de linea

      let souce = timer(2000, 2000);



      const subscribe = souce.subscribe((val) => {
        switch (this.hubConnection.state) {
          case signalR.HubConnectionState.Disconnected:
            // console.log('APAGO TODODDODODODOD');
            subscribe.unsubscribe();
            souce = null;
            this.hubConnection.stop();
            this.builder = null;
            this.servi.logout();
            break;
          case signalR.HubConnectionState.Connected:
            // poner cartel en linea
            // console.log('Connected');
            subscribe.unsubscribe();
            souce = null;
            this.servi.cambioStatus(true);
            break;
          case signalR.HubConnectionState.Reconnecting:
            // console.log('Reconnecting');
            this.servi.cambioStatus(false);

            // console.log('CAMBIO STATUS FALSE DESDE HUB')

            break;
        }
      });
    });
    return true;
  }

  connectionStop() {
    if(this.hubConnection !==undefined)
      this.hubConnection.stop();
  }

  // Método para iniciar la escucha de todos los mensajes.
  startEscuchaMetodos() {
    // Crear variable para guardar en una lista todos los mensajes que lleguen de los métodos
    // mensajeIn y ListamensajeIn;

    // escuchando el método mensajeIn(cuando es un mensaje)
    this.hubConnection.on('mensajeIn', (mensaje: Notifica) => {
      // console.log('mensaje entrante', mensaje);
      let mensajes: Notifica[];
      mensajes = [mensaje];
      // call método MensajeRecibido
      this.mensajesRecibidos(mensajes);
    });

    // escuchando el método ListamensajeIn(cuando son varios mensajes)
    this.hubConnection.on('ListamensajeIn', (mensajes: Notifica[]) => {
      // console.log('mensajes entrante', mensajes);
      // call método MensajeRecibido
      this.mensajesRecibidos(mensajes);
    });


    // escuchando el método ListaUserConnected(cuando entra o sale algún usuario)
    this.hubConnection.on('ListaUserConnected', (mensajes: string[] ) => {
        this.servi.setListUserConnectedSubject(mensajes)
    });

    this.hubConnection.on('cancelReunion',(mensaje: string)=>{
      this.servi.setActiCancelReunion(true);
      //console.log('lo manod yo mensaje service')
      //  console.log('CancelReunion --  mensaje entrante --', mensaje);
    });


  }

  // Enviando método MensajeRecibido
  private mensajesRecibidos(mensajes: Notifica[]) {

     let listaMensajes: number [] =[];

     mensajes.forEach(element => {
         listaMensajes.push(element.idNotifica);
     });

    this.hubConnection.invoke('MensajeRecibido', listaMensajes);

    // buscando mensajes en el localStorage
    let datos = this.getMsgLocalStorage();
     // si hay mensajes
    if (datos) {
      //anexo los mensajes nuevos al final
      mensajes.forEach(element => {

          // buscar si el elemento ya existe
         let valorBuscado= datos.find( (x)=>{
            if(x.idNotifica===element.idNotifica){
              return x;
            }
            return undefined;
         });

         if(!valorBuscado){
            element.recibido=true;
            // simulando que vieron el mensaje
            this.mensajesVistos(element);

            datos.push(element);
         }

        });

      // borrar la lista del localStorage
      this.deleteMsgLocalStorage();

      // guardo la nueva lista
      this.saveMsgLocalStorage(datos);

    }
    else{
      // guardo la nueva lista
      mensajes.forEach(element => {
        element.recibido=true;
      });
      this.saveMsgLocalStorage(mensajes);

    }
  }

  // Método para cuando se vea un mensaje, actualizar
  // la propiedad visto en la bd y enviar notificación de visto al remitente
  private mensajesVistos(mensaje: Notifica) {

      this.hubConnection.invoke('Mensajevisto', mensaje.idNotifica);

    // actualizar la propiedad visto del mensaje
    // que esta en el localstorage
    // ojoo
    // NO (y si estan manipulando la lista del storage?
    //RESOLVER LO DEL BLOQUEO PARA MANIPULAR LA LISTA CON SEGURIDAD)
  }

  saveMsgLocalStorage(mensajes: Notifica[]) {
    localStorage.setItem(MSG, JSON.stringify(mensajes));
  }

  deleteMsgLocalStorage() {
    localStorage.removeItem(MSG);
  }

  getMsgLocalStorage(): Notifica[] {
    return JSON.parse(localStorage.getItem(MSG));
  }
}
