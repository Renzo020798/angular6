import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoCobro } from '../../../../../../models/tipocobro.model';
import { TipocobroService } from '../../../../../../services/tipocobro/tipocobro.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tipocobro',
  templateUrl: './nuevo-tipocobro.component.html',
  styles: []
})
export class NuevoTipocobroComponent implements OnInit {
  
  @Input() index; tipocobrodat;

  constructor(
    public activemodal : NgbActiveModal,
    public tipocobroService : TipocobroService,
    public router : Router,
  ) { }

  listaTipoCobro: Array<any>=[];
  public tipocobro: TipoCobro = new TipoCobro;
  tituloTipoCobro: string;
  
  public tipo_cobro:TipoCobro = new TipoCobro();

  ngOnInit() {
    this.lsTipoCobro();
    this.tipocobro = Object.assign({},this.tipocobrodat);
    if(this.index != null){
      this.tituloTipoCobro = "Editar Tipo Cobro";
      }else {
      this.tituloTipoCobro = "Nuevo Tipo Cobro";
    }

  }

    lsTipoCobro(){
    this.tipo_cobro.id_empresa = Number(localStorage.getItem("empresaselectid"));
    this.tipocobroService.listTipoCobro(this.tipo_cobro).subscribe((resp: any) => {
      this.listaTipoCobro = resp.aaData;
    });
  }

  close(){
    // this.redirectTo(this.router.url);
    this.activemodal.dismiss('Cancelado'); 
  }

  UpdateInsertTipoCobro() {
   
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Registro de tipo de cobro",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        if( this.index != null ){  
          
          this.tipocobroService.updateTipoCobro(this.tipocobro).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);
            
          });
        }else{
          this.tipocobro.id_empresa = Number(localStorage.getItem("empresaselectid"));
          this.tipocobroService.insertaProducto(this.tipocobro).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);

          });
        }
        }
      });
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
