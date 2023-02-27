import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CancelReuni, DtosReunion } from 'src/app/logged/modelos/dtosReunion';
import { AppService } from 'src/app/seguridad/servicios/app.service';

@Component({
  templateUrl: './list-reunion-user.component.html',
  styleUrls: ['./list-reunion-user.component.css']
})
export class ListReunionUserComponent implements OnInit {

  dialogRef;
  cancelformGroup: FormGroup;
  datosReunion: DtosReunion[];
  errores: string='';
  cargando: boolean= false;
  constructor(private servicioGeneral: AppService, private dialog : MatDialog,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.cargarListaReuniones();

  }


  cargarListaReuniones(){
    this.cargando=true;
    this.servicioGeneral.getListReunionXuser().subscribe(x=>{
      this.cargando=false;
      this.datosReunion=x;
    },err=>{
      this.cargando=false;
      this.errores=err.message;


      //this.formSubmitted = false;
    });
  }


  eliminarReunion(idreunion){
    this.cargando=true;

    this.servicioGeneral.delReunion(idreunion).subscribe(()=>{

      this.cargarListaReuniones();

    },err=>{
      this.cargando=false;
      this.errores=err.message;
    });
  }


 cancelReu(templateRef){
    //cancelReunion

    this.cancelformGroup = this.formBuilder.group({
      mcancel:['',[Validators.required]],

    });

    this. dialogRef=this.dialog.open(templateRef,{
      width:'250px',
      // height: '250px'
    })

    this. dialogRef.afterClosed().subscribe(result=>{
      console.log('dialog cerrado');
    });



      // var can=new CancelReuni
      // can.id=idreunion;
      // can.mcancel='Prueba de cancelación';

    //  this.servicioGeneral.cancelReunion(can).subscribe(()=>{

    //   this.cargarListaReuniones();

    //  },err=>{
    //   this.errores=err.message;
    //  })

  }

 onSubmit(idreunion){


  var can=new CancelReuni
  can.id=idreunion;
  can.mcancel=this.cancelformGroup.controls['mcancel'].value;



  console.log(  'CAAAAAAAAAAAA',  can);


     this.servicioGeneral.cancelReunion(can).subscribe(()=>{
      this.dialogRef.close();
     this.cargarListaReuniones();

     },err=>{
     this.errores=err.message;
     })
 }

//  abrirDialog(templateRef){

//  }

}
