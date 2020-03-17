import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../../../../../../services/Perfil/perfil.service';
import { Pagina } from '../../../../../../models/Pagina.models';
import { Perfil } from '../../../../../../models/Perfil.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-permisos-pagina',
  templateUrl: './agregar-permisos-pagina.component.html',
  styles: []
})
export class AgregarPermisosPaginaComponent implements OnInit {

  @Input() idPerfiles;
  constructor(
    public activemodal : NgbActiveModal,
    private perfilService :PerfilService
  ) { }

  pagina:Pagina = new Pagina();
  perfil:Perfil = new Perfil();
  lsPaginas: Array<any> = [];
  lsPaginaSeleccionadas: Array<any> = [];
  lsPaginaPerfil: Array<any> = [];

  ngOnInit() {
    this.RetornarPaginas();
  }

  RetornarPaginas() {     
    this.perfilService.listarPagina(this.idPerfiles).subscribe((resp:any) => {   
      this.lsPaginas=[];
      this.lsPaginas = resp.aaData;
      console.log("this.lsPaginas ",this.lsPaginas);

      for(let page of this.lsPaginas){
        if(page.id_perfiles == this.idPerfiles || page.id_perfiles == undefined){
          if(page.id_perfiles != undefined){
            page.checkPaginas = true;
          }else{
            page.checkPaginas = false;
          }
             
          this.lsPaginaPerfil.push(page);
        }
      }
     });
  }

  capturarIdPagina(indice){
    for(let cat of this.lsPaginaPerfil.slice(indice,indice+1)){   
      if(cat.checkPaginas == false){
        let pagina_perfil:any = new Object();
        pagina_perfil.idpagina = cat.idpagina;
        pagina_perfil.id_perfiles = this.idPerfiles;
        pagina_perfil.estado = 1;
        this.perfilService.insertaPerfilesPaginas(pagina_perfil).subscribe((resp: any) => {   
          cat.checkPaginas = true;
        });
      }else{
        let pagina_perfil:any = new Object();
        pagina_perfil.idpagina = cat.idpagina;
        pagina_perfil.id_perfiles = this.idPerfiles;
        this.perfilService.eliminarPerfilesPaginas(pagina_perfil).subscribe((resp: any) => {   
          cat.checkPaginas = false;
        });
      }
    }
  }

  AgregarPermisos() {   
    this.activemodal.dismiss('Cancelado');
  }

}
