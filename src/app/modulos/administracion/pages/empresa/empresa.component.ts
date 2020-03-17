import { Component, OnInit} from '@angular/core';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { NuevaEmpresaComponent } from './modals/nueva-empresa.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../../../../models/company.model';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../models/empresa.model';
import { AdicionarDatosComponent } from './modals/adicionar-datos.component';
import { Router } from '@angular/router';

  @Component({
	selector: 'app-empresa',
	templateUrl: './empresa.component.html',
	styles: []
  })
  export class EmpresaComponent implements OnInit {
    router: Router;
  
    constructor(private modalService: NgbModal,
    private empresaService: EmpresaService ) { }
    public company:Company = new Company();
    lsEmpresas: Array<any> = [];
    lsEmpresasxUsu: Array<any> = [];
    private activemodal: NgbActiveModal;
    idDisabled = true;
    id_empresa:any;
    perfil_admin:any;
    longmax: number;
  
    ngOnInit() {
       this.ListarEmpresaXIdEmpresa();
      this.perfil_admin=JSON.parse( localStorage.getItem('perfil_admin'));
  
    }
    
    nuevoEmpresa(){
      let indice = null;
      this.openModal(indice);
    }
   
    public openModal(id) {
 
      if(id==null){
        this.company = null;  
        var urlimagenemp:string = null;
        const modalRef = this.modalService.open(NuevaEmpresaComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass:"ModalMd"
          }
        );
        // modalRef.componentInstance.index = id;
        modalRef.componentInstance.companydat = this.company;
        modalRef.componentInstance.imagenurl = urlimagenemp;
        modalRef.result.then((result) => {
       }, (reason) => {
       });
      }else{
 
        this.empresaService.retornaEmpresaPorId(id).subscribe((resp: any) => {
           
          if(resp.estado==1){
            this.company = resp.defaultObj;
              switch(this.company.tipo_doc_empresa){
                case '0':
                  this.company.tipo_doc_empresa = 'OTROS TIPOS DE DOCUMENTOS';
                  this.longmax = 15; 
                  break;
                case '4':
                  this.company.tipo_doc_empresa = 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)';
                  this.longmax = 8; 
                  break;
                case '6':
                  this.company.tipo_doc_empresa = 'REGISTRO ÚNICO DE CONTRIBUYENTES';
                  this.longmax = 11; 
                  break;
                case '7':
                  this.company.tipo_doc_empresa = 'PASAPORTE';
                  this.longmax = 12; 
                  break;
                case '1':
                  this.company.tipo_doc_empresa = 'CARNET DE EXTRANJERIA';
                  this.longmax = 12; 
                  break;
              }
            var urlimagenemp:string = resp.file;
            const modalRef = this.modalService.open(NuevaEmpresaComponent,
              {
                backdrop: 'static',
                keyboard: false,
                windowClass:"ModalMd"
              }
            );
            // modalRef.componentInstance.index = indice;
            modalRef.componentInstance.companydat = this.company;
            modalRef.componentInstance.longitud_max = this.longmax;
            modalRef.componentInstance.imagenurl = urlimagenemp;
            modalRef.result.then((result) => {
           }, (reason) => {
           });
          }
        });
      }
    }
    
    ListarEmpresa(){
      this.empresaService.listEmpresa().subscribe((resp: any) => {
        this.lsEmpresas = resp.aaData;
       });
    }

    ListarEmpresaXIdEmpresa(){ 
      this.empresaService.listEmpresaIdUsu().subscribe((resp: any) => {
        this.lsEmpresasxUsu = resp.aaData;

        for(let cat of this.lsEmpresasxUsu){
          switch(cat.tipo_doc_empresa){
            case '0':
              cat.tipo_doc_empresa = 'OTROS';
              break;
            case '4':
              cat.tipo_doc_empresa = 'DNI';
              break;
            case '6':
              cat.tipo_doc_empresa = 'RUC';
              break;
            case '7':
              cat.tipo_doc_empresa = 'PASAPORTE';
              break;
            case '1':
              cat.tipo_doc_empresa = 'CARNET EXT.';
              break;
          }
       }
       console.log(this.lsEmpresasxUsu)

       this.lsEmpresasxUsu.map((x)=>{
        x.estadoCompany=x.habilitado;
        if(x.estadoCompany==true){
            x.estadoCompany="Activado";
        }
        else{
          x.estadoCompany="Desactivado"
        }
      });

       });
    }


    habilitarEmpresa(empresa){  
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Se le dara acceso a todos los usuarios registrados en esta empresa",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar' 
      }).then((result) => { 
         if (result.value) {
        const empresaid = empresa.id_empresa;
         this.empresaService.habilitarEmpresa({"id_empresa":empresaid}).subscribe((resp: any) => 
         {
          this.ListarEmpresa();
        })
      }
      }, (reason) => {
 
      });
     }
     
    deshabilitarEmpresa(empresa){  
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Se le restringira el acceso a todos los usuarios registrados en esta empresa",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar' 
      }).then((result) => {
         if (result.value) {
        const empresaid = empresa.id_empresa;
          this.empresaService.desahabilitarEmpresa({"id_empresa":empresaid}).subscribe((resp: any) => 
         {
          this.redirectTo(this.router.url);
          this.ListarEmpresa();
          
       })
        }
      
      },);
     }
     redirectTo(uri){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
    }
    ActualizarEmpresa(id){
      this.openModal(id);
    }
  
    EliminarEmpresa(cat){  console.log("cat ",cat );
         this.company.id_empresa = cat.id_empresa;
        this.company.nro_documento_empresa = cat.nro_documento_empresa;
       
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
          this.empresaService.eliminarEmpresa(this.company).subscribe((resp: any) => {
            this.ListarEmpresaXIdEmpresa();
          });
        }
      })
    }

  FilterCompanyRazonSocial(e){
      this.empresaService.listEmpresa().subscribe((resp: any) => {
        this.lsEmpresas = resp.aaData;
        let query = e.toLowerCase();
        this.lsEmpresas = this.lsEmpresas.filter(item => item.razon_social.toLowerCase().indexOf(query) !== -1);
        });
  }

  FilterCompanyRuc(e){
    this.empresaService.listEmpresa().subscribe((resp: any) => {
      this.lsEmpresas = resp.aaData;
      let query = e
      this.lsEmpresas = this.lsEmpresas.filter(item => item.ruc.indexOf(query) !== -1);
      });
  }

  adicionarCentroCosto(cat){
    this.modalDatosAdicional(cat);
  }
 

  modalDatosAdicional(cat) {debugger
    const modalRef = this.modalService.open(AdicionarDatosComponent,
    {
      backdrop: 'static',
      keyboard: false,
      windowClass:"ModalMd"
    });
    modalRef.componentInstance.idempresa = this.id_empresa;
    modalRef.componentInstance.valoresIniciales_input=cat;
    modalRef.result.then((result) => {      
    },(reason) => {
    this.activemodal.dismiss('Cancelado');
    });
  }
  
  }