import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../../../models/usuario.model';
import { UsuarioService } from '../../../../../services/service.index';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../../../services/Perfil/perfil.service';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styles: []
})
export class NuevoEmpleadoComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService, 
    public activemodal : NgbActiveModal,
    private perfilService :PerfilService
    ) { }
  
  @Input() newUsusario;
  @Input() userind;
  
  
  public user:Usuario = new Usuario();
  lsUsuario: Array<any> = [];
  lsperfiles: Array<any> = [];
  tituloEmpleado: string;
  
  ngOnInit() {
    this.listPerfiles();
    this.Inicializar();
    
  }
  
  public Inicializar() {
          
    if(this.userind == null){
      this.user = new Usuario();
      this.user.id_empresa = this.newUsusario.id_empresa;
      this.tituloEmpleado = "Nuevo Usuario";
    }else{
      this.user = this.newUsusario;
      this.tituloEmpleado = "Editar Usuario";
    }
  }
  
  close(){
    this.user = null;
    this.activemodal.dismiss('Cancelado');  
  }

  insertUsers() {debugger
    var boolean= this.validar_email(this.user.email);
    if(boolean!=false || this.user.email=="" || this.user.email==undefined){
      if(this.userind != null){
        Swal.fire({
          title: '¿Estas seguro?',
          text: "Se Actualizará el usuario",
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {debugger
            this.usuarioService.updateUsuario(this.user).subscribe((resp: any) =>
            {
              this.activemodal.dismiss(resp);
            }); 
          }
        })
      }else{
        this.user.accion='';
        var boolean= this.validar_email(this.user.email);
        if(boolean!=false || this.user.email=="" || this.user.email==undefined){
          Swal.fire({
            title: '¿Estas seguro?',
            text: "Se Insertará un usuario nuevo",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.value) {debugger
              this.usuarioService.insertarUsuario(this.user).subscribe((resp: any) => { 
                this.activemodal.dismiss(resp);
              });
            }
          })
        }else{
          swal('Email','Correo incorrecto', 'error');
        }
      }
    }
  }
    //this.close();
    // this.ListarUsuario();
  

  validar_email(user) 
  {
      var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var bool=regex.test(user)
if(bool!=false){
  return true;
}
else{
  return false;
}

  }

  

  // ListarUsuario(){      
  //   this.usuarioService.retornarUsuario(this.user).subscribe((resp: any) => {      
  //     this.lsUsuario = resp.aaData;
  //     console.log('lsUsuario: ', this.lsUsuario);
  //   });
  // }


  listPerfiles() {  
    this.perfilService.listarPerfil().subscribe((resp:any) => {debugger
      this.lsperfiles = resp.aaData;
     });   
    // this.usuarioService.listPerfiles().subscribe((resp:any) => {
    //   this.lsperfiles = resp.aaData;
    //  });
  }
  
  
}
