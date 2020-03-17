import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    if(this._usuarioService.token!=undefined){
            
      let token = this._usuarioService.token;
     return this.verificaRenueva(token);
    }else{
      this._usuarioService.logout();
    }
  }


  verificaRenueva( token: string ): Promise<boolean>  {
    return new Promise( (resolve, reject) => {
     if(this._usuarioService.checkToken(token)){}else{
      this._usuarioService.logout();
     }
             
    });

  }


 
}
