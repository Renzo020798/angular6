import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EgresosService } from '../../../../../../../services/egresosService';
import Constantes from '../../../../../../../models/Constantes';

@Component({
  selector: 'app-previsualizar-documento-egreso-actualizado',
  templateUrl: './previsualizar-documento-egreso-actualizado.component.html',
  styles: []
})
export class PrevisualizarDocumentoEgresoActualizadoComponent implements OnInit {
  @Input() egreso;

  constructor(    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
    public egresosService:EgresosService) { }
  ngOnInit() {
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
        this.actualizarEgresoGemp();
        //this.redirectTo();
      }
    })
  }



  actualizarEgresoGemp(){     
    this.egresosService.actualizarEgresoGemp(this.egreso).subscribe((resp) => {
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
    this.egresosService.listarEgreso({"id_empresa": Number(localStorage.getItem('empresaselect'))}).subscribe((resp) => { 
      if (resp == null) {

      } else { 
        
      }
      })}
    
    
    }
