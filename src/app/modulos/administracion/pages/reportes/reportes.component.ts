import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/reportes/reportes.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { DatosAdicionalesService } from '../../../../services/datosadicionales/datosadicionales.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html' 
})
export class ReportesComponent implements OnInit {

  codigo: any = "";
  public tipo_empresa:any;
  preload: Boolean = false;

  constructor(private reportesService: ReportesService,
    private datosadicionalesService: DatosAdicionalesService) { }
  lsReporte: Array<any> = [
    {
      "nombre": "Flujo Mensual",
      "codigo":"FM"
    },
    {
      "nombre": "Flujo Semanal",
      "codigo":"FS"
    },
    {
      "nombre": "Estado Resultado Detallado",
      "codigo":"ERD"
    },
    {
      "nombre": "Estado Resultado Detallado-Servicios",
      "codigo":"ERDS"
    },
    {
      "nombre": "Estado Resultado Resumen-Productoras",
      "codigo":"ERR"
    },
    {
      "nombre": "Estado Resultado Resumen-Servicios",
      "codigo":"ERRS"
    }

  ];
  public reporte?: any;
  public periodo_anno?: any;


  
  lsAno: Array<any> = [];

  
  ngOnInit() {
    this.ListarAnio();
    let empresa = JSON.parse(localStorage.getItem('datempresa'));
    this.tipo_empresa = empresa.tipo_empresa;
  }

  ListarAnio(){
    this.datosadicionalesService.listAnio().subscribe((resp: any) => {
      this.lsAno = resp.aaData;
     });
  }
  descargarReporte(codigo){ 
    if(this.periodo_anno!=null && this.periodo_anno!=""){
      this.preload = true;
      const obj={
        "id_empresa":Number(localStorage.getItem('empresaselectid')),
        "periodo_anno":String(this.periodo_anno),
        "codigo":codigo,
        "tipo_empresa":this.tipo_empresa
    }
     switch(codigo){
  case 'FM' :   
                if(obj.tipo_empresa == "P"){
                  this.reportesService.excelFlujoMensual(obj).subscribe((resp: any) => {
                    this.preload = false;
                    console.log("resp ok",resp);
                   var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Mensual.xlsx");
                    }, (reason) => {
                      
                    console.log("reason no ok",reason);
                    var file = new Blob([reason.error], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Mensual.xlsx");
                    });
                }else{
                  this.reportesService.excelFlujoMensualServicio(obj).subscribe((resp: any) => {
                    console.log("resp ok",resp);
                    this.preload = false;
                   var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Mensual.xlsx");
                    }, (reason) => {
                      
                    console.log("reason no ok",reason);
                    var file = new Blob([reason.error], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Mensual.xlsx");
                    });
                }
                
  ;break;
  case 'FS' : 
              if(obj.tipo_empresa == "P"){
                this.reportesService.excelFlujoSemanal(obj).subscribe((resp: any) => {
                  this.preload = false;
                  var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Semanal.xlsx");
                     }, (reason) => {
                      this.preload = false;
                      console.log("reason no ok",reason);
                      var file = new Blob([reason.error], {type:'application/vnd.ms-excel'});
                      saveAs(file, "Flujo-Semanal.xlsx");
                      });
              }else{
                this.reportesService.excelFlujoSemanalServicio(obj).subscribe((resp: any) => {
                  this.preload = false;
                  var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Flujo-Semanal.xlsx");
                     }, (reason) => {
                      this.preload = false;
                      console.log("reason no ok",reason);
                      var file = new Blob([reason.error], {type:'application/vnd.ms-excel'});
                      saveAs(file, "Flujo-Semanal.xlsx");
                      });
              }
              
   ;break;
  case 'ERD' : 
              if(obj.tipo_empresa == "P"){
                this.reportesService.excelEstadoResultado(obj).subscribe((resp: any) => {
                  this.preload = false;
                  var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Estado-Resultado.xlsx");
                   });
              }else{
                this.reportesService.excelEstadoResultadoEServicios(obj).subscribe((resp: any) => {
                  this.preload = false;
                  var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                    saveAs(file, "Estado-Resultado.xlsx");
                   });
              }
             
  ;break;
  case 'ERR': 
            if(obj.tipo_empresa == "P"){
              this.reportesService.excelEstadoResultadoResumen(obj).subscribe((resp: any) => {
                this.preload = false;
                var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                  saveAs(file, "Estado-Resultado-Resumen-Productoras.xlsx");
                });
            }else{
              this.reportesService.excelEstadoResultadoResumenEmpServicios(obj).subscribe((resp: any) => {
                this.preload = false;
                var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                  saveAs(file, "Estado-Resultado-Resumen-Servicios.xlsx");
                });
            }
              
  ;break;
  case 'PV': 
            this.reportesService.excelPorcentajeVenta(obj).subscribe((resp: any) => {
              this.preload = false;
                var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                  saveAs(file, "Porcentaje-de-Venta.xlsx");
                });
  ;break;
  case 'CC': 
            this.reportesService.excelCuentasCobrar(obj).subscribe((resp: any) => {
              this.preload = false;
                var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                  saveAs(file, "Cuentas-por-Cobrar.xlsx");
                });
  ;break;
  case 'CP': 
            this.reportesService.excelCuentasPagar(obj).subscribe((resp: any) => {
              this.preload = false;
                var file = new Blob([resp], {type:'application/vnd.ms-excel'});
                  saveAs(file, "Cuentas-por-Pagar.xlsx");
                });
  ;break;
    }

   
    }else{
      Swal.fire('Campos Incompletos',"Por favor seleccione un año" , 'info');
    }
     

  }


}
