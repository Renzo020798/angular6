
import {Observable, BehaviorSubject } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import swal from 'sweetalert';
import { environment } from '../../environments/environment';


@Injectable()
export class EntradasService {

  private lsIngreso = new BehaviorSubject<any>(undefined); //INYECCION DE DEPENCIA
  public listarIngreso_cpe = this.lsIngreso.asObservable(); // Observable: avisa

  urlingreso: String = `${environment.NEW_URL_GEMP_API}ingreso/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`

  constructor(public http: HttpClient) {
    }
  insertaIngresoGemp(ingreso) {//////////--
     return this.http.post( this.urlingreso+"insertarIngreso",ingreso ).pipe(
              map( (resp: any) => { 
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
    
  }
  listTipoOperacionIngreso(idempresa) {    
     return this.http.post(this.urlbase+"tipoOperacionIngreso/retornaTipoOperacionIngreso",idempresa);
  }

  actualizarIngreso(ingreso) {//////////--
     return this.http.post( this.urlingreso+"actualizarIngreso",ingreso ).pipe(
              map( (resp: any) => { 
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
    
  }

  listarIngreso(ingreso){ //////////--
          
     return this.http.post(this.urlingreso+"listarIngresos", ingreso).pipe(
      map( (resp: any) => {
        this.lsIngreso.next(resp);
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }



  
  eliminarIngreso(ingreso){ //////////--
     return this.http.post(this.urlingreso+"eliminarIngreso", ingreso).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  retornaTipoOpeIngreso(ingreso){ //////////--
     return this.http.post(this.urlingreso+"retornaTipoOpeIngreso", ingreso).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  // reportes(obj) {
          
  //   const url = NEW_URL_GEMP_API + 'reporte/pdf';
  //   return this.http.post(url,obj, {
  //     responseType: "arraybuffer"
  //   });
  // }

  envioCPE(doc){//////////--
     return this.http.post(this.urlbase+"cliente/envioCPE", doc)
  }

}
