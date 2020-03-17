import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import { Company } from '../../../../models/company.model';
import { NuevoEmpleadoComponent } from './modals/nuevo-empleado.component';
import { Usuario } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/service.index';

@Component({
	selector: 'app-empleado',
	templateUrl: './empleado.component.html',
	styles: []
})
export class EmpleadoComponent implements OnInit {

  constructor(private modalService: NgbModal, private empresaService: EmpresaService,
  private usuarioService: UsuarioService) { }

  lsEmpresas: Array<any> = [];
  lsUsuario: Array<any> = [];
  public user:Usuario = new Usuario();
  public company: Company = new Company();
  idDisabled = true;
  id_empresa:any;

  ngOnInit() {
    this.ListarUsuario();
    this.listarEmpresa();
  }
  public nuevoUsuario() {

    let indice = null;
    this.openModal(indice);
  }

  public openModal(indice) {


    if(indice != null){
      for(let cat of this.lsUsuario.slice(indice,indice+1)){
      this.user = cat;
	  this.user.id_empresa = cat.company.id_empresa;
      this.user.idperfiles = cat.userperfiles.id_perfiles;
      }
    }else{
      //this.user = new Usuario();
    }
    const modalRef = this.modalService.open(NuevoEmpleadoComponent,
      { backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    modalRef.componentInstance.newUsusario = this.user;
   modalRef.componentInstance.userind = indice;

   modalRef.result.then((result) => {
      this.ListarUsuario();
    }, (reason) => {
     this.ListarUsuario();
   });
  }

  listarEmpresa() {
    this.empresaService.listEmpresa().subscribe((resp: any) => {
      this.lsEmpresas = resp.aaData;
      console.log("listEmmpresa",this.lsEmpresas)


      const empresaid = localStorage.getItem('empresaselect');
      if(empresaid != undefined){
        this.user.id_empresa=Number(empresaid);   
      }else{
        this.user.id_empresa=this.user.id_empresa;      
      }

      this.ListarUsuarioxEmpresa(this.user.id_empresa);
     });
  }

  ListarUsuario(){
	this.usuarioService.retornarUsuario(this.user).subscribe((resp: any) => {
      this.lsUsuario = resp.aaData;
     });
  }

  ListarUsuarioxEmpresa(event){
    this.user.id_empresa = event
    if(this.user.id_empresa != null){
      this.idDisabled = false;
    }else{
      this.idDisabled = true;
    }
    this.usuarioService.retornarUsuario(this.user).subscribe((resp: any) => {
      this.lsUsuario = resp.aaData;
  
    });
  }


  EliminarUsuario(indice) {                      
    for(let cat of this.lsUsuario.slice(indice,indice+1)){
      this.user.id_usuarios = cat.id_usuarios;
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
        this.usuarioService.deleteUsuario(this.user).subscribe((resp: any) => {
          this.ListarUsuario();
        });
      }
    })
  }

  ActualizarUsuario(indice){
    this.openModal(indice);
  }

}

