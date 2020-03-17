import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company.model';
import { CentroCosto } from '../../../../models/centrocosto.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoDatosacidicionalesComponent } from './nuevo-datosacidicionales/nuevo-datosacidicionales.component';
import { HistoricoDatosadicionalesComponent } from './historico-datosadicionales/historico-datosadicionales.component';
import { AdicionarDatosadicionalesComponent } from './nuevo-datosacidicionales/adicionar-datosadicionales.component';
import { CuentaService } from '../../../../services/cuenta/cuenta.service';
import { DatosAdicionalesIniciales } from '../../../../models/datos-adicionales.-iniciales';
import { NuevaDepreciacionDatosadicionalesComponent } from './nueva-depreciacion-datosadicionales/nueva-depreciacion-datosadicionales.component';
import { CentroCostosService } from '../../../../services/ModulosService/centro-costos.service';

@Component({
  selector: 'app-datosadicionales',
  templateUrl: './datosadicionales.component.html'
})
export class DatosadicionalesComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public centroCostosService: CentroCostosService,
    private cuentaService:CuentaService

  ){}
  idDisabled = true;
  public company:Company = new Company();
  public datosadicionales:DatosAdicionalesIniciales=new DatosAdicionalesIniciales();

  public centro_costo:CentroCosto = new CentroCosto();
  lsCentroCosto: Array<any> = [
    {
      descripcion: 'CC1',
      nombre: 'Centro Costo 1',
      niveles: 2
    },
    {
      descripcion: 'CC2',
      nombre: 'Centro Costo 2',
      niveles: 1
    }]
  lsCuentaConsumo: Array<any> = [];
  perfil_admin:any;
  empresaProd:any;
  lsCuentaDepreciacion: Array<any> = [];
   /* {
      cod_tipo_cuenta: 'DAO',
      descripcion_cuenta: 'Depreciacion y amortizacion de activos operativos',
      id_empresa: 1 
    },
    {
      cod_tipo_cuenta: 'DAA',
      descripcion_cuenta: 'Depreciacion y amortizacion de activos administrativos',
      id_empresa: 1 
    }]*/
    valNivel1: boolean = false;
    valNivel2: boolean = true;
    valNivel3: boolean = true;
    valNivel4: boolean = true;
    valNewEgr: boolean = false;
    objCenCos: any;
    valor2: any = "";
    valor3: any = "";
    valor4: any = "";
    lsCcostoN1: Array<any> = [];
    lsCcostoN2: Array<any> = [];
    lsCcostoN3: Array<any> = [];
    lsCcostoN4: Array<any> = [];
    val = 0;
    produccion : Boolean;
 
  ngOnInit() {
    
   
   this.perfil_admin=JSON.parse( localStorage.getItem('perfil_admin'));
  this.empresaProd= JSON.parse(localStorage.getItem('datempresa'));
  this.produccion = this.empresaProd.empresaProd;
  console.log("datempresa",this.empresaProd)
  this.listarCuentaDepreciacion();
  this.listaCuentasComsumo();

  }

  listaCuentasComsumo(){
    this.listarCentroCostosTipoVentaNivel1();
  }

  public listarCentroCostosTipoVentaNivel1() {
    let id_empresa = Number(localStorage.getItem('empresaselect'));
     this.centroCostosService.listarCentroCostosTipoVentaNivel1({'id_empresa': id_empresa }).subscribe((resp) => {
     if (resp == null) {} else {
       this.lsCcostoN1 = resp.aaData;
     }
    });
  }
  
  agregarDatoAdicionalConsumo(indice){
    // tslint:disable-next-line:no-unused-expression
    this.openModal(this.lsCuentaConsumo[indice]);
  }

  openModal(cuenta) {
    const modalRef = this.modalService.open(NuevoDatosacidicionalesComponent,
    {
      backdrop: 'static',
      keyboard: false,
      windowClass:"ModalMd"
    });
    modalRef.componentInstance.cuentaConsumo = cuenta;
    modalRef.result.then((result) => {      
    },(reason) => {
    });
  }
  
  agregarDatoAdicional(indice){debugger
    this.openModal1(this.lsCuentaConsumo[indice]);
  }

  openModal1(cuenta) {debugger
    const modalRef = this.modalService.open(AdicionarDatosadicionalesComponent,
    {
      backdrop: 'static',
      keyboard: false,
      windowClass:"ModalMd"
    });
    modalRef.componentInstance.cuentaConsumo = cuenta;
    modalRef.componentInstance.datosAdicionalesdat = this.datosadicionales;
    modalRef.result.then((result) => {      
    },(reason) => {
    });
  }
  

  historicoDatoAdicionalConsumo(indice){
    this.val = 0;
    this.openModalHistorico(this.val, this.lsCuentaConsumo[indice]);
  }

  listarCuentaDepreciacion(){   
    let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.cuentaService.listarCuentaDepreciacion(id_empresa).subscribe((resp: any) =>{        
      this.lsCuentaDepreciacion = resp.aaData;
    });
  }

  openModalHistorico(val, cuenta){
    const modalRef = this.modalService.open(HistoricoDatosadicionalesComponent,
    {
      backdrop: 'static',
      keyboard: false,
      windowClass:"xlModal"
    });
    modalRef.componentInstance.cuentaConsumo = cuenta;
    modalRef.componentInstance.valor = this.val;
    modalRef.result.then((result) => {      
    },(reason) => {
    });
  }

  agregarDatoAdicionalDepreciacion(indice){
    // tslint:disable-next-line:no-unused-expression
     this.openModalDepreciacion(this.lsCuentaDepreciacion[indice]);
  }

  openModalDepreciacion(cuenta) {
    const modalRef = this.modalService.open(NuevaDepreciacionDatosadicionalesComponent,
    {
      backdrop: 'static',
      keyboard: false,
      windowClass:"ModalMd"
    });
    modalRef.componentInstance.cuentaConsumo = cuenta;
    modalRef.result.then((result) => {      
    },(reason) => {
    });
  }

  historicoDatoAdicionalDepreciacion(indice){
    this.val = 1;
    this.openModalHistorico(this.val, this.lsCuentaDepreciacion[indice]);
  }

  public listarCentroCostosNivel2(idcentrocosto,niveles) {
    let obj: any = new Object;
    obj.id_centro_costo = idcentrocosto;
    obj.niveles = niveles;
     this.centroCostosService.listarCentroCostosTipoVentaNivel2(obj).subscribe((resp) => {
     if (resp == null) {} else {
       this.lsCcostoN2 = resp.aaData;
       console.log("this.lsCcostoN2 ",this.lsCcostoN2);
     }
    });
  }
  public listarCentroCostosNivel3(idcentrocosto,niveles) {
       let obj: any = new Object;
    obj.id_centro_costo_2 = idcentrocosto;
    obj.nivelesPadre = niveles;
     this.centroCostosService.listarCentroCostosTipoVentaNivel3(obj).subscribe((resp) => {
     if (resp == null) {} else {
       this.lsCcostoN3 = resp.aaData;
     }
    });
  }
  public listarCentroCostosNivel4(idcentrocosto,niveles) {
   let obj: any = new Object;
   obj.id_centro_costo_3 = idcentrocosto;
   obj.nivelesPadre = niveles;
     this.centroCostosService.listarCentroCostosTipoVentaNivel4(obj).subscribe((resp) => {
     if (resp == null) {} else {
       this.lsCcostoN4 = resp.aaData;
     }
    });
  }

  validarUltNivel1(event){     
    if(event==null){
  this.valNivel2=true;
   this.lsCcostoN2 = [];
  this.lsCcostoN3 = [];
  this.lsCcostoN4 = [];
   }else{
  this.valNivel2 = event.ultimoNivel;
    this.valNivel1 = event.ultimoNivel;
    if(event.ultimoNivel){
      this.lsCuentaConsumo=event.lsCuentaEgreso;
      console.log(" this.lsCuentaConsumo",this.lsCuentaConsumo);
    }else{
      this.lsCuentaConsumo=[];
    }
    if(event.niveles > 1){
    this.listarCentroCostosNivel2(event.id_centro_costo,event.niveles);
    this.valNewEgr = false;
    }else{
    this.objCenCos = event;
    this.valNewEgr = true;
    }
  }
    this.valNivel3=true;
    this.valNivel4=true;
    this.valor2 =undefined;
  }
  validarUltNivel2(event){     
if(event==null){
  this.valNivel3=true;
   this.lsCcostoN3 = [];
  this.lsCcostoN4 = [];
}else{ 
 this.valNivel3 = event.ultimoNivel;
 if(event.ultimoNivel){
  this.lsCuentaConsumo=event.lsCuentaEgreso;
  }else{
    this.lsCuentaConsumo=[];
  }
    if(event.nivelesPadre > 2){
    this.listarCentroCostosNivel3(event.id_centro_costo_2,event.nivelesPadre);
    this.valNewEgr = false;
    }else{
    this.objCenCos = event;
    this.valNewEgr = true;
   
  }
    this.valNivel4=true;
    this.valor3 =undefined;
}
  }
  validarUltNivel3(event){     
    if(event==null){
      this.valNivel4=true;
       this.lsCcostoN4 = [];
    }else{ 
    this.valNivel4 = event.ultimoNivel;
    if(event.ultimoNivel){
      this.lsCuentaConsumo=event.lsCuentaEgreso;
    }else{
      this.lsCuentaConsumo=[];
    }
    if(event.nivelesPadre > 3){
    this.listarCentroCostosNivel4(event.id_centro_costo_3,event.nivelesPadre);
    this.valNewEgr = false;
  }else{
    this.objCenCos = event;
    this.valNewEgr = true;
   
  }
    this.valor4 =undefined;
  
  }
}
  
  validarUltNivel4(event){     
       this.lsCuentaConsumo=event.lsCuentaEgreso;
     this.objCenCos = event;
    this.valNewEgr = true;
  }


}
