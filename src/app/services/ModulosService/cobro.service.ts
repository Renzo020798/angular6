
import {BehaviorSubject, Observable ,  throwError as throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import swal from 'sweetalert';
import { environment } from '../../../environments/environment';

@Injectable()
export class CobroService {
  
  constructor(public http: HttpClient) { }
  private lsCobro = new BehaviorSubject<any>(undefined); //INYECCION DE DEPENCIA
  public listarCobro_cpe = this.lsCobro.asObservable(); // Observable: avisa
  private lsTipoCobro = new BehaviorSubject<any>(undefined); //INYECCION DE DEPENCIA
  public listarTipoCobro = this.lsTipoCobro.asObservable(); // Observable: avisa
  urlcobro: String = `${environment.NEW_URL_GEMP_API}cobro/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  retornaTipoCobro(cobro){ //////////--

    
     return this.http.post(this.urlcobro+"retornaTipoCobro", cobro).pipe(
      map( (resp: any) => {
        this.lsTipoCobro.next(resp);
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
  retornaCobro(cobro){ //////////--
     return this.http.post(this.urlcobro+"retornaCobro", cobro).pipe(
      map( (resp: any) => {
        this.lsCobro.next(resp);
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

}
