
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class DatosAdicionalesService {

  constructor(public http: HttpClient) { }

  urlDA: String = `${environment.NEW_URL_GEMP_API}datosAdicionales/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`


  insertarDatosAdicionalesIniciales(datosadicionales_iniciales) {
    return this.http.post(this.urlDA+"insertarDatosAdicionalesIniciales", datosadicionales_iniciales).pipe(
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
  
  listaDatosAdicionalesIniciales(val) {
     return this.http.post(this.urlDA+"listaDatosAdicionalesIniciales",val);

 }

  insertarDatosAdicionales(datosadicionales) {
          
     return this.http.post(this.urlDA+"insertarDatosAdicionales", datosadicionales).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
        return resp;
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  } 
   listarDatosAdicionalesxAñoyIdCuenta(val) {
      return this.http.post(this.urlDA+"listarDatosAdicionalesxAñoyIdCuenta",val);

  }

  listarDepreciacionxAñoyIdCuenta(val) {
      return this.http.post(this.urlDA+"listarDepreciacionxAñoyIdCuenta",val);

 }

  RetornarInventarioInicial(val) {
      return this.http.post(this.urlDA+"RetornarInventarioInicial",val);
 }

 RetornarDepreciacion(val) {
    return this.http.post(this.urlDA+"RetornarDepreciacion",val);
}

 RetornarInventarioInicialxAnio(val){
   return this.http.post(this.urlDA+"RetornarInventarioInicialxAnio",val);
 }

 insertarDepreciacionDatosAdicionales(datosadicionales) {      
     return this.http.post(this.urlDA+"insertarDepreciacionDatosAdicionales", datosadicionales).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
        return resp;
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  listAnio() {
    return this.http.post(this.urlbase+"periodo/listaPeriodoAño", {'accion': ''});
  }

  listMes() {
    return this.http.post(this.urlbase+"periodo/listaPeriodoMes", {'accion': ''});
  }
   
}
