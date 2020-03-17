import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html'  
})
export class ParametroComponent implements OnInit {

  constructor() { }
  lsParametro:Array<any>;



  ngOnInit() {

    this.lsParametro=[{
      "tipo_parametro":"Importacion",
      "valor": "C:\Users\PARTNER13\Documents\Custom Office Templates"
    },{
      "tipo_parametro":"Descarga",
      "valor": "C:\Users\PARTNER13\Documents\Custom Office Templates"
    },
    {
      "tipo_parametro":"Ruta Backup",
      "valor": "C:\Users\PARTNER13\Documents\Custom Office Templates"
    },
    {
      "tipo_parametro":"Impresora",
      "valor": "ZDesigner ZD420-203dpi ZPL"
    },
    {
      "tipo_parametro":"Conexion BD SIGA",
      "valor": " "
    },
    {
      "tipo_parametro":"Conexion BD SOFIA",
      "valor": " "
    },
    {
      "tipo_parametro":"Etiqueta",
      "valor": " "
    }
  
    ]
  }

}
