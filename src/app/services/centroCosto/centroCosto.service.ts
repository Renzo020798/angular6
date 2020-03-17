
import {Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { environment } from '../../../environments/environment';

@Injectable()
export class CentroCostoService {
  static ReportesService: Provider;

  constructor(public http: HttpClient) { }
  url: String = `${environment.NEW_URL_GEMP_API}centrocosto/`
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  
  insertCentroCosto(centro_costo) {
    return this.http.post(this.url+"insertCentroCosto", centro_costo).pipe(
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
  
   insertCentroCosto2(centro_costo) {
    return this.http.post(this.url+"insertCentroCosto2", centro_costo).pipe(
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

  listarCentro_Costo2() {
    return this.http.post(this.url+"insertCentroCosto2", {'accion': ''});
  }

  insertCentroCosto3(centro_costo) {
     // const url = NEW_URL_GEMP_API + 'centrocosto/insertCentroCosto3';
    
    console.log("centro_costo.CentroCosto  ",centro_costo.CentroCosto );
    console.log("centro_costo ",centro_costo);
 
    return this.http.post(this.url+"insertCentroCosto3", centro_costo).pipe(
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

  listarCentro_Costo3() {
    return this.http.post(this.url+"listarCentro_Costo3", {'accion': ''});
  }

  insertCentroCosto4(centro_costo) {
    return this.http.post(this.url+"insertCentroCosto4", centro_costo).pipe(
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
  eliminarCentroCosto(centro_costo) {
    return this.http.post(this.url+"eliminarCentroCosto", centro_costo).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Eliminado correctamente',
          text: resp.msg
        });
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro No Eliminado',
          text: resp.msg
        })
      }
    }));
  }

  // listarCentroCostosPorEmpresa(objeto) {
  //   let url = NEW_URL_GEMP_API + 'centrocosto/listCCporEmpresa';
  //   return this.http.post(url, objeto)
  //     .map( (resp: any) => {
  //       return resp;
  //     }).catch((err: HttpErrorResponse) => {
  //       swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
  //       return Observable.throw(err);
  //     });
  // }
  
  listarCentroCostos(objeto){ //////////--
    return this.http.post(this.url+"listarCentroCostos", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosNivel2(objeto){ //////////--
    return this.http.post(this.url+"listarCentroCostosNivel2", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosNivel3(objeto){ //////////--
    return this.http.post(this.url+"listarCentroCostosNivel3", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosNivel4(objeto){ //////////--
    return this.http.post(this.url+"listarCentroCostosNivel4", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  listarCentroCostoxTipo(idempresa) { 
    return this.http.post(this.url+"listarCentroCostoxTipo",idempresa);
  }

  //porcentaje por venta

  listarPorcentajeVenta(idcc) {
    return this.http.post(this.url+"retornaPorcentajeVenta",idcc);
  }

  insertPorcentajeVenta(obj) {
    return this.http.post(this.urlbase+"porcentajeVenta/insertaPorcentajeVenta", obj).pipe(
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

  updatePorcentajeVenta(id) {    
    return this.http.post(this.urlbase+"porcentajeVenta/actualizaPorcentajeVenta", id).pipe(
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

  

}
