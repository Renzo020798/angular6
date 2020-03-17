import { Component, OnInit } from '@angular/core';
import { TipoOperacEgreso } from '../../../../models/tipooperacegreso.model';
import { TipooperacionegresoService } from '../../../../services/tipooperacionegreso/tipooperacionegreso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NuevoTipoOperacionEgresoComponent } from './nuevo-tipo-operacion-egreso/nuevo-tipo-operacion-egreso.component';

@Component({
  selector: 'app-tipo-operacion-egreso',
  templateUrl: './tipo-operacion-egreso.component.html',
  styles: []
})
export class TipoOperacionEgresoComponent implements OnInit {

  constructor(
    
    public tipooperacionegresoService : TipooperacionegresoService,
    private modalService: NgbModal,
    public router : Router,
  ) { }

  public tipo_operacion_egreso:TipoOperacEgreso= new TipoOperacEgreso();
  lstaTipoOperacionEgreso: Array<any>=[];

  ngOnInit() {
    this.ListaTipoOperacionEgreso()
  }

  ListaTipoOperacionEgreso(){
    this.tipo_operacion_egreso.id_empresa = Number(localStorage.getItem("empresaselectid"));
    this.tipooperacionegresoService.listTipoOperacionEgreso(this.tipo_operacion_egreso).subscribe((resp: any) => {
      this.lstaTipoOperacionEgreso = resp.aaData;
    });
  }
 
  InsertarTipoOperacionEgreso(){
     let cat = null;
    this.openModal(cat);
  }
 
  ActualizarTipoOperacionEgreso(cat){
     this.openModal(cat);
  }


  EliminarTipoOperacionEgreso(indice){
    for(let cat of this.lstaTipoOperacionEgreso.slice(indice,indice+1)){
      this.tipo_operacion_egreso.id_tipo_operac_egreso = cat.id_tipo_operac_egreso;
    }
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
        this.tipooperacionegresoService.deleteTipoOperacionEgreso(this.tipo_operacion_egreso).subscribe((resp: any) => {
          this.redirectTo(this.router.url);

        });
      }
    })
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
 
  public openModal(cat) {
     const modalRef = this.modalService.open(NuevoTipoOperacionEgresoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    let obj: any = new Object;
    obj.id_tipo_operac_egreso = cat.id_tipo_operac_egreso; 
    obj.desc_tipo_operac = cat.desc_tipo_operac;
    modalRef.componentInstance.tipooperacionegresodat = obj;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }

}
