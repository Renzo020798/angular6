import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../../../../../models/company.model';
import { EmpresaService } from '../../../../../services/empresa/empresa.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert';
import { ClienteService } from '../../../../../services/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styles: []
})
export class NuevaEmpresaComponent implements OnInit {
  @Input() companydat; imagenurl; longitud_max;
  constructor(
    public clienteService: ClienteService,
    public sanitizer: DomSanitizer,
    public router : Router,
    public activemodal : NgbActiveModal,
    private empresaService: EmpresaService,) { }
    public company:Company = new Company();
    lsEmpresas: Array<any> = [];
    lsTipoEmpresa: Array<any> = [];
    lstTipoDocuIden: Array<any> = [];
    idDisabled = true;
    fileToUpload: File = null;
    imagenSubir: File;
    imagenTemp: string;
    comp_urlimage: string;
    datDoc:Array <any> = [];
    longmax: number;
    descripcion: string;
    cod_sunat: string;
    numeros = ["0","1","2","3","4","5","6","7","8","9"];
    tituloEmpresa: string;

  ngOnInit() {
    this.llenarComboTipoDocIden();
    if(this.companydat == null){
      this.tituloEmpresa = "Nueva Empresa";
      this.company = new Company();
      // this.company.id_empresa = this.companydat.id_empresa;
    }else{
      this.tituloEmpresa = "Editar Empresa";
      this.longmax = this.longitud_max;
      this.company = this.companydat;
      console.log("this.companydat ",this.companydat);
      this.comp_urlimage = "data:image/png;base64,"+this.imagenurl;
      this.company.urlimagen = "data:image/png;base64,"+this.imagenurl;
    }
    this.ListarEmpresa();
    
  }
  Inicializar() {
     this.llenarComboTipoDocIden();
    if(this.companydat == null){
      this.company = new Company();
      this.tituloEmpresa = "Nueva Empresa";
      // this.company.id_empresa = this.companydat.id_empresa;
    }else{
      this.company = this.companydat;
      this.tituloEmpresa = "Editar Empresa";
      this.comp_urlimage = "data:image/png;base64,"+this.imagenurl;
      this.company.urlimagen = "data:image/png;base64,"+this.imagenurl;
    }
  }

  // ManejarEntradaDeArchivo(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }

  estado = 1; 
  llenarComboTipoDocIden(){
    this.clienteService.listarComboTipoDocuIden(this.estado).subscribe((resp: any) =>{
       this.lstTipoDocuIden = resp.aaData;
    });
  }

  Estado(event){
    if(event == true){
      this.company.estado = 1;
    }else{
      this.company.estado = 0;
    }
  }

  validarlongmax(i){
    this.datDoc = i;
    this.longmax = i.longmax;
    this.descripcion = i.descripcion;
    this.cod_sunat = i.codigosunat;
    this.company.nro_documento_empresa = "";
    this.company.tipo_doc_empresa = i.descripcion;
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
        this.company.nro_documento_empresa = tmp;
        swal('N° Documento','Ingresar solo números porfavor', 'error');
      }
    }if(this.company.nro_documento_empresa.length > this.longmax){ 
      swal(this.descripcion ,'Ingresar solo '+ this.longmax +' digitos porfavor', 'error');
    }
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result as string;

  }

  UpdateInsertEmpresa() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Registro de nueva Empresa",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
    if( this.company.id_empresa != null ){     
      switch(this.company.tipo_doc_empresa){
        case 'OTROS TIPOS DE DOCUMENTOS':
          this.company.tipo_doc_empresa = '0';
          break;
        case 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)':
          this.company.tipo_doc_empresa = '4';
          break;
        case 'REGISTRO ÚNICO DE CONTRIBUYENTES':
          this.company.tipo_doc_empresa = '6';
          break;
        case 'PASAPORTE':
          this.company.tipo_doc_empresa = '7';
          break;
        case 'CARNET DE EXTRANJERIA':
          this.company.tipo_doc_empresa = '1';
        break;
      }
      this.empresaService.updateEmpresa(this.imagenSubir,this.company).then((resp: any) => 
      {
        this.activemodal.dismiss(resp);
        swal('Success', 'La empresa se actualizo correctamente', 'success');
        this.redirectTo(this.router.url);
      });
    }else{
      this.company.tipo_doc_empresa = this.cod_sunat;
      this.empresaService.insertaEmpresa(this.imagenSubir,this.company).then((resp: any) => 
      {
        this.activemodal.dismiss(resp);
        swal('Success', 'La empresa se resgistro correctamente', 'success');
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
  
  close(){
    this.activemodal.dismiss('Cancelado');
  }
 
    ListarEmpresa(){
    this.empresaService.listarTipoEmpresa().subscribe((resp: any) => {
       if(resp.estado==1){
        this.lsTipoEmpresa = resp.aaData;
        console.log("this.lsTipoEmpresa ",this.lsTipoEmpresa);
      }else{
       }
    });
  }
}
