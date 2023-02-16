import { DpFu, DtosVisitante, Equipo } from '../../../../modelos/dtosVisitante';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { AppService } from 'src/app/seguridad/servicios/app.service';
import { soloNumeros } from 'src/app/seguridad/servicios/soloNum';



@Component({
  selector: 'app-add-visitante',
  templateUrl: './add-visitante.component.html',
  styleUrls: ['./add-visitante.component.css'],
})
export class AddVisitanteComponent implements OnInit, OnDestroy {
  regitroformGroup: FormGroup;
  formSubmitted: boolean = false; // para saber que se esta procesando el formulario(click al botón aceptar)
  ciSubmitted: boolean = false;
  ciOK: boolean = true;
  cargando: boolean=false;
  errores: string;
  titulo: string = 'Agregar visitante';
  // private userSubcription: Subscription;
  bloquear: boolean = true;
  agregandoEquipo: boolean = true;

  datosVisitante: DtosVisitante;
  dpFu: DpFu;
  datosEquipo: Equipo[] = [];
  nomostrar: boolean = false;
  // ruta: string;
  equipoAEliminar: Equipo;
  eventsSubjectEliminarEquipo: Subject<Equipo> = new Subject<Equipo>();
  EditarVisitante: boolean = false;

  constructor(
    private router: Router,
    private servicioGeneral: AppService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.datosVisitante = new DtosVisitante();
    //this.dpFu = new DpFu();
  }
  ngOnDestroy(): void {
    console.log('Destroy add-visitante');
  }

  ngOnInit(): void {
    this.regitroformGroup = this.formBuilder.group({
      organismo: ['', [Validators.required]],
      entidad: ['', Validators.required],
      fechaReg: [''], //se agrega en el servidor al guardar
      horaReg: [''], //se agrega en el servidor al guardar

      ci: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      nombre: ['', Validators.required],
      nombre2: [''],
      apellido1: ['', Validators.required],
      apellido2: [''],
    });

    // obtener el id reunión para agregarlo a la clase visitante
    this.route.paramMap.subscribe((params) => {
      if (params.has('idReunion')) {
       // console.log('el id que esta entrando', params.get('idReunion'));
        this.datosVisitante.idReunion = Number(params.get('idReunion'));
        // verificar si  la reunión con id ? existe
        this.servicioGeneral.listaReunionesSubject$.subscribe((datos) => {
          if (datos == null) {
            this.router.navigate(['/home']);
          } else {
            let dd: number = datos.findIndex(
              (x) => x.idReunion === this.datosVisitante.idReunion
            );

           // console.log('paso por aui', dd);
            if (dd === -1) {
              this.router.navigate(['/home']);
            } else {
              if (params.has('idVisitante')) {
                console.log(                  'el id visitante que esta entrando',                  params.get('idVisitante')
                );
                // this.datosVisitante.idReunion= Number(params.get('idVisitante'));
                this.EditarVisitante = true;
                this.titulo = 'Modificar Visitante';

                this.servicioGeneral.listaReunionesSubject$.subscribe(
                  (datos) => {
                    datos.forEach((x) => {
                      if (x.idReunion == Number(params.get('idReunion'))) {
                        if (x.listaVisitantes !== null) {
                          x.listaVisitantes.forEach((visitante) => {
                            if (
                              visitante.idVisitante ==
                              Number(params.get('idVisitante'))
                            ) {
                              // this.listaVisitantes=lista;
                              // console.log(this.listaVisitantes)
                              this.datosVisitante = visitante;
                              this.datosEquipo =this.datosVisitante.listaEquipos;





                              this.ciOK = false;
                              this.agregandoEquipo = false;

                              // console.log('EL VIST', this.datosVisitante );
                              this.agregarDatosAControles();
                              // agregar los datos a los controles
                            }
                          });
                        }
                      }
                    });
                  }
                );
              }
            }
          }
        });
      }
    });
    this.disableControles();
  }

  agregarDatosAControles() {

    this.regitroformGroup.controls['organismo'].setValue(
      this.datosVisitante.organismo
    );
    this.regitroformGroup.controls['entidad'].setValue(
      this.datosVisitante.entidad
    );

    this.regitroformGroup.controls['ci'].setValue(
      this.datosVisitante.dpersonales.ci
    );
    this.regitroformGroup.controls['nombre'].setValue(
      this.datosVisitante.dpersonales.nombre
    );
    this.regitroformGroup.controls['nombre2'].setValue(
      this.datosVisitante.dpersonales.nombre2
    );
    this.regitroformGroup.controls['apellido1'].setValue(
      this.datosVisitante.dpersonales.apellido1
    );
    this.regitroformGroup.controls['apellido2'].setValue(
      this.datosVisitante.dpersonales.apellido2
    );
  }

  ciOnBlur() {
    //console.log('se disparo ');
    //this.regitroformGroup.controls['nombre'].setValue('Geovany')
  }

  SoloNumeros(e) {
    return soloNumeros(e);
  }

  disableControles() {
    this.regitroformGroup.controls['nombre'].disable();
    this.regitroformGroup.controls['nombre2'].disable();
    this.regitroformGroup.controls['apellido1'].disable();
    this.regitroformGroup.controls['apellido2'].disable();
  }

  // buscar ci ficUnica
  buscarCi() {
    // para desactivar el botón de buscar ci mientras  mientras esta buscandolo.
    this.ciSubmitted = true;
    // para activar el botón guardar
    this.ciOK = true;
    this.agregandoEquipo = true;

    // let temci=this.dpFu.ci;

    this.servicioGeneral
      .getFu(this.regitroformGroup.controls['ci'].value)
      .subscribe(
        (datos: DpFu) => {
          if (datos) {
           // console.log('datos fu', datos);

            this.dpFu = datos;

            // if(temci!== this.dpFu.ci){
            //   this.datosVisitante.idVisitante=0;
            // }

            this.regitroformGroup.controls['ci'].setValue(datos.ci);
            this.regitroformGroup.controls['nombre'].setValue(datos.nombre);
            this.regitroformGroup.controls['nombre2'].setValue(datos.nombre2);
            this.regitroformGroup.controls['apellido1'].setValue(datos.apellido1);
            this.regitroformGroup.controls['apellido2'].setValue(datos.apellido2 );

            // console.log('datos fu', this.dpFu);
            // console.log('datos fu', this.dpFu.ci);

            this.ciSubmitted = false;
            this.ciOK = false;
            this.agregandoEquipo = false;
          }
        },
        (error) => {
          // error , falta crear propiedad
          this.errores=error;
          this.ciSubmitted = false;
          this.ciOK = false;
          this.agregandoEquipo = false;
        }
      );

  }
  //67100112231
  addData() {
    this.agregandoEquipo = true;
    this.nomostrar = true;
  }

  removeData() {



    if(this.equipoAEliminar.idEquipo !== undefined){

      this.servicioGeneral.delEquipo(this.equipoAEliminar.idEquipo).subscribe(()=>{

        this.eventsSubjectEliminarEquipo.next(this.equipoAEliminar);

      });

    }
    else{
      this.eventsSubjectEliminarEquipo.next(this.equipoAEliminar);
    }


    // llamar el servicio de borrado por el id y eliminar el elemento  de la lista;
  }

  elObjetoEquipo(datos: Equipo) {
    this.nomostrar = false;
    this.agregandoEquipo = false;
    this.datosEquipo.push(datos);
  }

  onSubmit() {
    // this.formSubmitted=true;
    // this.ruta=  this.router.url.substring(0, this.router.url.lastIndexOf('/') );
    // this.ruta=this.ruta.substring(0,this.ruta.lastIndexOf('/'));
    // console.log('rutassssssssssssssssssssssss',   this.ruta);


      this.datosVisitante.organismo =this.regitroformGroup.controls['organismo'].value;
      this.datosVisitante.entidad =this.regitroformGroup.controls['entidad'].value;

      if(this.dpFu!=null){
          this.datosVisitante.dpersonales =this.dpFu
      }

      this.datosVisitante.listaEquipos = this.datosEquipo;

        // para desactivar el botón de buscar ci mientras  mientras esta buscandolo.
        this.ciSubmitted = true;
        // para activar el botón guardar
        this.ciOK = true;
        this.agregandoEquipo = true;
        this.cargando=true;

      this.servicioGeneral.saveVisitante(this.datosVisitante).subscribe(
        () => {
          // si todo esta bien , navego para la lista de reuniones.
          this.cargando=false;
          this.router.navigate(['/home/reuniones']);



        },
        (er) => {
          this.errores=er;
          this.cargando=false;
          this.ciSubmitted = false;
          this.ciOK = false;
          this.agregandoEquipo = false;
        //  console.log('El error', er);
        }
      );


  }

  onClickHandler(valor: Equipo) {
   // console.log('manejador de evento click en el padreeee ', valor);
    this.equipoAEliminar = valor;

    // this.nomostrar = false;
    // this.agregandoEquipo = false;
  }
}
