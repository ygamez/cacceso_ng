import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/seguridad/servicios/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  texto: string;
  ruta: string;
  // funcion?: any;
}
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}



export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent  implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // usuarioLogueado=false;
  inline : boolean=false;
  _tipoUser:string;
  fullNAme: string;

  public menuItems: any[];
  public isCollapsed = true;

  templateMenu: MenuItem[] = [
    // {
    //   texto: 'Crear reunión',
    //   ruta: '/home/addEditReunion'
    // },
    {
      texto: 'Reuniones creadas',
      ruta: '/home/listreunionuser'
    },
    {
      texto: 'Usuarios en linea',
      ruta: '/home/userlinea'
    },
    // {
    //   texto: 'Formulario',
    //   ruta: '/home/formulario'
    // },
  ];

  constructor(private breakpointObserver: BreakpointObserver,private aut: AuthenticationService ,private route: ActivatedRoute,private router: Router,) {

    //  console.log( 'constructorrrr   tipo user ' , this._tipoUser  )

  }

  ngOnInit(): void {

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

    this.getFullNAme();
    this.inline=this.aut.isLoggedIn('');
    this.aut.changeLoginStatus$.subscribe((logue)=>{

     // console.log( 'LOGIN STATUSSSSS DESDE NAVIGATION ',logue);

      this.inline = logue;

    });


      this.route.data.subscribe((x)=>{
         // console.log('LO QUE VIENE DEL SERVICIO TIPOUSER', JSON.stringify( x['valor']));

           this._tipoUser= JSON.stringify(x['valor']);


           if(this._tipoUser==='1'){
            this.router.navigate(['/home/reuniones']);
           }

          //console.log('tipo de usuario variable ' , this._tipoUser)
      }) ;


      //console.log('ya pase primero')

      // this._tipoUser=  this.aut.getTipoUsuario();
    // this.aut.tipoUserSubject$.subscribe((tipoUser)=>{
    //     this._tipoUser=tipoUser;

    //     console.log('TIPO de USER aaaaaa' , this._tipoUser )

    // });

    // window.addEventListener<"storage">('storage',(x)=>{
    //   console.log('cambioooooooooooooooo',x);
    // },false)






  }


  private getFullNAme(){
      this.fullNAme= this.aut.getFullNAme();
  }

  logout(){
    //  console.log(  this.breakpointObserver.observe(''));
     this.isHandset$.subscribe((x)=>{

      // console.log( 'la xxx',  x)

     } );
      this.aut.logout();
   }

}
