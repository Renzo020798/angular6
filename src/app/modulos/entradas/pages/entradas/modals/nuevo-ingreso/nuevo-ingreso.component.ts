import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrevisualizacionNuevoIngresoComponent } from './previsualizacion-nuevo-ingreso/previsualizacion-nuevo-ingreso.component';
import { Ingreso } from '../../../../../../models/ingreso.model';
import { Documento_gemp } from '../../../../../../models/Documento_gemp.model';
import { EntradasService } from '../../../../../../services/entradas.service';
import { PagosDocumentoComponent } from '../pagos-documento/pagos-documento.component';
import { FechaPagoEstimadaComponent } from '../fecha-pago-estimada/fecha-pago-estimada.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Cliente } from '../../../../../../models/Cliente.models';
import { Empresa } from '../../../../../../models/empresa.model';
import { EmpresaService } from '../../../../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
 import { NuevoClienteEntradasComponent } from './nuevo-cliente/nuevo-cliente.component';
import { CobroService } from '../../../../../../services/ModulosService/cobro.service';
import { DocumentoService } from '../../../../../../services/ModulosService/documento.service';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';
 // tslint:disable-next-line:no-unused-expression
@Component({
  selector: 'app-nuevo-ingreso',
  templateUrl: './nuevo-ingreso.component.html',
  styles: []
})
export class NuevoIngresoComponent implements OnInit {
 
@Input() cuenta;
@ViewChild('IGV', {static: false}) IGV: ElementRef;
 @ViewChild('PERC', {static: false}) PERC: ElementRef;
 @ViewChild('DETRACC', {static: false}) DETRACC: ElementRef;

  constructor(
    private modalService: NgbModal,
    public activemodal : NgbActiveModal,private clienteService: ClienteService,
    private cobroService: CobroService,private documentoService: DocumentoService,
    private entradasService: EntradasService,
    private empresaService: EmpresaService 

  
  ) { }
 
  simboloMoneda:String ;
  

  lsingresos: Array<any> = [];
  lstipocobro: Array<any> = [];
  lscobro: Array<any> = [];
  lscuentaingreso: Array<any> = [];
  lscliente: Array<any> = [];
  lstipodoc: Array<any> = [];
  lsCliente: Array<any> = [];
  lsEmpresas: Array<any> = [];
  numeros = ["0","1","2","3","4","5","6","7","8","9","."];
  lsmoneda: Array<any> = [
    {"descripcion":"PEN"},
    {"descripcion":"USD"} 
  ];
  public ingreso: Ingreso = new Ingreso();
  public valiCuentaIng: boolean = true;
  public id_empresa;
  public lsPago =[];
  public cliente:Cliente = new Cliente();
  public empresa:Empresa = new Empresa();
  total_doc:number ;
  total_pagado:number ;
  fecha_esti:any;
  fecha:any=new Object;
  longmax: number;
  moneda_soles: Boolean | true ;
   moneda_dolares: Boolean;
  lsFechaEstimada:Array<any>=[];
   ngOnInit() { 
 this.moneda_soles=true; 

    this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.ingreso.id_empresa=this.id_empresa;
    this.ingreso.documento=new Documento_gemp();
    this.ingreso.documento.cod_moneda = "PEN";
    this.ingreso.documento.lsPagos=[];

    if(this.cuenta.lscuentaIngreso!=null
      &&this.cuenta.lscuentaIngreso.length > 0){
      this.lscuentaingreso = this.cuenta.lscuentaIngreso;
      this.valiCuentaIng = false;
    }else{
      if(this.cuenta.lsCuentaIngreso!=null
        &&this.cuenta.lsCuentaIngreso.length > 0){
        this.lscuentaingreso = this.cuenta.lsCuentaIngreso;
        this.valiCuentaIng = false;
      }
      
        
    }

     
     this.ListaTipoOperacionIngreso();
    this.listartipocobro();
    this.listarcobro();
    this.listarcliente();
    this.listartipodoc();
  }

  Previsualizar(){
    this.modalPrevisualizaringreso();
  }
 

 ListaTipoOperacionIngreso(){
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
  this.entradasService.listTipoOperacionIngreso({'id_empresa': this.id_empresa }).subscribe((resp: any) => {
    this.lsingresos = resp.aaData;
    if(this.lsingresos.length>0){
    this.ingreso.cuenta_ingreso=this.lsingresos[0].desc_tipo_operac;
     }  });
}

 public retornaTipodeCambio() {
  this.documentoService.retornaTipodeCambio(this.ingreso.documento).subscribe((resp) => {
  if (resp == null) {

  } else {

    this.ingreso.documento.tipo_cambio = resp.tipodeCambio;
  }
 });
}
 

  public listartipocobro() {
    this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa

     this.cobroService.retornaTipoCobro({'id_empresa': this.id_empresa }).subscribe((resp) => {
     if (resp == null) {} else {
       this.lstipocobro = resp.aaData;
       if(this.lstipocobro.length>0){
        this.ingreso.tipo_cobro=this.lstipocobro[0].descripcion;
         }
     }
    });
 }
  public listarcobro() {
     this.cobroService.retornaCobro({'accion': "" }).subscribe((resp) => {
     if (resp == null) {} else {
       this.lscobro = resp.aaData;
      //  if(this.lscobro.length>0){
      //   this.ingreso.cobro=this.lscobro[0].descripcion;
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
 recalcularMontos(nro){
  this.Validar_Numeros(nro);
  let val = nro; 
  let bool = false;
  var tmp = val.slice(0, val.length-1);
  //var tmp=val.substring(0,(val.length-1));
  if(val.length>0 && val!=''){  
       
     if(this.moneda_soles){
            this.calculaDetraccion();
           if(this.ingreso.documento.igv){
             this.calculaIgv();
           }else{
            this.ingreso.documento.subtotal_soles = this.ingreso.documento.total_soles;
           }
           this.calculaPercepcion();
           this.calculaMontoDolaresSoles();
     }else{
           if(this.moneda_dolares){
             this.calculaMontoDolaresSoles();
             this.calculaDetraccion();
             if(this.ingreso.documento.igv){
               this.calculaIgv( );
               if(this.ingreso.documento.tipo_cambio){
                 this.ingreso.documento.subtotal_dolares=
                 (this.ingreso.documento.subtotal_soles
                 /this.ingreso.documento.tipo_cambio);
                 }
   
                }else{
              this.ingreso.documento.subtotal_dolares = this.ingreso.documento.total_dolares;
             }
            
             this.calculaPercepcion();
          }  
       }
     
  }else{
         this.ingreso.documento.total_dolares=null;
         this.ingreso.documento.subtotal_soles=null;
         this.ingreso.documento.total_soles=null;
         this.ingreso.documento.subtotal_dolares=null;
         this.ingreso.documento.monto_detraccion=null;
         this.ingreso.documento.total_detracciones=null;
         this.ingreso.documento.monto_percepcion=null;
         this.ingreso.documento.total_percepciones=null;
         this.ingreso.documento.total_igv=null;
         this.IGV.nativeElement.checked = false;
         this.PERC.nativeElement.checked = false;
         this.DETRACC.nativeElement.checked = false;
         this.ingreso.documento.igv=false;
         this.ingreso.documento.percepcion=false;
         this.ingreso.documento.detraccion=false;
  }
}
recalcularMontosTipoCambio(nro){    
  this.Validar_Numeros(nro);
     if(this.ingreso.documento.tipo_cambio){ 
      if(this.moneda_soles){
              this.calculaMontoDolaresSoles();
              this.recalcularMontos(this.ingreso.documento.total_soles);
      }else{
            if(this.moneda_dolares){
              this.calculaMontoDolaresSoles();
              this.calculaDetraccion();
              if(this.ingreso.documento.igv){
                this.calculaIgv( );
                if(this.ingreso.documento.tipo_cambio){
                  this.ingreso.documento.subtotal_dolares=
                  (this.ingreso.documento.subtotal_soles
                  /this.ingreso.documento.tipo_cambio);
                  }
    
                 }else{
               this.ingreso.documento.subtotal_dolares = this.ingreso.documento.total_dolares;
              }
             
              this.calculaPercepcion();
           }  
        }
     
   }else{
         if(this.moneda_dolares){
          this.ingreso.documento.subtotal_dolares= this.ingreso.documento.total_dolares;
            this.ingreso.documento.subtotal_soles=null;
          this.ingreso.documento.total_soles=null;
           this.ingreso.documento.monto_detraccion=null;
          this.ingreso.documento.total_detracciones=null;
          this.ingreso.documento.monto_percepcion=null;
          this.ingreso.documento.total_percepciones=null;
          this.ingreso.documento.total_igv=null;
          this.IGV.nativeElement.checked = false;
          this.PERC.nativeElement.checked = false;
          this.DETRACC.nativeElement.checked = false;
          this.ingreso.documento.igv=false;
          this.ingreso.documento.percepcion=false;
          this.ingreso.documento.detraccion=false;

         }else{
          this.ingreso.documento.total_dolares=null;
          this.ingreso.documento.subtotal_dolares=null;
          //this.ingreso.documento.subtotal_soles=null;


         }
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
calculaIgv(){  
  if(this.moneda_soles){
  if(this.ingreso.documento.total_soles != undefined){
 if(this.ingreso.documento.igv){
   this.ingreso.documento.total_igv=0;
   this.ingreso.documento.monto_igv=18;
   this.ingreso.documento.total_igv=Number((0.18*(this.ingreso.documento.total_soles/1.18)).toFixed(2));
   this.ingreso.documento.subtotal_soles=Number(this.ingreso.documento.total_soles)-Number(this.ingreso.documento.total_igv);
 this.ingreso.documento.subtotal_soles= Number(this.ingreso.documento.subtotal_soles.toFixed(2));   
}else{
   this.ingreso.documento.subtotal_soles=Number(this.ingreso.documento.subtotal_soles)+Number(this.ingreso.documento.total_igv);
}
 if(this.ingreso.documento.tipo_cambio!= null){
   this.ingreso.documento.subtotal_dolares= 
           this.ingreso.documento.subtotal_soles
           /this.ingreso.documento.tipo_cambio;
 }
}
}
if(this.moneda_dolares){
 if(this.ingreso.documento.tipo_cambio!= null){
   if(this.ingreso.documento.igv){
     this.ingreso.documento.total_igv=0;
     this.ingreso.documento.monto_igv=18;
     this.ingreso.documento.total_igv=Number((0.18*(this.ingreso.documento.total_soles/1.18)).toFixed(2));
     this.ingreso.documento.subtotal_soles=Number(this.ingreso.documento.total_soles)-Number(this.ingreso.documento.total_igv);
   this.ingreso.documento.subtotal_soles= Number(this.ingreso.documento.subtotal_soles.toFixed(2));   
 }else{
     this.ingreso.documento.subtotal_soles=Number(this.ingreso.documento.subtotal_soles)+Number(this.ingreso.documento.total_igv);
   }
   if(this.ingreso.documento.tipo_cambio!= null){
     this.ingreso.documento.subtotal_dolares= 
             this.ingreso.documento.subtotal_soles
             /this.ingreso.documento.tipo_cambio;
   }
 }else{   
   if(this.ingreso.documento.igv){
   this.IGV.nativeElement.checked = false;
   this.ingreso.documento.igv=false;
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
// this.IGV.nativeElement.checked = false;
}


  calculaDetraccion(){  
    if(this.ingreso.documento.total_soles != undefined && this.ingreso.documento.monto_detraccion != undefined){
    if(this.ingreso.documento.detraccion){
      this.ingreso.documento.total_detracciones=0;
    this.ingreso.documento.total_detracciones=Number(((this.ingreso.documento.monto_detraccion/100)*this.ingreso.documento.total_soles).toFixed(2));
     }
  }
  }

  calculaPercepcion(){
    if(this.ingreso.documento.total_soles != undefined && this.ingreso.documento.monto_percepcion != undefined){
    if(this.ingreso.documento.percepcion){
      this.ingreso.documento.total_percepciones=0;  
    this.ingreso.documento.total_percepciones=Number(((this.ingreso.documento.monto_percepcion/100)*this.ingreso.documento.total_soles).toFixed(2));
     }
  }
  } 

  calculaMontoDolaresSoles(){
    if(this.moneda_soles){
        if(this.ingreso.documento.tipo_cambio!=null){
            this.ingreso.documento.total_dolares=
                    (this.ingreso.documento.total_soles
                    /this.ingreso.documento.tipo_cambio);
           this.ingreso.documento.subtotal_dolares=
                    (this.ingreso.documento.subtotal_soles
                    /this.ingreso.documento.tipo_cambio);
       }
    }else{
          if(this.moneda_dolares){
            this.ingreso.documento.subtotal_dolares = this.ingreso.documento.total_dolares;
              if(this.ingreso.documento.tipo_cambio!=null){
                this.ingreso.documento.total_soles=
                        (this.ingreso.documento.total_dolares
                        *this.ingreso.documento.tipo_cambio);
               this.ingreso.documento.subtotal_soles=
                        (this.ingreso.documento.subtotal_dolares
                        *this.ingreso.documento.tipo_cambio);
             }else{
              this.ingreso.documento.total_soles=0.0;
              }
         }
      }

  }
 
  modalPrevisualizaringreso(){
    
    // if (this.ingreso.fecha_estimada_cobro==null) {
    //   Swal.fire({
    //     title: 'Advertencia',
    //     text: `Complete la fecha estimada`,
    //     type: 'warning',
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Confirmar'
    //   })
    // }
    if (this.ingreso.documento.cliente_ruc==null || this.ingreso.documento.cliente_ruc=="" ) {
      Swal.fire({
        title: 'Advertencia',
        text: `Seleccione un Cliente/Prestamista `,
        type: 'warning',
        // cliente_ruc: ""
        // cliente_razon_social
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if (this.ingreso.documento.cod_moneda==null) {
      Swal.fire({
        title: 'Advertencia',
        text: `Seleccione una moneda `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if(this.ingreso.documento.cod_moneda=='PEN'){
      if (this.ingreso.documento.total_soles==undefined || this.ingreso.documento.total_soles=="") {
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
    if (this.ingreso.documento.total_dolares==undefined 
      || this.ingreso.documento.total_dolares=="" ) {
      Swal.fire({
        title: 'Advertencia',
        text: `Complete el monto requerido`,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      })
    }
    if (this.ingreso.documento.tipo_cambio==null) {
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
 if (  this.ingreso.documento.cliente_ruc!=null 
          && this.ingreso.documento.cliente_ruc!="" 
          && this.ingreso.documento.cod_moneda!=null 
          && this.ingreso.documento.total_soles!=undefined 
          && this.ingreso.documento.total_soles!="") {
  
  if(this.cuenta.niveles!=null&&this.cuenta.niveles==1){
    this.ingreso.id_centro_costo=this.cuenta.id_centro_costo;
  }
  if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==2){
    this.ingreso.id_centro_costo=this.cuenta.id_centro_costo_2;
  }
  if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==3){
    this.ingreso.id_centro_costo=this.cuenta.id_centro_costo_3;
  }
  if(this.cuenta.nivelesPadre!=null&&this.cuenta.nivelesPadre==4){
    this.ingreso.id_centro_costo=this.cuenta.id_centro_costo_4;
  }
  
      const modalRef = this.modalService.open(PrevisualizacionNuevoIngresoComponent,
        {
          keyboard: false,
          size: 'lg'
        }
      );
      modalRef.componentInstance.ingresodat=this.ingreso;
      modalRef.result.then((result) => {
        this.activemodal.close();
     }, (reason) => {
     
      
     });

    }
   
    
 }

 
  setRuc(event){
 

    event = this.lscliente.find(x => x.id_cliente == event);
    if(this.ingreso.documento.id_cliente!=null){
      
      this.ingreso.documento.cliente_ruc=event.nro_doc;
      this.ingreso.documento.cliente_razon_social=event.razon_social;
    }
    else{
      this.ingreso.documento.cliente_ruc="";
    }
  

  }

  seteCuenta(event){
     this.ingreso.documento.id_cuenta=event.id_cuenta;
    this.ingreso.cuenta_numero=event.cuenta.descripcion_cuenta;
    }
  
  close(){
    this.activemodal.dismiss('Cancelado');

  }


  registrarPago(){
    if((this.ingreso.documento.total_soles>0.0
      || this.ingreso.documento.total_dolares>0.0)
      && this.ingreso.documento.cod_moneda!=null){ 
    const modalRef = this.modalService.open(PagosDocumentoComponent,
      {
        keyboard: false,
        windowClass:"ModalMd",
        backdrop: "static"

      }
    );
    modalRef.componentInstance.documento=this.ingreso.documento;
    modalRef.result.then((result) => {     
      this.lsPago = result;
      this.ingreso.documento.lsPagos=this.lsPago;
      this.validarTotalPagado();
   }, (reason) => {
   });

  }else{
   Swal.fire({
      title: 'Advertencia', 
       text: `Complete la moneda y el monto total del ingreso `,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
    })
  }
 

  }
   
  FechaEstimada(){
       
    const modalRef = this.modalService.open(FechaPagoEstimadaComponent,
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
       if( this.fecha.length>0){
         this.fecha=this.lsFechaEstimada[this.lsFechaEstimada.length-1];
         this.ingreso.fecha_estimada_cobro =this.fecha.fecha_estimada;
        this.fecha.fecha_estimada_cobro=this.fecha.fecha_estimada;
 
      }else{
        this.fecha="";
        this.ingreso.fecha_estimada_cobro=null;
      }

   }, (reason) => {
   });
   }


  verificaMoneda(){
    if(this.ingreso.documento.cod_moneda=='PEN'){
        this.simboloMoneda="S/.";
        this.moneda_soles= true;
        this.moneda_dolares= false;
     }else{
      if(this.ingreso.documento.cod_moneda=='USD'){
        this.simboloMoneda="$/.";
        this.moneda_soles= false;
        this.moneda_dolares=true;
  
        }
    }
    this.ingreso.documento.total_dolares=null;
    this.ingreso.documento.subtotal_soles=null;
    this.ingreso.documento.total_soles=null;
    this.ingreso.documento.subtotal_dolares=null;
    this.ingreso.documento.monto_detraccion=null;
    this.ingreso.documento.total_detracciones=null;
    this.ingreso.documento.monto_percepcion=null;
    this.ingreso.documento.total_percepciones=null;
    this.ingreso.documento.total_igv=null;
    this.IGV.nativeElement.checked = false;
    this.PERC.nativeElement.checked = false;
    this.DETRACC.nativeElement.checked = false;
    this.ingreso.documento.igv=false;
    this.ingreso.documento.percepcion=false;
    this.ingreso.documento.detraccion=false;
  }



   validarTotalPagado(){ 
    this.total_pagado=0.0;
          for(let pago of this.ingreso.documento.lsPagos){
              this.total_pagado=this.total_pagado + pago.monto_pagado;
            }
            this.ingreso.documento.total_pagado=this.total_pagado;
   }



   
  nuevoCliente(){
    let indice = null;
    this.openModal(indice);
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
      this.listEmpresa();
      this.listarcliente();

   }, (reason) => {
   
   });
  }
  listEmpresa() {
    this.empresaService.listEmpresa().subscribe((resp: any) => {
      this.lsEmpresas = resp.aaData;
      this.empresa=this.lsEmpresas.find(x => x.id_empresa == this.cliente.id_empresa);
      const empresaid = localStorage.getItem('empresaselect');
      if(empresaid != undefined){
        // tslint:disable-next-line:radix
        this.cliente.id_empresa=parseInt(empresaid);      
      }else{

        this.cliente.id_empresa=this.cliente.id_empresa;        
      }
      this.ListarClientexEmpresa(this.cliente.id_empresa);
    });
  }
  
  ListarClientexEmpresa(event){
    localStorage.setItem('empresaidvar', JSON.stringify(event));

    this.cliente.id_empresa = event;
    this.clienteService.listarCliente(this.cliente).subscribe((resp: any) => {
      this.lsCliente = resp.aaData;
    });
  }

  ActualizarCliente(indice){
    this.openModal(indice);
  }

  EliminarCliente(indice){
    for(let cat of this.lsCliente.slice(indice,indice+1)){
      this.cliente.id_cliente = cat.id_cliente;
    }
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminarCliente(this.cliente).subscribe((resp: any) => {
          this.ListarClientexEmpresa(this.cliente.id_empresa);
        });
      }
    })
  }

}
