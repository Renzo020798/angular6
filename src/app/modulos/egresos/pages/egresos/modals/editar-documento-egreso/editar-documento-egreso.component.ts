import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Egreso } from '../../../../../../models/Egreso.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrevisualizarDocumentoEgresoActualizadoComponent } from './previsualizar-documento-egreso-actualizado/previsualizar-documento-egreso-actualizado.component';
import { PagosDocumentoEgresoComponent } from '../pagos-documento/pagos-documento.component';
import { Cliente } from '../../../../../../models/Cliente.models';
import { NuevoClienteEntradasComponent } from '../../../../../entradas/pages/entradas/modals/nuevo-ingreso/nuevo-cliente/nuevo-cliente.component';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { DocumentoService } from '../../../../../../services/ModulosService/documento.service';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-editar-documento-egreso',
  templateUrl: './editar-documento-egreso.component.html',
  styles: []
})
export class EditarDocumentoEgresoComponent implements OnInit {
  @Input() objDocEgresoOriginal;
  @Input() id_egreso;id_empresa;
  @ViewChild('IGV', {static: false}) IGV: ElementRef;
  @ViewChild('PERC', {static: false}) PERC: ElementRef;
  @ViewChild('DETRACC', {static: false}) DETRACC: ElementRef;

  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    private clienteService: ClienteService,
    private documentoService: DocumentoService
    ) { }
  public egreso: Egreso = new Egreso();
  lsCliente: Array<any> = [];
  
  public cliente:Cliente = new Cliente()
  numeros = ["0","1","2","3","4","5","6","7","8","9"];
  simboloMoneda:String ;
    public lsPago =[];
    total_doc:number ;
    total_pagado:number 
    moneda_soles: Boolean | true ;
    moneda_dolares: Boolean;
    longmax: number;
  ngOnInit() {     

     this.egreso.documento = this.objDocEgresoOriginal;
     this.moneda_soles=true; 



     this.egreso.documento = this.objDocEgresoOriginal;

     this.egreso.documento = this.objDocEgresoOriginal;

    this.egreso.id_egreso = this.id_egreso;
    this.egreso.documento = this.objDocEgresoOriginal;
 
     this.egreso.documento = this.objDocEgresoOriginal;
    this.egreso.documento = this.objDocEgresoOriginal;
     this.egreso.id_egreso = this.id_egreso;
    this.egreso.id_empresa = this.id_empresa;
    this.egreso.documento.id_egreso = this.id_egreso;
    this.listarcliente();
    this.listartipodoc();
    if(this.egreso.documento.total_soles!=this.egreso.documento.subtotal_soles){
      this.egreso.documento.igv = true;
    }
    if(this.egreso.documento.total_percepciones>0){
      this.egreso.documento.percepcion = true;
    }
    if(this.egreso.documento.total_detracciones>0){
      this.egreso.documento.detraccion = true;
    }
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
      let cli = this.lscliente.find(x => x.id_cliente == this.egreso.documento.id_cliente);
      this.egreso.documento.cliente_ruc = cli.nro_doc;
      this.egreso.documento.cliente_razon_social = cli.razon_social;
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
    const modalRef = this.modalService.open(PrevisualizarDocumentoEgresoActualizadoComponent,
      {
        keyboard: false,
        size: 'lg'
      }
    );
    modalRef.componentInstance.egreso=this.egreso;
    modalRef.result.then((result) => {
      this.activemodal.close();
   }, (reason) => {
   });
  }

  ValidarFechDocumento(fech_doc){
    this.egreso.documento.fecha_documento = fech_doc;
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

  recalcularMontos(nro){   
    let val = nro; 
    let bool = false;
    var tmp = val.slice(0, val.length-1);
    //var tmp=val.substring(0,(val.length-1));
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

recalcularMontosTipoCambio(){    
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

   Validar_Numeros(nro2){
    let val = nro2;
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
      }
    }if(this.cliente.nro_doc.length > this.longmax){ 
      swal('Ingresar solo '+ this.longmax +' digitos porfavor', 'error');
    }
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

  public openModal(indice) {
    for(let cat of this.lsCliente.slice(indice,indice+1)){
      this.cliente = cat;
    }
    const modalRef = this.modalService.open(NuevoClienteEntradasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
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