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
        loadChildren: './modulos/dashboard/pages.module#PagesModule'
    },
    {
        path: '',
        component: SeguridadComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: './modulos/administracion/seguridad.module#SeguridadModule'
    },
    {
        path: '',
        component: EntradasComponent,
        loadChildren: './modulos/entradas/entradas.module#EntradasModule'
    },
    {
        path: '',
        component: EgresosComponent,
        loadChildren: './modulos/egresos/egresos.module#EgresosModule'
    }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
