import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './modulos/login/login.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { EntradasComponent } from './modulos/entradas/entradas.component';
import { EgresosComponent } from './modulos/egresos/egresos.component';
import { SeguridadComponent } from './modulos/administracion/seguridad.component';
import { PagesComponent } from './modulos/dashboard/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: () => import('./modulos/dashboard/pages.module').then(m => m.PagesModule)
    },
    {
        path: '',
        component: SeguridadComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: () => import('./modulos/administracion/seguridad.module').then(m => m.SeguridadModule)
    },
    {
        path: '',
        component: EntradasComponent,
        loadChildren: () => import('./modulos/entradas/entradas.module').then(m => m.EntradasModule)
    },
    {
        path: '',
        component: EgresosComponent,
        loadChildren: () => import('./modulos/egresos/egresos.module').then(m => m.EgresosModule)
    }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
