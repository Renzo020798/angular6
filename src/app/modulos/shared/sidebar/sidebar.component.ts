import { Component, OnInit} from '@angular/core';

import { SidebarService, UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
 
 
  usuario: Usuario;
  moduloSelect:number=0;
  moduloName:string="";
  menuopciones: any[] = [];
  menu:  any[] = [];
  openPerfil:boolean=false;
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.usuario.nombre_perfil = this._usuarioService.usuario.perfil.nombres;
    this.usuario.nombre_empresa = this._usuarioService.usuario.empresa.nombre_comercial_empresa;
    console.log("this.usuario ",this.usuario);
    this.moduloSelect = Number(localStorage.getItem('idmoduloselected'));
    this.moduloName = localStorage.getItem('namemoduloselected');
    //this.cargaMenuPorModulo(this.moduloSelect);
    this.cargaPaginasPorModulo();
  }
  
  cargaMenuPorModulo(modulo:number){
    this._sidebar.cargarMenuOpcionesModulo(modulo,this.moduloName).subscribe( resp => {
      this.moduloSelect=modulo;        
    });
  }
  cargaPaginasPorModulo(){       
    this._sidebar.cargarPaginasOpcionesModulo().subscribe( resp => {       
      //this.moduloSelect=modulo;        
    });
  }
  
collapsePerfil(){

  if(this.openPerfil){
  this.openPerfil=! this.openPerfil;
  }
}


  toggleCollapse(modulo:number) { 
   
        for (let index = 0; index < this._sidebar.menu.length; index++) {
               const element = this._sidebar.menu[index];
               if(element.idmodulo==modulo){
                 if(this._sidebar.menu[index].open){
                  this._sidebar.menu[index].open=false;
                 }else{
                  this._sidebar.menu[index].open=true;
                 }
               }else{
                this._sidebar.menu[index].open=false;
               }
        }
        this._sidebar.menu.forEach(element => {
        });
        this.collapsePerfil();
        this._sidebar.notificacion.emit();
  }

  logout(){
    this._usuarioService.logout();
  }

  dashboard(){
    this._usuarioService.dashboard();
  }

}
