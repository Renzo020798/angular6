
import {Observable ,  throwError as throwError } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert';
@Injectable()
export class ReportesService {

  constructor(public http: HttpClient) { }

  urlreporte: String = `${environment.NEW_URL_GEMP_API}reporte/`;
   
 
  
/*
  reportes(obj) {
          
    const url = NEW_URL_GEMP_API + 'reporte/pdf';
    return this.http.post(url,obj, {
      responseType: "arraybuffer"
  });

  }*/

  excel(obj) {

         return this.http.post(this.urlreporte+"excelPrueba",obj, {
        responseType: "arraybuffer"
        }).pipe(catchError((err: HttpErrorResponse) => {
          swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
          return throwError(err);
        }));

  }


  excelEstadoResultado(obj) {

     return this.http.post(this.urlreporte+"excelEstadoResultado",obj, {
    responseType: "arraybuffer"
    }).pipe(catchError((err: HttpErrorResponse) => {
      swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
      return throwError(err);
    }));

}

  excelEstadoResultadoResumen(obj) {

     return this.http.post(this.urlreporte+"excelEstadoResultadoResumen",obj, {
    responseType: "arraybuffer"
    }).pipe(catchError((err: HttpErrorResponse) => {
      swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
      return throwError(err);
    }));

}
  excelEstadoResultadoResumenEmpServicios(obj) {

     return this.http.post(this.urlreporte+"excelEstadoResultadoResumenEmpServicios",obj, {
    responseType: "arraybuffer"
    }).pipe(catchError((err: HttpErrorResponse) => {
      swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
      return throwError(err);
    }));

}
excelEstadoResultadoEServicios(obj) {

     return this.http.post(this.urlreporte+"excelEstadoResultadoEServicios",obj, {
    responseType: "arraybuffer"
    }).pipe(catchError((err: HttpErrorResponse) => {
      swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
      return throwError(err);
    }));

}

// excelFlujoMensual(obj) {
//   const url1 = NEW_URL_GEMP_API + 'reporte/excelFlujoMensual';
//   return this.http.post(url1,obj, {
//   responseType: "arraybuffer"
//   });

// }
  
excelFlujoMensual(obj) {
   return this.http.post(this.urlreporte+"excelFlujoMensual",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}

excelFlujoMensualServicio(obj) {
   return this.http.post(this.urlreporte+"excelFlujoMensualServicio",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}

excelFlujoSemanal(obj) {
   return this.http.post(this.urlreporte+"excelFlujoSemanal",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}
excelFlujoSemanalServicio  (obj) {
   return this.http.post(this.urlreporte+"excelFlujoSemanalServicio",obj, {
  responseType: "arraybuffer"
  });

}

excelPorcentajeVenta (obj) {
   return this.http.post(this.urlreporte+"excelDistribucionVenta",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}

excelCuentasCobrar (obj) {
   return this.http.post(this.urlreporte+"excelCuentasCobrar",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}

excelCuentasPagar (obj) {
   return this.http.post(this.urlreporte+"excelCuentasPagar",obj, {
  responseType: "arraybuffer"
  }).pipe(catchError((err: HttpErrorResponse) => {
    swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
    return throwError(err);
  }));

}

}
