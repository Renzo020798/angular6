import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrevisualizacionNuevoEgresoComponent } from './previsualizacion-nuevo-egreso/previsualizacion-nuevo-egreso.component';
import { Documento_gemp } from '../../../../../../models/Documento_gemp.model';
import { Egreso } from '../../../../../../models/Egreso.model';

import { EgresosService } from '../../../../../../services/egresosService';
 import { PagosDocumentoEgresoComponent } from '../pagos-documento/pagos-documento.component';
import { FechaEstimadaComponent } from '../fecha-estimada/fecha-estimada.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
 import { Cliente } from '../../../../../../models/Cliente.models';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { NuevoClienteEntradasComponent } from '../../../../../entradas/pages/entradas/modals/nuevo-ingreso/nuevo-cliente/nuevo-cliente.component';
import { CobroService } from '../../../../../../services/ModulosService/cobro.service';
import { DocumentoService } from '../../../../../../services/ModulosService/documento.service';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-nuevo-egreso',
  templateUrl: './nuevo-egreso.component.html',
  styles: []
})
export class NuevoEgresoComponent implements OnInit {
  @Input() cuenta;
  @ViewChild('IGV') IGV: ElementRef;
  @ViewChild('PERC') PERC: ElementRef;
  @ViewChild('DETRACC') DETRACC: ElementRef;
  constructor(
    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    private clienteService: ClienteService,
    private cobroService: CobroService,private documentoService: DocumentoService,
    private egresosService: EgresosService 
   ) { }
  public valiCuentaEgr: boolean = true;

  simboloMoneda:String ;
  lsEgresos: Array<any> = [];
  numeros = ["0","1","2","3","4","5","6","7","8","9","."];longmax: number;
  lstipocobro: Array<any> = [];

  lscobro: Array<any> = [];
  lsFechaEstimada:Array<any>=[];
  fecha_esti:any;
  lscuentaegreso: Array<any> = [];
  fecha:any=new Object;
  lscliente: Array<any> = [];
  lstipodoc: Array<any> = [];
  lsmoneda: Array<any> = [
    {"descripcion":"PEN"},
    {"descripcion":"USD"} 
  ];
  public egreso: Egreso = new Egreso();
  public id_empresa;
  lsCliente: Array<any> = [];
  
  public cliente:Cliente = new Cliente()
  public lsPago =[];
  total_doc:number ;
  total_pagado:number ;
  moneda_soles: Boolean | true ;
  moneda_dolares: Boolean;
  ngOnInit() {    
    this.moneda_soles=true; 

    this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.egreso.id_empresa=this.id_empresa;
    this.egreso.documento=new Documento_gemp();
    this.egreso.documento.cod_moneda = "PEN";
    this.egreso.documento.lsPagos=[];

    if(this.cuenta.niveles!=null&&this.cuenta.niveles==1){
      this.egreso.id_centro_costo=this.cuenta.id_centro_costo;
    }
    if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==2){
      this.egreso.id_centro_costo=this.cuenta.id_centro_costo_2;
    }
    if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==3){
      this.egreso.id_centro_costo=this.cuenta.id_centro_costo_3;
    }
    if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==4){
      this.egreso.id_centro_costo=this.cuenta.id_centro_costo_4;
    }

    if(this.cuenta.lscuentaEgreso!=null
      && this.cuenta.lscuentaEgreso.length > 0){
      this.lscuentaegreso = this.cuenta.lscuentaEgreso;
      this.valiCuentaEgr = false;
    }else{
      if(this.cuenta.lsCuentaEgreso!=null
        && this.cuenta.lsCuentaEgreso.length > 0){
        this.lscuentaegreso = this.cuenta.lsCuentaEgreso;
        this.valiCuentaEgr = false;
      }

    }
 


    this.ListaTipoOperacionEgreso();
    this.listartipocobro();
    this.listarcobro();
    this.listarcliente();
    this.listartipodoc();
  }
      // tslint:disable: radix

  Previsualizar(){
    this.modalPrevisualizarEgreso();
  }

 

ListaTipoOperacionEgreso(){
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
  this.egresosService.listTipoOperacionEgreso({'id_empresa': this.id_empresa }).subscribe((resp: any) => {
    this.lsEgresos = resp.aaData;
    if(this.lsEgresos.length>0){
      this.egreso.cuenta_egreso=this.lsEgresos[0].desc_tipo_operac;
       }  });
}
 public listartipocobro() {
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa

    this.cobroService.retornaTipoCobro({'id_empresa': this.id_empresa }).subscribe((resp) => {
    if (resp == null) {} else {
      this.lstipocobro = resp.aaData;
      if(this.lstipocobro.length>0){
        this.egreso.tipo_cobro=this.lstipocobro[0].descripcion;
         }
    }
   });
}
 public listarcobro() {
    this.cobroService.retornaCobro({'accion': "" }).subscribe((resp) => {
    if (resp == null) {} else {
      this.lscobro = resp.aaData;
      // if(this.lscobro.length>0){
      //   this.egreso.cobro=this.lscobro[0].descripcion;
      //    }
    }
   });
}
 public listarcliente() {
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
     this.clienteService.listarClientePorEmpresa({'id_empresa': this.id_empresa}).subscribe((resp) => {
      if (resp == null) {} else {
      this.lscliente = resp.aaData;
    }
   });
}
 public listartipodoc() {
    this.documentoService.listarTipoDoc().subscribe((resp) => {
    if (resp == null) {} else {
      this.lstipodoc = resp.aaData;
    }
   });
}

  modalPrevisualizarEgreso(){
    // if (this.egreso.fecha_estimada_cobro==null) {
    //   Swal.fire({
    //     title: 'Advertencia',
    //     text: `Complete la fecha estimada`,
    //     type: 'warning',
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Confirmar'
    //   })
    // }
    if (this.egreso.documento.cliente_ruc==null || this.egreso.documento.cliente_ruc=="") {
      Swal.fire({
        title: 'Advertencia',
        text: `Seleccione un Cliente/Prestamista `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if (this.egreso.cuenta_numero==null || this.egreso.cuenta_numero=="" || this.egreso.cuenta_numero==undefined) {
      Swal.fire({
        title: 'Advertencia',
        text: `Seleccione una Cuenta `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if (this.egreso.documento.cod_moneda==null) {
      Swal.fire({
        title: 'Advertencia',
        text: `Seleccione una moneda `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if(this.egreso.documento.cod_moneda=='PEN'){
      if (this.egreso.documento.total_soles==undefined || this.egreso.documento.total_soles=="") {
      Swal.fire({
        title: 'Advertencia',
        text: `Complete el monto requerido`,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }              

  }else{ 
    if (this.egreso.documento.total_dolares==undefined 
      || this.egreso.documento.total_dolares=="" ) {
      Swal.fire({
        title: 'Advertencia',
        text: `Complete el monto requerido`,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if (this.egreso.documento.tipo_cambio==null) {
      Swal.fire({
        title: 'Advertencia',
        text: `Se esta trabajando en moneda dolares es necesario completar
         el tipo de cambio`,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }

  } 
    
    if (  this.egreso.documento.cliente_razon_social!=null 
      && this.egreso.documento.cliente_ruc!="" 
      && this.egreso.documento.cod_moneda!=null 
      && this.egreso.documento.total_soles!=undefined 
      && this.egreso.documento.total_soles!=""
      && this.egreso.cuenta_numero!=null
      && this.egreso.cuenta_numero!=undefined) {

    const modalRef = this.modalService.open(PrevisualizacionNuevoEgresoComponent,
      {
        keyboard: false,
        size: 'lg'
      }
    );
    modalRef.componentInstance.egresodat=this.egreso;
    modalRef.result.then((result) => {
      this.activemodal.close();
   }, (reason) => {
   });
  }
  
  }
  calculaIgv(){  
    if(this.moneda_soles){
   if(this.egreso.documento.total_soles != undefined){
   if(this.egreso.documento.igv){
     this.egreso.documento.total_igv=0;
     this.egreso.documento.monto_igv=18;
     this.egreso.documento.total_igv=Number((0.18*(this.egreso.documento.total_soles/1.18)).toFixed(2));
     this.egreso.documento.subtotal_soles=Number(this.egreso.documento.total_soles)-Number(this.egreso.documento.total_igv);
   this.egreso.documento.subtotal_soles= Number(this.egreso.documento.subtotal_soles.toFixed(2));   
 }else{
     this.egreso.documento.subtotal_soles=Number(this.egreso.documento.subtotal_soles)+Number(this.egreso.documento.total_igv);
  }
   if(this.egreso.documento.tipo_cambio!= null){
     this.egreso.documento.subtotal_dolares= 
             this.egreso.documento.subtotal_soles
             /this.egreso.documento.tipo_cambio;
   }
 }
 }
 if(this.moneda_dolares){
   if(this.egreso.documento.tipo_cambio!= null){
     if(this.egreso.documento.igv){
       this.egreso.documento.total_igv=0;
       this.egreso.documento.monto_igv=18;
       this.egreso.documento.total_igv=Number((0.18*(this.egreso.documento.total_soles/1.18)).toFixed(2));
       this.egreso.documento.subtotal_soles=Number(this.egreso.documento.total_soles)-Number(this.egreso.documento.total_igv);
     this.egreso.documento.subtotal_soles= Number(this.egreso.documento.subtotal_soles.toFixed(2));   
   }else{
       this.egreso.documento.subtotal_soles=Number(this.egreso.documento.subtotal_soles)+Number(this.egreso.documento.total_igv);
     }
     if(this.egreso.documento.tipo_cambio!= null){
       this.egreso.documento.subtotal_dolares= 
               this.egreso.documento.subtotal_soles
               /this.egreso.documento.tipo_cambio;
     }
   }else{   
     if(this.egreso.documento.igv){
     this.IGV.nativeElement.checked = false;
     this.egreso.documento.igv=false;
     Swal.fire({
       title: 'Advertencia',
       text: `Para calcular el igv es necesario registrar el tipo de cambio `,
       type: 'warning',
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Confirmar'
     })
   }
   }


 }
}

calculaMontoDolaresSoles(){
  if(this.moneda_soles){
      if(this.egreso.documento.tipo_cambio!=null){
          this.egreso.documento.total_dolares=
                  (this.egreso.documento.total_soles
                  /this.egreso.documento.tipo_cambio);
         this.egreso.documento.subtotal_dolares=
                  (this.egreso.documento.subtotal_soles
                  /this.egreso.documento.tipo_cambio);
     }
  }else{
        if(this.moneda_dolares){
          this.egreso.documento.subtotal_dolares = this.egreso.documento.total_dolares;
            if(this.egreso.documento.tipo_cambio!=null){
              this.egreso.documento.total_soles=
                      (this.egreso.documento.total_dolares
                      *this.egreso.documento.tipo_cambio);
             this.egreso.documento.subtotal_soles=
                      (this.egreso.documento.subtotal_dolares
                      *this.egreso.documento.tipo_cambio);
           }else{
            this.egreso.documento.total_soles=0.0;
            }
       }
    }

}

recalcularMontos(nro){   
 var valida=["s","w","q"];
  if(nro==valida){
    console.log(valida.includes(nro));
    swal('Movil','Ingresar solo números porfavor', 'error');
  }
  else{   

  let val = nro; 
  let bool = false;
  var tmp = val.slice(0, val.length-1);
 
  var tmp=val.substring(0,(val.length-1));
   tmp = val.slice(0, val.length-1);
  if(val.length>0 && val!=''){
   
   
     if(this.moneda_soles){
            this.calculaDetraccion();
           if(this.egreso.documento.igv){
             this.calculaIgv();
           }else{
            this.egreso.documento.subtotal_soles = this.egreso.documento.total_soles;
           }
           this.calculaPercepcion();
           this.calculaMontoDolaresSoles();
     }else{
           if(this.moneda_dolares){
             this.calculaMontoDolaresSoles();
             this.calculaDetraccion();
             if(this.egreso.documento.igv){
               this.calculaIgv( );
               if(this.egreso.documento.tipo_cambio){
                 this.egreso.documento.subtotal_dolares=
                 (this.egreso.documento.subtotal_soles
                 /this.egreso.documento.tipo_cambio);
                 }
   
                }else{
              this.egreso.documento.subtotal_dolares = this.egreso.documento.total_dolares;
             }
            
             this.calculaPercepcion();
          }  
       }
     
  }else{
         this.egreso.documento.total_dolares=null;
         this.egreso.documento.subtotal_soles=null;
         this.egreso.documento.total_soles=null;
         this.egreso.documento.subtotal_dolares=null;
         this.egreso.documento.monto_detraccion=null;
         this.egreso.documento.total_detracciones=null;
         this.egreso.documento.monto_percepcion=null;
         this.egreso.documento.total_percepciones=null;
         this.egreso.documento.total_igv=null;
         this.IGV.nativeElement.checked = false;
         this.PERC.nativeElement.checked = false;
         this.DETRACC.nativeElement.checked = false;
         this.egreso.documento.igv=false;
         this.egreso.documento.percepcion=false;
         this.egreso.documento.detraccion=false;
  }
  }

}

recalcularMontosTipoCambio(nro){    
  this.Validar_Numeros(nro);
  if(this.egreso.documento.tipo_cambio){ 
   if(this.moneda_soles){
           this.calculaMontoDolaresSoles();
           this.recalcularMontos(this.egreso.documento.total_soles);
   }else{
         if(this.moneda_dolares){
           this.calculaMontoDolaresSoles();
           this.calculaDetraccion();
           if(this.egreso.documento.igv){
             this.calculaIgv( );
             if(this.egreso.documento.tipo_cambio){
               this.egreso.documento.subtotal_dolares=
               (this.egreso.documento.subtotal_soles
               /this.egreso.documento.tipo_cambio);
               }
 
              }else{
            this.egreso.documento.subtotal_dolares = this.egreso.documento.total_dolares;
           }
          
           this.calculaPercepcion();
        }  
     }
  
}else{
      if(this.moneda_dolares){
       this.egreso.documento.subtotal_dolares= this.egreso.documento.total_dolares;
         this.egreso.documento.subtotal_soles=null;
       this.egreso.documento.total_soles=null;
        this.egreso.documento.monto_detraccion=null;
       this.egreso.documento.total_detracciones=null;
       this.egreso.documento.monto_percepcion=null;
       this.egreso.documento.total_percepciones=null;
       this.egreso.documento.total_igv=null;
       this.IGV.nativeElement.checked = false;
       this.PERC.nativeElement.checked = false;
       this.DETRACC.nativeElement.checked = false;
       this.egreso.documento.igv=false;
       this.egreso.documento.percepcion=false;
       this.egreso.documento.detraccion=false;

      }else{
       this.egreso.documento.total_dolares=null;
       this.egreso.documento.subtotal_dolares=null;
       //this.egreso.documento.subtotal_soles=null;


      }
   }
}


calculaDetraccion(){
  if(this.egreso.documento.total_soles != undefined && this.egreso.documento.monto_detraccion != undefined){
  if(this.egreso.documento.detraccion){
  this.egreso.documento.total_detracciones=0;
  this.egreso.documento.total_detracciones=Number(((this.egreso.documento.monto_detraccion/100)*this.egreso.documento.total_soles).toFixed(2));
   }
}
}

calculaPercepcion(){
  if(this.egreso.documento.total_soles != undefined && this.egreso.documento.monto_percepcion != undefined){
  if(this.egreso.documento.percepcion){
  this.egreso.documento.total_percepciones=0;
  this.egreso.documento.total_percepciones=Number(((this.egreso.documento.monto_percepcion/100)*this.egreso.documento.total_soles).toFixed(2));
   }
}
}
setRuc(event){
    
  event = this.lscliente.find(x => x.id_cliente == event);
  if( this.egreso.documento.id_cliente!=null){
    this.egreso.documento.cliente_ruc=event.nro_doc;
    this.egreso.documento.cliente_razon_social=event.razon_social;
  }
  else{
    this.egreso.documento.cliente_ruc="";
  }
}
  
    seteCuenta(event){
       this.egreso.documento.id_cuenta=event.id_cuenta;
      this.egreso.cuenta_numero=event.cuenta.descripcion_cuenta;
       
      }

    close(){
      this.activemodal.dismiss('Cancelado');
    }

    registrarPago(){ 
      if((this.egreso.documento.total_soles>0.0
        || this.egreso.documento.total_dolares>0.0)
        && this.egreso.documento.cod_moneda!=null){ 
      const modalRef = this.modalService.open(PagosDocumentoEgresoComponent,
        {
          keyboard: false,
          windowClass:"ModalMd",
          backdrop: "static"
  
        }
      );
      modalRef.componentInstance.documento=this.egreso.documento;
      modalRef.result.then((result) => {     
        this.lsPago = result;
        this.egreso.documento.lsPagos=this.lsPago;
        this.validarTotalPagado();
     }, (reason) => {
     });
  
    }else{
      Swal.fire({
        title: 'Advertencia', 
         text: `Complete la moneda y el monto total del egreso `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
      })

    }
  
    }

    validarTotalPagado(){     
      this.total_pagado=0.0;
            for(let pago of this.egreso.documento.lsPagos){
                this.total_pagado=this.total_pagado + pago.monto_pagado;
              }
              this.egreso.documento.total_pagado=this.total_pagado;
     }
 
    FechaEstimadaEgreso(){
       
      const modalRef = this.modalService.open(FechaEstimadaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass:"ModalMd"
        }
      );  
      modalRef.componentInstance.lsfechaesti=this.lsFechaEstimada; 
        modalRef.result.then((result) => {
 
         this.fecha = result 
         this.lsFechaEstimada= this.fecha ;
        console.log("lsFechaEstimada ", this.lsFechaEstimada);
        if( this.fecha.length>0){
           this.fecha=this.lsFechaEstimada[this.lsFechaEstimada.length-1];
           this.egreso.fecha_estimada_cobro =this.fecha.fecha_estimada;
           this.fecha.fecha_estimada_cobro=this.fecha.fecha_estimada;
           console.log("fecha.fecha_estimada ", this.fecha.fecha_estimada);
 
        }else{
          this.fecha="";
          this.egreso.fecha_estimada_cobro=null;
        }
     }, (reason) => {
     });
     }
     public retornaTipodeCambio() {
      this.documentoService.retornaTipodeCambio(this.egreso.documento).subscribe((resp) => {
      if (resp == null) {
        
      } else {
    
        this.egreso.documento.tipo_cambio = resp.tipodeCambio;
      }
     });
    }

    nuevoCliente(){
      let indice = null;
      this.openModal(indice);
    }
    verificaMoneda(){
      if(this.egreso.documento.cod_moneda=='PEN'){
          this.simboloMoneda="S/.";
          this.moneda_soles= true;
          this.moneda_dolares= false;
       }else{
        if(this.egreso.documento.cod_moneda=='USD'){
          this.simboloMoneda="$/.";
          this.moneda_soles= false;
          this.moneda_dolares=true;
    
          }
      }
      this.egreso.documento.total_dolares=null;
      this.egreso.documento.subtotal_soles=null;
      this.egreso.documento.total_soles=null;
      this.egreso.documento.subtotal_dolares=null;
      this.egreso.documento.monto_detraccion=null;
      this.egreso.documento.total_detracciones=null;
      this.egreso.documento.monto_percepcion=null;
      this.egreso.documento.total_percepciones=null;
      this.egreso.documento.total_igv=null;
      this.IGV.nativeElement.checked = false;
      this.PERC.nativeElement.checked = false;
      this.DETRACC.nativeElement.checked = false;
      this.egreso.documento.igv=false;
      this.egreso.documento.percepcion=false;
      this.egreso.documento.detraccion=false;
    }
  
  
    public openModal(indice) {
      for(let cat of this.lsCliente.slice(indice,indice+1)){
        this.cliente = cat;
      }
      const modalRef = this.modalService.open(NuevoClienteEntradasComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass:"ModalMd"
        }
      );
      modalRef.componentInstance.index = indice;
      modalRef.componentInstance.clientedat = this.cliente;
      modalRef.componentInstance.idempresa = this.id_empresa;
      modalRef.result.then((result) => {
        
        this.listarcliente();
  
     }, (reason) => {
     
     });
    }

     filter(nro){
      var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
      if(preg.test(nro) === true){
          return true;
      }else{
         return false;
      }
      
  }
  
    Validar_Numeros(nro){   
    let val = nro.toString();
    let bool = false;
    var tmp = val.slice(0, val.length-1);
    //var tmp=val.substring(0,(val.length-1));
    if(val.length>0 && val!=''){
      for(var i=0;i<this.numeros.length;i++){
        if(val[val.length-1]==this.numeros[i]){ 				
          bool=true;
          i=i+this.numeros.length;
          }else{
            bool=false;	    				
          }
        }
      if(!bool){
        this.cliente.nro_doc = tmp;    
        swal('Numeros','Ingresar solo números porfavor', 'error');
      }else{
  
      }
    } else{
      if(val.length==0){  
        nro=null;
      } 
    } 
   
    } 
  
}