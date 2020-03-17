import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosAdicionalesService } from '../../../../../services/datosadicionales/datosadicionales.service';
import { DatosAdicionales } from '../../../../../models/datosadicionales.model';
import { Cuenta } from '../../../../../models/cuenta.model';

@Component({
  selector: 'app-nueva-depreciacion-datosadicionales',
  templateUrl: './nueva-depreciacion-datosadicionales.component.html',
  styles: []
})
export class NuevaDepreciacionDatosadicionalesComponent implements OnInit {
  @Input() cuentaConsumo;
  constructor(
    private activemodal: NgbActiveModal,
    private datosadicionalesService: DatosAdicionalesService,
  ) { }
  public datosAdicionales:DatosAdicionales = new DatosAdicionales();
  public datosAdicionales_new:DatosAdicionales = new DatosAdicionales();
  public cuenta:Cuenta= new Cuenta();
  lsAno: Array<any> = [];
  lsMes: Array<any> = [];

  ngOnInit() {
    this.ListarAnio();
    this.ListarMes();
    this.cuenta=this.cuentaConsumo;
    this.datosAdicionales= new DatosAdicionales();
    this.datosAdicionales_new= new DatosAdicionales();
    this.datosAdicionales.id_cuenta = this.cuentaConsumo.id_cuenta;
    this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;
  }

  // lsMes: Array<any> = [
  //   {
  //     descripcion: 'Enero',
  //     valor: '01' 
  //   },
  //   {
  //     descripcion: 'Febrero',
  //     valor: '02' 
  //   },
  //   {
  //     descripcion: 'Marzo',
  //     valor: '03' 
  //   },
  //   {
  //     descripcion: 'Abril',
  //     valor: '04' 
  //   },
  //   {
  //     descripcion: 'Mayo',
  //     valor: '05' 
  //   },
  //   {
  //     descripcion: 'Junio',
  //     valor: '06' 
  //   },
  //   {
  //     descripcion: 'Julio',
  //     valor: '07' 
  //   },
  //   {
  //     descripcion: 'Agosto',
  //     valor: '08' 
  //   },
  //   {
  //     descripcion: 'Setiembre',
  //     valor: '09' 
  //   },
  //   {
  //     descripcion: 'Octubre',
  //     valor: '10' 
  //   },
  //   {
  //     descripcion: 'Noviembre',
  //     valor: '11' 
  //   },
  //   {
  //     descripcion: 'Diciembre',
  //     valor: '12' 
  //   }
  //  ]

  //  lsAno: Array<any> = [
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
  //  ]
   mes:any = new Object;
   ano:any = new Object;

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
    // this.datosAdicionales.ano=event.descripcion;
    // this.datosAdicionales_new.ano=event.descripcion;
    if(event != null){
      this.datosAdicionales.ano=event.desc_periodo_año;
      this.datosAdicionales_new.ano=event.desc_periodo_año;
      if(this.datosAdicionales.mes !=null){
        this.datosadicionalesService.RetornarDepreciacion(this.datosAdicionales).subscribe((resp: any) => {
            this.datosAdicionales_new = resp.defaultObj;
            this.datosAdicionales_new.mes=this.datosAdicionales.mes;
            this.datosAdicionales_new.ano=this.datosAdicionales.ano;
            this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;
         });
      }
    }else{
      this.datosAdicionales_new.inventario_inicio = null;
    }
  }
  validaMes(event){
    // this.datosAdicionales.mes=event.valor;
    // this.datosAdicionales_new.mes=event.valor;
    if(event != null){
      this.datosAdicionales.mes=event.cod_pdo_mes;
      this.datosAdicionales_new.mes=event.cod_pdo_mes;
      if(this.datosAdicionales.ano !=null){
        this.datosadicionalesService.RetornarDepreciacion(this.datosAdicionales).subscribe((resp: any) => {
            this.datosAdicionales_new = resp.defaultObj;
            this.datosAdicionales_new.mes=this.datosAdicionales.mes;
            this.datosAdicionales_new.ano=this.datosAdicionales.ano;
            this.datosAdicionales_new.id_cuenta = this.cuentaConsumo.id_cuenta;

         });
      }
    }else{
      this.datosAdicionales_new.inventario_inicio = null;
    }
  }

  registrarDepreciacionDatoAdicional(){ 
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
            this.datosadicionalesService.insertarDepreciacionDatosAdicionales(this.datosAdicionales_new).subscribe((resp: any) => 
          {  
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

}
