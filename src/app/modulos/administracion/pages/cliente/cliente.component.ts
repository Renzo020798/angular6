import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoClienteComponent } from './modals/nuevo-cliente/nuevo-cliente.component';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Empresa } from '../../../../models/empresa.model';
import Swal from 'sweetalert2';
import { CargarExcelClienteComponent } from './modals/cargar-excel-cliente/cargar-excel-cliente.component';
import { Cliente } from '../../../../models/Cliente.models';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private clienteService: ClienteService,
    private empresaService: EmpresaService
  ){}
  public cliente:Cliente = new Cliente();
  public client:Cliente = new Cliente();
  public empresa:Empresa = new Empresa();
  lsCliente: Array<any> = [];
  lsEmpresas: Array<any> = [];
  idDisabled = true;

  ngOnInit() {
    this.listEmpresa();
  }
  
  nuevoCliente(){
    let indice = null;
    this.openModal(indice);
  }

  public openModal(indice) {
    const modalRef = this.modalService.open(NuevoClienteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    for(let cat of this.lsCliente.slice(indice,indice+1)){
      this.client=new Cliente();
      this.client.tipo_doc = cat.tipo_doc;
      switch(this.client.tipo_doc){
        case 'OTRO':
          this.client.tipo_doc = 'OTROS TIPOS DE DOCUMENTOS';
          break;
        case 'DNI':
          this.client.tipo_doc = 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)';
          break;
        case 'RUC':
          this.client.tipo_doc = 'REGISTRO ÚNICO DE CONTRIBUYENTES';
          break;
        case 'PASAPORTE':
          this.client.tipo_doc = 'PASAPORTE';
          break;
        case 'CARNET EXT.':
          this.client.tipo_doc = 'CARNET DE EXTRANJERIA';
          break;
      }
      this.client.id_cliente = cat.id_cliente;
      this.client.id_empresa = cat.id_empresa;
      this.client.nro_doc = cat.nro_doc;
      this.client.razon_social = cat.razon_social;
      this.client.razon_comercial = cat.razon_comercial;
      this.client.email = cat.email;
      this.client.direccion_fiscal = cat.direccion_fiscal;
      this.client.movil = cat.movil;
      this.client.fijo = cat.fijo;
      this.client.cuenta_detraccion = cat.cuenta_detraccion;
      this.client.tipo_doc = cat.tipodocumento.descripcion;
    }
    modalRef.componentInstance.index = indice;
    modalRef.componentInstance.clientedat = this.client;
    modalRef.result.then((result) => {
      this.listEmpresa();

   }, (reason) => {
    this.listEmpresa();

   });
  }

  listEmpresa() {
    this.empresaService.listEmpresa().subscribe((resp: any) => {
      this.lsEmpresas = resp.aaData;
      this.empresa=this.lsEmpresas.find(x => x.id_empresa == this.cliente.id_empresa);
      const empresaid = localStorage.getItem('empresaselect');
      if(empresaid != undefined){
        // tslint:disable-next-line:radix
        this.cliente.id_empresa=parseInt(empresaid);      
      }else{

        this.cliente.id_empresa=this.cliente.id_empresa;        
      }
      this.ListarClientexEmpresa(this.cliente.id_empresa);
    });
  }
  
  ListarClientexEmpresa(event){
    localStorage.setItem('empresaidvar', JSON.stringify(event));

    this.cliente.id_empresa = event;
    if(this.cliente.id_empresa != null){
      this.idDisabled = false;
    }else{
      this.idDisabled = true;
    }
    this.clienteService.listarCliente(this.cliente).subscribe((resp: any) => {
      this.lsCliente = resp.aaData;
      console.log(this.lsCliente, "clienteeeeeeeeees");

      for(let cat of this.lsCliente){
        switch(cat.tipo_doc){
          case '0':
            cat.tipo_doc = 'OTROS';
            break;
          case '4':
            cat.tipo_doc = 'DNI';
            break;
          case '6':
            cat.tipo_doc = 'RUC';
            break;
          case '7':
            cat.tipo_doc = 'PASAPORTE';
            break;
          case '1':
            cat.tipo_doc = 'CARNET EXT.';
            break;
        }
      }
    });
  }

  ActualizarCliente(indice){
    this.openModal(indice);
  }

  EliminarCliente(indice){
    for(let cat of this.lsCliente.slice(indice,indice+1)){
      this.cliente.id_cliente = cat.id_cliente;
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
        this.clienteService.eliminarCliente(this.cliente).subscribe((resp: any) => {
          this.ListarClientexEmpresa(this.cliente.id_empresa);
        });
      }
    })
  }

  FilterClienteDescripcion(e){
    this.clienteService.listarCliente(this.cliente).subscribe((resp: any) => {
      this.lsCliente = resp.aaData;
      let query = e.toLowerCase();
      this.lsCliente = this.lsCliente.filter(item => item.desc_cliente.toLowerCase().indexOf(query) !== -1);
      });
  }

  public openModalCargarExcel() {

    const modalRef = this.modalService.open(CargarExcelClienteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }

}