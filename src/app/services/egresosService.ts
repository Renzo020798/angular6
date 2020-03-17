
import {Observable, BehaviorSubject } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { environment } from '../../environments/environment';


@Injectable()
export class EgresosService {

  private lsEgreso = new BehaviorSubject<any>(undefined);
  public listarEgreso_cpe = this.lsEgreso.asObservable();
  urlegreso: String = `${environment.NEW_URL_GEMP_API}egreso/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  constructor(public http: HttpClient) {
    }

   retornaTipoOpeEgreso(ingreso){ //////////--
     return this.http.post(this.urlegreso+"retornaTipoOpeEgreso", ingreso).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  
  listTipoOperacionEgreso(idempresa) {    
     return this.http.post(this.urlbase+"tipoOperacionEgreso/retornaTipoOperacionEgreso",idempresa);
  }
  insertaEgresoGemp(egreso) {//////////--
     return this.http.post( this.urlegreso+"insertarEgreso",egreso ).pipe(
              map( (resp: any) => { 
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
    
  }

  actualizarEgresoGemp(egreso) {//////////--
     return this.http.post( this.urlegreso+"actualizarEgreso",egreso ).pipe(
              map( (resp: any) => { 
                 return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
    
  }

  listarEgreso(egreso){ //////////--
    return this.http.post( this.urlegreso+"listarEgresos", egreso).pipe(
      map( (resp: any) => {
        this.lsEgreso.next(resp);
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  eliminarEgreso(egreso){ //////////--
     return this.http.post(this.urlegreso+"eliminarEgreso", egreso).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  }
