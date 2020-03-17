import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoOperacEgreso } from '../../../../../models/tipooperacegreso.model';
import { TipooperacionegresoService } from '../../../../../services/tipooperacionegreso/tipooperacionegreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tipo-operacion-egreso',
  templateUrl: './nuevo-tipo-operacion-egreso.component.html',
  styles: []
})
export class NuevoTipoOperacionEgresoComponent implements OnInit {

  @Input() tipooperacionegresodat;
  constructor(
    public router : Router,
    public tipooperacionegresoService : TipooperacionegresoService,
    public activemodal : NgbActiveModal,
  ) { }

  public tipo_operacion_egreso:TipoOperacEgreso = new TipoOperacEgreso();
  tituloTipoOpeEgreso: string;

  ngOnInit() {
    if(this.tipooperacionegresodat != null){
      this.tipo_operacion_egreso = this.tipooperacionegresodat;
      this.tituloTipoOpeEgreso = "Editar Tipo Operación Egreso";
    }else {
      this.tipo_operacion_egreso =  new TipoOperacEgreso();
      this.tituloTipoOpeEgreso = "Nuevo Tipo Operación Egreso";
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado'); 
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

   UpdateInsertTipoOperacionIngreso() {    
 

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Registro de operacion egreso",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        if( this.tipooperacionegresodat != null ){ 
          this.tipooperacionegresoService.updateTipoOperacionEgreso(this.tipo_operacion_egreso).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);
            this.redirectTo(this.router.url);
          });
        }else{
          this.tipo_operacion_egreso.id_empresa = Number(localStorage.getItem("empresaselectid"));
          this.tipooperacionegresoService.insertTipoOperacionEgreso(this.tipo_operacion_egreso).subscribe((resp: any) => 
          {
            this.activemodal.close(resp);
            this.redirectTo(this.router.url);
          });
        }
    
        }
      });

   
}

}
