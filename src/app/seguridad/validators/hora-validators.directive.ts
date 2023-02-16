import { ValidatorFn } from '@angular/forms';
import { Time } from '@angular/common';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Timestamp } from 'rxjs';

export function horaValidators():ValidatorFn{

  return (control: AbstractControl) =>{
    const horaValidatorsDirective =new HoraValidatorsDirective();
    return horaValidatorsDirective.validate(control);
  }
}


@Directive({
  selector: '[horaValidators]',
  providers:[{provide: NG_VALIDATORS , useExisting:HoraValidatorsDirective,multi: true}]

})
export class HoraValidatorsDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors {

   let hora = Number(String(control.value).substring(0,2) );
   let horaIni=9;
   let horaFin=18;



    // console.log('la hora', hora);

    if (!(hora >= horaIni  && hora <= horaFin)){
      return { 'horaValidators':{'message':'Fuera de Horario. [09:00 - 18:00]'}}
    }

    // console.log('la hora' , hora);


    return null;
  }


}
