import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from '../../../../../../services/empresa/empresa.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import swal from 'sweetalert';
import { ClienteService } from '../../../../../../services/cliente/cliente.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-cargar-excel-cliente',
  templateUrl: './cargar-excel-cliente.component.html',
  styles: []
})
export class CargarExcelClienteComponent implements OnInit {

  @Input() productodat;

  constructor(private clienteService: ClienteService, public router : Router,
    private empresaService: EmpresaService,public activemodal : NgbActiveModal
    ) { }
  archivoSubir: File;
  archivoTemp: string;
  cargando: boolean=false;
  ngOnInit() {
   }


  bajarExcel(){
    let obj = {
      "id_empresa" : localStorage.getItem('empresaidvar'),
    }
    this.clienteService.bajarExcel(obj).subscribe((resp: any) => {

      var file = new Blob([resp], {type:'application/vnd.ms-excel'});
      // var fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
      saveAs(file, "MODELO_BASE_CLIENTE.xlsx");
    });
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  seleccionArchivo(archivo: File){
    if ( !archivo ) {
      this.archivoSubir = null;
      return;
    }

    if ( archivo.type.indexOf('spreadsheet') < 0 ) {
      swal('Sólo Archivos', 'El archivo seleccionado no es correcto', 'error');
      this.archivoSubir = null;
      return;
    }

    this.archivoSubir = archivo;

    let reader = new FileReader();
    let urlArchivoTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.archivoTemp = reader.result as string;
    this.cargarArchivo();
  }

  cargarArchivo() {   
    let obj:any = {
      "id_empresa" : localStorage.getItem('empresaidvar'),
    }
  this.cargando =true;
      this.clienteService.cargarArchivoCliente(this.archivoSubir,obj).then((resp: any) => 
      {
        this.cargando= false;
        if(resp.estado==1){
          swal('Success', 'El archivo se cargo correctamente', 'success');
        }else{
          swal('Error',resp.msg, 'error');

        }
        this.redirectTo(this.router.url);
        this.activemodal.dismiss(resp);
      });
  }
  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
