import { Component, OnInit, Input } from '@angular/core';
import { Ingreso } from '../../../../../../models/ingreso.model';
import { PrevisualizarActualizarIngresoComponent } from './previsualizar-actualizar-ingreso/previsualizar-actualizar-ingreso.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntradasService } from '../../../../../../services/entradas.service';
import { FechaPagoEstimadaComponent } from '../fecha-pago-estimada/fecha-pago-estimada.component';
import { Documento_gemp } from '../../../../../../models/Documento_gemp.model';
import { CobroService } from '../../../../../../services/ModulosService/cobro.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-editar-ingreso',
  templateUrl: './editar-ingreso.component.html',
  styles: []
})
export class EditarIngresoComponent implements OnInit {
  @Input() objIngresoOriginal;cuenta;
  public ingreso: Ingreso = new Ingreso();
  public documentonew: Documento_gemp = new Documento_gemp();
  public id_empresa;
  constructor(private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    public entradaService:EntradasService, 
    private cobroService: CobroService 
     ) { }
    lsIngresos: Array<any> = [];

    lstipocobro: Array<any> = [];
  
    lscobro: Array<any> = [];
    fecha:any=new Object;
      
    lsFechaEstimada:Array<any>=[];
    fecha_esti:any;
    lscuentaingreso: Array<any> = [];
    public valiCuentaIng: boolean = true;

  
  ngOnInit() {
    console.log("this.objIngresoOriginal ",this.objIngresoOriginal);
        this.ingreso = this.objIngresoOriginal;
        this.lsFechaEstimada=this.ingreso.lsFechasEstimadas;
        this.fecha.fecha_estimada_cobro= this.objIngresoOriginal.fecha_estimada_cobro;
        
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
        this.listarcobro();
        this.listartipocobro();
  }
 
  close(){
    this.activemodal.dismiss('Cancelado');
  }

 
ListaTipoOperacionIngreso(){
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
  this.entradaService.listTipoOperacionIngreso({'id_empresa': this.id_empresa }).subscribe((resp: any) => {
    this.lsIngresos = resp.aaData;
    });
}

public listartipocobro() {
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa

    this.cobroService.retornaTipoCobro({'id_empresa': this.id_empresa }).subscribe((resp) => {
    if (resp == null) {} else {
      this.lstipocobro = resp.aaData;
    }
   });
}
 public listarcobro() {
    this.cobroService.retornaCobro({'accion': "" }).subscribe((resp) => {
    if (resp == null) {} else {
      this.lscobro = resp.aaData;
    }
   });
}
    modalPrevisualizarIngreso(){
      if (this.ingreso.cuenta_numero==null || this.ingreso.cuenta_numero=="" || this.ingreso.cuenta_numero==undefined) {
        Swal.fire({
          title: 'Advertencia',
          text: `Seleccione una Cuenta `,
          type: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        })
      }
      if ( this.ingreso.cuenta_numero!=null
        && this.ingreso.cuenta_numero!=undefined) {
      const modalRef = this.modalService.open(PrevisualizarActualizarIngresoComponent,
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

    seteCuenta(event){
      this.documentonew.id_cuenta = event.id_cuenta;
      this.ingreso.id_cuenta = this.documentonew.id_cuenta;
      this.ingreso.cuenta_numero = event.cuenta.descripcion_cuenta;
    }
   
    FechaEstimada(){
      
      const modalRef = this.modalService.open(FechaPagoEstimadaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass:"ModalMd"
        }
      );
      let lsFechasPagos = [];
      for(let f of this.lsFechaEstimada){
        lsFechasPagos.push(f);
      }

      modalRef.componentInstance.lsfechaesti=lsFechasPagos;
      modalRef.result.then((result) => { 
        this.fecha = result
        this.ingreso.lsFechasEstimadas=this.fecha;
        this.lsFechaEstimada=this.ingreso.lsFechasEstimadas;
       if( this.fecha.length>0){
          // this.fecha=this.lsFechaEstimada[this.lsFechaEstimada.length-1];
          // this.egreso.fecha_estimada_cobro =this.fecha.fecha_estimada;
          this.ingreso.fecha_estimada_cobro = this.fecha[this.fecha.length-1].fecha_estimada;
          this.fecha.fecha_estimada_cobro=  this.ingreso.fecha_estimada_cobro;
        }else{
          this.fecha="";
          this.ingreso.fecha_estimada_cobro=null;
        }
  
     }, (reason) => {
     });
     }
}
