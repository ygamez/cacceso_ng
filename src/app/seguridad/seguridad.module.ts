import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
 import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HoraValidatorsDirective } from './validators/hora-validators.directive';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    LoginComponent,
    HoraValidatorsDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
    MatDialogModule

  ],
  exports:[
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
    MatDialogModule
  ]
})
export class SeguridadModule { }
