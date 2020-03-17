import { Component, OnInit } from '@angular/core';
import { Cuenta } from '../../../../models/cuenta.model';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Company } from '../../../../models/company.model';
import { CuentaService } from '../../../../services/cuenta/cuenta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevaCuentaComponent } from './modals/nueva-cuenta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  constructor(
    private empresaService: EmpresaService,
    private cuentaService: CuentaService,
    private modalService: NgbModal,
  ) {}

  public cuenta:Cuenta = new Cuenta;
  public empresa:Company = new Company;
  lsEmpresas: Array<any> = [];
  lsCuenta: Array<any> = [];
  idDisabled = true;
  lstTipoCuenta: Array<any> = [];

  ngOnInit() {
    this.listEmpresa();
    this.listarcomboTipoCuenta();
  }

  listEmpresa() { 
    this.empresaService.listEmpresa().subscribe((resp: any) => { 
       this.lsEmpresas = resp.aaData;
      this.empresa=this.lsEmpresas.find(x => x.id_empresa == this.cuenta.id_empresa);
      const empresaid = localStorage.getItem('empresaselect');
      if(empresaid != undefined){
        this.cuenta.id_empresa=Number(empresaid);   
      }else{
        this.cuenta.id_empresa=this.cuenta.id_empresa;      
      }
      // this.ListarCuentaxEmpresa(this.cuenta);
    });
  }

  // ListarCuentaxEmpresa(dat){
  //   if(this.cuenta.cod_tipo_cuenta != null){
  //     this.cuenta.id_empresa =  dat.id_empresa;
  //     if(this.cuenta.id_empresa && this.cuenta.cod_tipo_cuenta!= null){
  //       this.idDisabled = false;
  //     }else{
  //       this.idDisabled = true;
  //     }
  //     this.cuentaService.listTipoOperacionEgreso(this.cuenta).subscribe((resp: any) => {
  //       this.lsCuenta = resp.aaData;
  //     });
  //   }else{
  //     this.lsCuenta = [];
  //   }
  // }

  listarCuentaPorEmpresaTipoCuenta(){
    if(this.cuenta.cod_tipo_cuenta != null){
      this.cuenta.id_empresa =  Number(localStorage.getItem('empresaselect'));
      if(this.cuenta.id_empresa && this.cuenta.cod_tipo_cuenta!= null){
        this.idDisabled = false;
      }else{
        this.idDisabled = true;
      }
      this.cuentaService.listarCuentaPorEmpresaTipoCuenta(this.cuenta).subscribe((resp: any) => {
        this.lsCuenta = resp.aaData;
      });
    }else{
      this.lsCuenta = [];
    }
  }


  

  InsertarCuenta(){
    let indice = null;
    this.openModal(indice);
  }

  ActualizarCuenta(indice){
    this.openModal(indice);
  }

  public openModal(indice) {
    for(let cat of this.lsCuenta.slice(indice,indice+1)){
      this.cuenta = cat;
    }
    const modalRef = this.modalService.open(NuevaCuentaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    modalRef.componentInstance.index = indice;
    modalRef.componentInstance.cuentadat = this.cuenta;
    modalRef.result.then((result) => {
      this.listarCuentaPorEmpresaTipoCuenta();
    }, (reason) => {

    });
  }

  EliminarCuenta(indice){
    for(let cat of this.lsCuenta.slice(indice,indice+1)){
      this.cuenta.id_cuenta = cat.id_cuenta;
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
        this.cuentaService.eliminarCuenta(this.cuenta).subscribe((resp: any) => {
          this.listarCuentaPorEmpresaTipoCuenta();
        });
      }
    })
  }
 
  FilterCuentaDescripcion(e){
    this.cuentaService.listarCuenta(this.cuenta).subscribe((resp: any) => {
      this.lsCuenta = resp.aaData;
      let query = e.toLowerCase();
      this.lsCuenta = this.lsCuenta.filter(item => item.desc_cuenta.toLowerCase().indexOf(query) !== -1);
    });
  }

  estado = 1;
  listarcomboTipoCuenta(){
    this.cuentaService.retornarcomboTipoCuenta(this.estado).subscribe((resp: any) =>{
      this.lstTipoCuenta = resp.aaData;
    });
  }

  // ObtenerCodTipoCuenta(cod){
  //   this.cuenta.cod_tipo_cuenta = cod;
  //   this.cuenta.id_empresa = Number(localStorage.getItem('empresaselect'));
  //   this.ListarCuentaxEmpresa(this.cuenta.id_empresa);
  // }

}