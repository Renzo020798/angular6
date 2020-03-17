
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class TipooperacionegresoService {

  constructor(
    public http: HttpClient,
  ) { }
  urltpo: String = `${environment.NEW_URL_GEMP_API}tipoOperacionEgreso/`;
  listTipoOperacionEgreso(idempresa) {    
     return this.http.post(this.urltpo+"retornaTipoOperacionEgreso",idempresa);
  }


  insertTipoOperacionEgreso(tipoOperacionEgreso) {
     return this.http.post(this.urltpo+"insertaTipoOperacionEgreso", tipoOperacionEgreso).pipe(
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


  updateTipoOperacionEgreso(id) {    
     return this.http.post(this.urltpo+"actualizarTipoOperacionEgreso", id).pipe(
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


  deleteTipoOperacionEgreso(dat_com) {
     return this.http.post(this.urltpo+"elimineTipoOperacionEgreso", dat_com).pipe(
    map((resp: any)=> {
        Swal.fire(
          'Eliminado!',
          resp.msg,
          'success'
        )
    }));
  }

}
