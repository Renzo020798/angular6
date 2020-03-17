import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


// Rutas
import { APP_ROUTES } from './app.routes';
// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './global.interceptor';
import {TreeTableModule} from "ng-treetable";
//modulos
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SidebarComponent } from './modulos/shared/sidebar/sidebar.component';
import { HeaderComponent } from './modulos/shared/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule , BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EntradasComponent } from './modulos/entradas/entradas.component';
import { EgresosComponent } from './modulos/egresos/egresos.component';
import { SharedModule } from './modulos/shared/shared.module';
import { PagesComponent } from './modulos/dashboard/pages.component';
import { SeguridadComponent } from './modulos/administracion/seguridad.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //modulos
    SeguridadComponent,
    EntradasComponent,
    EgresosComponent,
    PagesComponent,
 
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,        
        multi: true,        
        
      },
      SidebarComponent,
      HeaderComponent
  ],
  entryComponents: [
  ],
    bootstrap: [AppComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class AppModule { }
