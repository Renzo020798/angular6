import { Routes, RouterModule } from '@angular/router';

// Guards
import { EntradasComponent } from './pages/entradas/entradas.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { GestionComponent } from './pages/gestion/gestion.component';

//componentes

const entradasRoutes: Routes = [
    { path: 'inventario', component: InventarioComponent, data: { titulo: 'Inventarios' }},
    { path: 'gestion', component: GestionComponent, data: { titulo: 'Gestion' }},
    { path: 'reportes', component: ReportesComponent, data: { titulo: 'Reportes' }},

];

export const ENTRADAS_ROUTES = RouterModule.forChild( entradasRoutes );
   