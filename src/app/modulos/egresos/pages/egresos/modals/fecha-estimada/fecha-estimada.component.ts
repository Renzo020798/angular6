import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Egreso } from '../../../../../../models/Egreso.model';


@Component({
  selector: 'app-fecha-estimada',
  templateUrl: './fecha-estimada.component.html',
  styles: []
})

export class FechaEstimadaComponent implements OnInit {
@Input() fecha_estimada_cobro;lsfechaesti;

  constructor( private modalService: NgbModal,
    public activemodal : NgbActiveModal ) { 
   
  }
public egresodat: Egreso=new Egreso;
list_fecha_estimada:Array<any>=[];
fecha:any;

  ngOnInit() {
    this.list_fecha_estimada = this.lsfechaesti;
    console.log("list_fecha_estimada ",this.list_fecha_estimada);
  }
  adicionarFecha(){
    let objI:any=new Object;
    if (this.list_fecha_estimada.length>0) {
      if(this.list_fecha_estimada[this.list_fecha_estimada.length-1].fecha_estimada == null){
        Swal.fire({
          title: 'Advertencia', 
           text: `Complete la fecha estimada `,
          type: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
        })
      }else{
        this.list_fecha_estimada.push(objI)
        }
    } else{
      this.list_fecha_estimada.push(objI)
     } 
    }
 
  

   guardarFechaEstimada(indice){
    if (this.list_fecha_estimada[indice].fecha_estimada!=null) {
      this.list_fecha_estimada[indice].bloqueado=true;
      if (this.list_fecha_estimada==null) {
         Swal.fire({
          title: 'Advertencia',
          text: `Complete la fecha estimada `,
          type: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
        })
      }
    }
    else{
      Swal.fire({
        title: 'Advertencia',
        text: `Complete la fecha estimada `,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
      })
    
    }
   }
  
   editarFecha(indice){
    this.list_fecha_estimada[indice].bloqueado=false;

  }
  seteaFecha(fecha,indice){
    console.log("fecha ", fecha);
  
    this.list_fecha_estimada[indice].fecha_estimada=fecha;
  
  
     }
  eliminarFecha(indice){
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
        

       this.list_fecha_estimada.splice(indice,1);
     }
    })
  }



  regresar(){
    // if (this.list_fecha_estimada.length <= 0) {
      if(this.list_fecha_estimada.length > 0){
        if(this.list_fecha_estimada[this.list_fecha_estimada.length-1].fecha_estimada == null){
          Swal.fire({
            title: 'Advertencia', 
             text: `Complete el fecha estimada`,
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
          })
        }else{
          this.activemodal.close(this.list_fecha_estimada);
        }
      }else{
        this.activemodal.close(this.list_fecha_estimada);
      }
    
  // }
  
}
} 
 
 
 
  