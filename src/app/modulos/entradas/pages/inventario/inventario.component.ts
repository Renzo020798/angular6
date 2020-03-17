import { Component, OnInit, Input } from '@angular/core';
import { NuevoInventarioComponent } from './modals/nuevo-inventario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html' 
})
export class InventarioComponent implements OnInit {
  @Input() invind;

  constructor(private modalService: NgbModal) { }
  tituloEmpleado: string;

  ngOnInit() {
  }

  public Inicializar() {
          
    if(this.invind == null){
      // this.user = new Usuario();
      // this.user.id_empresa = this.newUsusario.id_empresa;
        this.tituloEmpleado = "Nuevo Usuario";
    }else{
      // this.user = this.newUsusario;
      this.tituloEmpleado = "Editar Usuario";
    }
  }
  public openModal( ) {
debugger

  
    const modalRef = this.modalService.open(NuevoInventarioComponent,
      { backdrop: 'static',
        keyboard: false 
      }
    );
    modalRef.componentInstance.invind = null;

    
   modalRef.result.then((result) => {
     }, (reason) => {
    });
  }

}
