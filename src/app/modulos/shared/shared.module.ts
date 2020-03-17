import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Pipes
import { PipesModule } from '../../services/pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { TokenInterceptor } from '../pages/token.interceptor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

 import { ClienteService } from '../../services/cliente/cliente.service';
import { NuevoClienteEntradasComponent } from '../entradas/pages/entradas/modals/nuevo-ingreso/nuevo-cliente/nuevo-cliente.component';
import { DatosAdicionalesService } from '../../services/datosadicionales/datosadicionales.service';
import { SettingComponent } from './setting/setting.component';
import { GlobalInterceptor } from '../../global.interceptor';
import { DashBoardService } from '../../services/ModulosService/dashboard.service';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NuevoClienteComponent } from '../administracion/pages/cliente/modals/nuevo-cliente/nuevo-cliente.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        NgSelectModule,
        NgbModule,
        BsDatepickerModule,
        DatePickerModule,
        // tslint:disable-next-line: deprecation
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
          
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        SettingComponent,
        BreadcrumbsComponent,
        NuevoClienteComponent,
        NuevoClienteEntradasComponent
    ],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        SettingComponent,
        SidebarComponent,
        NuevoClienteComponent,
        NuevoClienteEntradasComponent
    ],    
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true
      },
      NgbActiveModal,
      ClienteService,
      DashBoardService,
      DatosAdicionalesService
    ],
    entryComponents: [
       NuevoClienteComponent,
      NuevoClienteEntradasComponent
    ]
})
export class SharedModule { }
