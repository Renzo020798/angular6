import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cuenta } from '../../../../../models/cuenta.model';
import { DatosAdicionales } from '../../../../../models/datosadicionales.model';
import { DatosAdicionalesService } from '../../../../../services/datosadicionales/datosadicionales.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico-datosadicionales.component.html',
  styles: []
})
export class HistoricoDatosadicionalesComponent implements OnInit {
  
  @Input() cuentaConsumo;valor;
  constructor(
    private activemodal: NgbActiveModal,
    private datosadicionalesService: DatosAdicionalesService,
  ) { }
  public cuenta:Cuenta= new Cuenta();
  public datosAdicionales:DatosAdicionales = new DatosAdicionales();
  lsDatosAdicionales: Array<any> = [];
  ano: any = "";
  lsAno: Array<any> = [];
 
  // lsAno: Array<any> = [
  //   {
  //     descripcion: '2018',
  //     valor: '18' 
  //   },
  //   {
  //     descripcion: '2019',
  //     valor: '19' 
  //   },
  //   {
  //     descripcion: '2020',
  //     valor: '20' 
  //   }
  // ]

  ngOnInit() {
    this.ListarAnio();
    if(this.valor == 0){
      this.cuenta=this.cuentaConsumo.cuenta;
      this.datosAdicionales.id_centro_costo = this.cuentaConsumo.id_centro_costo;
    }else{
      this.cuenta = this.cuentaConsumo;
    }
  }
 
  ListarAnio(){
    this.datosadicionalesService.listAnio().subscribe((resp: any) => {
      this.lsAno = resp.aaData;
     });
  }

  Ok(){
    this.activemodal.dismiss('Cancelado');
  }

  listarDatosAdicionalesxAnioyIdCuenta(event){
      this.datosAdicionales.ano = event.desc_periodo_año;
      this.ano = event.desc_periodo_año;

      this.datosAdicionales.id_cuenta = this.cuentaConsumo.id_cuenta;
      this.datosadicionalesService.listarDatosAdicionalesxAñoyIdCuenta(this.datosAdicionales).subscribe((resp: any) => { 
        this.lsDatosAdicionales = resp.aaData;
      });
  }

  listarDepreciacionxAnioyIdCuenta(event){
      this.datosAdicionales.ano = event.desc_periodo_año;
      this.ano = event.desc_periodo_año;
  
      this.datosAdicionales.id_cuenta = this.cuentaConsumo.id_cuenta;
      this.datosadicionalesService.listarDepreciacionxAñoyIdCuenta(this.datosAdicionales).subscribe((resp: any) => { 
      this.lsDatosAdicionales = resp.aaData;
    });
  }

}
