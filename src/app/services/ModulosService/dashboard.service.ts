import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { environment } from '../../../environments/environment';

@Injectable()
export class DashBoardService {

  constructor(public http: HttpClient) { }
  urldash: String = `${environment.NEW_URL_GEMP_API}dashboard/`;
  listarVentaClientexDocumento(dat_cliente){
     return this.http.post(this.urldash+"retornaVentaClientexDocumento",dat_cliente);
  }
  listarVentaDelAnio(dat_company){
     return this.http.post(this.urldash+"retornarVentaAnioCCT5",dat_company);
  }
  listarPorcentajeVentasNetas(dat_company){
     return this.http.post(this.urldash+"listarPorcentajeVentasNetas",dat_company);
  }

  evolucionDeGastosOperativos(idempresa) {    
     return this.http.post(this.urldash+"evolucionDeGastosOperativos",idempresa);
  }
  porcentualDeUtilidades(idempresa) {    
     return this.http.post(this.urldash+"listarPorcentajeUtilidades",idempresa);
  }
  listarSaldosFinales(idempresa) {    
     return this.http.post(this.urldash+"listarSaldosFinales",idempresa);
  }

}
