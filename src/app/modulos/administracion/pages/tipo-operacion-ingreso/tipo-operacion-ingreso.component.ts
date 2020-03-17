import { Component, OnInit } from '@angular/core';
import { TipoOperacIngreso } from '../../../../models/tipooperacingreso.model';
import { TipooperacioningresoService } from '../../../../services/tipooperacioningreso/tipooperacioningreso.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTipoOperacionIngresoComponent } from './modals/nuevo-tipo-operacion-ingreso/nuevo-tipo-operacion-ingreso.component';

@Component({
  selector: 'app-tipo-operacion-ingreso',
  templateUrl: './tipo-operacion-ingreso.component.html',
  styles: []
})
export class TipoOperacionIngresoComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public tipooperacioningresoService : TipooperacioningresoService,
    public router : Router,
  ) { }

  lstaTipoOperacionIngreso: Array<any>=[];
  public tipo_operacion_ingreso:TipoOperacIngreso = new TipoOperacIngreso();
  

  ngOnInit() {
    this.ListaTipoOperacionIngreso();
  }

  ListaTipoOperacionIngreso(){
    this.tipo_operacion_ingreso.id_empresa = Number(localStorage.getItem("empresaselectid"));
    this.tipooperacioningresoService.listTipoOperacionIngreso(this.tipo_operacion_ingreso).subscribe((resp: any) => {
      this.lstaTipoOperacionIngreso = resp.aaData;
    });
  }
 
  InsertarTipoOperacionIngreso(){
     let cat = null;
    this.openModal(cat);
  } 
 
  ActualizarTipoOperacionIngreso(cat){
     this.openModal(cat);
  }

  EliminarTipoOperacionIngreso(indice){
    for(let cat of this.lstaTipoOperacionIngreso.slice(indice,indice+1)){
      this.tipo_operacion_ingreso.id_tipo_operac_ingreso = cat.id_tipo_operac_ingreso;
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
        this.tipooperacioningresoService.deleteTipoOperacionIngreso(this.tipo_operacion_ingreso).subscribe((resp: any) => {
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
     const modalRef = this.modalService.open(NuevoTipoOperacionIngresoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    let obj: any = new Object;
    obj.id_tipo_operac_ingreso = cat.id_tipo_operac_ingreso; 
    obj.desc_tipo_operac = cat.desc_tipo_operac;
   
    modalRef.componentInstance.tipooperacioningreso = obj;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }

}
