import { Equipo } from '../../../../modelos/dtosVisitante';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-equipo',
  templateUrl: './add-equipo.component.html',
  styleUrls: ['./add-equipo.component.css']
})
export class AddEquipoComponent implements OnInit {

  formEquipo: FormGroup;
  formSubmitted: boolean = false; // para saber que se esta procesando el formulario(click al botón aceptar)
  errores: string;
  idCi:string;





  @Output()
  elEquipo =new EventEmitter<Equipo>();


  constructor(  private fb: FormBuilder,
    private route:ActivatedRoute, ) { }



  ngOnInit(): void {

    // obtener el ci
    this.route.paramMap.subscribe(
      params=>{
          if(params.has("ci")){
              console.log('el Ci que esta entrando',params.get('ci') );
              this.idCi=params.get('ci');
          }
      }
     );



    this.initForm();
  }

  initForm() {
    this.formEquipo = this.fb.group({
      tipoEquipo: new FormControl('', Validators.required),
      numSerie: ['', Validators.required],
    });
    // console.log(this.sha1.sync('hey there'))
  }

  onSubmit(values){

        console.log(values);

        let equipo= new Equipo();
        // equipo.ci= this.idCi;
        equipo.tipoEquipo=this.formEquipo.controls['tipoEquipo'].value;
        equipo.numSerie=this.formEquipo.controls['numSerie'].value;

        this.elEquipo.emit(equipo);
        // this.router.navigate([ this.ruta]);


  }
}
