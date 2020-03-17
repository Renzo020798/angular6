
import {Observable ,  throwError as throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
 import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http';


import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable()

export class SidebarService {

  public usuario:Usuario;
  public menu: any[] = [];
  public nameModulo:string="";
  public notificacion = new EventEmitter<any>();
  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }
  urluser: String = `${environment.NEW_URL_GEMP_API}users/`;
  url: String = `${environment.NEW_URL_GEMP}`
  cargarMenuOpcionesModulo(modulo:number,nombre:string):Observable<any> {   
     return this.http.post(this.urluser+"accesosdesdemodulo",{"idarea":modulo}).pipe(
                map( (resp: any) => {
                  if(resp.estado==1){
                    this.menu=resp.aaData;    
                    this.nameModulo=nombre;                
                    for (let index = 0; index < this.menu.length; index++) {                 
                       this.menu[index].open=false;
                    }
                  }                                     
                  return resp;
                }),
                catchError( err => {      
                  console.log(err)      
                  return throwError( err );
                }),);

  }

  cargarPaginasOpcionesModulo():Observable<any> {   
     return this.http.post(this.urluser+"retornaModulosPaginasPorPerfil",{"accion":1}).pipe(
                map( (resp: any) => {
                  if(resp.estado==1){
                    this.menu=resp.aaData;    
                    //this.nameModulo=nombre;                
                    for (let index = 0; index < this.menu.length; index++) {                 
                       this.menu[index].open=false;
                    }
                  }                                     
                  return resp;
                }),
                catchError( err => {      
                  console.log(err)      
                  return throwError( err );
                }),);

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
