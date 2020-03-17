
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from '../../models/Cliente.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClienteService {

  constructor(public http: HttpClient) { }
  public router : Router;
  urlcliente: String = `${environment.NEW_URL_GEMP_API}cliente/`;
  urlbase:String = `${environment.NEW_URL_GEMP_API}`;

  insertaCliente(cliente) {
    return this.http.post(this.urlcliente+"insertaCliente", cliente).pipe(
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

   listarCliente(dat_cliente) {  
    return this.http.post(this.urlcliente+"listarCliente",dat_cliente);
  }

  listarComboTipoDocuIden(action){
    return this.http.post(this.urlbase+"sutipodocumento/retornacomboSutipodocumentoidentidad",action);
  }

  eliminarCliente(dat_cli) {
      return this.http.post(this.urlcliente+"eliminarCliente", dat_cli).pipe(
      map((resp: any)=> {
          Swal.fire(
            'Eliminado!',
            resp.msg,
            'success'
          )
      }));
    
  }
  
  updateCliente(id) {
    return this.http.post(this.urlcliente+"actualizarCliente", id).pipe(
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

  bajarExcel(obj) {
    return this.http.post(this.urlbase+"excel/ExcelModeloBaseCliente",{'id_empresa': obj.id_empresa}, {
      responseType: "arraybuffer"
    });
  }

  cargarArchivoCliente(archivo: File, cliente:Cliente){
    let token=localStorage.getItem('token') || '';    
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      if(archivo != undefined){
        formData.append( 'files', archivo, archivo.name);
      }
      formData.append("cliente", new Blob(
        [JSON.stringify(cliente)], {
            type: "application/json"
        }));
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {           
            return resolve(JSON.parse( xhr.response ));
          } else {                      
            return reject( xhr.response );           
          }
        }
      };
      xhr.open('POST', this.urlcliente+"cargarArchivoCliente", true );
      xhr.setRequestHeader("Authorization", `Bearer `+token); 
      xhr.send( formData );
    });
  }


  listarClientePorEmpresa(cliente){ //////////--
    return this.http.post(this.urlcliente+"listarClientePorEmpresa", cliente).pipe(
     map( (resp: any) => {
       return resp;
     }),catchError((err: HttpErrorResponse) => {
       swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
       return throwError(err);
     }),);
 }







 


}
