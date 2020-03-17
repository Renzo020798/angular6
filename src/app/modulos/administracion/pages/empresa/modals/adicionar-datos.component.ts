import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ValoresInicialesService } from '../../../../../services/valores-iniciales/valores-iniciales.service';
import { ValoresIniciales } from '../../../../../models/valoresiniciales';
import { Cuenta } from '../../../../../models/cuenta.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-datos',
  templateUrl: './adicionar-datos.component.html',
  styles: []
})
export class AdicionarDatosComponent implements OnInit {

  @Input() idempresa;datosAdicionalesdat;adicionar
  @Input() valoresIniciales_input
  constructor(
    private activemodal: NgbActiveModal,
    private valoresInicialesService: ValoresInicialesService,
    ) {}
  public valoresIniciales:ValoresIniciales = new ValoresIniciales();
  public cuenta:Cuenta= new Cuenta();
  public router : Router;
  numeros = ["0","1","2","3","4","5","6","7","8","9"];
  lsAno: Array<any> = [];
 
  //  lsAno: Array<any> = [
  //   {
  //     descripcion: '2018',
  //     valor: '18' 
  //   },
  //   {
  //     descripcion: '2019',
  //     valor: '19' 
  //   },
  //   {
  //     descripcion: '2020',
  //     valor: '20' 
  //   }
  //  ]

   mes:any = new Object;
   ano:any = new Object;

  ngOnInit() {  debugger
    this.ListarAnio();
    if (this.valoresIniciales_input!=null) {
      this.valoresIniciales=this.valoresIniciales_input;
    }
   // this.listaValores();

  }

  ListarAnio(){
    this.valoresInicialesService.listAnio().subscribe((resp: any) => {debugger
      this.lsAno = resp.aaData;
     });
  }
  registrarValorInicial(){  
    if(this.valoresIniciales.ano!=null && this.valoresIniciales.valor_inicial!=0){     
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Registro de Inventario Inicial",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.value){

        
          let obj:any = new Object;
          obj.ano=this.valoresIniciales.ano;
          obj.id_empresa=this.valoresIniciales.id_empresa;
          obj.valor_inicial=this.valoresIniciales.valor_inicial;
                this.valoresInicialesService.insertarValoresInciales(obj).subscribe((resp: any) =>
                     {
                       this.activemodal.dismiss(resp);
                     });
                     
       
      }
    });
    
  }
  else{
    Swal.fire({
          title: 'Advertencia',
          text: `Complete el dato adicional `,
          type: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        })
  }
           
  }

  listaValores(){
    let obj:any = new Object;
    obj.id_empresa=this.valoresIniciales.id_empresa;
    this.valoresInicialesService.listaValoresIniciales(obj).subscribe((resp: any) => { 
      if(resp!=null){ 
        console.log("listaValoresInciales",resp);
        this.valoresIniciales = resp.defaultObj;
        
      }
    });
  }

  validarInven(nro){
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
    }
  }
  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  validaAno(event){
    let obj:any = new Object;
    obj.ano=event.desc_periodo_año;
     this.valoresIniciales.ano=event.desc_periodo_año;
    obj.id_empresa=this.valoresIniciales.id_empresa;
    this.valoresInicialesService.RetornarValoreInicialxano(obj).subscribe((resp: any) => { 
      if(resp!=null){
        
        this.valoresIniciales.valor_inicial = resp.defaultObj.valor_inicial;
        
      }
    });
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  validarvalor(nro){
  let val = nro;
    // let bool = false;
    // var tmp = val.slice(0, val.length-1);
    // if(val.length>0 && val!=''){
    //   for(var i=0;i<this.numeros.length;i++){
    //     if(val[val.length-1]==this.numeros[i]){ 				
    //       bool=true;
    //       i=i+this.numeros.length;
    //       }else{
    //         bool=false;	    				
    //       }
    //     }
    //   if(!bool){
    //     this.valoresIniciales.valor_inicial=tmp;
    //     swal('Numeros','Ingresar solo números porfavor', 'error');
    //   }
    // }
  }
}
