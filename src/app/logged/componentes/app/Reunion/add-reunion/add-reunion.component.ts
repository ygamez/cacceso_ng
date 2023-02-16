import { DtosReunion } from 'src/app/logged/modelos/dtosReunion';
import { Direccion } from './../../../../modelos/direccion';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/seguridad/servicios/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { horaValidators } from 'src/app/seguridad/validators/hora-validators.directive';
import { ReturnStatement, ThisReceiver } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import{DatePipe}from '@angular/common'




@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css'],
  providers: [DatePipe]
})
export class AddReunionComponent implements OnInit {

  direcciones: Direccion [];
  errores: string;
  formSubmitted: boolean = false; // para saber que se esta procesando el formulario(click al botón aceptar)
  selectDir:number;
  regitroformGroup: FormGroup;
  titulo:string ='Agregar reunión';
  datosReunion:DtosReunion;
  IdReunion:number=0;


  constructor(private servicioGeneral: AppService,
     private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private miDatePipe:DatePipe
      ) {

  }

  ngOnInit(): void {

    this.cargarNomenclador();
    this.validandoInicio();
    this.cargarForm();

  }


  validandoInicio(){
    this.route.paramMap.subscribe((params) => {
      if (params.has('idReunion')){
        this.IdReunion=Number(params.get('idReunion'));

        this.titulo ='Modificar reunión';
        this.servicioGeneral.getListReunionXuser().subscribe(x=>{
          let listaReunion: DtosReunion[];
          listaReunion  =x;

          if(listaReunion.length > 0){
            this.datosReunion=listaReunion.find(x=> x.idReunion===this.IdReunion);

           // console.log('DATOS REUNIÓN principio', this.datosReunion);

           // convertir fecha
            let datosReunionFecha = this.datosReunion.fecha.split('/')

            let fecha =  String((Number(datosReunionFecha[2]) + '-'+  Number(datosReunionFecha[1])  + '-'+ Number(datosReunionFecha[0])))


            this.regitroformGroup.controls['IdDireccion'].setValue(this.datosReunion.idDireccion);
            this.regitroformGroup.controls['tema'].setValue(this.datosReunion.tema);
            this.regitroformGroup.controls['fecha'].setValue(fecha);
            this.regitroformGroup.controls['hora'].setValue(this.datosReunion.hora);

          }

        },err=>{

          this.errores=err.message;

        });
      }
    });
  }




  get hora(){
    return this.regitroformGroup.get('hora');
  }

  cargarNomenclador(){
    this.servicioGeneral.getAllDirecciones().subscribe( (direcc: Direccion [])=>{
      this.direcciones=direcc;

      //console.log('Las direcciones:',this.direcciones);
    });
  }

  cargarForm(){
    this.regitroformGroup = this.formBuilder.group({
      IdDireccion:['',[Validators.required]],
      tema:['',[Validators.required]],
      fecha:['',[Validators.required]],
      hora:['',[Validators.required ]]
      //hora:['',[Validators.required, horaValidators() ]]

     // organismo: ['', [Validators.required]],
    });
  }


  onSubmit(){

    //console.log('valores', this.regitroformGroup.value)


    if(this.regitroformGroup.valid){

      this.formSubmitted = true;


      if(this.IdReunion == 0){
        this.datosReunion=new DtosReunion();
      }




      this.datosReunion.idDireccion= this.regitroformGroup.controls['IdDireccion'].value;
      this.datosReunion.tema=this.regitroformGroup.controls['tema'].value;
      this.datosReunion.fecha=this.regitroformGroup.controls['fecha'].value;
      this.datosReunion.hora=this.regitroformGroup.controls['hora'].value;

     // console.log('DATOS REUNIÓN', this.datosReunion);


       this.servicioGeneral.saveReunion(this.datosReunion).subscribe(()=>{
         this.formSubmitted = false;
         this.router.navigate(['/home/listreunionuser']);

       },err=>{
         this.errores=err.message;
         this.formSubmitted = false;
       });

    }


  }

}
