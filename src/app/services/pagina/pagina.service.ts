
import {Observable ,  throwError as throwError } from 'rxjs';


import {catchError, map} from 'rxjs/operators';

import { Injectable, EventEmitter } from '@angular/core';
 import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { environment } from '../../../environments/environment';
declare var swal: any;
@Injectable()
export class PaginaService {
 
  constructor(
    public http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
   
   }
   urlpagina: String = `${environment.NEW_URL_GEMP_API}pagina/`;
  cargaListaPaginas(pagina) {
    this.spinnerService.show();
     return this.http.post( this.urlpagina+"list",pagina ).pipe(
              map( (resp: any) => {
                this.spinnerService.hide();
                return resp;} ),catchError((err: HttpErrorResponse) => {
                  swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                  return throwError(err);
                }),);
              
  }
  crudPaginas(pagina) {
    this.spinnerService.show();
     return this.http.post( this.urlpagina+"inserta",pagina ).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
              
  }
}


