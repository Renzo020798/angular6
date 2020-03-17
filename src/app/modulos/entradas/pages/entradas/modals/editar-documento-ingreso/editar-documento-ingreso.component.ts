import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '../../../../../../models/ingreso.model';
import { PrevisualizarEditarDocumentoIngrComponent } from './previsualizar-editar-documento-ingr/previsualizar-editar-documento-ingr.component';
import { PagosDocumentoComponent } from '../pagos-documento/pagos-documento.component';
import { EntradasService } from '../../../../../../services/entradas.service';
import { NuevoClienteEntradasComponent } from '../nuevo-ingreso/nuevo-cliente/nuevo-cliente.component';
import { Cliente } from '../../../../../../models/Cliente.models';
import Swal from 'sweetalert2';
import { DocumentoService } from '../../../../../../services/ModulosService/documento.service';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-editar-documento-ingreso',
  templateUrl: './editar-documento-ingreso.component.html',
  styles: []
})
export class EditarDocumentoIngresoComponent implements OnInit {

  @Input() objDocIngresoOriginal;
  @Input() id_ingreso;id_empresa;
  @ViewChild('IGV', {static: false}) IGV: ElementRef;
@ViewChild('PERC', {static: false}) PERC: ElementRef;
@ViewChild('DETRACC', {static: false}) DETRACC: ElementRef;
  total_pagado: number;

  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    private clienteService: ClienteService,
  private documentoService: DocumentoService 

    ) { }

    simboloMoneda:String ;
    public lsPago =[];

  public ingreso: Ingreso = new Ingreso();
  total_doc:number ;
  lsCliente: Array<any> = [];
  moneda_soles: Boolean | true ;
  moneda_dolares: Boolean;
  public cliente:Cliente = new Cliente()
  longmax: number;

  ngOnInit() {     
    this.moneda_soles=true; 
    this.ingreso.documento = this.objDocIngresoOriginal;
    this.ingreso.id_ingreso = this.id_ingreso;
    this.ingreso.documento.id_ingreso = this.id_ingreso;
    this.ingreso.id_empresa = this.id_empresa;
    this.listarcliente();
    this.listartipodoc();
    if(this.ingreso.documento.total_soles!=this.ingreso.documento.subtotal_soles){
      this.ingreso.documento.igv = true;
    }
    if(this.ingreso.documento.total_percepciones>0){
      this.ingreso.documento.percepcion = true;
    }
    if(this.ingreso.documento.total_detracciones>0){
      this.ingreso.documento.detraccion = true;
    }

    this.verificarMonedaEditar();
  }
  lsmoneda: Array<any> = [
    {"descripcion":"PEN"},
    {"descripcion":"USD"} 
  ];
  lstipodoc: Array<any> = [];
  lscliente: Array<any> = [];
  close(){
    this.activemodal.dismiss('Cancelado');
  }
  public listarcliente() {
    this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.clienteService.listarClientePorEmpresa({'id_empresa': this.id_empresa}).subscribe((resp) => {
     if (resp == null) {} else {
      this.lscliente = resp.aaData;
      let cli = this.lscliente.find(x => x.id_cliente == this.ingreso.documento.id_cliente);
      this.ingreso.documento.cliente_ruc = cli.nro_doc;
      this.ingreso.documento.cliente_razon_social = cli.razon_social;

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
recalcularMontosTipoCambio(){    
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
  modalPrevisualizarIngreso(){
    
    const modalRef = this.modalService.open(PrevisualizarEditarDocumentoIngrComponent,
      {
        keyboard: false,
        size: 'lg'
      }
    );
    modalRef.componentInstance.ingreso=this.ingreso;
    modalRef.result.then((result) => {
      this.activemodal.close();
   }, (reason) => {
   });
  }
  setRuc(event){
    
    event = this.lscliente.find(x => x.id_cliente == event);
    if( this.ingreso.documento.id_cliente!=null){
      this.ingreso.documento.cliente_ruc=event.nro_doc;
      this.ingreso.documento.cliente_razon_social=event.razon_social;
    }
    else{
      this.ingreso.documento.cliente_ruc="";
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
          for(let pago of this.ingreso.documento.lsPagos){
              this.total_pagado=this.total_pagado + pago.monto_pagado;
            }
            this.ingreso.documento.total_pagado=this.total_pagado;
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

  verificarMonedaEditar(){
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
  }

   public retornaTipodeCambio() {
    this.documentoService.retornaTipodeCambio(this.ingreso.documento).subscribe((resp) => {
    if (resp == null) {
      
    } else {
  
      this.ingreso.documento.tipo_cambio = resp.tipodeCambio;
    }
   });
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
      
      this.listarcliente();

   }, (reason) => {
   
   });
  }



}
