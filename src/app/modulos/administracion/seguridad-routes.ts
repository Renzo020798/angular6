import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CentroCostosComponent } from './pages/centro-costos/centro-costos.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { DatosadicionalesComponent } from './pages/datosadicionales/datosadicionales.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { TipoCobroComponent } from './pages/tipo-cobro/tipo-cobro.component';
import { TipoOperacionIngresoComponent } from './pages/tipo-operacion-ingreso/tipo-operacion-ingreso.component';
import { TipoOperacionEgresoComponent } from './pages/tipo-operacion-egreso/tipo-operacion-egreso.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { ParametroComponent } from './pages/parametro/parametro.component';
 //componentes



const seguridadRoutes: Routes = [
    { path: 'usuario', component: EmpleadoComponent, data: { titulo: 'Matenimientos  de usuarios' },  canActivate: [ LoginGuardGuard ] },
        // { path: 'reportes', component: ReportesComponent, data: { titulo: 'Reportes' },  canActivate: [ LoginGuardGuard ] },
       { path: 'perfiles', component: PerfilesComponent, data: { titulo: 'Perfiles' },  canActivate: [ LoginGuardGuard ] },
      { path: 'parametros', component: ParametroComponent, data: { titulo: 'Parametros' },  canActivate: [ LoginGuardGuard ] }
 
      //copiar para compras
];



export const SEGURIDAD_ROUTES = RouterModule.forChild( seguridadRoutes );
