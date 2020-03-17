import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/service.index';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { SidebarService } from '../../../services/shared/sidebar.service';
import { HeaderService } from '../../../services/shared/header.service';
import { Usuario } from '../../../models/usuario.model';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styles: []
})
export class SettingComponent implements OnInit {
  menuModulos:any[];
  usuario: Usuario;

  moduloSelected:number=0;
  constructor( public _ajustes: SettingsService ,
    public _usuarioService: UsuarioService, 
    public _headerService:HeaderService,  
    public _siderService:SidebarService,
    public comp: SidebarComponent ,
    public hederComp:HeaderComponent) { }

  ngOnInit() {
    this.colocarCheck();
    this.usuario = this._usuarioService.usuario;
     
    
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link );

    this._ajustes.aplicarTema( tema );

  }



  cargarOpcionesModulo(modulo:number,name:string){  
    this.comp.moduloSelect=modulo;  

    localStorage.setItem('idmoduloselected',String(modulo));
    localStorage.setItem('namemoduloselected',String(name));
    
    
  }

  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
