import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EntradasService } from '../../../../services/entradas.service';
import { NuevoIngresoComponent } from './modals/nuevo-ingreso/nuevo-ingreso.component';
import { EditarIngresoComponent } from './modals/editar-ingreso/editar-ingreso.component';
import { EditarDocumentoIngresoComponent } from './modals/editar-documento-ingreso/editar-documento-ingreso.component';
import Constantes from '../../../../models/Constantes';
import { Ingreso } from '../../../../models/ingreso.model';
import { Router } from '@angular/router';
import { CentroCostosService } from '../../../../services/ModulosService/centro-costos.service';


@Component({
  selector: 'app-entradas',
  // templateUrl: '<app-nuevo-registro2 (DocuLis) = display($event)><app-nuevo-registro2>',
  templateUrl: './entradas.component.html',
  styles: []
})
export class EntradasComponent implements OnInit {

  @ViewChild('UpCircle', {static: false}) UpCircle: ElementRef;
  expanded: boolean = false;
  valNivel1: boolean = false;
  valNivel2: boolean = true;
  valNivel3: boolean = true;
  valNivel4: boolean = true;
  valNewIng: boolean = false;
  valor2: any = "";
  valor3: any = "";
  valor4: any = "";
  centro_costo_final: any = "";

  checkND: any;
  checkNB: any;
  
  filterPost = "";
  mostrarCD= "";
  filterBoolean:boolean;
  

  constructor(private modalService: NgbModal,private entradasService: EntradasService,
    public activemodal: NgbActiveModal, public centroCostosService: CentroCostosService,
   
    ) { }

  lsingresos: Array<any> = [];
  lsCcostoN1: Array<any> = [];
  lsCcostoN2: Array<any> = [];
  lsCcostoN3: Array<any> = [];
  lsCcostoN4: Array<any> = [];
  objCenCos: any;
  public ingreso:Ingreso=new Ingreso();
  public router : Router;
 
  ngOnInit() {
     this.checkND = document.getElementById('numCli');
    this.checkNB = document.getElementById('nomDoc');
    this.checkAction();
    this.listarCentroCostosIngreso();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit (){
    this.listarDocumento();
  }
  NuevoIngreso(){
    this.modalIngreso();
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
  
  listarDocumentoPorCentroCosto(id_centro_costo){ 
    this.entradasService.listarIngreso({"id_empresa": Number(localStorage.getItem('empresaselect')),"id_centro_costo":id_centro_costo}).subscribe((resp) => { 
       if (resp == null) {
          
      } else {
        
      }
    });
  }

  modalIngreso(){     
    if(this.valNewIng){

      const modalRef = this.modalService.open(NuevoIngresoComponent,
        {
          keyboard: false,
          size: 'lg',
          backdrop: "static"
        }
      );
      modalRef.componentInstance.cuenta = this.objCenCos;
      modalRef.result.then((result) => {      
        this.listarDocumentoPorCentroCosto(this.objCenCos.id_centro_costo);

     }, (reason) => {       
 
     });
    }
  }

 public listarDocumento() {
   let id_empresa = Number(localStorage.getItem('empresaselect'));
    this.entradasService.listarIngreso({'id_empresa': id_empresa }).subscribe((resp) => {
    if (resp == null) {} else {
      //INYECCION DE DEPENCIA
      this.ingresoData();
    }
   });
}
 public listarCentroCostosIngreso() {
   let id_empresa = Number(localStorage.getItem('empresaselect'));
    this.centroCostosService.listarCentroCostosIngreso({'id_empresa': id_empresa }).subscribe((resp) => {
    if (resp == null) {} else {
      this.lsCcostoN1 = resp.aaData;
      this.lsCcostoN1.map((x)=>{
        x.nombreTipoCC=x.nombre+'-'+x.tipoCentroCosto.descripcion;
      });
      console.log(this.lsCcostoN1,"LISTA CENTRO COSTOOO");
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

ingresoData(){
  
  this.entradasService.listarIngreso_cpe.subscribe((resp) => { 
    if (resp == null) {} else { 
      this.lsingresos = resp.aaData;
      console.log(this.lsingresos,"aaaaaaaaa")
      }
   })
} 
eliminarIngreso(ingreso){  
   Swal.fire({
    title: 'Confirmación',
   // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
    text: `¿Desea eliminar el ingreso? `,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.value) { 
      this.entradasService.eliminarIngreso(ingreso).subscribe((resp) => {
        if(resp.estado==1){
           Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
          this.listarDocumentoPorCentroCosto(ingreso.documento.id_centro_costo);
          
          this.activemodal.close();
          // this.redirectTo(url,)
        }else{
          Swal.fire('Error en la transaccion',resp.msg , 'error');
          this.listarDocumentoPorCentroCosto(ingreso.documento.id_centro_costo);
        }

       });
    }
  })
}
redirectTo(uri){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}



editarIngreso(ingreso){
  const modalRef = this.modalService.open(EditarIngresoComponent,
    {
      keyboard: false,
      size: 'lg',
      backdrop: "static"
    }
  );
 
  let obj: any = new Object;
  
    obj.cuenta_ingreso=ingreso.cuenta_ingreso;
    obj.tipo_cobro=ingreso.tipo_cobro;
    obj.cobro=ingreso.cobro;
    obj.cuenta_numero=ingreso.cuenta_numero;
    obj.fecha_estimada_cobro=ingreso.fecha_estimada_cobro;
    obj.fecha_real_cobro=ingreso.fecha_real_cobro;
    obj.fecha_estimada_cobro_dat=ingreso.fecha_estimada_cobro_dat;
    obj.fecha_real_cobro_dat=ingreso.fecha_real_cobro_dat;
    obj.descripcion=ingreso.descripcion;
    obj.lsFechasEstimadas=ingreso.lsFechasEstimadas;
    obj.id_ingreso=ingreso.id_ingreso;
    obj.id_empresa=ingreso.id_empresa;
    obj.id_centro_costo=ingreso.id_centro_costo;

    modalRef.componentInstance.cuenta = this.objCenCos;
   modalRef.componentInstance.objIngresoOriginal=obj;
  modalRef.result.then((result) => {
    console.log("ingreso.id_centro_costo 2",this.centro_costo_final);
    this.listarDocumentoPorCentroCosto(this.centro_costo_final);

 }, (reason) => {
  //this.listarDocumentoPorCentroCosto(ingreso.id_centro_costo);

 });
}
editarDocumentoIngreso(id_empresa,id_ingreso,DocumentoIngreso){
  const modalRef = this.modalService.open(EditarDocumentoIngresoComponent,
    {
      keyboard: false,
      size: 'lg',
      backdrop: "static"
    }
  );
 
  let obj: any = new Object;
  obj.id_documento=DocumentoIngreso.id_documento;
  obj.id_empresa=DocumentoIngreso.id_empresa;
  obj.tipo_operacion=DocumentoIngreso.tipo_operacion;
  obj.total_percepciones=DocumentoIngreso.total_percepciones;
  obj.total_detracciones=DocumentoIngreso.total_detracciones;
  obj.subtotal_soles=DocumentoIngreso.subtotal_soles;
  obj.total_soles=DocumentoIngreso.total_soles;
  obj.subtotal_dolares=DocumentoIngreso.subtotal_dolares;
  obj.total_dolares=DocumentoIngreso.total_dolares;
  obj.total_igv=DocumentoIngreso.total_igv;
  obj.fecha_documento=DocumentoIngreso.fecha_documento;
  obj.cod_tipo_documento=DocumentoIngreso.cod_tipo_documento;
  obj.cod_moneda=DocumentoIngreso.cod_moneda;
  obj.serie_comprobante=DocumentoIngreso.serie_comprobante;
  obj.nro_comprobante=DocumentoIngreso.nro_comprobante;
  obj.estado_pagado=DocumentoIngreso.estado_pagado;
  obj.tipo_cambio=DocumentoIngreso.tipo_cambio;
  obj.descripcion=DocumentoIngreso.descripcion;
  obj.id_ingreso=DocumentoIngreso.id_ingreso;
  obj.id_egreso=DocumentoIngreso.id_egreso;
  obj.id_cliente=DocumentoIngreso.id_cliente;
  obj.monto_detraccion=DocumentoIngreso.monto_detraccion;
  obj.monto_percepcion=DocumentoIngreso.monto_percepcion;
  obj.monto_igv=DocumentoIngreso.monto_igv;
  obj.fecha_pago_detraccion=DocumentoIngreso.fecha_pago_detraccion;
  obj.lsPagos=DocumentoIngreso.lsPagos;
  obj.total_pagado=DocumentoIngreso.total_pagado;
  obj.cliente=DocumentoIngreso.cliente;
  obj.id_centro_costo=DocumentoIngreso.id_centro_costo;
  obj.ingreso=DocumentoIngreso.ingreso;
  obj.egreso=DocumentoIngreso.egreso;
  obj.centro_costo_cuentas=DocumentoIngreso.centro_costo_cuentas;
  obj.periodo_anno=DocumentoIngreso.periodo_anno;
  obj.id_cuenta=DocumentoIngreso.id_cuenta;
  obj.centro_costo_nivel=DocumentoIngreso.centro_costo_nivel;
  obj.fechaSemanaIni=DocumentoIngreso.fechaSemanaIni;
  obj.fechaSemanaFin=DocumentoIngreso.fechaSemanaFin;
  obj.tipo_comportamiento=DocumentoIngreso.tipo_comportamiento;
  obj.id_tipo_centro_costo=DocumentoIngreso.id_tipo_centro_costo;
  obj.igv=DocumentoIngreso.igv;
  obj.percepcion=DocumentoIngreso.percepcion;
  obj.detraccion=DocumentoIngreso.detraccion;
  obj.cliente_ruc=DocumentoIngreso.cliente_ruc;
  obj.cliente_razon_social=DocumentoIngreso.cliente_razon_social;
 

  modalRef.componentInstance.objDocIngresoOriginal=obj;
  modalRef.componentInstance.id_ingreso=id_ingreso;
  modalRef.componentInstance.id_empresa=id_empresa;
  modalRef.result.then((result) => {
 
    this.listarDocumentoPorCentroCosto(this.centro_costo_final);
 }, (reason) => {
 
 });
}

validarUltNivel1(event){
  if(event!=null){
  this.valNivel2 = event.ultimoNivel;
  this.valNivel1 = event.ultimoNivel;
  if(event.niveles > 1){
    this.lsingresos = [];
    this.listarCentroCostosNivel2(event.id_centro_costo,event.niveles);
    this.valNewIng = false;
    this.centro_costo_final=null;
 }else{
    this.objCenCos = event;
    this.valNewIng = true;
    this.centro_costo_final=event.id_centro_costo;
    this.listarDocumentoPorCentroCosto(event.id_centro_costo);
  }
  this.valNivel3=true;
  this.valNivel4=true;
  this.valor2 =undefined;
}else{
  this.lsingresos = [];
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
    this.lsingresos = [];
    this.listarCentroCostosNivel3(event.id_centro_costo_2,event.nivelesPadre);
    this.valNewIng = false;
    this.centro_costo_final=null;
  }else{
    this.objCenCos = event;
    this.valNewIng = true;
    this.centro_costo_final=event.id_centro_costo_2;
    this.listarDocumentoPorCentroCosto(event.id_centro_costo_2);
  }
  this.valNivel4=true;
  this.valor3 =undefined;
}else{
  this.lsingresos = [];
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
    this.lsingresos = [];
    this.listarCentroCostosNivel4(event.id_centro_costo_3,event.nivelesPadre);
    this.valNewIng = false;
    this.centro_costo_final=null;
  }else{
    this.objCenCos = event;
    this.valNewIng = true;
    this.centro_costo_final=event.id_centro_costo_3;
    this.listarDocumentoPorCentroCosto(event.id_centro_costo_3);
  }
  this.valor4 =undefined;
}else{
  this.lsingresos = [];
  this.valNivel4=true;
  this.lsCcostoN4=[];
  this.valor4 = undefined; 
 }
}
validarUltNivel4(event){
  if(event!=null){
    this.lsingresos = [];
  this.objCenCos = event;
  this.valNewIng = true;
  this.centro_costo_final=event.id_centro_costo_4;
  this.listarDocumentoPorCentroCosto(event.id_centro_costo_4);
}else{
  this.lsingresos = [];
 }
}

}
