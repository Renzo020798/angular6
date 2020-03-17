
import {Observable ,  throwError as throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { environment } from '../../../environments/environment';

@Injectable()
export class CentroCostosService {
  
  constructor(public http: HttpClient) { }

  urlcencos: String = `${environment.NEW_URL_GEMP_API}centrocosto/`;
   
  listarCentroCostos(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostos", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }



  listarCentroCostosIngreso(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosIngreso", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  listarCentroCostosEgreso(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosEgreso", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  listaCentroCostoxIdEmpresDA(objeto){  
     return this.http.post(this.urlcencos+"listaCentroCostoxIdEmpresDA", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  
  listarCentroCostosNivel2(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosNivel2", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosNivel3(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosNivel3", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosNivel4(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosNivel4", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  listarCentroCostosTipoVentaNivel1(objeto){  
     return this.http.post(this.urlcencos+"listarCentroCostosTipoVentaNivel1", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  listarCentroCostosTipoVentaNivel2(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosTipoVentaNivel2", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosTipoVentaNivel3(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosTipoVentaNivel3", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  listarCentroCostosTipoVentaNivel4(objeto){ //////////--
     return this.http.post(this.urlcencos+"listarCentroCostosTipoVentaNivel4", objeto).pipe(
      map( (resp: any) => {
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
 
}
