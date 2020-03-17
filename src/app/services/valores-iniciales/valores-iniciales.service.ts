
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class ValoresInicialesService {

  constructor(public http: HttpClient) {  }
  urlvali: String = `${environment.NEW_URL_GEMP_API}valoresIniciales/`;
  urlbase: String = `${environment.NEW_URL_GEMP_API}`
  insertarValoresInciales(valores) {
     return this.http.post(this.urlvali+"insertarValoresInciales", valores).pipe(
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

  listAnio() {
    return this.http.post(this.urlbase+"periodo/listaPeriodoAño", {'accion': ''});
  }
  
  listaValoresIniciales(val) {
      return this.http.post(this.urlvali+"listaValoresIniciales",val);

 }
  
 RetornarValoreInicialxano(año){

   return this.http.post(this.urlvali+"RetornarValoreInicialxano",año);

}
}
