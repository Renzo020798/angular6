import { Component, OnInit, Input, NgModuleRef } from '@angular/core';
import { Egreso } from '../../../../../../models/Egreso.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntradasService } from '../../../../../../services/entradas.service';
import { PrevisualizarActualizarEgresoComponent } from './previsualizar-actualizar-egreso/previsualizar-actualizar-egreso.component';
import { EgresosService } from '../../../../../../services/egresosService';
import { FechaEstimadaComponent } from '../fecha-estimada/fecha-estimada.component';
import { CobroService } from '../../../../../../services/ModulosService/cobro.service';
import { Documento_gemp } from '../../../../../../models/Documento_gemp.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-editar-egreso',
  templateUrl: './editar-egreso.component.html',
  styles: []
})
export class EditarEgresoComponent implements OnInit {
  @Input() objegresoOriginal;cuenta;
  public egreso: Egreso = new Egreso();
  public documento:Documento_gemp=new Documento_gemp();
  public id_empresa;

  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    public egresosService:EgresosService,
     private cobroService: CobroService 

    ) { }
    public valiCuentaEgr: boolean = true;
 
    lsEgresos: Array<any> = [];

    lstipocobro: Array<any> = [];
  
    lscobro: Array<any> = [];
    fecha:any=new Object;
    lsFechaEstimada:Array<any>=[];
    fecha_esti:any;
  
    lscuentaegreso: Array<any> = [
      {"cuenta_numero":"123456789"},
      {"cuenta_numero":"987654321"}, 
      {"cuenta_numero":"785412368"} 
    ];
  ngOnInit() {
    this.egreso = this.objegresoOriginal;
    this.lsFechaEstimada=this.egreso.lsFechasEstimadas;
    this.fecha.fecha_estimada_cobro= this.objegresoOriginal.fecha_estimada_cobro;
 


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
    this.listarcobro();
    this.listartipocobro();
  }
 
  
  close(){
    this.activemodal.dismiss('Cancelado');
  }
  seteCuenta(event){
    this.documento.id_cuenta=event.id_cuenta;
    this.egreso.id_cuenta=this.documento.id_cuenta;  
    
   this.egreso.cuenta_numero=event.cuenta.descripcion_cuenta;
    
   }
ListaTipoOperacionEgreso(){
  this.id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
  this.egresosService.listTipoOperacionEgreso({'id_empresa': this.id_empresa }).subscribe((resp: any) => {
    this.lsEgresos = resp.aaData;
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
    modalPrevisualizarEgreso(){
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
      if ( this.egreso.cuenta_numero!=null
        && this.egreso.cuenta_numero!=undefined) {
      const modalRef = this.modalService.open(PrevisualizarActualizarEgresoComponent,
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
    FechaEstimadaEgreso(){
      
      const modalRef = this.modalService.open(FechaEstimadaComponent,
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
     modalRef.componentInstance.lsfechaesti= lsFechasPagos;
      modalRef.result.then((result) => {
        this.fecha = result
        this.egreso.lsFechasEstimadas=this.fecha;
        this.lsFechaEstimada=this.egreso.lsFechasEstimadas;
       if( this.fecha.length>0){
          // this.fecha=this.lsFechaEstimada[this.lsFechaEstimada.length-1];
          // this.egreso.fecha_estimada_cobro =this.fecha.fecha_estimada;
          this.egreso.fecha_estimada_cobro = this.fecha[this.fecha.length-1].fecha_estimada;
          this.fecha.fecha_estimada_cobro=  this.egreso.fecha_estimada_cobro;
        }else{
          this.fecha="";
          this.egreso.fecha_estimada_cobro=null;
        }
  
     }, (reason) => {
     });
     }

}
