import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EGRESOS_ROUTES } from './egresos-routes';
//interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//componentes del modulo
//import { TokenInterceptor } from '../token.interceptor';
import { PipesModule } from '../../services/pipes/pipes.module';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { TreeTableModule } from 'ng-treetable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '../modals.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { EgresosComponent } from './pages/egresos/egresos.component';
import { NuevoEgresoComponent } from './pages/egresos/modals/nuevo-egreso/nuevo-egreso.component';
import { PrevisualizacionNuevoEgresoComponent } from './pages/egresos/modals/nuevo-egreso/previsualizacion-nuevo-egreso/previsualizacion-nuevo-egreso.component';
import { ConfirmarNuevoEgresoComponent } from './pages/egresos/modals/confirmar-nuevo-egreso/confirmar-nuevo-egreso.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { EditarEgresoComponent } from './pages/egresos/modals/editar-egreso/editar-egreso.component';
import { EditarDocumentoEgresoComponent } from './pages/egresos/modals/editar-documento-egreso/editar-documento-egreso.component';
import { PrevisualizarActualizarEgresoComponent } from './pages/egresos/modals/editar-egreso/previsualizar-actualizar-egreso/previsualizar-actualizar-egreso.component';
import { PrevisualizarDocumentoEgresoActualizadoComponent } from './pages/egresos/modals/editar-documento-egreso/previsualizar-documento-egreso-actualizado/previsualizar-documento-egreso-actualizado.component';
import { PagosDocumentoEgresoComponent } from './pages/egresos/modals/pagos-documento/pagos-documento.component';
import { FechaEstimadaComponent } from './pages/egresos/modals/fecha-estimada/fecha-estimada.component';
 import { FilterPipe } from '../../services/pipes/filter.pipe';
import { FilterEgresoPipe } from '../../services/pipes/filter-egreso.pipe';
import { GlobalInterceptor } from '../../global.interceptor';
  
@NgModule({
  imports: [
    CommonModule,
    EGRESOS_ROUTES,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    HttpClientModule,
    PipesModule,
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule,
    ModalsModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    NgSelectModule,
    BsDatepickerModule,
    DatePickerModule,
  

  ],
  declarations: [
  EgresosComponent,
  NuevoEgresoComponent,
  PrevisualizacionNuevoEgresoComponent,
  ConfirmarNuevoEgresoComponent,
  EditarEgresoComponent,
  EditarDocumentoEgresoComponent,
  PrevisualizarActualizarEgresoComponent,
  PrevisualizarDocumentoEgresoActualizadoComponent, 
   PagosDocumentoEgresoComponent,
  FechaEstimadaComponent,
  FilterEgresoPipe
 ],
  exports: [
    BsDatepickerModule,
    FilterEgresoPipe
  ],
  entryComponents: [
    NuevoEgresoComponent,
    PrevisualizacionNuevoEgresoComponent,
    ConfirmarNuevoEgresoComponent,
    EditarEgresoComponent,
    EditarDocumentoEgresoComponent,
    PrevisualizarActualizarEgresoComponent,
    PrevisualizarDocumentoEgresoActualizadoComponent,
    PagosDocumentoEgresoComponent,
    FechaEstimadaComponent
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true,
        
      },
      DatePipe,
    ],
})
export class EgresosModule { }
