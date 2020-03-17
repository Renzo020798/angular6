
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class TipooperacioningresoService {

  constructor(
    public http: HttpClient,
  ) { }
  urltpo: String = `${environment.NEW_URL_GEMP_API}tipoOperacionIngreso/`;
   listTipoOperacionIngreso(idempresa) {    
     return this.http.post(this.urltpo+"retornaTipoOperacionIngreso",idempresa);
  }

  insertTipoOperacionIngreso(tipooperacioningreso) {
     return this.http.post(this.urltpo+"insertaTipoOperacionIngreso", tipooperacioningreso).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  updateTipoOperacionIngreso(id) {    
     return this.http.post(this.urltpo+"actualizarTipoOperacionIngreso", id).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  deleteTipoOperacionIngreso(dat_com) {
     return this.http.post(this.urltpo+"eliminarTipoOperacionIngreso", dat_com).pipe(
    map((resp: any)=> {
        Swal.fire(
          'Eliminado!',
          resp.msg,
          'success'
        )
    }));
  }
}
