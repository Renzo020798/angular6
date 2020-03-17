import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroCosto } from '../../../../../../models/centrocosto.model';
import { CentroCostoService } from '../../../../../../services/centroCosto/centroCosto.service';
import { Router } from '@angular/router';
import { NuevoCentroCostosComponent } from '../nuevo-centro-costos/nuevo-centro-costos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-centro-costo',
  templateUrl: './confirmar-centro-costo.component.html',
  styles: []
})
export class ConfirmarCentroCostoComponent implements OnInit {

  @Input() centro_costodat;
  constructor(private modalService: NgbModal,
    private activemodal: NgbActiveModal,
    private centroCostoService : CentroCostoService,
    public router : Router
  ) { }
  public centro_costo: CentroCosto = new CentroCosto;

  ngOnInit() {
      this.centro_costo = this.centro_costodat;
      this.centro_costo.id_empresa = Number(localStorage.getItem("empresaselectid"));
  }

  insertarCentroCosto(){
    if(this.centro_costo.niveles == "1"){
      this.centroCostoService.insertCentroCosto(this.centro_costo).subscribe((resp: any) =>
      {
      this.activemodal.dismiss(resp);
      });
    }else if(this.centro_costo.niveles == "2"){
      this.centroCostoService.insertCentroCosto2(this.centro_costo).subscribe((resp: any) =>
      {
        this.activemodal.dismiss('Cancelado');
      });
    }else if(this.centro_costo.niveles == "3"){
      this.centroCostoService.insertCentroCosto3(this.centro_costo).subscribe((resp: any) =>
    {
      this.activemodal.dismiss(resp);
    });
    }else{
      this.centroCostoService.insertCentroCosto4(this.centro_costo).subscribe((resp: any) =>
    {
      this.activemodal.dismiss(resp);
    });
    }
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  retroceder(){
    this.activemodal.close('Cancelado');
  }



}
