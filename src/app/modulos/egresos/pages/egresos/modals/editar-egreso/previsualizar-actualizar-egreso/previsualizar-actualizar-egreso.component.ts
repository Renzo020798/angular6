import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EgresosService } from '../../../../../../../services/egresosService';
import Constantes from '../../../../../../../models/Constantes';
import { Egreso } from '../../../../../../../models/Egreso.model';
import { Documento_gemp } from '../../../../../../../models/Documento_gemp.model';

@Component({
  selector: 'app-previsualizar-actualizar-egreso',
  templateUrl: './previsualizar-actualizar-egreso.component.html',
  styles: []
})
export class PrevisualizarActualizarEgresoComponent implements OnInit {
  @Input() egresodat;

  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
        public egresosService:EgresosService) { }
        public ingreso: Egreso = new Egreso();
  ngOnInit() {
    this.listarDocumento();
     this.ingreso=this.egresodat;
  }
  close(){
    this.activemodal.dismiss('Cancelado');
  } 
  public confirmar(){
     Swal.fire({
      title: 'Confirmación',
     // text: `  Desea registrar el ingreso ${this.ingreso.documento.serie_comprobante}-${this.ingreso.documento.nro_comprobante}`,
      text: `Desea registrar el ingreso `,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar' 
    }).then((result) => {
      if (result.value) {
         this.actualizarEgresoGemp();
        //this.redirectTo();
      }
    })
  }

 
  actualizarEgresoGemp(){
    this.egresodat.documento = null;
    this.egresosService.actualizarEgresoGemp(this.egresodat).subscribe((resp) => {
      if(resp.estado==1){
         Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.listarDocumento();
        this.activemodal.close();
      }else{
        Swal.fire('Error en la transaccion',resp.msg , 'error');
        this.activemodal.dismiss('cancelado');
      }
    })
  }
  listarDocumento(){ 
    this.egresosService.listarEgreso({"id_empresa": Number(localStorage.getItem('empresaselect'))}).subscribe((resp) => { 
      if (resp == null) {} else {
        
      }
    });
  }
}
