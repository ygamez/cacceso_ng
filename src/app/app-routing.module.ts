import { ListReunionUserComponent } from './logged/componentes/app/Reunion/list-reunion-user/list-reunion-user.component';
import { AddReunionComponent } from './logged/componentes/app/Reunion/add-reunion/add-reunion.component';
import { DetallesVisitanteComponent } from './logged/componentes/app/Visitante/detalles-visitante/detalles-visitante.component';
import { EquiposComponent } from './logged/componentes/app/Visitante/equipos/equipos.component';

import { AddEquipoComponent } from './logged/componentes/app/Visitante/add-equipo/add-equipo.component';

import { AddVisitanteComponent } from './logged/componentes/app/Visitante/add-visitante/add-visitante.component';
import { RecepAuthGuard } from './seguridad/guard/recep-auth.guard';
import { ListReunionesComponent } from './logged/componentes/app/Reunion/list-reuniones/list-reuniones.component';
import { NavigationComponent } from './logged/componentes/generales/navigation/navigation.component';
import { UsuariosLIneaComponent } from './logged/componentes/generales/usuarios-linea/usuarios-linea.component';
import { Authguard } from './seguridad/guard/authguard';
import { NoAuthGuard } from './seguridad/guard/no-auth.guard';

import { LoginComponent } from './seguridad/componentes/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationResolver } from './seguridad/guard/navigation.resolver';
import { ReunionesComponent } from './logged/componentes/app/Reunion/reuniones/reuniones.component';
import { UserAuthGuard } from './seguridad/guard/user-auth.guard';
import { FormularioComponent } from './logged/componentes/app/formulario/formulario.component';

const routes: Routes = [

  {
    path: '',
    redirectTo : 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    canActivate:[NoAuthGuard],
    component:LoginComponent
  }
  ,
  {
    path: 'home',
    canActivate:[Authguard],
    component : NavigationComponent,
    // resolve:{ valor: NavigationResolver},
    children: [
       {
           path:'userlinea',
          //  canActivate:[Authguard],
           component: UsuariosLIneaComponent
       },
       {
          path:'addEditReunion',
          // canActivate:[Authguard,UserAuthGuard],
          component: AddReunionComponent
       },
       {
          path:'formulario',
          // canActivate:[Authguard,UserAuthGuard],
          component: FormularioComponent
       },
       {
        path:'addEditReunion/:idReunion',
        // canActivate:[Authguard,UserAuthGuard],
        component: AddReunionComponent
       },
       {
        path:'listreunionuser',
        // canActivate:[Authguard,UserAuthGuard],
        component: ListReunionUserComponent
       },
        {
          path:'reuniones',
          // canActivate:[Authguard,RecepAuthGuard],
          component: ReunionesComponent,
          children:[
            {
              path:'',
              // canActivate:[Authguard,RecepAuthGuard],
              component:ListReunionesComponent,
             },
             {
              path:':idReunion/:idVisitante/detallesVisitante',
              // canActivate:[Authguard,RecepAuthGuard],
              component:DetallesVisitanteComponent
             },
             {
              path: ':idReunion/addEditVisitante',
              // canActivate:[Authguard,RecepAuthGuard],
              component: AddVisitanteComponent,
              children:[{
                path:'',
                // canActivate:[Authguard,RecepAuthGuard],
                component:EquiposComponent,
              }]
             },
             {
              path: ':idReunion/addEditVisitante/:idVisitante',
              // canActivate:[Authguard,RecepAuthGuard],
              component: AddVisitanteComponent,
              children:[{
                path:'',
                // canActivate:[Authguard,RecepAuthGuard],
                component:EquiposComponent,
              }]
             },
          ]
        },
    ]
  },
  {
    path:'**',
    redirectTo : 'login',
    pathMatch: 'full'

 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
