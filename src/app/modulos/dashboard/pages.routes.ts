import { RouterModule, Routes } from '@angular/router';
  
 import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { ResponsableComponent } from './pages/responsable/responsable.component';

const pagesRoutes: Routes = [
    { path: 'responsable', component: ResponsableComponent, data: { titulo: 'Responsable' }},
    { path: 'ubicacion',component: UbicacionComponent,data: { titulo: 'Ubicacion' }},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
