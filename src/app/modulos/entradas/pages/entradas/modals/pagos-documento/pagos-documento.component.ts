import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagos_documento } from '../../../../../../models/Pagos_documento.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-pagos-documento',
  templateUrl: './pagos-documento.component.html' 
})
export class PagosDocumentoComponent implements OnInit {
  @Input() documento;

  constructor( private modalService: NgbModal,
    public activemodal : NgbActiveModal ) { 
   
  }

   lsPago: Array<any> = [];
   private pago : Pagos_documento = new Pagos_documento();

  CuentaIE:any = new Object;
  ingreso:Boolean = false;
  simboloMoneda:String ;
  total_doc:Number ;
  total_pagado:Number ;

  ngOnInit() {
    this.lsPago=this.documento.lsPagos;
     this.total_pagado=this.documento.total_pagado;
    this.verificaMoneda();




  }

  verificaMoneda(){
    if(this.documento.cod_moneda=='PEN'){
        this.simboloMoneda="S/.";
        this.total_doc=this.documento.total_soles;
    }else{
      if(this.documento.cod_moneda=='USD'){
        this.simboloMoneda="$/.";
        this.total_doc=this.documento.total_dolares;

        }
    }
   }

  adicionarPago(){
   this.pago= new Pagos_documento();
   
  if(this.lsPago.length>0){ 
 // tslint:disable-next-line:no-unused-expression
 if(this.lsPago[this.lsPago.length-1].monto_pagado!=null
  &&this.lsPago[this.lsPago.length-1].monto_pagado>0.00
    &&this.lsPago[this.lsPago.length-1].fecha_pago!=null
    &&this.lsPago[this.lsPago.length-1].fecha_pago!=null){
      this.pago.moneda= this.documento.cod_moneda;
      this.lsPago.push(this.pago);
  }else{
    Swal.fire({
      title: 'Advertencia',
     // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
      text: `Complete el monto cancelado y fecha de pago  `,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
    
    })
  }



  }else{
    this.lsPago.push(this.pago);
  }

  
      

  }
  eliminarPago(indice){
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

        this.total_pagado= Number(this.total_pagado) - Number(this.lsPago[indice].monto_pagado);


        this.lsPago.splice(indice,1);
     }
    })

  }
  regresar(){
    if(this.lsPago.length>0){
    if(this.lsPago[this.lsPago.length-1].monto_pagado!=null
      &&this.lsPago[this.lsPago.length-1].monto_pagado>0.00
        &&this.lsPago[this.lsPago.length-1].fecha_pago!=null
        &&this.lsPago[this.lsPago.length-1].fecha_pago!=null){
          this.total_pagado=0.0;
          for(let pago of this.lsPago){
            this.total_pagado=this.total_pagado+pago.monto_pagado;
          }
          if(this.total_doc<this.total_pagado){
            Swal.fire({
            title: 'Advertencia',
           text: `Monto a pagar sobrepasa el total del documento`,
           type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
          })
          }else{
            this.activemodal.close(this.lsPago);
          }
 
        } else{
          Swal.fire({
            title: 'Advertencia',
             text: `Complete el monto cancelado y fecha de pago  `,
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
          
          })
        }
  }else{
    this.activemodal.close(this.lsPago);
  }
}

  editarPago(indice){
    this.lsPago[indice].bloqueado=false;
  }

  guardarPago(indice){

    if(this.lsPago[indice].monto_pagado!=null
      &&this.lsPago[indice].monto_pagado>0.00
        &&this.lsPago[indice].fecha_pago!=null
        &&this.lsPago[indice].fecha_pago!=null){
          
          
             // tslint:disable-next-line:no-unused-expression
      this.total_pagado=0.0;

          for(let pago of this.lsPago){
            this.total_pagado=this.total_pagado+pago.monto_pagado;
          }
          if(this.total_doc>=this.total_pagado){
           { 
             this.lsPago[indice].bloqueado=true;
          }

          }else{
              Swal.fire({
              title: 'Advertencia',
             // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
              text: `Monto a pagar sobrepasa el total del documento`,
              type: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
            
            })
          }


        }else{
          Swal.fire({
            title: 'Advertencia',
           // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
            text: `Complete el monto cancelado y fecha de pago  `,
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
          
          })
        }
   }

validarTotal(indice){ 
  this.total_pagado=0.0;

          for(let pago of this.lsPago){
            this.total_pagado=this.total_pagado+pago.monto_pagado;
          }
          if(this.total_doc<this.total_pagado){
            this.total_pagado= Number(this.total_pagado) - Number(this.lsPago[indice].monto_pagado);
           this.lsPago[indice].monto_pagado=0.00;
           Swal.fire({
            title: 'Advertencia',
           // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
           text: `Monto a pagar sobrepasa el total del documento`,
           type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
          
          })
          }

}

}
