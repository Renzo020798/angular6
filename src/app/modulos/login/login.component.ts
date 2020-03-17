import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ModalService } from '../../services/modal.service';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert';


declare function init_plugins();
declare const gapi: any;
//declare cosntswal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  recuerdame: boolean = false;
  loadRegister:boolean=false;
  auth2: any;
  token:String="";
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _modalRegister:ModalService,
  ) { }

  ngOnInit() {                      
    init_plugins();
    this.username = localStorage.getItem('username') || '';
    if ( this.username.length > 1 ) {
      this.recuerdame = true;
    }
    this.token = localStorage.getItem('token');
    if(this.token){
       this.router.navigate(['/login']);  
    }else{
      this._usuarioService.logout();
    }
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard'  );
    });
  }


  ingresar( forma: NgForm) {                            
    this.loadRegister=true;
    if ( forma.invalid ) {
      this.loadRegister=false;
      return;
    }
    this.loadRegister=true;  
    let usuario = new Usuario( null, forma.value.username, forma.value.password );
    
    this._usuarioService.loginAuth( usuario, forma.value.recuerdame )
                  .subscribe( res => {                                            
                    this.loadRegister=true;    
                    this._usuarioService.setStorageToken( res.access_token );   
                                   
                    this._usuarioService.retornaUsuario( usuario,res.access_token )
                    .subscribe(resobjuser => {                               
                      this.loadRegister=true;                        
                      if(resobjuser.estado==1){                                       
       
                      // var usuario={"_id":resobjuser.defaultObj.empresa.idempresa,"cuenta":resobjuser.defaultObj.empresa.idcuenta,"nombre":resobjuser.defaultObj.nombres,"username":resobjuser.defaultObj.username,"img":resobjuser.defaultObj.empresa.logo,"empresa":resobjuser.defaultObj.empresa,"lsEmpresas":resobjuser.defaultObj.lsEmpresasEmpleado}
                      var usuario={"id_usuarios": resobjuser.defaultObj.id_usuarios , "_id":resobjuser.defaultObj.company.id_empresa,"nombre":resobjuser.defaultObj.name,"username":resobjuser.defaultObj.username,"empresa":resobjuser.defaultObj.company,"perfil":resobjuser.defaultObj.perfil,"lsEmpresas":resobjuser.defaultObj.lsCompanyUser}                 
                      console.log("usuarioDSSDS ",usuario);
                      var perfil_admin={"nombre":resobjuser.defaultObj.name,"username":resobjuser.defaultObj.username,"perfil_admin":resobjuser.defaultObj.perfil_admin}
                     
                      
                      
                      localStorage.setItem('perfil_admin', JSON.stringify(perfil_admin));

                      this._usuarioService.setStorageUsuario(res.expires_in,usuario,res.access_token);                       
                      
                      this.router.navigate(['/responsable']);                       
                      }else{                      
                        swal('Usuario sin permisos!', 'El usuario logueado no tiene permisos.', 'warning');
                        this._usuarioService.logout();
                        this.loadRegister=false;
                      }
                    },errObjUser => {
                      this.loadRegister=false;
                      if(errObjUser.status==400||errObjUser.status==401){
                       swal('Credenciales invalidos!', 'Por favor, comprueba tu e-mail o contraseña.', 'warning');
                      }      
                      this.loadRegister=false;                
                    });                                    
                  },err => {                       
                    this.loadRegister=false;
                    if(err.status==400||err.status==401){
                     swal('Credenciales invalidos!', 'Por favor, comprueba tu e-mail o contraseña.', 'warning');
                     this.loadRegister=false;  
                    }else{
                     swal('No existe conexión!', 'Por favor, comuniquese con el gestor de su cuenta.', 'error');
                     this.loadRegister=false;  
                    }
                    
                  });
                  this.loadRegister=false;
  }

  registrarUsuario(){
    this._modalRegister.mostrarModal();
  }

}
