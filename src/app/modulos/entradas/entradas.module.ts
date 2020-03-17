import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ENTRADAS_ROUTES } from './entradas-router';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntradasComponent } from './pages/entradas/entradas.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { EnvioCorreoComponent } from './pages/entradas/modals/envio-correo/envio-correo.component';
import { NuevoIngresoComponent } from './pages/entradas/modals/nuevo-ingreso/nuevo-ingreso.component';
import { PrevisualizacionNuevoIngresoComponent } from './pages/entradas/modals/nuevo-ingreso/previsualizacion-nuevo-ingreso/previsualizacion-nuevo-ingreso.component';
import { ConfirmarNuevoIngresoComponent } from './pages/entradas/modals/confirmar-nuevo-ingreso/confirmar-nuevo-ingreso.component';
import { EditarIngresoComponent } from './pages/entradas/modals/editar-ingreso/editar-ingreso.component';
import { EditarDocumentoIngresoComponent } from './pages/entradas/modals/editar-documento-ingreso/editar-documento-ingreso.component';
import { PrevisualizarActualizarIngresoComponent } from './pages/entradas/modals/editar-ingreso/previsualizar-actualizar-ingreso/previsualizar-actualizar-ingreso.component';
import { PrevisualizarEditarDocumentoIngrComponent } from './pages/entradas/modals/editar-documento-ingreso/previsualizar-editar-documento-ingr/previsualizar-editar-documento-ingr.component';
import { PagosDocumentoComponent } from './pages/entradas/modals/pagos-documento/pagos-documento.component';
import { FechaPagoEstimadaComponent } from './pages/entradas/modals/fecha-pago-estimada/fecha-pago-estimada.component';
import { FilterPipe } from '../../services/pipes/filter.pipe';
import { GlobalInterceptor } from '../../global.interceptor';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { NuevoInventarioComponent } from './pages/inventario/modals/nuevo-inventario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { GestionComponent } from './pages/gestion/gestion.component';
    
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ENTRADAS_ROUTES,
    PaginationModule.forRoot(),
    NgbModule,
    NgSelectModule,
    BsDatepickerModule,
    DatePickerModule,
    // tslint:disable-next-line: deprecation
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [
    EntradasComponent,
    EnvioCorreoComponent,
    NuevoIngresoComponent,
    PrevisualizacionNuevoIngresoComponent,
    ConfirmarNuevoIngresoComponent,
    EditarIngresoComponent,
    EditarDocumentoIngresoComponent,
    PrevisualizarActualizarIngresoComponent,
    PrevisualizarEditarDocumentoIngrComponent,
    PagosDocumentoComponent,
    FechaPagoEstimadaComponent,
    FilterPipe,
    InventarioComponent,
    NuevoInventarioComponent,
    ReportesComponent,  
    GestionComponent
     ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    NgbActiveModal,
  ],
  exports:[
    BsDatepickerModule,
    PagosDocumentoComponent,
    FilterPipe
  ],
  entryComponents: [ //aqui van declarados los modals
    EnvioCorreoComponent,
    NuevoIngresoComponent,
    PrevisualizacionNuevoIngresoComponent,
    ConfirmarNuevoIngresoComponent,
    EditarIngresoComponent,
    EditarDocumentoIngresoComponent,
    PrevisualizarActualizarIngresoComponent,
    PrevisualizarEditarDocumentoIngrComponent,
     PagosDocumentoComponent,
     FechaPagoEstimadaComponent,    
     NuevoInventarioComponent
     ],
})
export class EntradasModule { }
 