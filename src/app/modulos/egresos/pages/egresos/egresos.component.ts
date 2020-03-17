import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoEgresoComponent } from './modals/nuevo-egreso/nuevo-egreso.component';
import { EditarEgresoComponent } from './modals/editar-egreso/editar-egreso.component';
import { EditarDocumentoEgresoComponent } from './modals/editar-documento-egreso/editar-documento-egreso.component';
import { EgresosService } from '../../../../services/egresosService';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { Documento } from '../../../../models/documento.model';
import { CentroCostosService } from '../../../../services/ModulosService/centro-costos.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styles: []
})
export class EgresosComponent implements OnInit {
  lsegresos: Array<any> = [];
  lsCcostoN1: Array<any> = [];
  lsCcostoN2: Array<any> = [];
  lsCcostoN3: Array<any> = [];
  lsCcostoN4: Array<any> = [];
  valNivel1: boolean = false;
  valNivel2: boolean = true;
  valNivel3: boolean = true;
  valNivel4: boolean = true;
  valNewEgr: boolean = false;
  objCenCos: any;

  valor2: any = "";
  valor3: any = "";
  valor4: any = "";
  centro_costo_final: any = "";

  checkND: any;
  checkNB: any;
  
  filterPost = "";
  mostrarCD= "";
  filterBoolean:boolean;

  constructor(
    private modalService: NgbModal,
    private egresosService: EgresosService,
    public activemodal: NgbActiveModal,
    public centroCostosService: CentroCostosService,
  ) { }

  ngOnInit() {
    this.checkND = document.getElementById('numCli');
    this.checkNB = document.getElementById('nomDoc');
    if(this.checkND.checked == true){
      this.mostrarCD="Ingrese el nombre del cliente";
      this.filterBoolean=true;
    }
    this.listarCentroCostosEgreso();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit (){
    this.listarDocumento();
  }
 
  checkAction(){
     this.filterPost="";

    if (this.checkND.checked == true){
      this.mostrarCD="Ingrese el nombre del cliente";
      this.filterBoolean=true;
    } else {
      this.mostrarCD="Ingrese el num. de documento";
      this.filterBoolean=false;
    }
  }

  NuevoEgreso(){
    this.modalEgreso();
  }

  modalEgreso(){
    if(this.valNewEgr){

    const modalRef = this.modalService.open(NuevoEgresoComponent,
      {
        keyboard: false,
        size: 'lg',
        backdrop: "static"
      }
    );
    modalRef.componentInstance.cuenta = this.objCenCos;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }
  }
  editarEgreso(egreso){
    const modalRef = this.modalService.open(EditarEgresoComponent,
      {
        keyboard: false,
        size: 'lg',
        backdrop: "static"
      }
    );

    let obj: any = new Object;
    obj.cuenta_egreso=egreso.cuenta_egreso;
    obj.tipo_cobro=egreso.tipo_cobro;
    obj.cobro=egreso.cobro;
    obj.cuenta_numero=egreso.cuenta_numero;
    obj.fecha_estimada_cobro=egreso.fecha_estimada_cobro;
    obj.fecha_real_cobro=egreso.fecha_real_cobro;
    obj.descripcion=egreso.descripcion;
    obj.lsFechasEstimadas=egreso.lsFechasEstimadas;
    obj.id_egreso=egreso.id_egreso;
    obj.id_empresa=egreso.id_empresa;
    obj.id_centro_costo=egreso.documento.id_centro_costo;

    modalRef.componentInstance.cuenta = this.objCenCos;
    modalRef.componentInstance.objegresoOriginal=obj; 
    modalRef.result.then((result) => {
       this.listarDocumentoPorCC(egreso.documento.id_centro_costo);
   }, (reason) => {
 
   });
  }
  editarDocumentoEgreso(id_empresa,id_egreso,DocumentoEgreso){
    const modalRef = this.modalService.open(EditarDocumentoEgresoComponent,
      {
        keyboard: false,
        size: 'lg',
        backdrop: "static"
      }
    );
 
    let obj: any = new Object;
    obj.id_documento=DocumentoEgreso.id_documento;
    obj.id_empresa=DocumentoEgreso.id_empresa;
    obj.tipo_operacion=DocumentoEgreso.tipo_operacion;
    obj.total_percepciones=DocumentoEgreso.total_percepciones;
    obj.total_detracciones=DocumentoEgreso.total_detracciones;
    obj.subtotal_soles=DocumentoEgreso.subtotal_soles;
    obj.total_soles=DocumentoEgreso.total_soles;
    obj.subtotal_dolares=DocumentoEgreso.subtotal_dolares;
    obj.total_dolares=DocumentoEgreso.total_dolares;
    obj.total_igv=DocumentoEgreso.total_igv;
    obj.fecha_documento=DocumentoEgreso.fecha_documento;
    obj.cod_tipo_documento=DocumentoEgreso.cod_tipo_documento;
    obj.cod_moneda=DocumentoEgreso.cod_moneda;
    obj.serie_comprobante=DocumentoEgreso.serie_comprobante;
    obj.nro_comprobante=DocumentoEgreso.nro_comprobante;
    obj.estado_pagado=DocumentoEgreso.estado_pagado;
    obj.tipo_cambio=DocumentoEgreso.tipo_cambio;
    obj.descripcion=DocumentoEgreso.descripcion;
    obj.id_ingreso=DocumentoEgreso.id_ingreso;
    obj.id_egreso=DocumentoEgreso.id_egreso;
    obj.id_cliente=DocumentoEgreso.id_cliente;
    obj.monto_detraccion=DocumentoEgreso.monto_detraccion;
    obj.monto_percepcion=DocumentoEgreso.monto_percepcion;
    obj.monto_igv=DocumentoEgreso.monto_igv;
    obj.fecha_pago_detraccion=DocumentoEgreso.fecha_pago_detraccion;
    obj.lsPagos=DocumentoEgreso.lsPagos;
    obj.total_pagado=DocumentoEgreso.total_pagado;
    obj.cliente=DocumentoEgreso.cliente;
    obj.id_centro_costo=DocumentoEgreso.id_centro_costo;
    obj.ingreso=DocumentoEgreso.ingreso;
    obj.egreso=DocumentoEgreso.egreso;
    obj.centro_costo_cuentas=DocumentoEgreso.centro_costo_cuentas;
    obj.periodo_anno=DocumentoEgreso.periodo_anno;
    obj.id_cuenta=DocumentoEgreso.id_cuenta;
    obj.centro_costo_nivel=DocumentoEgreso.centro_costo_nivel;
    obj.fechaSemanaIni=DocumentoEgreso.fechaSemanaIni;
    obj.fechaSemanaFin=DocumentoEgreso.fechaSemanaFin;
    obj.tipo_comportamiento=DocumentoEgreso.tipo_comportamiento;
    obj.id_tipo_centro_costo=DocumentoEgreso.id_tipo_centro_costo;
    obj.igv=DocumentoEgreso.igv;
    obj.percepcion=DocumentoEgreso.percepcion;
    obj.detraccion=DocumentoEgreso.detraccion;
    obj.cliente_ruc=DocumentoEgreso.cliente_ruc;
    obj.cliente_razon_social=DocumentoEgreso.cliente_razon_social;

 

    modalRef.componentInstance.objDocEgresoOriginal=obj;
    modalRef.componentInstance.id_egreso=id_egreso;
    modalRef.componentInstance.id_empresa=id_empresa;
    modalRef.result.then((result) => {
      this.listarDocumentoPorCC(this.centro_costo_final);

   }, (reason) => {
 
   });
  }

  public listarDocumento() {
 
    let id_empresa = Number(localStorage.getItem('empresaselect'));
     this.egresosService.listarEgreso({'id_empresa': id_empresa }).subscribe((resp) => {
     if (resp == null) {} else {
       //INYECCION DE DEPENCIA
       this.egresoData();
     }
    });
 }
 
 
 public listarDocumentoPorCC(id_centro_costo) {
    
  let id_empresa = Number(localStorage.getItem('empresaselect'));
   this.egresosService.listarEgreso({'id_empresa': id_empresa,'id_centro_costo':id_centro_costo }).subscribe((resp) => {
   if (resp == null) {} else {
     //INYECCION DE DEPENCIA
     this.egresoData();
   }
  });
}
 egresoData(){
   
   this.egresosService.listarEgreso_cpe.subscribe((resp) => { 
     if (resp == null) {} else { 
       this.lsegresos = resp.aaData;
       console.log("lsegresos",this.lsegresos);
      }
    })
 }


 eliminarEgreso(egreso){
  Swal.fire({
    title: 'Confirmación',
   // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
    text: `¿Desea eliminar el egreso? `,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.value) {
      this.egresosService.eliminarEgreso(egreso).subscribe((resp) => {
        if(resp.estado==1){
          Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
          this.listarDocumento();
          this.listarDocumentoPorCC(egreso.documento.id_centro_costo);
        }else{
          Swal.fire('Error en la transaccion',resp.msg , 'error');
          this.listarDocumentoPorCC(egreso.documento.id_centro_costo);
        }

       });
    }
  })
}

public listarCentroCostosEgreso() {
  let id_empresa = Number(localStorage.getItem('empresaselect'));
   this.centroCostosService.listarCentroCostosEgreso({'id_empresa': id_empresa }).subscribe((resp) => {
   if (resp == null) {} else {
     this.lsCcostoN1 = resp.aaData;
     this.lsCcostoN1.map((x)=>{
      x.nombreTipoCC=x.nombre+'-'+x.tipoCentroCosto.descripcion;
    });
   }
  });
}
public listarCentroCostosNivel2(idcentrocosto,niveles) {
  let obj: any = new Object;
  obj.id_centro_costo = idcentrocosto;
  obj.niveles = niveles;
   this.centroCostosService.listarCentroCostosNivel2(obj).subscribe((resp) => {
   if (resp == null) {} else {
     this.lsCcostoN2 = resp.aaData;
   }
  });
}
public listarCentroCostosNivel3(idcentrocosto,niveles) {
     let obj: any = new Object;
  obj.id_centro_costo_2 = idcentrocosto;
  obj.nivelesPadre = niveles;
   this.centroCostosService.listarCentroCostosNivel3(obj).subscribe((resp) => {
   if (resp == null) {} else {
     this.lsCcostoN3 = resp.aaData;
   }
  });
}
public listarCentroCostosNivel4(idcentrocosto,niveles) {
 let obj: any = new Object;
 obj.id_centro_costo_3 = idcentrocosto;
 obj.nivelesPadre = niveles;
   this.centroCostosService.listarCentroCostosNivel4(obj).subscribe((resp) => {
   if (resp == null) {} else {
     this.lsCcostoN4 = resp.aaData;
   }
  });
}

validarUltNivel1(event){
  if(event!=null){
  this.valNivel2 = event.ultimoNivel;
  this.valNivel1 = event.ultimoNivel;
  if(event.niveles > 1){
    this.lsegresos = [];
  this.listarCentroCostosNivel2(event.id_centro_costo,event.niveles);
  this.valNewEgr = false;
  this.centro_costo_final=null;
  }else{    
  this.objCenCos = event;
  this.valNewEgr = true;
  this.centro_costo_final=event.id_centro_costo;
  this.listarDocumentoPorCC(event.id_centro_costo);

}
  this.valNivel3=true;
  this.valNivel4=true;
  this.valor2 =undefined;
}else{
  this.lsegresos = [];
  this.valNivel2=true;
  this.lsCcostoN2=[];
  this.valor2 =undefined;
   this.valNivel3=true;
  this.lsCcostoN3=[];
  this.valor3 = undefined; 
  this.valNivel4=true;
  this.lsCcostoN4=[];
  this.valor4 = undefined; 
}
}
validarUltNivel2(event){
  if(event!=null){
  this.valNivel3 = event.ultimoNivel;
  if(event.nivelesPadre > 2){
    this.lsegresos = [];
  this.listarCentroCostosNivel3(event.id_centro_costo_2,event.nivelesPadre);
  this.valNewEgr = false;
  this.centro_costo_final=null;
  }else{
  this.objCenCos = event;
  this.valNewEgr = true;
  this.centro_costo_final=event.id_centro_costo_2;
   this.listarDocumentoPorCC(event.id_centro_costo_2);
 }
  this.valNivel4=true;
  this.valor3 =undefined;
}else{
  this.lsegresos = [];
    this.valNivel3=true;
  this.lsCcostoN3=[];
  this.valor3 = undefined; 
  this.valNivel4=true;
  this.lsCcostoN4=[]; 
  this.valor4 = undefined; 

}

}
validarUltNivel3(event){
  if(event!=null){
  this.valNivel4 = event.ultimoNivel;
  if(event.nivelesPadre > 3){
    this.lsegresos = [];
  this.listarCentroCostosNivel4(event.id_centro_costo_3,event.nivelesPadre);
  this.valNewEgr = false;
  this.centro_costo_final=null;
}else{
  this.objCenCos = event;
  this.valNewEgr = true;
  this.centro_costo_final=event.id_centro_costo_3;
  this.listarDocumentoPorCC(event.id_centro_costo_3);

}
  this.valor4 =undefined;
}else{
  this.lsegresos = [];
  this.valNivel4=true;
  this.lsCcostoN4=[];
  this.valor4 = undefined; 
 }
}

validarUltNivel4(event){
  if(event!=null){
    this.lsegresos = [];
  this.objCenCos = event;
  this.valNewEgr = true;
  this.centro_costo_final=event.id_centro_costo_4;
  this.listarDocumentoPorCC(event.id_centro_costo_4);
}else{
  this.lsegresos = [];
 }
}
}
