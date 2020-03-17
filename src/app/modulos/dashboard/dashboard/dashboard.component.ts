import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Cliente } from '../../../models/Cliente.models';
 
import { Empresa } from '../../../models/empresa.model';
import { Company } from '../../../models/company.model';
import { DatosAdicionalesService } from '../../../services/datosadicionales/datosadicionales.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { DashBoardService } from '../../../services/ModulosService/dashboard.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit {
 
  title ="Chart JS Demo Application in Angular 5 By DotNet Techy";
  BarChart : any;
  PieChart : any;
  PolarAreaChart : any;
  LineChart : any;
  LineChart2 : any;
  LineChart3 : any;
  LineChart4:any;
  DoughnutChart : any;
  RadarChart : any;
  lsVentaCliente:any;
  lsPorcentajeCliente:Array<any> = [];
  lsClienteNombres:Array<any> = [];
  lsEvolucionGastos:any;
  saldoFinal:any;
  lsVentaAnio:Array<any> = [];
  porcentajeVentas:any;
  porcentajeAcumulado:Array<any> = [];
  lsPorcentualDeUtilidades:Array<any> = [];
  public periodo_anno?: any;
 
  constructor(
    private clienteService: ClienteService,
    private dashboardService: DashBoardService,
    private datosadicionalesService: DatosAdicionalesService
 
  ) { }
  public cliente:Cliente = new Cliente();
  public empresa:Empresa = new Empresa();
  public company:Company = new Company();
  
  lsAno: Array<any> = [];
 
  ngOnInit() {
    var fecha = new Date();
    this.periodo_anno = fecha.getFullYear();
    this.evolucionDeGastosOperativos();
    this.listarPorcentajeVenta();
    this.porcentualDeUtilidades();
 
    this.retornaVentaDelAnio();
    this.listarSaldosFinales();
 
    this.cargarBarChart();
    this.polarAreaChart();
    this.cargarRadarChart();
    this.retornarVentaClientexDocumento();
    this.ListarAnio();
  }
 
 
  cargarBarChart(){
    //Bar Chart
    this.BarChart = new  Chart('barChart', {
      type: 'bar',
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      datasets : [{
        label: '# of Votes',
        data: [9, 7, 3, 5, 2, 10, 5, 6, 8, 1, 9, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(19, 141, 117, 0.2)',
          'rgba(236, 64, 122, 0.2)',
          'rgba(104, 159, 56, 0.2)',
          'rgba(255, 193, 7 , 0.2)',
          'rgba(121, 85, 72, 0.2)',
          'rgba(38, 198, 218, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(19, 141, 117, 1)',
          'rgba(236, 64, 122, 1)',
          'rgba(104, 159, 56, 1)',
          'rgba(255, 193, 7 , 1)',
          'rgba(121, 85, 72, 1)',
          'rgba(38, 198, 218, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        text: "Bar Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    });
    
  }
 
  polarAreaChart(){
    //Polar Area Chart
    this.PolarAreaChart = new Chart('polarAreaChart', {
      type: 'polarArea',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets : [{
        label: '# of Votes',
        data: [9, 7, 3, 5, 2, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      tilte: {
        text: "Polar Area Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    });
  }
 
  cargarRadarChart(){
    //Radar Chart
    this.RadarChart = new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets : [{
          label: '# of Votes',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Radar Chart",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    
  }
 
  retornarVentaClientexDocumento(){
    this.cliente.anio = this.periodo_anno;
    this.cliente.id_empresa = Number(localStorage.getItem('empresaselect'));
    this.dashboardService.listarVentaClientexDocumento(this.cliente).subscribe((resp: any) => {
      this.lsVentaCliente = resp.defaultObj;
 
      this.cargarDonutChart();
    });
  }
 
  public retornaGraficosPorAno(){
    this.evolucionDeGastosOperativos();
    this.retornaVentaDelAnio();
    this.listarPorcentajeVenta();
    this.retornarVentaClientexDocumento();
    this.listarSaldosFinales();
    this.porcentualDeUtilidades();
  }
 
  evolucionDeGastosOperativos(){
        //Line Chart
        this.LineChart = new Chart('lineChart', {
          type: 'line',
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "JuL", "Ago", "Set", "Oct", "Nov", "Dic"],
            datasets : [{
              label: '',
              data: [0],
            fill: false,
            lineTension: 0.2,
            borderColor: "#E59866",
            borderWidth: 1
          }]
        },
            options: {
            title: {
              text: "Evolución de Gastos Operativos",
              display: true
            }
          }
        })
    this.empresa.periodo_anno = this.periodo_anno;
    this.empresa.id_empresa = Number(localStorage.getItem('empresaselect'));
    this.dashboardService.evolucionDeGastosOperativos(this.empresa).subscribe((resp: any) => {
      this.lsEvolucionGastos = resp.defaultObj;
      for(let i =0;i< this.lsEvolucionGastos.lsTotal_gastos_mes.length;i++){
        this.LineChart.data.datasets[i].data=this.lsEvolucionGastos.lsTotal_gastos_mes[i];
        this.LineChart.data.datasets[i].label="Gastos por "+this.lsEvolucionGastos.lsnombres_cc[i];
        if(i+1<this.lsEvolucionGastos.lsTotal_gastos_mes.length){
 
          this.LineChart.data.datasets.push({
            label: 'Gastos',
            data: [0,0,0,0,0],
          fill: false,
          lineTension: 0.2,
          borderColor: this.lsEvolucionGastos.ls_colores_rgba[i],
          borderWidth: 1
        });
        }
      }
      this.LineChart.update();
 
    });
  }
  listarSaldosFinales(){
 
    this.empresa.periodo_anno = this.periodo_anno;
    this.empresa.id_empresa = Number(localStorage.getItem('empresaselect'));
    this.dashboardService.listarSaldosFinales(this.empresa).subscribe((resp: any) => {
      this.saldoFinal = resp.defaultObj;
                //Line Chart
                this.LineChart3 = new Chart('lineChart3', {
                  type: 'line',
                  data: {
                    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "JuL", "Ago", "Set", "Oct", "Nov", "Dic"],
                    datasets : [{
                      label: this.saldoFinal.lsnombres_cc[0],
                      data: this.saldoFinal.lsTotal_gastos_mes[0],
                    fill: false,
                    lineTension: 0.2,
                    borderColor: this.saldoFinal.ls_colores_rgba[0],
                    borderWidth: 1
                  }]
                },
                    options: {
                    title: {
                      text: "Saldo Final de Caja",
                      display: true
                    }
                  }
                })
    });
  }
 
  porcentualDeUtilidades() {
    //Line Chart
    this.LineChart4 = new Chart('lineChart4', {
      type: 'line',
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "JuL", "Ago", "Set", "Oct", "Nov", "Dic"],
        datasets: [{
          label: '',
          data: [0],
          fill: false,
          lineTension: 0.2,
          borderColor: "#E59866",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function (value) { return value + "%" }
            },
            scaleLabel: {
              display: true,
              labelString: "Porcentaje"
            }
          }]
        },
        title: {
          text: "Porcentual de Utilidades",
          display: true
        }
      },
    })
    this.empresa.periodo_anno = this.periodo_anno;
    this.empresa.id_empresa = Number(localStorage.getItem('empresaselect'));
    this.dashboardService.porcentualDeUtilidades(this.empresa).subscribe((resp: any) => {
      if (resp != null) {
        
        this.lsPorcentualDeUtilidades = resp.aaData;
        for (let i = 0; i < this.lsPorcentualDeUtilidades.length; i++) {
          this.LineChart4.data.datasets[i].data = this.lsPorcentualDeUtilidades[i].lsporcentaje;
          this.LineChart4.data.datasets[i].label = this.lsPorcentualDeUtilidades[i].nombre;
          if (i + 1 < this.lsPorcentualDeUtilidades.length) {
            this.LineChart4.data.datasets.push({
              label: 'Porcentaje',
              data: [0, 0, 0, 0, 0],
              fill: false,
              lineTension: 0.2,
              borderColor: 'rgb(' + this.r() + "," + this.r() + "," + this.r() + ')',
              borderWidth: 1
            });
          }
        }
        this.LineChart4.update();
 
      }
 
    });
  }
 
  retornaVentaDelAnio() {
    //Line Chart
    this.LineChart2 = new Chart('lineChart2', {
      type: 'line',
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "JuL", "Ago", "Set", "Oct", "Nov", "Dic"],
        datasets: [{
          label: '',
          data: [0],
          fill: false,
          lineTension: 0.2,
          borderColor: "#E59866",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Evolucion de Ventas",
          display: true
        }
      }
    })
    this.empresa.periodo_anno = this.periodo_anno;
    this.empresa.id_empresa = Number(localStorage.getItem('empresaselect'));
    this.dashboardService.listarVentaDelAnio(this.empresa).subscribe((resp: any) => {
      
      this.lsVentaAnio = resp.aaData;
      for (let i = 0; i < this.lsVentaAnio.length; i++) {
        this.LineChart2.data.datasets[i].data = this.lsVentaAnio[i].total_gastos_mes;
        this.LineChart2.data.datasets[i].label = "Evolucion por " + this.lsVentaAnio[i].nombre;
        if (i + 1 < this.lsVentaAnio.length) {
          this.LineChart2.data.datasets.push({
            label: 'Evolucion',
            data: [0, 0, 0, 0, 0],
            fill: false,
            lineTension: 0.2,
            borderColor: 'rgb(' + this.r() + "," + this.r() + "," + this.r() + ')',
            borderWidth: 1
          });
        }
      }
      this.LineChart2.update();
 
    }); 
  }

  // retornarVentaDelAnio(){
  //   this.company.periodo_anno = '2020';
  //    this.company.id_empresa = 1;
  //   this.dashboardService.listarVentaDelAnio(this.company).subscribe((resp: any) => {
  //     this.lsVentaAnio = resp.aaData;
  //   });
  // }
 
  ngAfterViewInit(){
   
  }
  ListarAnio(){
    this.datosadicionalesService.listAnio().subscribe((resp: any) => {
      this.lsAno = resp.aaData;
     });
  }
 
 
  public cargarPieChart(){
    this.PieChart = new Chart('pieChart',{
      type: 'pie',
      data: {
        labels: this.porcentajeVentas.lsnombres_cc,
        datasets: [{
          data: this.porcentajeVentas.lsporcentaje_acumulado,
          backgroundColor: this.porcentajeVentas.ls_colores_rgba,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Porcentaje de Contribucion de Venta",
          display: true
        },
        responsive: false,
        display: true,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return data.labels[tooltipItem.index] + ": " + percentage + "%"
            }
          }
        }
      },
      
    });
 
  }
 
  cargarDonutChart(){
 
    
    //Doughnut Chart
    this.DoughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: this.lsVentaCliente.lsnombres_cc,
        datasets: [{
          label: '# of Votes',
          data: this.lsVentaCliente.lsporcentaje_acumulado,
          backgroundColor: this.lsVentaCliente.ls_colores_rgba,
 
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Acumulado de Ventas por Cliente",
          display: true
        },
        responsive: false,
        display: true,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return data.labels[tooltipItem.index] + ": " + percentage + "%"
            }
          }
        }
      }
    });
  }
 
 
   listarPorcentajeVenta(){
    let obj:any = new Object;
    obj.id_empresa = Number(localStorage.getItem('empresaselect'));
    obj.periodo_anno = this.periodo_anno;
    this.dashboardService.listarPorcentajeVentasNetas(obj).subscribe((resp: any) => {
      if(resp!=null){
        this.porcentajeVentas = resp.defaultObj;
      }else{
        this.porcentajeVentas.lsporcentaje_acumulado=[];
        this.porcentajeVentas.lsnombres_cc = [];
        this.porcentajeVentas.ls_colores_rgba = [];
      }
      this.cargarPieChart();
    });
  }
   r() { return Math.random() * 255; } ; 
  
}