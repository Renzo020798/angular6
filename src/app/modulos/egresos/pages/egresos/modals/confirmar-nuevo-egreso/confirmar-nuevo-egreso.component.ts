import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { PrevisualizacionNuevoIngresoComponent } from '../../../../../entradas/pages/entradas/modals/nuevo-ingreso/previsualizacion-nuevo-ingreso/previsualizacion-nuevo-ingreso.component';
import { EgresosService } from '../../../../../../services/egresosService';

@Component({
  selector: 'app-confirmar-nuevo-egreso',
  templateUrl: './confirmar-nuevo-egreso.component.html',
  styles: []
})
export class ConfirmarNuevoEgresoComponent implements OnInit {

  constructor(     private modalService: NgbModal,
    public egresosService:EgresosService,
    public activemodal : NgbActiveModal
    ) { }
  @Input() egreso;
  ngOnInit() {
  }
  insertaEgresoGemp() {
    
    this.egresosService.insertaEgresoGemp(this.egreso).subscribe((resp) => {
    if(resp.estado==1){
      Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
      this.listarDocumento();
    }else{
      Swal.fire('Error en la transaccion',resp.msg , 'error');
      this.activemodal.close();
    }
  })
}

listarDocumento(){ 
  this.egresosService.listarEgreso({"id_empresa": this.egreso.id_empresa}).subscribe((resp) => { 
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

public retroceder() {
  const modalRef = this.modalService.open(PrevisualizacionNuevoIngresoComponent,
    {
      backdrop: "static",
      keyboard: false,
      size: 'lg'
    }
  );
  this.activemodal.close();
  modalRef.componentInstance.egreso = this.egreso;
  modalRef.result.then((result) => {
  }, (reason) => {
  });
}

cancelar() {
  this.activemodal.dismiss();
}
}
