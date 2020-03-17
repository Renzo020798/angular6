import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarNuevoEgresoComponent } from '../../confirmar-nuevo-egreso/confirmar-nuevo-egreso.component';
import { Egreso } from '../../../../../../../models/Egreso.model';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';
import { EgresosService } from '../../../../../../../services/egresosService';
import { FechaEstimadaComponent } from '../../fecha-estimada/fecha-estimada.component';
// import {a} from '../../confirmar-nuevo-egreso/confirmar-nuevo-egreso.component'
@Component({
  selector: 'app-previsualizacion-nuevo-egreso',
  templateUrl: './previsualizacion-nuevo-egreso.component.html',
  styles: []
})
export class PrevisualizacionNuevoEgresoComponent implements OnInit {
  @Input() egresodat;

  constructor(
    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    public egresosService:EgresosService

  ) { }
  public egreso: Egreso = new Egreso();
  lsFechaEstimada:Array<any>=[];
  fecha_esti:any;

  ngOnInit() {
    this.egreso=this.egresodat;

  }

  insertaEgresoGemp() {
    console.log("this.egreso ",this.egresodat);
    this.egresosService.insertaEgresoGemp(this.egresodat).subscribe((resp) => {
    if(resp.estado==1){
      Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
     // this.listarDocumento();
      this.listarDocumentoCentroCosto(this.egresodat.id_centro_costo);
    }else{
      Swal.fire('Error en la transaccion',resp.msg , 'error');
      this.activemodal.close();
    }
  })
}

listarDocumento(){ 
  this.egresosService.listarEgreso({"id_empresa": Number(localStorage.getItem('empresaselect'))}).subscribe((resp) => { 
    if (resp == null) {} else {
      
    }
  });
}


listarDocumentoCentroCosto(id_centro_costo){ 
  this.egresosService.listarEgreso({"id_empresa": Number(localStorage.getItem('empresaselect')),"id_centro_costo":id_centro_costo}).subscribe((resp) => { 
    if (resp == null) {} else {
      
    } 
   });
}  

public confirmar(){

  Swal.fire({
    title: 'Confirmación',
    // text: `Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
    text: `Desea registrar el ingreso `,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.value) {
      this.insertaEgresoGemp();
      //this.redirectTo();
      this.activemodal.close();
    }
  })
}

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  FechaEstimadaEgreso(){
    const modalRef = this.modalService.open(FechaEstimadaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
      }
    );
    modalRef.componentInstance.lsfechaesti=this.lsFechaEstimada;
    modalRef.componentInstance.fecha_estimada_cobro=this.egresodat.fecha_estimada_cobro;
    modalRef.result.then((result) => {
      this.lsFechaEstimada = result
      for(let fecha of this.lsFechaEstimada){
        this.fecha_esti = fecha.fecha_estimada_cobro;
      }
   }, (reason) => {
   });
   }
}
