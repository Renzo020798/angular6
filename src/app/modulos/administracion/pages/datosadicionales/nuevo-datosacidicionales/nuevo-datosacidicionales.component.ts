import { Component, OnInit, Input } from '@angular/core';
import { DatosAdicionales } from '../../../../../models/datosadicionales.model';
import { Cuenta } from '../../../../../models/cuenta.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosAdicionalesService } from '../../../../../services/datosadicionales/datosadicionales.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-datosacidicionales',
  templateUrl: './nuevo-datosacidicionales.component.html', 
})
export class NuevoDatosacidicionalesComponent implements OnInit {
@Input() cuentaConsumo;

  constructor(
    private activemodal: NgbActiveModal,
    private datosadicionalesService: DatosAdicionalesService,
    ) {}
  public datosAdicionales:DatosAdicionales = new DatosAdicionales();
  public datosAdicionales_new:DatosAdicionales = new DatosAdicionales();

  public cuenta:Cuenta= new Cuenta();
  lsAno: Array<any> = [];
  lsMes: Array<any> = [];
  mes:any = new Object;
  ano:any = new Object;
  totalmes: any = null;

  ngOnInit() {
    this.ListarAnio();
    this.ListarMes();
    console.log("this.cuentaConsumo ",this.cuentaConsumo);
    this.cuenta=this.cuentaConsumo;
    this.datosAdicionales= new DatosAdicionales();
    this.datosAdicionales_new= new DatosAdicionales();
    this.datosAdicionales.id_cuenta = this.cuentaConsumo.id_cuenta;
    this.datosAdicionales.id_centro_costo = this.cuentaConsumo.id_centro_costo;
    this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;
    this.datosAdicionales_new.id_centro_costo = this.cuentaConsumo.id_centro_costo;
    //this.datosAdicionales.id_cuenta=this.cuenta.id_cuenta;
  }

  ListarAnio(){
    this.datosadicionalesService.listAnio().subscribe((resp: any) => {
      this.lsAno = resp.aaData;
     });
  }

    ListarMes(){
    this.datosadicionalesService.listMes().subscribe((resp: any) => {
      this.lsMes = resp.aaData;
     });
  }

  validaAno(event){
    if(event != null){
      this.datosAdicionales.ano=event.desc_periodo_año;
      this.datosAdicionales_new.ano=event.desc_periodo_año;
       console.log("this.datosAdicionales ano ",this.datosAdicionales);
      if(this.datosAdicionales.mes !=null){

        this.datosadicionalesService.RetornarInventarioInicial(this.datosAdicionales).subscribe((resp: any) => {
            this.datosAdicionales_new = resp.defaultObj;
            this.datosAdicionales_new.mes=this.datosAdicionales.mes;
            this.datosAdicionales_new.ano=this.datosAdicionales.ano;
            this.datosAdicionales_new.id_centro_costo = this.cuentaConsumo.id_centro_costo;
            this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;
         });
         this.totalmes = null;
      }
    }else{
      this.datosAdicionales_new.inventario_inicio = null;
    }
  }
  validaMes(event){
    if(event != null){
      this.datosAdicionales.mes=event.cod_pdo_mes;
      this.datosAdicionales_new.mes=event.cod_pdo_mes;

      console.log("this.datosAdicionales mes",this.datosAdicionales);

      if(this.datosAdicionales.ano !=null){
        this.datosadicionalesService.RetornarInventarioInicial(this.datosAdicionales).subscribe((resp: any) => {
            this.datosAdicionales_new = resp.defaultObj;
            this.datosAdicionales_new.mes=this.datosAdicionales.mes;
            this.datosAdicionales_new.ano=this.datosAdicionales.ano;
            this.datosAdicionales_new.id_centro_costo = this.cuentaConsumo.id_centro_costo;
            this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;
         });
         this.totalmes = null;
      }
    }else{
      this.datosAdicionales_new.inventario_inicio = null;
    }
  }

  registrarDatoAdicional(){ 
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Registro de dato adicional",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => { 
        if (result.value) {
          this.datosadicionalesService.insertarDatosAdicionales(this.datosAdicionales_new).subscribe((resp: any) => {
            console.log("resp ",resp);
            if(resp.estado==1){
              this.activemodal.dismiss(resp);
            }else{
              if(resp.estado==6){
                swal('Consumo',resp.msg, 'error');
              }else{
                this.activemodal.dismiss(resp);
              }
            }
          });
        }
      });
  }
  close(){
    this.activemodal.dismiss('Cancelado');
  }
  ObtenerTotalMes(){
    if(this.datosAdicionales_new.inventario_fin !=null && this.datosAdicionales_new.compra_mes !=null){
      this.totalmes = this.datosAdicionales_new.inventario_inicio + this.datosAdicionales_new.compra_mes - this.datosAdicionales_new.inventario_fin;
    }else{
      this.totalmes = null;
    }
  }
}
