import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CuentaService } from '../../../../../../services/cuenta/cuenta.service';
import { CentroCostoCuenta } from '../../../../../../models/centrocostocuenta.model';

@Component({   
  selector: 'app-registrar-cta-egreso',
  templateUrl: './registrar-cta.component.html',
  styles: []
})
export class RegistrarCtaComponent implements OnInit {

  @Input() tipo_cuenta;centro_costo;
  constructor(
    private modalService: NgbModal,
    private cuentaService: CuentaService,
    private activemodal: NgbActiveModal,
  ) {}
  centroCostoCuenta: CentroCostoCuenta = new CentroCostoCuenta;
  lstCuentaxIngreso: Array<any> = [];
  lstCuentaxEgreso: Array<any> = [];
  lstCuentaxConsumo: Array<any> = [];
 
  lsComportamientoCuenta: any = [
    {
      descripcion: 'Comportamiento 1',
      tipo_comportamiento: '1' 
    },
    {
      descripcion: 'Comportamiento 2',
      tipo_comportamiento: '2' 
    }
  ]

  CuentaIE:any = new Object;
  ingreso:Boolean = false;
  egreso:Boolean = false;
  consumo:Boolean = false;
  tipo_financiero:Boolean = false;
  comportamiento_er:any;
  comportamiento_fl:any;
  bool = 0;
  idDisabled = true;
  centro_costo_cuenta:any = new Object;

  ngOnInit() {  
    this.CuentaIE.lsCuentaIngreso = [];
    this.CuentaIE.lsCuentaEgreso = [];

    console.log("centro_costo ctas   ",this.centro_costo);

    this.centro_costo_cuenta=this.centro_costo;
    if(this.centro_costo_cuenta.lsCuentaEgreso!=null 
    &&this.centro_costo_cuenta.lsCuentaEgreso.length>0){
        this.CuentaIE.lsCuentaEgreso = this.centro_costo_cuenta.lsCuentaEgreso;
    }

    if(this.centro_costo_cuenta.lsCuentaIngreso!=null 
    &&this.centro_costo_cuenta.lsCuentaIngreso.length>0){
      this.CuentaIE.lsCuentaIngreso = this.centro_costo_cuenta.lsCuentaIngreso;
    } 
 
    switch(this.tipo_cuenta){
      case 'INGRESO':this.ingreso = true;
        this.listarCuentaxIngreso();
        ;break;
      case 'EGRESO':this.egreso = true;
        this.listarCuentaxEgreso();
        ;break;
      case 'CONSUMO':this.consumo = true;
        this.listarCuentaxConsumo();
        ;break;
    }

    if(this.centro_costo.id_tipo_centro_costo==3){
      this.tipo_financiero=true;
    }
  }

  listarCuentaxIngreso(){
    let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.cuentaService.retornarCuentaxIngreso(id_empresa).subscribe((resp: any) => {
      this.lstCuentaxIngreso = resp.aaData;
    });
  }

  listarCuentaxEgreso(){
    let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.cuentaService.retornarCuentaxEgreso(id_empresa).subscribe((resp: any) =>{
      this.lstCuentaxEgreso = resp.aaData;
    });
  }

  listarCuentaxConsumo(){
    let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
    this.cuentaService.listarCuentaxConsumo(id_empresa).subscribe((resp: any) =>{  
      this.lstCuentaxConsumo = resp.aaData;
    });
  }

  HabilitarBtnDisabledList(){
    if(this.centroCostoCuenta != null){
      if(this.tipo_cuenta == "INGRESO"){
        if(this.CuentaIE.lsCuentaIngreso.length > 0){
          for(let cat of this.CuentaIE.lsCuentaIngreso){
            if(this.centroCostoCuenta.id_cuenta == cat.id_cuenta){
              this.idDisabled = true;
              break;
            }else{
              this.idDisabled = false;
            }
          }
        }else{
          this.idDisabled = false;
        }
      }else{
        if(this.CuentaIE.lsCuentaEgreso.length > 0){
          for(let cat of this.CuentaIE.lsCuentaEgreso){
            if(this.centroCostoCuenta.id_cuenta == cat.id_cuenta){
              this.idDisabled = true;
              break;
            }else{
              this.idDisabled = false;
            }
          }
        }else{
          this.idDisabled = false;
        }
      }
    }else{
      this.idDisabled = true;
    }
  }

  guardarCuentaIE(){
    if(this.CuentaIE.lsCuentaIngreso.length>0){
      this.centro_costo.lsCuentaIngreso= this.CuentaIE.lsCuentaIngreso;
    }
    if(this.CuentaIE.lsCuentaEgreso.length>0){
      this.centro_costo.lsCuentaEgreso= this.CuentaIE.lsCuentaEgreso;
    }
    this.activemodal.close(this.centro_costo);
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  InsertCuenta(){
    let objI:any = new Object;
    let objE:any = new Object;

    if(this.tipo_cuenta == 'INGRESO'){
      objI.descripcion_cuenta = this.centroCostoCuenta.descripcion_cuenta;
      objI.id_cuenta = this.centroCostoCuenta.id_cuenta;
      objI.reporte1 = this.centroCostoCuenta.reporte1;
      objI.reporte2 = this.centroCostoCuenta.reporte2;
      //this.CuentaIE.lsCuentaIngreso.push(objI);
      if(this.CuentaIE.lsCuentaIngreso.length > 0 ){
        for(let cta of this.CuentaIE.lsCuentaIngreso){
          if(objI.id_cuenta == cta.id_cuenta){
            this.idDisabled = true;
            this.bool = 0;
            break;
          }else{
            this.idDisabled = false;
            this.bool = 1;
          }
        }
        if(this.bool == 1){
          this.CuentaIE.lsCuentaIngreso.push(objI);
          this.idDisabled = true;
        }
      }else{
        this.CuentaIE.lsCuentaIngreso.push(objI);
        this.idDisabled = true;
      }
    }else {
      objE.descripcion_cuenta = this.centroCostoCuenta.descripcion_cuenta;
      objE.id_cuenta = this.centroCostoCuenta.id_cuenta;
      objE.reporte1 = this.centroCostoCuenta.reporte1;
      objE.tipo_comportamiento_reporte1 = this.centroCostoCuenta.tipo_comportamiento_reporte1;
      objE.reporte2 = this.centroCostoCuenta.reporte2;  
      if(this.tipo_financiero){
        objE.tipo_comportamiento_reporte2 = this.comportamiento_fl;
      }
      if(this.CuentaIE.lsCuentaEgreso.length > 0 ){
        for(let cta of this.CuentaIE.lsCuentaEgreso){
          if(objE.id_cuenta == cta.id_cuenta){
            this.idDisabled = true;
            this.bool = 0;
            break;
          }else{
            this.idDisabled = false;
            this.bool = 1;
          }
        }
        if(this.bool == 1){
          this.CuentaIE.lsCuentaEgreso.push(objE);
          this.idDisabled = true;
        }
      }else{
        this.CuentaIE.lsCuentaEgreso.push(objE);
        this.idDisabled = true;
      }
    }
  }

  EliminarCuenta(indice){
    if(this.tipo_cuenta == 'INGRESO'){
      this.CuentaIE.lsCuentaIngreso.splice(indice,1);
    }else{
      this.CuentaIE.lsCuentaEgreso.splice(indice,1);
    }
  }

}