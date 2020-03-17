import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PorcentajeVenta } from '../../../../../../models/porcentajeventa.model';
import { Router } from '@angular/router';
import { CentroCostoService } from '../../../../../../services/centroCosto/centroCosto.service';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-porcentaje-tipo-venta',
  templateUrl: './porcentaje-tipo-venta.component.html',
  styles: []
})
export class PorcentajeTipoVentaComponent implements OnInit {

  @Input() objs;
  @ViewChild('Porcentaje') campoNumerico: ElementRef;
  
  constructor(
    public activemodal : NgbActiveModal,
    public router : Router,
    private centroCostoService : CentroCostoService,
  ) { }
  public porcentaje_venta = new PorcentajeVenta();
  porcentajeIA : any = 0;
  numeros = ["0","1","2","3","4","5","6","7","8","9"];
  
    ngOnInit() {
      if(this.objs != null){
        this.listaPorcentajeVenta();
      }else {
        this.porcentaje_venta =  new PorcentajeVenta();
     }
    }

  close(){
    this.activemodal.dismiss('Cancelado'); 
  }

  public listaPorcentajeVenta(){
    this.centroCostoService.listarPorcentajeVenta(this.objs).subscribe((resp: any)=>
    {
        this.porcentaje_venta.porcentaje = resp.defaultObj.porcentaje;
        if(this.porcentaje_venta.porcentaje != 0){
          this.porcentajeIA = 1;
        }else{
          this.porcentajeIA = 0;
        }
    });
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  UpdateInsertPorcentajeVentas() {
    if(this.porcentaje_venta.porcentaje < 101){
    if(this.porcentajeIA == 1){
      this.porcentaje_venta.id_centro_costo = this.objs.id_centro_costo;
      this.porcentaje_venta.niveles = this.objs.niveles
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Se Actualizará el porcentaje",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          this.centroCostoService.updatePorcentajeVenta(this.porcentaje_venta).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);
            //this.redirectTo(this.router.url);
          });
        }
      })
    } else{
      this.porcentaje_venta.id_centro_costo = this.objs.id_centro_costo;
      this.porcentaje_venta.niveles = this.objs.niveles;
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Se Insertará el porcentaje",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          this.centroCostoService.insertPorcentajeVenta(this.porcentaje_venta).subscribe((resp: any) => 
          {
            this.activemodal.close(resp);
            //this.redirectTo(this.router.url);
          });
        }
      })

    }
  }else{
    swal('Porcentaje','Debe ser menor que 100', 'error');
  }
  }



  validarPorcentaje(nro){
    this.campoNumerico.nativeElement.value = nro;
    this.campoNumerico.nativeElement.addEventListener('keydown', (evento)=> {
      const teclaPresionada = evento.key;
      // tslint:disable-next-line:radix
      let teclaPresionadaEsUnNumero = Number.isInteger(parseInt(teclaPresionada));
      if(teclaPresionada == "."){
        teclaPresionadaEsUnNumero = true;
      }
      const sePresionoUnaTeclaNoAdmitida = 
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;
      const comienzaPorCero = this.campoNumerico.nativeElement.value.length === 0 && teclaPresionada == 0;
      if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault(); 
      }
    
    });
  }
  
}

 
  