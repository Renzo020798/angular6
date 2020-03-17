import { NgModule } from '@angular/core';
import { DemoNumber } from './number.pipe';
import { TruncatePipe } from './truncate.pipe';
import { Namelistas } from './namelistas.pipe';
import { GeneraCodigoPipe } from './generacodigo.pipe';
import { FilterPipe } from './filter.pipe';
import { FilterEgresoPipe } from './filter-egreso.pipe';



@NgModule({
  imports: [
  ],
  declarations: [
    DemoNumber,
    TruncatePipe,
    Namelistas,
    GeneraCodigoPipe
  ],
  exports: [
    DemoNumber,
    TruncatePipe,
    Namelistas,
    GeneraCodigoPipe
  ]
})
export class PipesModule { }
