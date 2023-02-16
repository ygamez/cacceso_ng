import { SeguridadModule } from './seguridad/seguridad.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthInterceptor } from './seguridad/interceptor/authinterceptor';
import { LoguedModule } from './logged/logued.module';
import { ErrorInterceptor } from './seguridad/interceptor/error.interceptor';

// import { SignalRModule } from 'ng2-signalr';
// import { SignalRConfiguration } from 'ng2-signalr';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SeguridadModule,
    LoguedModule,
    HttpClientModule,
  ],
  exports: [ SeguridadModule],
  providers: [
    {provide: LocationStrategy,useClass:HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true}


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
