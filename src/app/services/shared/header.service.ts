
import {Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http';


import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable()

export class HeaderService {

   usuario:Usuario;
   notificacion = new EventEmitter<any>();
  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  url: String = `${environment.NEW_URL_GEMP}`
  cargarModulos() {       
   
     return this.http.post(this.urlbase+"agrupadormodulos/listmodulosusuario",{"accion":0}).pipe(
                map( (resp: any) => {        
                         
                  return resp;
                }),
                catchError( err => {                  
                  return throwError( err );
                }),);
  }
  
  lsIGVglobal() {
    return this.http.post(this.urlbase+"parametros/retornaValorIGV" ,{});
  }
  lsISCglobal() {
    return this.http.post(this.urlbase+"parametros/retornaValorISC" ,{});
  }
 


  logout() {
    alert('logout')
    let fd = new FormData();
  
     return this.http.post( this.url+"oauth/revoke-token" ,fd).pipe(
                map( (resp: any) => {
                 this._usuarioService.logout();
                  return true;
               }));
  }

}
