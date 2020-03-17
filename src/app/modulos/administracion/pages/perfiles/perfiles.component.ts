import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Perfil } from '../../../../models/Perfil.models';
import { PerfilService } from '../../../../services/Perfil/perfil.service';
import { NuevoPerfilComponent } from './modals/nuevo-perfil/nuevo-perfil.component';
import { AgregarPermisosPaginaComponent } from './modals/agregar-permisos-pagina/agregar-permisos-pagina.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styles: []
})  
export class PerfilesComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private perfilService :PerfilService,
    public router : Router
  ) { }
  perfil:Perfil = new Perfil();
  perfil_post:Perfil = new Perfil();
  lsPerfil: Array<any> = [];

  ngOnInit() {
    this.listPerfiles();
  }

  listPerfiles() {      
    this.perfilService.listarPerfil().subscribe((resp:any) => {debugger
      this.lsPerfil = resp.aaData;
     });
  }

  nuevoPerfil(){
    let indice = null;
    this.openModal(indice);
  }

  ActualizarPerfil(indice){
    this.openModal(indice);
  }

  public openModal(indice) {debugger
    const modalRef = this.modalService.open(NuevoPerfilComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    for(let cat of this.lsPerfil.slice(indice,indice+1)){
      this.perfil_post=new Perfil();
      this.perfil_post.id_perfiles = cat.id_perfiles;
      this.perfil_post.nombres = cat.nombres;
      this.perfil_post.estado = cat.estado;
    }
    modalRef.componentInstance.index = indice;
    modalRef.componentInstance.perfil_dat = this.perfil_post;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }

  PermisosPerfil(indice){
    for(let cat of this.lsPerfil.slice(indice,indice+1)){
      this.perfil.id_perfiles = cat.id_perfiles;
    }
    const modalRef = this.modalService.open(AgregarPermisosPaginaComponent,
      {
        // backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    modalRef.componentInstance.index = indice;
    modalRef.componentInstance.idPerfiles = this.perfil.id_perfiles;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }
  
  EliminarPefil(indice){
    for(let cat of this.lsPerfil.slice(indice,indice+1)){
      this.perfil.id_perfiles = cat.id_perfiles;
    }
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.perfilService.eliminarPerfil(this.perfil).subscribe((resp: any) => {
          this.redirectTo(this.router.url);
        });
      }
    })
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
