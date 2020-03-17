import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroCostoService } from '../../../../services/centroCosto/centroCosto.service';
import { CentroCosto } from '../../../../models/centrocosto.model';
import Swal from 'sweetalert2';
import { Company } from '../../../../models/company.model';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { PorcentajeTipoVentaComponent } from './modals/porcentaje-tipo-venta/porcentaje-tipo-venta.component';
import { DatosAdicionalesIniciales } from '../../../../models/datos-adicionales.-iniciales';
import { DatosAdicionales } from '../../../../models/datosadicionales.model';
import { Router } from '@angular/router';
import { NuevoCentroCostosComponent } from './modals/nuevo-centro-costos/nuevo-centro-costos.component';

@Component({
  selector: 'app-centro-costos',
  templateUrl: './centro-costos.component.html',
  styles: []
})
export class CentroCostosComponent implements OnInit {

  // @ViewChild('CuentaIE') CuentaIE: ElementRef;
  constructor(
    private activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private centroCostoService : CentroCostoService,
    private companyService: EmpresaService

  ) { }
  public centro_costo: CentroCosto = new CentroCosto;
  public company: Company = new Company;
  public datosAdicionalesini:DatosAdicionalesIniciales=new DatosAdicionalesIniciales;

  id_empresa:any;
  lsCentroCosto: any[] = [];
  tipoEmpresa: any;
  public router : Router;

  showAct: String ="";

  nvlU: Boolean = true;
  nvlD: Boolean = true;
  nvlT: Boolean = true;
  nvlC: Boolean = true;

  //
    lstCentroCostosEmp: Array<any>= [];
  @Input() idempresa;
  CompanyCentroCosto:any;
  idDisabled = true;
  // colum: boolean = false;

  // lsCentroCosto: any = [
  //   {
  //     nombre: 'Centro costo 1',
  //     descripcion: 'd cc1',
  //     niveles: '1',
  //     id_tipo_centro_costo:1,
  //     id_centro_costo:1
  //   },
  //   {
  //     nombre: 'cc2',
  //     descripcion: 'dcc2',
  //     niveles:'2',
  //     id_tipo_centro_costo:2,
  //     id_centro_costo:16
  //   },
  //   {
  //     nombre: 'cc3',
  //     descripcion: 'dc3',
  //     niveles:'3',
  //     id_tipo_centro_costo:3,
  //     id_centro_costo:15
  //   },
  //   {
  //     nombre: 'cc4',
  //     descripcion: 'cd4',
  //     niveles:'4',
  //     id_tipo_centro_costo:4,
  //     id_centro_costo:4
  //   }
  // ];

  ngOnInit() {
  // this.listarCentroCostos();
    this.id_empresa = localStorage.getItem('empresaselectid');
    this.listarTipoCentroCostoxEmpresa();    
    //console.log("this.CuentaIE",this.CuentaIE);
  }

  listarCentroCostos() {
    let id_empresa = Number(localStorage.getItem('empresaselect'));
     this.centroCostoService.listarCentroCostos({'id_empresa': id_empresa }).subscribe((resp) => {
     if (resp == null) {

     } else {
       this.lsCentroCosto = resp.aaData;
      }
    });
 }

//  listarCentroCostosPorEmpresa() {
//   let id_empresa = Number(localStorage.getItem('empresaselect'));
//    this.centroCostoService.listarCentroCostosPorEmpresa({'id_empresa': id_empresa }).subscribe((resp) => {
//    if (resp == null) {} else {
//      this.lsCentroCosto = resp.aaData;
//     }
//   });
// }

  NuevoCentroCostos(){
    if(this.centro_costo.id_tipo_centro_costo != null){
      this.modalCentroCostos();
    }else{
      Swal.fire({
        title: 'Rellenar Campo',
        text: 'Seleccione un tipo de centro de costo',
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      })
    }
  }

  modalCentroCostos(){
    const modalRef = this.modalService.open(NuevoCentroCostosComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    modalRef.componentInstance.idempresa = this.id_empresa;
    modalRef.componentInstance.tipoEmpresa = this.tipoEmpresa;
    modalRef.componentInstance.centro_costo_update = undefined;
    modalRef.componentInstance.tipo_cc = this.centro_costo.id_tipo_centro_costo;
    modalRef.result.then((result) => {
      this.listarCentroCostoxTipo();
   },  (reason) => {
    this.activemodal.dismiss('Cancelado');
    this.listarCentroCostoxTipo();
   });
   }

   editarCentroCosto(cc){
    const modalRef = this.modalService.open(NuevoCentroCostosComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass:"ModalMd"
      }
    );
    this.centro_costo=new CentroCosto();
       this.centro_costo.id_centro_costo=cc.id_centro_costo;
       this.centro_costo.id_tipo_centro_costo=cc.tipoCentroCosto.id_tipo_centro_costo;
       this.centro_costo.lsCuentaIngreso=cc.lsCuentaIngreso;
       this.centro_costo.lsCuentaEgreso=cc.lsCuentaEgreso;
       this.centro_costo.descripcion=cc.descripcion;
       this.centro_costo.nombre=cc.nombre;///
       this.centro_costo.niveles=cc.niveles;
       this.centro_costo.id_empresa=cc.id_empresa;
       this.centro_costo.ultimoNivel=cc.ultimoNivel;
       this.centro_costo.cuenta=cc.cuenta;
       this.centro_costo.tipoCentroCosto=cc.tipoCentroCosto;
 
    modalRef.componentInstance.idempresa = this.id_empresa;
    modalRef.componentInstance.tipoEmpresa = this.tipoEmpresa;
    modalRef.componentInstance.centro_costo_update = this.centro_costo;
    modalRef.componentInstance.tipo_cc = this.centro_costo.id_tipo_centro_costo;
    modalRef.result.then((result) => {
      this.listarCentroCostoxTipo();
   }, (reason) => { 
    this.listarCentroCostoxTipo();
   });
  }

   eliminarCentroCosto(cc){
     Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.value) {
        this.centroCostoService.eliminarCentroCosto(cc).subscribe((resp: any) => {
          this.listarCentroCostoxTipo();
        });
      }
    })
  }

  //LISTADOS
  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  

  listarTipoCentroCostoxEmpresa(){
    this.company.id_empresa = Number(localStorage.getItem("empresaselectid"));
    this.companyService.listarTipoCentroCostoxEmpresa(this.company.id_empresa).subscribe((resp: any) => {  
      this.CompanyCentroCosto = resp.defaultObj; 
      this.tipoEmpresa = this.CompanyCentroCosto.tipo_empresa;
      this.lstCentroCostosEmp = this.CompanyCentroCosto.tipo_empresas.tipo_centro_costo_empresa;
    });
  }
  
    listarCentroCostoxTipo(){
    let obj:any=new Object;
    obj.id_tipo_centro_costo=this.centro_costo.id_tipo_centro_costo
    obj.id_empresa=this.company.id_empresa
    if( obj!= null){
      this.centroCostoService.listarCentroCostoxTipo(obj).subscribe((resp: any) => {
        this.lsCentroCosto = resp.aaData;
        this.nivelUno();

        console.log(this.lsCentroCosto, "xxx")
      });
    } else {
      this.lsCentroCosto = []
    }
  }
  //PORCENTAJE - VENTA
  InsertarPorcentajeVentas(){
   let cat = null;
   this.openModal(cat);
  }

  desaparecer(cat){ 
    // {// var tamaño = cat.lscentro_costo3.length;
    // for (let centro of cat.lscentro_costo3){
    //   if (centro.ultimoNivel==true){
    //     cat.esconder = true
    //   }
    // }}
  }

  ActualizarPorcentajeVentas(cat){
    this.openModal(cat);
  }

  public openModal(cat) {
    const modalRef = this.modalService.open(PorcentajeTipoVentaComponent,
     {
       backdrop: 'static',
       keyboard: false,
       size: 'sm'
     }
   );
   let obj: any = new Object;
   obj.id_centro_costo = cat.id_centro_costo;
   obj.niveles = cat.niveles;
   modalRef.componentInstance.objs = obj;
   modalRef.result.then((result) => {
  }, (reason) => {
    });
  }

  nivelUno(){   
      for(let lvl of this.lsCentroCosto){
          if(lvl.lsCuentaIngreso==undefined && lvl.lsCuentaEgreso==undefined){
            this.nvlU=false;
          }
      }
  }
  nivelDos(){
    
  }
  nivelTres(){
    
  }
  nivelCuatro(){
    
  }
  

}
