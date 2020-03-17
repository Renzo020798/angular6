
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class TipocobroService {

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }
  urlcobro: String = `${environment.NEW_URL_GEMP_API}cobro/`;
   listTipoCobro(idempresa) {    
     return this.http.post(this.urlcobro+"retornaTipoCobro",idempresa);

  }

  insertaProducto(tipocobro) {
     return this.http.post(this.urlcobro+"insertarTipoCobro", tipocobro).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
       this.refrescaPagina();
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  updateTipoCobro(id) {    
     return this.http.post(this.urlcobro+"actualizarTipoCobro", id).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
        this.refrescaPagina();
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  eliminarTipoCobro(dat_com) {
     return this.http.post(this.urlcobro+"eliminarTipoCobro", dat_com).pipe(
    map((resp: any)=> {
        Swal.fire(
          'Eliminado!',
          resp.msg,
          'success'
        )
    }));
  }

  
  refrescaPagina() {                
    this.redirectTo(this.router.url);

  }
  redirectTo(uri) {         
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }
    

    
  
}