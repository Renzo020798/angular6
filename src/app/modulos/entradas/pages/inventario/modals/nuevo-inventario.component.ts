import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../../../models/usuario.model';
import { UsuarioService } from '../../../../../services/service.index';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../../../services/Perfil/perfil.service';

@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.component.html',
  styles: []
})
export class NuevoInventarioComponent implements OnInit {
  constructor(
     public activemodal : NgbActiveModal
     ) { }
  
  @Input() newUsusario;
  @Input() userind;
  
  
  public user:Usuario = new Usuario();
  lsUsuario: Array<any> = [];
  lsperfiles: Array<any> = [];
  tituloEmpleado: string;
  
  ngOnInit() {
     this.Inicializar();
    
  }
  
  public Inicializar() {
          
    if(this.userind == null){
      this.user = new Usuario();
      this.user.id_empresa = this.newUsusario.id_empresa;
      this.tituloEmpleado = "Nuevo Inventario";
    }else{
      this.user = this.newUsusario;
      this.tituloEmpleado = "Editar Inventario";
    }
  }
  
  close(){
    this.user = null;
    this.activemodal.dismiss('Cancelado');  
  }
 
 
}
