import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Perfil } from '../../../../../../models/Perfil.models';
import { PerfilService } from '../../../../../../services/Perfil/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-perfil',
  templateUrl: './nuevo-perfil.component.html',
  styles: []
})
export class NuevoPerfilComponent implements OnInit {

  @Input() index; perfil_dat;
  constructor(
    public activemodal : NgbActiveModal,
    private perfilService :PerfilService,
    public router : Router
  ) { }
  perfil:Perfil = new Perfil();
  
  tituloPerfil: string;

  ngOnInit() {
    this.Inicializar();
  }

  Inicializar() {  
    if(this.index == null){
      this.tituloPerfil = "Nueva Perfil";
      this.perfil = new Perfil();
    }else{
      this.perfil = this.perfil_dat;
      this.tituloPerfil = "Editar Perfil";
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  UpdateInsertPerfil() {   debugger 
    Swal.fire({
    title: '¿Estas seguro?',
    text: "Registro de nueva Cuenta",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {debugger
    if (result.value) {
      if(this.perfil.estado == Number(true)){
        this.perfil.estado = 1;
      }else{
        this.perfil.estado = 0;
      }      
      if( this.index != null ){
        this.perfilService.updatePerfil(this.perfil).subscribe((resp: any) => 
        {
          this.activemodal.dismiss(resp);
          this.redirectTo(this.router.url);
         });
      }else{
        this.perfilService.insertaPerfil(this.perfil).subscribe((resp: any) => 
        {
          this.activemodal.close(resp);
          this.redirectTo(this.router.url);
         });
      }
      }
    }); 
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
