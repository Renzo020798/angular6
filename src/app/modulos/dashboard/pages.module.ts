
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
// Pipe Module
import { PipesModule } from '../../services/pipes/pipes.module';
// import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntradasModule } from '../entradas/entradas.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { GlobalInterceptor } from '../../global.interceptor';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { ResponsableComponent } from './pages/responsable/responsable.component';


@NgModule({
    declarations: [

        DashboardComponent,

        UbicacionComponent,

        ResponsableComponent,
        // EntradasComponent
        
    ],
    exports: [
        DashboardComponent,
        // EntradasComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        EntradasModule,
        NgSelectModule,

        // PagesModule
        
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true
      }
    ]
})
export class PagesModule { }
