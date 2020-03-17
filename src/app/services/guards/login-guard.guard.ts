import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
@Injectable()
export class LoginGuardGuard implements CanActivate {
  estadologin:boolean=true;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    this._usuarioService.estaLogueado().subscribe(
      result => {      
        this.estadologin=true;
      },
      error => {
         if(error.status!=200){
           swal('Sesión caducada', 'Por favor autentifiquese nuevamente ', 'error' );
          this.router.navigate(['/login']);
         //  this.estadologin=false;         
         }
      }
    );
    return this.estadologin;
  }
}
