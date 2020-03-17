import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  canActivate() {
    
    if ( this._usuarioService.usuario.role === 'ROLE_ADMIN' ) {
      console.log("role-admin")
      return true;
    }else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }

  }

}
