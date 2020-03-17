import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RegistrarCtaComponent } from "../registrar-cta/registrar-cta.component";
import { ConfirmarCentroCostoComponent } from "../confirmar-centro-costo/confirmar-centro-costo.component";
import { EmpresaService } from "../../../../../../services/empresa/empresa.service";
import { Company } from "../../../../../../models/company.model";
import { CentroCosto } from "../../../../../../models/centrocosto.model";
import { CentroCostoService } from "../../../../../../services/centroCosto/centroCosto.service";
import { DatosAdicionalesService } from "../../../../../../services/datosadicionales/datosadicionales.service";
import { DatosAdicionales } from "../../../../../../models/datosadicionales.model";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-nuevo-centro-costos",
  templateUrl: "./nuevo-centro-costos.component.html",
  styles: []
})
export class NuevoCentroCostosComponent implements OnInit {
  @Input() idempresa;
  centro_costo_update;
  tipo_cc;
  tipoEmpresa;
  constructor(
    private modalService: NgbModal,
    private companyService: EmpresaService,
    private activemodal: NgbActiveModal,
    private centroCostoService: CentroCostoService
  ) {}
  public company: Company = new Company();
  public centro_costo: CentroCosto = new CentroCosto();
  public centro_costo2: CentroCosto = new CentroCosto();
  public centro_costo3: CentroCosto = new CentroCosto();
  public centro_costo4: CentroCosto = new CentroCosto();

  public cc_consumo?: boolean;

  // ListcentroCosto2: Array<any> = [];
  // ListcentroCosto3: Array<any> = [];
  // ListcentroCosto4: Array<any> = [];
  lstCentroCostosEmp: Array<any> = [];
  public ListCCosto2: Array<any> = [];
  public lscentro_costo2?: Array<CentroCosto>;

  ListCCosto3: Array<any> = [];
  CompanyCentroCosto: any;
  nombre: any;
  descripcion: any;
  id_centro_costo_2: any;
  id_centro_costo_3: any;
  CuentaIE: any;
  tipo_centro_costo: any;

  nombre_cc2: any;
  nombre_cc3: any;

  nivel_name: any;
  lsNivel: any = [
    {
      name: "Nivel 1",
      niveles: 1
    },
    {
      name: "Nivel 2",
      niveles: 2
    },
    {
      name: "Nivel 3",
      niveles: 3
    },
    {
      name: "Nivel 4",
      niveles: 4
    }
  ];
  isCollapsed: Boolean = false;
  idDisabled = false;
  idDisabledCC = true;
  tituloCentroCosto: string;

  cabeceraCC = false;
  guardarCC = true;
  guardarCC2 = false;
  guardarCC3 = false;
  guardarCC4 = false;

  posicion_lista: any;
  estado_boton = 0;
  input = 0;
  obj_cc = -1;

  ngOnInit() {
    ;
    if (this.centro_costo_update != undefined) {
      this.tituloCentroCosto = "Editar Centro Costo";
      // console.log("this.centro_costo_update ",this.centro_costo_update);
      this.centro_costo = this.centro_costo_update;
      // this.centro_costo.niveles=String(this.centro_costo.niveles);
      this.Nivel(this.centro_costo);
      this.TipoCC(this.centro_costo);
      if (!this.centro_costo.ultimoNivel) {
        this.listarCentroCostosNivel2(
          this.centro_costo.id_centro_costo,
          this.centro_costo.niveles
        );
      }
    } else {
      this.tituloCentroCosto = "Nuevo Centro Costo";
      this.centro_costo.lscentro_costo2 = [];
      this.centro_costo.lscentro_costo3 = [];
      this.centro_costo.lscentro_costo4 = [];
    }
    this.centro_costo.id_tipo_centro_costo = this.tipo_cc;
    this.listarTipoCentroCostoxEmpresa();

    if (this.centro_costo.niveles == "1") {
      this.centro_costo.lscentro_costo2 = [];
      this.centro_costo.lscentro_costo3 = [];
      this.centro_costo.lscentro_costo4 = [];
    }
    // this.centro_costo.nombre = "";
    // this.centro_costo.niveles = "";
    //  this.listarCentroCosto2();
    //  this.listarCentroCosto3();
  }

  listarTipoCentroCostoxEmpresa() {
    this.company.id_empresa = this.idempresa;
    this.companyService
      .listarTipoCentroCostoxEmpresa(this.company.id_empresa)
      .subscribe((resp: any) => {
        this.CompanyCentroCosto = resp.defaultObj;
        this.lstCentroCostosEmp = this.CompanyCentroCosto.tipo_empresas.tipo_centro_costo_empresa;
        this.seteaTipoCC(this.centro_costo.id_tipo_centro_costo);
      });
  }

  public listarCentroCostosNivel2(idcentrocosto, niveles) {
    let obj: any = new Object();
    obj.id_centro_costo = idcentrocosto;
    obj.niveles = niveles;
    this.centroCostoService.listarCentroCostosNivel2(obj).subscribe(resp => {
      if (resp == null) {
      } else {
        this.centro_costo.lscentro_costo2 = resp.aaData;
        if (
          this.centro_costo.lscentro_costo2 != null &&
          this.centro_costo.lscentro_costo2.length > 0
        ) {
          // tslint:disable-next-line:forin
          for (let cc2 of this.centro_costo.lscentro_costo2) {
            if (!cc2.ultimoNivel) {
              this.listarCentroCostosNivel3(cc2, niveles);
            }
          }
        }
      }
    });
  }

  listarCentroCostosNivel3(centro_costo_2, niveles) {
    let obj: any = new Object();
    obj.id_centro_costo_2 = centro_costo_2.id_centro_costo_2;
    obj.nivelesPadre = niveles;
    this.centroCostoService.listarCentroCostosNivel3(obj).subscribe(resp => {
      if (resp == null) {
      } else {
        centro_costo_2.lscentro_costo3 = resp.aaData;
        if (
          centro_costo_2.lscentro_costo3 != null &&
          centro_costo_2.lscentro_costo3.length > 0
        ) {
          // tslint:disable-next-line:forin
          for (let cc3 of centro_costo_2.lscentro_costo3) {
            if (!cc3.ultimoNivel) {
              this.listarCentroCostosNivel4(cc3, niveles);
            }
          }
        }
      }
    });
  }
  public listarCentroCostosNivel4(centro_costo_3, niveles) {
    let obj: any = new Object();
    obj.id_centro_costo_3 = centro_costo_3.id_centro_costo_3;
    obj.nivelesPadre = niveles;
    this.centroCostoService.listarCentroCostosNivel4(obj).subscribe(resp => {
      if (resp == null) {
      } else {
        centro_costo_3.lscentro_costo4 = resp.aaData;
      }
    });
  }

  Nivel(nname) {
    if (nname == "" || nname == undefined) {
      this.nivel_name = nname;
      this.guardarCC = true;
    } else {
      if (nname.niveles == 1 || nname.niveles != null) {
        this.centro_costo.lscentro_costo2 = [];
        this.centro_costo.lscentro_costo3 = [];
        this.centro_costo.lscentro_costo4 = [];
      }
      this.nivel_name = String(nname.niveles);
    }
  }

  TipoCC(tipocc) {
    console.log("tipocc ", tipocc);
    if (tipocc != null) {
      let tipo_cc;
      //if(tipocc.tipo_centro_costo!=null){
      if (tipocc.tipoCentroCosto != null) {
        //tipo_cc=tipocc.tipo_centro_costo;
        tipo_cc = tipocc.tipoCentroCosto;
      } else {
        tipo_cc = tipocc.tipoCentroCosto;
      }
      switch (tipo_cc.id_tipo_centro_costo) {
        case 5:
          this.cc_consumo = true;
          break;
        default:
          this.cc_consumo = false;
          break;
      }
    } else {
      this.cc_consumo = false;
    }
  }

  seteaTipoCC(id_tipo) {
    for (let t of this.lstCentroCostosEmp) {
      if (t.tipo_centro_costo.id_tipo_centro_costo == id_tipo) {
        this.tipo_centro_costo = t.tipo_centro_costo;
        // console.log("this.tipo_centro_costo ", this.tipo_centro_costo);
        break;
      }
    }
  }
  NuevoRegsitrarctaCC1(tipo) {
    let cuenta = tipo;
    this.modalRegsitrarctaCC1(cuenta, this.centro_costo);
  }
  modalRegsitrarctaCC1(cuenta, centro_costo) {
    const modalRef = this.modalService.open(RegistrarCtaComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: "ModalMd"
    });
    console.log("centro_costo ", centro_costo);
    modalRef.componentInstance.centro_costo = centro_costo;
    modalRef.componentInstance.tipo_cuenta = cuenta;
    modalRef.result.then(
      result => {
        this.centro_costo = result;
      },
      reason => {}
    );
  }

  // Centro costos nivel 2
  //////////////////////////////

  NuevoRegsitrarctaCC2(tipo, indice) {
    let cuenta = tipo;
    let centro_costo = this.centro_costo.lscentro_costo2[indice];
    this.modalRegsitrarctaCC2(cuenta, centro_costo, indice);
  }
  modalRegsitrarctaCC2(cuenta, centro_costo, indice) {
    const modalRef = this.modalService.open(RegistrarCtaComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: "ModalMd"
    });
    modalRef.componentInstance.centro_costo = centro_costo;
    modalRef.componentInstance.tipo_cuenta = cuenta;
    modalRef.result.then(
      result => {
        this.centro_costo.lscentro_costo2[indice] = result;
      },
      reason => {}
    );
  }

  InsertCuentaCC2() {
    ;
    if (this.estado_boton == 0) {
      if (!this.guardarCC2) {
        Swal.fire({
          title: "Rellenar campos",
          text: "Rellene el campo nombre",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33"
        });
      } else {
        let centroC2: any = new Object();
        centroC2.nombre = this.centro_costo2.nombre;
        centroC2.descripcion = this.descripcion;
        centroC2.esconder = false;
        this.centro_costo.lscentro_costo2.push(centroC2);

        this.centro_costo2.nombre = "";
        this.descripcion = "";
      }
    } else {
      let centroC2: any = new Object();
      centroC2.nombre = this.centro_costo2.nombre;
      centroC2.descripcion = this.descripcion;
      this.centro_costo.lscentro_costo2[this.posicion_lista] = centroC2;

      this.centro_costo2.nombre = "";
      this.descripcion = "";
      // this.estado_boton = 0;
    }
  }

  EliminarCuenta(indice) {
    this.centro_costo.lscentro_costo2.splice(indice, 1);
  }

  cerrar_todo(obj) {
    ;
      if(obj.esconder==true){
        this.obj_cc = obj.id_centro_costo;
        let posi = this.centro_costo.lscentro_costo2.indexOf(obj);
        let cantidad = this.centro_costo.lscentro_costo2.length;
        for (let index = 0; index < cantidad; index++) {
          this.centro_costo.lscentro_costo2[index].esconder = false;
        }
        this.centro_costo.lscentro_costo2[posi].esconder = true;
      }
      
  }


  seteaNivel2(nombrecc2) {
    this.centro_costo2 = new CentroCosto();

    for (let cc2 of this.centro_costo.lscentro_costo2) {
      if (cc2.nombre == nombrecc2) {
        //  this.centro_costo2=cc2;
        this.centro_costo2 = Object.assign({}, cc2);
        if (this.centro_costo2.lscentro_costo3 == null) {
          this.centro_costo2.lscentro_costo3 = [];
        }
      }
    }
    //  this.validarCC2();
  }
  NuevoRegsitrarctaCC3(tipo, indice) {
    let cuenta = tipo;
    this.modalRegsitrarctaCC3(
      cuenta,
      this.centro_costo2.lscentro_costo3[indice],
      indice
    );
  }
  modalRegsitrarctaCC3(cuenta, centro_costo, indice) {
    const modalRef = this.modalService.open(RegistrarCtaComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: "ModalMd"
    });
    modalRef.componentInstance.centro_costo = centro_costo;
    modalRef.componentInstance.tipo_cuenta = cuenta;
    modalRef.result.then(
      result => {
        this.centro_costo2.lscentro_costo3[indice] = result;
      },
      reason => {}
    );
  }
  InsertCuentaCC3() {
    if (this.estado_boton == 0) {
      if (!this.guardarCC3) {
      } else {
        let centroC3: any = new Object();
        centroC3.nombre = this.centro_costo3.nombre;
        centroC3.descripcion = this.descripcion;
        this.centro_costo2.lscentro_costo3.push(centroC3);

        for (let cc2 of this.centro_costo.lscentro_costo2) {
          if (cc2.nombre == this.centro_costo2.nombre) {
            cc2 = this.centro_costo2;
          }
        }
        this.centro_costo3.nombre = "";
        this.descripcion = "";
      }
    } else {
      let centroC3: any = new Object();
      centroC3.nombre = this.centro_costo3.nombre;
      centroC3.descripcion = this.descripcion;
      this.centro_costo2.lscentro_costo3[this.posicion_lista] = centroC3;

      this.estado_boton = 0;
      this.descripcion = "";
      this.centro_costo3.nombre = "";
    }
  }
  EliminarCuenta3(indice) {
    ;
    this.centro_costo2.lscentro_costo3.splice(indice, 1);
    for (let cc2 of this.centro_costo.lscentro_costo2) {
      ;
      if (cc2.nombre == this.centro_costo2.nombre) {
        cc2 = this.centro_costo2;
      }
    }
  }



  seteaNivel3(nombrecc3) {
    // this.validarCC3();
    this.centro_costo3 = new CentroCosto();
    for (let cc3 of this.centro_costo2.lscentro_costo3) {
      if (cc3.nombre == nombrecc3) {
        //  this.centro_costo3=cc3;
        this.centro_costo3 = Object.assign({}, cc3);
        if (this.centro_costo3.lscentro_costo4 == null) {
          this.centro_costo3.lscentro_costo4 = [];
        }
      }
    }
  }

  NuevoRegsitrarctaCC4(tipo, indice) {
    let cuenta = tipo;
    this.modalRegsitrarctaCC4(
      cuenta,
      this.centro_costo3.lscentro_costo4[indice],
      indice
    );
  }

  modalRegsitrarctaCC4(cuenta, centro_costo, indice) {
    const modalRef = this.modalService.open(RegistrarCtaComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: "ModalMd"
    });
    modalRef.componentInstance.centro_costo = centro_costo;
    modalRef.componentInstance.tipo_cuenta = cuenta;
    modalRef.result.then(
      result => {
        this.centro_costo3.lscentro_costo4[indice] = result;
      },
      reason => {}
    );
  }

  InsertCuentaCC4() {
    if (!this.guardarCC4) {
    } else {
      let centroC4: any = new Object();
      centroC4.nombre = this.centro_costo4.nombre;
      centroC4.descripcion = this.descripcion;
      this.centro_costo3.lscentro_costo4.push(centroC4);
      for (let cc3 of this.centro_costo2.lscentro_costo3) {
        if (cc3.nombre == this.centro_costo3.nombre) {
          cc3 = this.centro_costo3;
        }
      }
      this.centro_costo4.nombre = "";
      this.descripcion = "";
    }
  }

  EliminarCuenta4(indice) {
    this.centro_costo3.lscentro_costo4.splice(indice, 1);
    for (let cc3 of this.centro_costo2.lscentro_costo3) {
      if (cc3.nombre == this.centro_costo3.nombre) {
        cc3 = this.centro_costo3;
      }
    }
  }

  ConfirmarCentroCosto() {
    if (
      this.centro_costo.nombre == "" ||
      this.centro_costo.nombre == undefined ||
      this.centro_costo.niveles == "" ||
      this.centro_costo.niveles == null
    ) {
      Swal.fire({
        title: "Rellenar campos",
        text: "Rellene los campos nombre y niveles",
        type: "warning",

      });
    } else {
      if (
        (this.centro_costo.nombre != "" && this.centro_costo.niveles != "") ||
        this.centro_costo.niveles == null
      ) {
        this.guardarCC = false;
        this.modalConfirmarCentroC();
      }
    }
    if (
      (this.centro_costo.nombre == "" && this.centro_costo.niveles == "") ||
      this.centro_costo.niveles != null
    ) {
      this.guardarCC = true;
    }
  }

  modalConfirmarCentroC() {
    const modalRef = this.modalService.open(ConfirmarCentroCostoComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: "ModalMd"
    });
    modalRef.componentInstance.centro_costodat = this.centro_costo;
    modalRef.result.then(result => {},
      reason => {
        this.activemodal.close();
      }
    );
  }
  listarCentroCosto3() {
    this.centroCostoService.listarCentro_Costo3().subscribe((resp: any) => {
      this.ListCCosto3 = resp.aaData;
    });
  }

  close() {
    this.activemodal.dismiss("Cancelado");
  }

  HabilitarBtnDisabledListNivel2(nom, desc) {
    this.nombre = nom;
    this.descripcion = desc;
    if (
      this.nombre != null &&
      this.nombre != "" &&
      this.descripcion != null &&
      this.descripcion != ""
    ) {
      this.idDisabled = false;
    } else {
      this.idDisabled = true;
    }
  }
  validarCCCabecera() {
    if (this.centro_costo.nombre== "" || this.centro_costo.niveles>0) {
      this.cabeceraCC = false;
      this.guardarCC = false;
    } else {
      this.cabeceraCC = true;
      this.guardarCC = true;
    }
  }
  validarCCDetalle1() {
    this.nombre = Object.assign({}, this.centro_costo2);
    if (this.nombre.nombre == null || this.nombre.nombre == "") {
      this.guardarCC2 = false;
    } else {
      this.guardarCC2 = true;
    }
  }

  validarCCDetalle2() {
    if (
      this.centro_costo3.nombre == undefined ||
      this.centro_costo3.nombre == ""
    ) {
      this.guardarCC3 = false;
    } else {
      this.guardarCC3 = true;
    }
  }
  validarCCDetalle3() {
    if (
      this.centro_costo4.nombre == undefined ||
      this.centro_costo4.nombre == ""
    ) {
      this.guardarCC4 = false;
    } else {
      this.guardarCC4 = true;
    }
  }
}
