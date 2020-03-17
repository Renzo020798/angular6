import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Cliente } from '../../../../../../../models/Cliente.models';
import { ClienteService } from '../../../../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: []
})
export class NuevoClienteEntradasComponent implements OnInit {

  @Input() index; clientedat; 
  @Input() idempresa;
  constructor(
    public router : Router,
    public activemodal : NgbActiveModal,
    private clienteService: ClienteService,) { }
    public cliente:Cliente = new Cliente();
    lsCliente: Array<any> = [];
    idDisabled = true;
    lstTipoDocuIden : any = [];
    lsEmpresas: Array<any> = [];
    datDoc:Array <any> = [];
    longmax: number;
    nombredoc: string;
    cod_sunat: string;
    numeros = ["0","1","2","3","4","5","6","7","8","9"];

  ngOnInit() {
    this.Inicializar();
  }

  estado = 1;
  llenarComboTipoDocIden(){
    this.clienteService.listarComboTipoDocuIden(this.estado).subscribe((resp: any) =>{
      this.lstTipoDocuIden = resp.aaData;
    });
  }

  Inicializar() {  
    if(this.index == null){
      this.cliente = new Cliente();
      if(this.clientedat.id_empresa != null){
        this.cliente.id_empresa = this.clientedat.id_empresa;
      }
      else{
        this.cliente.id_empresa = this.idempresa;
      }
    }else{
      this.cliente = this.clientedat;
    }
    this.llenarComboTipoDocIden();
  }

  Estado(event){
    if(event == true){
      this.cliente.estado = 1;
    }else{
      this.cliente.estado = 0;
    }
  }

  validarlongmax(i){
    this.datDoc = i;
    this.longmax = i.longmax;
    this.nombredoc = i.abrv;
    this.cod_sunat = i.codigosunat;
    this.cliente.nro_doc = "";
    this.cliente.tipo_doc=i.tipo_doc;
  }

  validarNroDoc(nro){
    let val = nro;
    let bool = false;
    var tmp = val.slice(0, val.length-1);
    //var tmp=val.substring(0,(val.length-1));
    if(val.length>0 && val!=''){
      for(var i=0;i<this.numeros.length;i++){
        if(val[val.length-1]==this.numeros[i]){ 				
          bool=true;
          i=i+this.numeros.length;
          }else{
            bool=false;	    				
          }
        }
      if(!bool){
        this.cliente.nro_doc = tmp;
        swal('N° Documento','Ingresar solo números porfavor', 'error');
      }
    }if(this.cliente.nro_doc.length > this.longmax){ 
      swal(this.nombredoc ,'Ingresar solo '+ this.longmax +' digitos porfavor', 'error');
    }
  }

  validarMovil(nro){
    let val = nro;
    let bool = false;
    var tmp = val.slice(0, val.length-1);
    if(val.length>0 && val!=''){
      for(var i=0;i<this.numeros.length;i++){
        if(val[val.length-1]==this.numeros[i]){ 				
          bool=true;
          i=i+this.numeros.length;
          }else{
            bool=false;	    				
          }
        }
      if(!bool){
        this.cliente.movil = tmp;
        swal('Movil','Ingresar solo números porfavor', 'error');
      }
    }
  }
  validarTelf(nro){
    let val = nro;
    let bool = false;
    var tmp = val.slice(0, val.length-1);
    if(val.length>0 && val!=''){
      for(var i=0;i<this.numeros.length;i++){
        if(val[val.length-1]==this.numeros[i]){ 				
          bool=true;
          i=i+this.numeros.length;
          }else{
            bool=false;	    				
          }
        }
      if(!bool){
        this.cliente.fijo = tmp;
        swal('Fijo','Ingresar solo números porfavor', 'error');
      }
    }
  }
   
  InsertCliente() {   
     Swal.fire({
      title: '¿Estas seguro?',
      text: "Registro de nuevo cliente",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        if( this.index == null ){
          this.cliente.tipo_doc = this.cod_sunat;
            this.cliente.id_empresa=this.idempresa;
            this.clienteService.insertaCliente(this.cliente).subscribe((resp: any) => 
            {
              this.activemodal.close(resp);
              this.redirectTo(this.router.url);
              
            });
          
        }
        }
      }); 
     
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  ListarClientexEmpresa(event){
    this.cliente.id_empresa = event;
    if(this.cliente.id_empresa != null){
      this.idDisabled = false;
    }else{
      this.idDisabled = true;
    }
    this.clienteService.listarCliente(this.cliente).subscribe((resp: any) => {
      this.lsCliente = resp.aaData;
    });
  }
  
  close(){
    this.activemodal.dismiss('Cancelado');
  }
  
}
