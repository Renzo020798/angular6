import { Component, OnInit, Input } from '@angular/core';
import { CuentaService } from '../../../../../services/cuenta/cuenta.service';
import { Cuenta } from '../../../../../models/cuenta.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-cuenta',
  templateUrl: './nueva-cuenta.component.html',
  styles: []
})
export class NuevaCuentaComponent implements OnInit {

  @Input() index; cuentadat;
  constructor(
    public router : Router,
    private cuentaService: CuentaService,
    public activemodal : NgbActiveModal,
  ) { }

  public cuenta: Cuenta = new Cuenta;
  lstTipoCuenta: Array<any> = [];
  numeros = ["0","1","2","3","4","5","6","7","8","9",];
  tituloCuenta: string;

  ngOnInit() {
    this.Inicializar();
  }

  Inicializar() {  
    if(this.index == null){
      this.tituloCuenta = "Nueva Cuenta";
      this.cuenta = new Cuenta();
      if(this.cuentadat.id_empresa != null){
        this.cuenta.id_empresa = this.cuentadat.id_empresa;
        //
        this.cuenta.cod_tipo_cuenta = this.cuentadat.cod_tipo_cuenta;
      }
    }else{
      this.cuenta = this.cuentadat;
      this.tituloCuenta = "Editar Cuenta";
    }
    this.listarcomboTipoCuenta();
  }

  estado = 1;
  listarcomboTipoCuenta(){
    this.cuentaService.retornarcomboTipoCuenta(this.estado).subscribe((resp: any) =>{
      this.lstTipoCuenta = resp.aaData;
    });
  }

  UpdateInsertCuenta() {    

    Swal.fire({
    title: '¿Estas seguro?',
    text: "Registro de nueva Cuenta",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.value) {
      if( this.index != null ){      
        this.cuentaService.actualizarCuenta(this.cuenta).subscribe((resp: any) => 
        {
          this.activemodal.dismiss(resp);
         });
      }else{
        this.cuentaService.insertaCuenta(this.cuenta).subscribe((resp: any) => 
        {
          this.activemodal.close(resp);
         });
      }
      }
    }); 
  }




  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  close(){
    this.activemodal.dismiss('Cancelado');
    
  }

  validarNumCuenta(nro){
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
        this.cuenta.numero_cuenta = tmp;
        swal('Movil','Ingresar solo números porfavor', 'error');
      }
    }
  }

}
