
import {Observable ,  throwError as throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Empleado } from '../../models/empleado.model';

import {  Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { environment } from '../../../environments/environment';
declare var swal: any;
@Injectable()
export class EmpleadoService {
  public empleado:Empleado
 
  constructor(
    public http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService
    ) {}

    urlempleado: String = `${environment.NEW_URL_GEMP_API}empleado/`;
    urlbase: String = `${environment.NEW_URL_GEMP_API}`
    
  cargaListaEmpleados(empleado) { 
    this.spinnerService.show();
    return this.http.post( this.urlempleado+"list",empleado ).pipe(
              map( (resp: any) => {
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                  swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                  return throwError(err);
                }),);     
  }

  cargaListaEmpleadosporEmpresa(empleado) { 
    this.spinnerService.show();
     return this.http.post( this.urlempleado+"listEmpleadoporEmpresa",empleado ).pipe(
              map( (resp: any) => {
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                  swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                  return throwError(err);
                }),);
              
  }
  crudEmpleados(empleado) {
    this.spinnerService.show();
     return this.http.post( this.urlempleado+"inserta",empleado ).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
              
  }
  bloqueaEmpleados(empleado) {
    this.spinnerService.show();
    let url='';

    if(empleado.estadoregistrado==3){
       url = this.urlempleado+"desbloquea";
    }else{
       url = this.urlempleado+"bloquea";
    }    

    return this.http.post( url,{id:empleado.id} ).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
              
  }
  resetEmpleados(empleado) {
    this.spinnerService.show();
    return this.http.post( this.urlempleado+"refreshpass",{id:empleado.id,email:empleado.email} ).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
              
  }
  consultaDocumento(empleado) {
    this.spinnerService.show();
    return this.http.post( this.urlempleado+"findEmpleadoPorDocumento",empleado).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);
              
  }
  consultaEmail(empleado) {
    this.spinnerService.show();
    return this.http.post( this.urlempleado+"findEmpleadoPorEmail",empleado).pipe(
              map( (resp: any) => {              
                this.spinnerService.hide();
                return resp;
              } ),catchError((err: HttpErrorResponse) => {
                swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return throwError(err);
              }),);       
  }

}

