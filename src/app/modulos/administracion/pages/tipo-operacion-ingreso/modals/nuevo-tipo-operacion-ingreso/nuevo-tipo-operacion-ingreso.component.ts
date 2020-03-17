import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipooperacioningresoService } from '../../../../../../services/tipooperacioningreso/tipooperacioningreso.service';
import { TipoOperacIngreso } from '../../../../../../models/tipooperacingreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tipo-operacion-ingreso',
  templateUrl: './nuevo-tipo-operacion-ingreso.component.html',
  styles: []
})
export class NuevoTipoOperacionIngresoComponent implements OnInit {

  constructor(
    public router : Router,
    public tipooperacioningresoService : TipooperacioningresoService,
    public activemodal : NgbActiveModal,
  ) { }

  tituloTipoOpeIngreso: string;

  @Input() tipooperacioningreso;
  public tipo_operacion_ingreso:TipoOperacIngreso = new TipoOperacIngreso();
 
  ngOnInit() {
     if(this.tipooperacioningreso != null){
      this.tipo_operacion_ingreso = this.tipooperacioningreso;
      this.tituloTipoOpeIngreso = "Editar Tipo Operación Ingreso";
    }else {
      this.tipo_operacion_ingreso =  new TipoOperacIngreso();
      this.tituloTipoOpeIngreso = "Nuevo Tipo Operación Ingreso";
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
      text: "Registro de operacion ingreso",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        if( this.tipooperacioningreso != null ){ 
          this.tipooperacioningresoService.updateTipoOperacionIngreso(this.tipo_operacion_ingreso).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);
            this.redirectTo(this.router.url);
          });
        }else{
          this.tipo_operacion_ingreso.id_empresa = Number(localStorage.getItem("empresaselectid"));
          this.tipooperacioningresoService.insertTipoOperacionIngreso(this.tipo_operacion_ingreso).subscribe((resp: any) => 
          {
            this.activemodal.close(resp);
            this.redirectTo(this.router.url);
          });
        }
        }
      });
     

}
}
