import { MatListModule } from '@angular/material/list';
import { SeguridadModule } from './../seguridad/seguridad.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuariosLIneaComponent } from './componentes/generales/usuarios-linea/usuarios-linea.component';
import { PrincipalComponent } from './componentes/generales/principal/principal.component';
import { NavigationComponent } from './componentes/generales/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListReunionesComponent } from './componentes/app/Reunion/list-reuniones/list-reuniones.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddVisitanteComponent } from './componentes/app/Visitante/add-visitante/add-visitante.component';
import { TablaEquiposVisitantesComponent } from './componentes/app/Visitante/tabla-Equiposvisitantes/tabla-Equiposvisitantes.component';
import{MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEquipoComponent } from './componentes/app/Visitante/add-equipo/add-equipo.component';
import { ReunionesComponent } from './componentes/app/Reunion/reuniones/reuniones.component';
import { EquiposComponent } from './componentes/app/Visitante/equipos/equipos.component';
import { DetallesVisitanteComponent } from './componentes/app/Visitante/detalles-visitante/detalles-visitante.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddReunionComponent } from './componentes/app/Reunion/add-reunion/add-reunion.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListReunionUserComponent } from './componentes/app/Reunion/list-reunion-user/list-reunion-user.component';
import { FormularioComponent } from './componentes/app/formulario/formulario.component';
import { CardComponent } from './componentes/generales/card/card.component';


@NgModule({
  declarations: [
    UsuariosLIneaComponent,
    PrincipalComponent,
    NavigationComponent,
    ListReunionesComponent,
    AddVisitanteComponent,
    TablaEquiposVisitantesComponent,
    AddEquipoComponent,
    ReunionesComponent,
    EquiposComponent,
    DetallesVisitanteComponent,
    AddReunionComponent,
    ListReunionUserComponent,
    FormularioComponent,
    CardComponent,
    ],
  imports: [
    BrowserModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    SeguridadModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,


    // ReactiveFormsModule,
    FormsModule
    // MatFormFieldModule,

  ],
  exports:[MatTableModule]

})
export class LoguedModule { }
