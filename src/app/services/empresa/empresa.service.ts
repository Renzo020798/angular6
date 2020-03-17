
import {map} from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { Empresa } from '../../models/empresa.model';
import Swal from 'sweetalert2';
import { Company } from '../../models/company.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

declare var swal: any;
@Injectable()
export class EmpresaService {
  public empresa:Empresa
  public company:Company
  urlempresa: String = `${environment.NEW_URL_GEMP_API}company/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  constructor(
    public http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    public router: Router,
  ) { }
  // insertaEmpresa(company) {
    
  //   const url = NEW_URL_GEMP_API + 'company/insertaEmpresa';
  //   return this.http.post(url, company)
  //   .map((resp: any)=> {
  //     if(resp.estado == 1){
  //       Swal.fire({
  //         type: 'success',
  //         title: 'Registro Correcto',
  //         text: resp.msg
  //       });
  //     }else{
  //       Swal.fire({
  //         type: 'error',
  //         title: 'Registro Incorrecto',
  //         text: resp.msg
  //       })
  //     }
  //   });
  // }

  insertaEmpresa( archivo: File, empresa:Company ) {
    let token=localStorage.getItem('token') || '';    
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      if(archivo != undefined){
      formData.append( 'files', archivo, archivo.name);
      }
      formData.append("empresa", new Blob(
        [JSON.stringify(empresa)], {
            type: "application/json"
        }));
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {           
            return resolve( JSON.parse( xhr.response ))
          } else {                      
            return reject( xhr.response );           
          }
        }
      };
      xhr.open('POST', this.urlempresa+"insertaEmpresa", true );
      xhr.setRequestHeader("Authorization", `Bearer `+token); 
      xhr.send( formData );
    });
  }

  listEmpresa() {
    return this.http.post(this.urlempresa+"listarEmpresa", {'accion': ''});
  }

  listEmpresaIdUsu() {
    let id_usu = JSON.parse(localStorage.getItem('usuario'));
    return this.http.post(this.urlempresa+"listarEmpresaxIdUsuario" , {'id_usuarios': id_usu.id_usuarios});
  }

  // listarEmpresa() {
  //   return this.http.post(NEW_URL_GEMP_API + 'company/listarEmpresa', {'accion': ''});
  // }
  listarTipoEmpresa() {
    return this.http.post(this.urlempresa+"listarTipoEmpresa", {'accion': ''});
  }

  eliminarEmpresa(dat_com) {
       return this.http.post(this.urlempresa+"eliminarEmpresa", dat_com).pipe(
      map((resp: any)=> {
          Swal.fire(
            'Eliminado!',
            resp.msg,
            'success'
          )
      }));
    
  }
  
  descargaArchivo(dat_com){
        return this.http.post(this.urlempresa+"descargaArchivo",dat_com,{
        responseType: "arraybuffer"
        });
  }

  cargarArchivoEmpresa(archivo: File, empresa:Company){
    let token=localStorage.getItem('token') || '';    
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      if(archivo != undefined){
        formData.append( 'files', archivo, archivo.name);
      }
      formData.append("empresa", new Blob(
        [JSON.stringify(empresa)], {
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
      xhr.open('POST', this.urlempresa+"cargarArchivoEmpresa", true );
      xhr.setRequestHeader("Authorization", `Bearer `+token); 
      xhr.send( formData );
    });
  }

  updateEmpresa( archivo: File, empresa:Company ) {
    let token=localStorage.getItem('token') || '';    
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      if(archivo != undefined){
        formData.append( 'files', archivo, archivo.name);
      }
      formData.append("empresa", new Blob(
        [JSON.stringify(empresa)], {
            type: "application/json"
        }));
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {           
            return resolve( JSON.parse( xhr.response ));
          } else {                      
            return reject( xhr.response );           
          }
        }
      };
       xhr.open('POST', this.urlempresa+"actualizarEmpresa", true );
      xhr.setRequestHeader("Authorization", `Bearer `+token); 
      xhr.send( formData );
    });
  }

  
  // updateEmpresa(id) {
  //   const url = NEW_URL_GEMP_API + 'company/actualizarEmpresa';
  //   return this.http.post(url, id)
  //   .map((resp: any)=> {
  //     if(resp.estado == 1){
  //       Swal.fire({
  //         type: 'success',
  //         title: 'Registro Correcto',
  //         text: resp.msg
  //       });
        
  //     }else{
  //       Swal.fire({
  //         type: 'error',
  //         title: 'Registro Incorrecto',
  //         text: resp.msg
  //       })
  //     }
  //   });
  // }

  lsParamCtaxEmpr(obj) {
    return this.http.post(this.urlempresa+"retornalsCuentasxEmpr",obj);
  }
  retornaEmpresaPorId(id) {
    return this.http.post(this.urlempresa+"datosActualizarEmpresa",{'id_empresa': id});
  }
  listarTipoCentroCostoxEmpresa(id) {
    return this.http.post(this.urlempresa+"listarTipoCentroCosto",{'id_empresa': id});
  }


  habilitarEmpresa(id) {
     return this.http.post(this.urlempresa+"habilitarEmpresa", id).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Operacion Correcta',
          text: resp.msg
          
        });
        this.refrescaPagina();
         
      }else{
        Swal.fire({
          type: 'error',
          title: 'Operacion Incorrecta',
          text: resp.msg
        })
      }
    }));
   
  }
 

  desahabilitarEmpresa(id) {

    return this.http.post(this.urlempresa+"desahabilitarEmpresa", id).pipe(
    map((resp: any)=> {
      if(resp.estado == 1){
        Swal.fire({
          type: 'success',
          title: 'Operacion Correcta',
          text: resp.msg
        });
        this.refrescaPagina();
      }else{
        Swal.fire({
          type: 'error',
          title: 'Operacion Incorrecta',
          text: resp.msg
        })
      }
      return this.http.post(this.urlempresa+"desahabilitarEmpresa", resp)
    }));
  }
  refrescaPagina() {                
    this.redirectTo(this.router.url);

  }
  redirectTo(uri) {         
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

}

