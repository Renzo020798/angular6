import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { EgresosComponent } from './pages/egresos/egresos.component';
//componentes


const egresosRoutes: Routes = [
 
    { path: 'egresos', component: EgresosComponent, data: { titulo: 'Egreso' },  canActivate: [ LoginGuardGuard ] },
  
    //copiar para compras
];



export const EGRESOS_ROUTES = RouterModule.forChild( egresosRoutes );
