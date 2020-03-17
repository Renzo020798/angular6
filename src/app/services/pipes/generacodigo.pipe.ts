import { Pipe, PipeTransform } from '@angular/core';

declare var swal:any;
@Pipe({
  name: 'generacodigo'
})
export class GeneraCodigoPipe implements PipeTransform {
  transform( abrev:string, corr:string, longi:number): any {
    try {
      var cod = "0";
      var tamanoAb = abrev == null ? 0 : abrev.length;
      corr = corr + "";
      var lengCodStr = corr.length;
      for (var i = 1; i < (longi - lengCodStr); i++) {
          cod = "0" + cod;
      }
      cod = (abrev == null ? "" : abrev) + cod + corr;
      
    } catch (err) {
        swal('Transaccion correcta', err.message, 'error');
    }
    return cod;
  }

}
