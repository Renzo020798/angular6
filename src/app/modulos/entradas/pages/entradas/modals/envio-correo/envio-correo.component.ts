import { Component, OnInit, Input } from '@angular/core';
import { EntradasService } from '../../../../../../services/entradas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envio-correo',
  templateUrl: './envio-correo.component.html',
  styles: []
})
export class EnvioCorreoComponent implements OnInit {
  @Input() input_documento_email;

  constructor(private entradasService: EntradasService,public activemodal : NgbActiveModal) { }

  ngOnInit() {
  }
  envioCPE(){                                                  
    const obj={
      "id_documento": this.input_documento_email.id_documento,
      "id_empresa": this.input_documento_email.id_empresa,
      "asunto": this.input_documento_email.asunto,
    }

      Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          // guia.fecha_operacion = guia.fecha_operacion_tmp;
          this.entradasService.envioCPE(obj).subscribe( (resp: any) => {
            if (resp.estado == 1) {
              Swal.fire('Proceso correcto', resp.msg,'success')
              this.activemodal.dismiss('Cancelado');
            } else {
              Swal.fire(
                'Error',
                resp.msg,
                'error'
              )
            }
          });
        }
      })

  }

  public close(){
    this.activemodal.dismiss('Cancelado');
   }
}
