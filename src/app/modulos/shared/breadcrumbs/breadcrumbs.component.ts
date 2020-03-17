
import {map, filter} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: any = '';
  lsDocsGuias: Array<any> = [];
  icon: any = '';

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta,
    private modalService: NgbModal,
    public activemodal : NgbActiveModal,
   ) {

    this.getDataRoute()
      .subscribe( data => {
        this.label = data.titulo;
      switch (this.label) {
 
      case 'Matenimientos  de usuarios':
          this.icon="fa fa-users";
            break;
      case 'Cliente':
        this.icon="fa fa-user"
        break;
      case 'Reportes':
          this.icon="fa fa-file-excel-o";
            break;
      case 'Datos Adicionales':
          this.icon="fa fa-folder-open";
            break;
      case 'Egreso':
          this.icon="mdi mdi-sort-descending";
            break;
      case 'Ingresos':
          this.icon="mdi mdi-sort-ascending";
           break;
      case 'Reportes':
          this.icon="fa fa-file-excel-o";
          break;
      case 'Dashboard':
          this.icon="fa fa-bar-chart";
          break;
      case 'Centro de Costos':
          this.icon="fa fa-cc";
          break;
      case 'Tipo Cobro':
          this.icon="fa fa-credit-card-alt";
          break;
      case 'Cuenta':
        this.icon="fa fa-address-book"
        break;
      case 'Matenimientos  de empresas ':
        this.icon="fa fa-building"
        break;
      case 'Cuentas Ingreso':
          this.icon="fa fa-align-left"
          break;
      case 'Tipo Operacion Egreso':
          this.icon="fa fa-align-right"
          break;       
      }
        console.log("this.label", this.label);
        this.title.setTitle( this.label );
        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metaTag);
      });
  }

  getDataRoute() {
    return this.router.events.pipe(
        filter( evento => evento instanceof ActivationEnd  ),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
        map( (evento: ActivationEnd) => evento.snapshot.data ),);
  }

  ngOnInit() {
  }
  

      public nuevaSalidasAlmacen() {
        this.openModalAlmacen();
      }
      public openModalAlmacen() {
        
      }
      refrescaPagina() {
        this.redirectTo(this.router.url);
      }
      redirectTo(uri) {                  
        let id_almacen = localStorage.getItem('almacenselectid'); //id_almacen
       let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa
        let mes: any={};
        let año: any={};
        mes = localStorage.getItem('pdo_mes');
        año = localStorage.getItem('pdo_ano');
    
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([uri]));
      }


}
