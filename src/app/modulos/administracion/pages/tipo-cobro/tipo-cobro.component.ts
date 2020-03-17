import { Component, OnInit } from '@angular/core';
import { TipocobroService } from '../../../../services/tipocobro/tipocobro.service';
import { TipoCobro } from '../../../../models/tipocobro.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTipocobroComponent } from './modals/nuevo-tipocobro/nuevo-tipocobro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-cobro',
  templateUrl: './tipo-cobro.component.html',
  styles: []
})
export class TipoCobroComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public tipocobroService : TipocobroService,
    public router : Router,
  ) { }

  listaTipoCobro: Array<any>=[];
  public tipo_cobro:TipoCobro = new TipoCobro();

  ngOnInit() {
    this.lsTipoCobro();
  }

  lsTipoCobro(){
    this.tipo_cobro.id_empresa = Number(localStorage.getItem("empresaselectid"));
    this.tipocobroService.listTipoCobro(this.tipo_cobro).subscribe((resp: any) => {
      this.listaTipoCobro = resp.aaData;
    });
  }

  InsertarTipoCobro(){
    let indice = null;
    this.openModal(indice);
  } 

  ActualizarTipoCobro(indice){
    this.openModal(indice);
  }
  
  EliminarEmpresa(indice){
    for(let cat of this.listaTipoCobro.slice(indice,indice+1)){
      this.tipo_cobro.id_tipo_cobro = cat.id_tipo_cobro;
    }
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        //this.tipo_cobro.id_empresa = Number(localStorage.getItem("empresaselectid"));
        this.tipocobroService.eliminarTipoCobro(this.tipo_cobro).subscribe((resp: any) => {
          //this.lsTipoCobro();
          this.redirectTo(this.router.url);

        });
      }
    })
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  public openModal(indice) {
    for(let cat of this.listaTipoCobro.slice(indice,indice+1)){
      this.tipo_cobro = cat;
    }
    const modalRef = this.modalService.open(NuevoTipocobroComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.index = indice;
    modalRef.componentInstance.tipocobrodat = this.tipo_cobro;
    modalRef.result.then((result) => {
   }, (reason) => {
   });
  }
  

  
}
