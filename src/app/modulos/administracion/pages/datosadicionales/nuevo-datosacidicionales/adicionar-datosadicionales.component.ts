import { Component, OnInit, Input } from "@angular/core";
import { DatosAdicionales } from "../../../../../models/datosadicionales.model";
import { Cuenta } from "../../../../../models/cuenta.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DatosAdicionalesService } from "../../../../../services/datosadicionales/datosadicionales.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import swal from "sweetalert";
import { DatosAdicionalesIniciales } from "../../../../../models/datos-adicionales.-iniciales";

@Component({
  selector: "app-adicionar-datosadicionales",
  templateUrl: "./adicionar-datosadicionales.component.html",
  styles: []
})
export class AdicionarDatosadicionalesComponent implements OnInit {
  @Input() cuentaConsumo;
  index;
  datosAdicionalesdat;
  constructor(
    private activemodal: NgbActiveModal,
    private datosadicionalesService: DatosAdicionalesService
  ) {}
  public datosAdicionalesini: DatosAdicionalesIniciales = new DatosAdicionalesIniciales();
  public cuenta: Cuenta = new Cuenta();
  public router: Router;
  numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  lsAno: Array<any> = [];
  lsMes: Array<any> = [];

  mes: any = new Object();
  ano: any = new Object();

  ngOnInit() {
    debugger;
    this.ListarAnio();
    this.ListarMes();
    console.log("this.cuentaConsumo ", this.cuentaConsumo);
    this.cuenta = this.cuentaConsumo;
    this.datosAdicionalesini = new DatosAdicionalesIniciales();
    this.datosAdicionalesini.id_cuenta = this.cuentaConsumo.id_cuenta;
    this.datosAdicionalesini.id_centro_costo = this.cuentaConsumo.id_centro_costo;
    this.datosAdicionalesini.mes = "Enero";
    this.mes = "Enero";
  }

  ListarAnio() {
    this.datosadicionalesService.listAnio().subscribe((resp: any) => {
      this.lsAno = resp.aaData;
      console.log(this.lsAno, "años");
    });
  }

  ListarMes() {
    this.datosadicionalesService.listMes().subscribe((resp: any) => {
      this.lsMes = resp.aaData;
      console.log(this.lsAno, "meses");
    });
  }

  registrarDatoAdicional() {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Registro de dato adicional",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then(result => {
      if (result.value) {
        this.datosadicionalesService
          .insertarDatosAdicionalesIniciales(this.datosAdicionalesini)
          .subscribe((resp: any) => {
            this.activemodal.dismiss(resp);
          });
      }
    });
  }

  // observacion
  listardatosiniciales() {
    this.datosadicionalesService
      .listaDatosAdicionalesIniciales(this.datosAdicionalesini)
      .subscribe((resp: any) => {
        if (resp != null) {
          console.log("listaDatosAdicionalesIniciales", resp);
          this.datosAdicionalesini = resp.defaultObj;
          if ((this.datosAdicionalesini.mes = "01")) {
            this.datosAdicionalesini.mes = "Enero";
          }
        }
      });
  }

  validarInven(nro) {
    let val = nro;
    let bool = false;
    var tmp = val.slice(0, val.length - 1);
    if (val.length > 0 && val != "") {
      for (var i = 0; i < this.numeros.length; i++) {
        if (val[val.length - 1] == this.numeros[i]) {
          bool = true;
          i = i + this.numeros.length;
        } else {
          bool = false;
        }
      }
      if (!bool) {
        this.datosAdicionalesini.inventario_inicio = tmp;
        swal("Fijo", "Ingresar solo números porfavor", "error");
      }
    }
  }

  // validarInven(nro){
  //   let val = nro;
  //   let bool = false;
  //   var tmp = val.slice(0, val.length-1);
  //   if(val.length>0 && val!=''){
  //     for(var i=0;i<this.numeros.length;i++){
  //       if(val[val.length-1]==this.numeros[i]){
  //         bool=true;
  //         i=i+this.numeros.length;
  //         }else{
  //           bool=false;
  //         }
  //       }
  //   }
  // }
  redirectTo(uri) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  validaAno(event) {
    debugger;
    this.datosAdicionalesini.ano = event.desc_periodo_año;
    this.datosadicionalesService
      .RetornarInventarioInicialxAnio(this.datosAdicionalesini)
      .subscribe((resp: any) => {
        if (resp != null) {
          this.datosAdicionalesini = resp.defaultObj;
          if ((this.datosAdicionalesini.mes = "01")) {
            this.datosAdicionalesini.mes = "Enero";
          }
        }
      });
    this.datosAdicionalesini.mes = event.cod_pdo_mes;
  }
  // validaMes(event){
  //   this.datosAdicionalesini.mes=event.cod_pdo_mes;
  // }
  validaMes(event) {
    this.datosAdicionalesini.mes = event.valor;
  }

  // validaMes(event){
  //   this.datosAdicionalesini.mes=event.cod_pdo_mes;
  // }
  close() {
    this.activemodal.dismiss("Cancelado");
  }
}
