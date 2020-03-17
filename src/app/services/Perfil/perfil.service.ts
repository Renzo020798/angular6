
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import { Observable } from 'rxjs';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class PerfilService {

  constructor(public http: HttpClient) { }
  public router : Router;
  urlperfil: String = `${environment.NEW_URL_GEMP_API}perfil/`;
  urlbase:String = `${environment.NEW_URL_GEMP_API}`;

  insertaPerfil(perfil) {debugger
    return this.http.post(this.urlperfil+"insertaPerfil", perfil).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
        
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

  insertaPerfilesPaginas(perfilespagina) {debugger
    return this.http.post(this.urlperfil+"insertaPerfilesPagina", perfilespagina)
  }
  eliminarPerfilesPaginas(id_perfil) {
    return this.http.post(this.urlperfil+"eliminarPerfilesPaginas", id_perfil)
  }

  listarPerfil(){
		return this.http.post(this.urlperfil+"listarPerfiles", {'accion': ''});
  }
  
  listarPagina(id_perfiles){
		return this.http.post(this.urlperfil+"listarPagina", {'id_perfiles': id_perfiles} );
  }

  eliminarPerfil(dat_perfil) {
    return this.http.post(this.urlperfil+"eliminarPerfil", dat_perfil).pipe(
    map((resp: any)=> {
        Swal.fire(
          'Eliminado!',
          resp.msg,
          'success'
        )
    }));
  }
  
  updatePerfil(id_perfil) {
    return this.http.post(this.urlperfil+"actualizarPerfil", id_perfil).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Registro Correcto',
          text: resp.msg
        });
      }else{
        Swal.fire({
          type: 'error',
          title: 'Registro Incorrecto',
          text: resp.msg
        })
      }
    }));
  }

}
