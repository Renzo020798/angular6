import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Cliente } from '../../../../../../models/Cliente.models';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styles: []
})
export class NuevoClienteComponent implements OnInit {

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
    datDoc:Array <any> = [];
    longmax: number;
    descripcion: string;
    cod_sunat: string;
    numeros = ["0","1","2","3","4","5","6","7","8","9"];
    tituloCliente: string;
    mostarMensaje:String;

  ngOnInit() {
    this.Inicializar();
  }

  estado = 1;
  llenarComboTipoDocIden(){ 
    this.clienteService.listarComboTipoDocuIden(this.estado).subscribe((resp: any) =>{
      this.lstTipoDocuIden = resp.aaData;
      console.log(this.lstTipoDocuIden)
    });
  }

  Inicializar() {
     if(this.index == null){
      this.tituloCliente = "Nuevo Cliente";
      this.cliente = new Cliente();
      if(this.clientedat.id_empresa != null){
        this.cliente.id_empresa = this.clientedat.id_empresa;
      }
      else{
        this.cliente.id_empresa = this.idempresa;
      }
    }else{
      this.cliente = this.clientedat;
      this.tituloCliente = "Editar Cliente";
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
    if(i==null){
      this.mostarMensaje="";
    }
    this.descripcion = i.descripcion;
    this.longmax = i.longmax;
    this.cod_sunat = i.codigosunat;
    this.cliente.nro_doc = "";
    this.cliente.tipo_doc=i.descripcion;

   switch (this.descripcion) {
    case 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)':
       this.mostarMensaje="Inserte 8 dígitos"
       break;
    case 'REGISTRO ÚNICO DE CONTRIBUYENTES':
       this.mostarMensaje="Inserte 11 dígitos"
       break;
    case 'PASAPORTE':
        this.mostarMensaje="Inserte 12 dígitos"
        break; 
     case 'OTROS TIPOS DE DOCUMENTOS':
          this.mostarMensaje="Inserte 15 dígitos"
          break;
      case 'CARNET DE EXTRANJERIA':
            this.mostarMensaje="Inserte 12 dígitos"
            break;
     default:
       this.mostarMensaje="";
       break;
   }
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
      swal(this.descripcion ,'Ingresar solo '+ this.longmax +' digitos porfavor', 'error');
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
  
  UpdateInsertCliente() {   
    var boolean= this.validar_email(this.cliente.email);
    if(boolean!=false || this.cliente.email=="" || this.cliente.email==undefined){
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
        if( this.index != null ){
          switch(this.cliente.tipo_doc){
            case 'OTROS TIPOS DE DOCUMENTOS':
              this.cliente.tipo_doc = '0    ';
              break;
            case 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)':
              this.cliente.tipo_doc = '4    ';
              break;
            case 'REGISTRO ÚNICO DE CONTRIBUYENTES':
              this.cliente.tipo_doc = '6    ';
              break;
            case 'PASAPORTE':
              this.cliente.tipo_doc = '7    ';
              break;
            case 'CARNET DE EXTRANJERIA':
              this.cliente.tipo_doc = '1    ';
            break;
          }
          this.clienteService.updateCliente(this.cliente).subscribe((resp: any) => 
          {
            this.activemodal.dismiss(resp);
          });
          
        }else{
          this.cliente.tipo_doc = this.cod_sunat;
         
          this.clienteService.insertaCliente(this.cliente).subscribe((resp: any) => 
          {
            this.activemodal.close(resp);
            //this.redirectTo(this.router.url);
          });
        }
        
      }
      });
    }
    else{
      swal('Email','Correo incorrecto', 'error');
    } 
      
     
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

  validar_email(cliente) {
      var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var bool=regex.test(cliente)
if(bool!=false){
  return true;
}
else{
  return false;
    }

 }
  

}

