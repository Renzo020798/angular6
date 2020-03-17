
import {BehaviorSubject, Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import swal from 'sweetalert';
import { environment } from '../../../environments/environment';

@Injectable()
export class DocumentoService {
  
  constructor(public http: HttpClient) { }
  private lsTipDoc = new BehaviorSubject<any>(undefined); //INYECCION DE DEPENCIA
  public listarTipDoc = this.lsTipDoc.asObservable(); // Observable: avisa
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  listarTipoDoc(){ //////////--
     return this.http.post(this.urlbase+"sutipodocumento/retornaSutipodocumentoPorEstado", {'estado': 1}).pipe(
      map( (resp: any) => {
        this.lsTipDoc.next(resp);
        return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }

  retornaTipodeCambio(documento){ //////////--
     return this.http.post(this.urlbase+"tipocambio/retornaTipodeCambio", documento).pipe(
      map( (resp: any) => {
         return resp;
      }),catchError((err: HttpErrorResponse) => {
        swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
        return throwError(err);
      }),);
  }
}
