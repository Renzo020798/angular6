import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { EntradasService } from '../../../../../../services/entradas.service';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrevisualizacionNuevoIngresoComponent } from '../nuevo-ingreso/previsualizacion-nuevo-ingreso/previsualizacion-nuevo-ingreso.component';

@Component({
  selector: 'app-confirmar-nuevo-ingreso',
  templateUrl: './confirmar-nuevo-ingreso.component.html',
  styles: []
})
export class ConfirmarNuevoIngresoComponent implements OnInit {

  constructor(     private modalService: NgbModal,
    public entradaService:EntradasService,
    public activemodal : NgbActiveModal
    ) { }
  @Input() ingreso;

  ngOnInit() {

  }

  insertaIngresoGemp() {
    
      this.entradaService.insertaIngresoGemp(this.ingreso).subscribe((resp) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.listarDocumento();
        this.activemodal.close();
      }else{
        Swal.fire('Error en la transaccion',resp.msg , 'error');
        this.activemodal.close();
      }
    })
  }
  
  listarDocumento(){ 
    this.entradaService.listarIngreso({"id_empresa": this.ingreso.id_empresa}).subscribe((resp) => { 
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
  
  public retroceder() {
    const modalRef = this.modalService.open(PrevisualizacionNuevoIngresoComponent,
      {
        backdrop: "static",
        keyboard: false,
        size: 'lg'
      }
    );
    this.activemodal.close();
    modalRef.componentInstance.ingreso = this.ingreso;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  cancelar() {
    this.activemodal.dismiss();
  }
}
