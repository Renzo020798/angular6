import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SEGURIDAD_ROUTES } from './seguridad-routes';

//interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


//componentes del modulo
// import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { PaginaService } from '../../services/pagina/pagina.service';
import { TreeTableModule } from 'ng-treetable';

import { Ng2SmartTableModule } from 'ng2-smart-table';
//import { CuentaService } from './services/cuenta/cuenta.service';
import { CentroCostoService } from '../../services/centroCosto/centroCosto.service';
//import { CuentaService } from '../services/cuentas/cuenta.service';


import { EmpresaService } from '../../services/empresa/empresa.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '../modals.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ClienteService } from '../../services/cliente/cliente.service';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { TipocobroService } from '../../services/tipocobro/tipocobro.service';
import { TipooperacioningresoService } from '../../services/tipooperacioningreso/tipooperacioningreso.service';
import { ValoresInicialesService } from '../../services/valores-iniciales/valores-iniciales.service';
import { TipooperacionegresoService } from '../../services/tipooperacionegreso/tipooperacionegreso.service';

import { DatosAdicionalesService } from '../../services/datosadicionales/datosadicionales.service';
import { GlobalInterceptor } from '../../global.interceptor';
import { UsuarioService } from '../../services/service.index';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { NuevaEmpresaComponent } from './pages/empresa/modals/nueva-empresa.component';
import { TipoCobroComponent } from './pages/tipo-cobro/tipo-cobro.component';
import { NuevoTipocobroComponent } from './pages/tipo-cobro/modals/nuevo-tipocobro/nuevo-tipocobro.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CargarExcelClienteComponent } from './pages/cliente/modals/cargar-excel-cliente/cargar-excel-cliente.component';
import { CentroCostosComponent } from './pages/centro-costos/centro-costos.component';
import { RegistrarCtaComponent } from './pages/centro-costos/modals/registrar-cta/registrar-cta.component';
import { ConfirmarCentroCostoComponent } from './pages/centro-costos/modals/confirmar-centro-costo/confirmar-centro-costo.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { NuevaCuentaComponent } from './pages/cuenta/modals/nueva-cuenta.component';
import { DatosadicionalesComponent } from './pages/datosadicionales/datosadicionales.component';
import { NuevoDatosacidicionalesComponent } from './pages/datosadicionales/nuevo-datosacidicionales/nuevo-datosacidicionales.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { TipoOperacionIngresoComponent } from './pages/tipo-operacion-ingreso/tipo-operacion-ingreso.component';
import { NuevoTipoOperacionIngresoComponent } from './pages/tipo-operacion-ingreso/modals/nuevo-tipo-operacion-ingreso/nuevo-tipo-operacion-ingreso.component';
import { HistoricoDatosadicionalesComponent } from './pages/datosadicionales/historico-datosadicionales/historico-datosadicionales.component';
import { TipoOperacionEgresoComponent } from './pages/tipo-operacion-egreso/tipo-operacion-egreso.component';
import { NuevoTipoOperacionEgresoComponent } from './pages/tipo-operacion-egreso/nuevo-tipo-operacion-egreso/nuevo-tipo-operacion-egreso.component';
import { AdicionarDatosadicionalesComponent } from './pages/datosadicionales/nuevo-datosacidicionales/adicionar-datosadicionales.component';
import { AdicionarDatosComponent } from './pages/empresa/modals/adicionar-datos.component';
import { PorcentajeTipoVentaComponent } from './pages/centro-costos/modals/porcentaje-tipo-venta/porcentaje-tipo-venta.component';
import { NuevaDepreciacionDatosadicionalesComponent } from './pages/datosadicionales/nueva-depreciacion-datosadicionales/nueva-depreciacion-datosadicionales.component';
import { NuevoEmpleadoComponent } from './pages/empleado/modals/nuevo-empleado.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { NuevoCentroCostosComponent } from './pages/centro-costos/modals/nuevo-centro-costos/nuevo-centro-costos.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { NuevoPerfilComponent } from './pages/perfiles/modals/nuevo-perfil/nuevo-perfil.component';



// import { TipoCobroComponent } from './pages/tipo-cobro/tipo-cobro.component';
// import { TipocobroService } from './services/tipocobro/tipocobro.service';
// import { NuevoTipocobroComponent } from './pages/tipo-cobro/modals/nuevo-tipocobro/nuevo-tipocobro.component';
// import { NuevoTipodocumentoComponent } from './pages/tipo-documento/nuevo-tipo-documento/nuevo-tipo-documento.component';
// import { TipoDocumentoService } from './services/tipodocumento/tipo-documento.service';
// import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { PerfilService } from '../../services/Perfil/perfil.service';
import { AgregarPermisosPaginaComponent } from './pages/perfiles/modals/agregar-permisos-pagina/agregar-permisos-pagina.component';
import { ParametroComponent } from './pages/parametro/parametro.component';
    
@NgModule({
  imports: [
    CommonModule,
    SEGURIDAD_ROUTES,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    // tslint:disable-next-line: deprecation
    HttpClientModule,
    PipesModule,
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule,
    ModalsModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    SharedModule
  ],
  declarations: [

    EmpresaComponent,
    NuevaEmpresaComponent,
    TipoCobroComponent,
    NuevoTipocobroComponent,
    ClienteComponent,
  //  NuevoClienteComponent,
    CargarExcelClienteComponent,
    CentroCostosComponent,
    NuevoCentroCostosComponent,
    RegistrarCtaComponent,
    ConfirmarCentroCostoComponent,
    CuentaComponent,
    NuevaCuentaComponent,
    DatosadicionalesComponent,
    NuevoDatosacidicionalesComponent,
     ReportesComponent,
    TipoCobroComponent,
    NuevoTipocobroComponent,
    TipoOperacionIngresoComponent,
    NuevoTipoOperacionIngresoComponent,
    HistoricoDatosadicionalesComponent,
    TipoOperacionEgresoComponent,
    NuevoTipoOperacionEgresoComponent,
    AdicionarDatosadicionalesComponent,
    AdicionarDatosComponent,
    PorcentajeTipoVentaComponent,
    NuevaDepreciacionDatosadicionalesComponent,
    NuevoEmpleadoComponent,
    EmpleadoComponent,
    PerfilesComponent,
    NuevoPerfilComponent,
    AgregarPermisosPaginaComponent,
    ParametroComponent,
     
  ],


  exports: [
   // NuevoClienteComponent
    
  ],
  entryComponents: [
    NuevaEmpresaComponent,
    NuevoTipocobroComponent,
    // NuevoTipodocumentoComponent,
  //  NuevoClienteComponent,
    CargarExcelClienteComponent,
    NuevoCentroCostosComponent,
    RegistrarCtaComponent,
    ConfirmarCentroCostoComponent,
    NuevaCuentaComponent,
    NuevoDatosacidicionalesComponent,
    HistoricoDatosadicionalesComponent,
    NuevoTipocobroComponent,
    NuevoTipoOperacionIngresoComponent,
  AdicionarDatosadicionalesComponent,
    NuevoTipoOperacionEgresoComponent,
    PorcentajeTipoVentaComponent,
    NuevaDepreciacionDatosadicionalesComponent,
    AdicionarDatosComponent,
    NuevoEmpleadoComponent,
    NuevoPerfilComponent,
    AgregarPermisosPaginaComponent
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true,
        
      },
      PaginaService,
      DatePipe,
      EmpresaService,
      UsuarioService,
      ClienteService,
      CuentaService,
      CentroCostoService,
      ReportesService,
      TipocobroService,
      TipooperacioningresoService,
      DatosAdicionalesService,
      TipocobroService,
      TipooperacionegresoService,  
      ValoresInicialesService,
      PerfilService
    ],
    //    DatosAdicionalesService,
    //    TipocobroService,
    //    TipoDocumentoService
    //  ],
  })
export class SeguridadModule { }
