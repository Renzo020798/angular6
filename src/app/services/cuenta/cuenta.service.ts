
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class CuentaService {

  constructor(public http: HttpClient) { }
  urlcuenta: String = `${environment.NEW_URL_GEMP_API}cuenta/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`

  insertaCuenta(cuenta) {
    return this.http.post(this.urlcuenta+"insertaCuenta", cuenta).pipe(
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

  listarCuenta(dat_cuenta) {  
    return this.http.post(this.urlcuenta+"listarCuenta",dat_cuenta);
  }

  listarCuentaPorEmpresaTipoCuenta(dat_cuenta) {  
    return this.http.post(this.urlcuenta+"listarCuentaPorEmpresaTipoCuenta",dat_cuenta);
  }

  retornarcomboTipoCuenta(action){
    return this.http.post(this.urlbase+"tipocuenta/retornarcomboTipoCuenta",action);
  }

  eliminarCuenta(dat_cuenta) {
      return this.http.post(this.urlcuenta+"eliminarCuenta", dat_cuenta).pipe(
      map((resp: any)=> {
          Swal.fire(
            'Eliminado!',
            resp.msg,
            'success'
          )
      }));
    
  }
  
  actualizarCuenta(id) {
    return this.http.post(this.urlcuenta+"actualizarCuenta", id).pipe(
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

  retornarCuentaxIngreso(id_empresa) {
    return this.http.post(this.urlcuenta+"retornarCuentaxIngreso", {'id_empresa': id_empresa});
  }

  retornarCuentaxEgreso(id_empresa){
    return this.http.post(this.urlcuenta+"retornarCuentaxEgreso", {'id_empresa': id_empresa});
  }

   listarCuentaxConsumo(id_empresa){
    return this.http.post(this.urlcuenta+"listarCuentaxConsumo" , {'id_empresa': id_empresa});
  }

  listarCuentaDepreciacion(id_empresa){
    return this.http.post(this.urlcuenta+"listarCuentaDepreciacion" , {'id_empresa': id_empresa});
  }

  //  listTipoOperacionEgreso(idempresa) {    
  //   const url = NEW_URL_SERVICIOS_EFIKAR + 'cuenta/listarCuentaPorEmpresaTipoCuenta';
  //   return this.http.post(url,idempresa);
  // }

  }
 