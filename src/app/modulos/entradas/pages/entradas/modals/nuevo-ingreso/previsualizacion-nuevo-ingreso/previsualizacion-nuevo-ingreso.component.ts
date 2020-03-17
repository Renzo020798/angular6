import { Component, OnInit, Input } from '@angular/core';
import { ConfirmarNuevoIngresoComponent } from '../../confirmar-nuevo-ingreso/confirmar-nuevo-ingreso.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '../../../../../../../models/ingreso.model';
import { EntradasService } from '../../../../../../../services/entradas.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';

@Component({
  selector: 'app-previsualizacion-nuevo-ingreso',
  templateUrl: './previsualizacion-nuevo-ingreso.component.html',
  styles: []
})
export class PrevisualizacionNuevoIngresoComponent implements OnInit {
  @Input() ingresodat;

  constructor(
    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    public entradaService:EntradasService,
  ) { }
  public ingreso: Ingreso = new Ingreso();

  ngOnInit() {
  this.ingreso=this.ingresodat;
  if(this.ingreso.documento.total_pagado==null){
    this.ingreso.documento.total_pagado =0.0;
  }
  }


  insertaIngresoGemp() {
    
    this.entradaService.insertaIngresoGemp(this.ingreso).subscribe((resp) => {
    if(resp.estado==1){
      Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
      //this.listarDocumento();
      this.listarDocumentoPorCentroCosto(this.ingreso.id_centro_costo);
      this.activemodal.close();
    }else{
      Swal.fire('Error en la transaccion',resp.msg , 'error');
      this.activemodal.close();
    }
  })
}

listarDocumento(){ 
  this.entradaService.listarIngreso({"id_empresa": Number(localStorage.getItem('empresaselect'))}).subscribe((resp) => { 
    if (resp == null) {} else {
      
    }
  });
}


listarDocumentoPorCentroCosto(id_centro_costo){ 
  this.entradaService.listarIngreso({"id_empresa": Number(localStorage.getItem('empresaselect')),"id_centro_costo":id_centro_costo}).subscribe((resp) => { 
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
      this.insertaIngresoGemp();
      //this.redirectTo();
      this.activemodal.close();
    }
  })
}
  close(){
    this.activemodal.dismiss('Cancelado');
  }

}