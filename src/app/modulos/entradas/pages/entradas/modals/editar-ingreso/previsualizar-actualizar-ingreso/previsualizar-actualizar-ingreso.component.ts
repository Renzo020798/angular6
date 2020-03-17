import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';
import { EntradasService } from '../../../../../../../services/entradas.service';
import { Ingreso } from '../../../../../../../models/ingreso.model';

@Component({
  selector: 'app-previsualizar-actualizar-ingreso',
  templateUrl: './previsualizar-actualizar-ingreso.component.html',
  styles: []
})
export class PrevisualizarActualizarIngresoComponent implements OnInit {

  @Input() ingresodat;


  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
        public entradasService:EntradasService) { } 
         public ingreso: Ingreso = new Ingreso();
   
  ngOnInit() {
    this.ingreso=this.ingresodat;

  }
   close(){
    this.activemodal.dismiss('Cancelado');
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
        this.actualizarIngresoGemp();
        //this.redirectTo();
      }
    })
  }

  actualizarIngresoGemp(){
    this.ingresodat.documento = null;
    this.entradasService.actualizarIngreso(this.ingreso).subscribe((resp) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.listarDocumento();
        this.activemodal.close();

      }else{
        Swal.fire('Error en la transaccion',resp.msg , 'error');
      }
    })
  }
  listarDocumento(){
    this.entradasService.listarIngreso({"id_empresa": Number(localStorage.getItem('empresaselect'))}).subscribe((resp) => { 
      if (resp == null) {} else {
        
      }
    });
  }
}
