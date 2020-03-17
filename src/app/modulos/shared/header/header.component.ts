import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService,HeaderService, SidebarService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Empresa } from '../../../models/empresa.model';

import { EmpresaService } from '../../../services/empresa/empresa.service';
import { Parametros } from '../../../models/parametros.models';
import { environment } from '../../../../environments/environment';
import { Company } from '../../../models/company.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public menuModulos:any[];
  public lsEmpresas:any[];
  public lsCompany:any[];
  public lsParamEmpr:any[];
  public lsAlmacen:any[];
  public mes: Parametros = {};
  public ano: Parametros = {};
  public company: any;
  public Igv: string;
  public Isc: string;
  public usuario: Usuario;
  public empresa:Company;
  // public empresa:Empresa;
  idDisabled = true;
  fechaDisabled = false;
  nivel_Admin=false;
  logo=false;
  mostrar:Boolean;
  
  public moduloSelected:number=0;
  public notificacion = new EventEmitter<any>();
  idPerfilAdministradorPlataforma: number = environment.idPerfilAdministradorPlataforma;
  idPerfilGerente: number = environment.idPerfilGerente;

  constructor(
    public _usuarioService: UsuarioService,
    public _headerService:HeaderService,    
    public _siderService:SidebarService,
    public router: Router,
    public comp: SidebarComponent,
    public empresaService: EmpresaService,
  ) { }
  ngOnInit() {
    if(this._usuarioService.usuario!=null){  
      this.usuario = this._usuarioService.usuario;
      let usersto:any={};
      usersto=JSON.parse(localStorage.getItem('usuario'));
      ////CAMBIAR PARA QUE LISTEN TODAS LAS EMPRESAS CUANDO ES PERFIL ADMINISTRADOR///
      //this.lsEmpresas=usersto.lsEmpresas;
      //this.lsEmpresas.push(usersto.empresa);
      this.empresa=usersto.empresa;
      this._siderService.nameModulo =localStorage.getItem('namemoduloselected');
    }else{                             
      this.usuario=new Usuario();
      this.usuario.img="default";
      this.empresa=new Company();
    }
    this.evaluaPerfil();
    
  }

  evaluaPerfil() {  
                          
    switch(this.usuario.perfil.id_perfiles){
      case this.idPerfilAdministradorPlataforma:
              this.nivel_Admin=true;
            ;break;
      case this.idPerfilGerente:
          this.nivel_Admin=false;
            ;break;
        default:
          this.nivel_Admin=false;
          break;
     }
      if(!this.nivel_Admin){
        localStorage.setItem('empresaselectid', this.usuario.empresa.id_empresa);
       }
       this.listarEmpresasInit();
       //this.periodoActual();
  }

  

  listarEmpresas() {       
    this.empresaService.listEmpresa().subscribe( (resp: any) => {
    this.lsCompany = resp.aaData;
    let id_empresa = localStorage.getItem('empresaselectid');
    if(id_empresa!=null ){     
       for(let empresa of this.lsCompany){
        if(empresa.id_empresa==id_empresa){
          this.empresa=empresa.razon_social;
          break;
        }
      }
      //this.ListarAlmacen();
    }
    });
  }

  listarEmpresasInit() {         
    this.empresaService.listEmpresa().subscribe( (resp: any) => {
      this.lsCompany = resp.aaData;
      let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa

      if(id_empresa==null ){ 
        id_empresa= this.usuario.empresa.id_empresa;
      }   
      
 
      // this.company=this.lsCompany.find(x => x.id_empresa == this.usuario.empresa.id_empresa);
       this.empresa=this.lsCompany.find(x => x.id_empresa == id_empresa);
       localStorage.setItem('datempresa',  JSON.stringify(this.empresa));
      //  for(let empresa of this.lsCompany){
      //    if(empresa.id_empresa==id_empresa){
      //      this.company=empresa.razon_social;
      //      localStorage.setItem('empresaselect', String(empresa.cod_empresa));
      //      break;
      //      }
      //    }
      if(this.empresa.urlimagen==undefined){
        this.logo=false;
       }else{
        this.logo=true;
       }
      localStorage.setItem('empresaselect', String(this.empresa.id_empresa));
      localStorage.setItem('empresaselectid', String(this.empresa.id_empresa));
      this.empresaService.retornaEmpresaPorId(this.empresa.id_empresa).subscribe((resp: any) => {
        var urlimagenemp:string = resp.file;
        this.empresa.urlimagen = "data:image/png;base64,"+urlimagenemp;
        localStorage.setItem('logourl', String(this.empresa.urlimagen));
      })
      // if(localStorage.getItem('almacenselectid') == null){
      //   localStorage.setItem('almacenselectid','00');
      // }
      //this.lsParamCtaxEmpr();
      //this.ListarAlmacenInit();
     
    });
  }
  
  ObtenerIGVGlobal() {      
    this._headerService.lsIGVglobal().subscribe( (resp: any) => {      
    this.Igv = resp.defaultObj;
    localStorage.setItem('Igv', this.Igv);
    });
  }

  ObtenerISCGlobal() {      
    this._headerService.lsISCglobal().subscribe( (resp: any) => {      
    this.Isc = resp.defaultObj;
    localStorage.setItem('Isc', this.Isc);
    });
  }

  lsParamCtaxEmpr() {                         
    let id_empresa = localStorage.getItem('empresaselectid');
    var obj={
      "id_empresa":id_empresa
    }
    this.empresaService.lsParamCtaxEmpr(obj).subscribe( (resp: any) => {                       
    this.lsParamEmpr = resp.aaData;
    if(this.lsParamEmpr != undefined){
    for(let param of this.lsParamEmpr){
      switch( param.codigo ){
        case 'INGTRANSFED':
          localStorage.setItem('INGTRANSFED', param.valor);
        break;
        case 'INGTRANSFEH':
          localStorage.setItem('INGTRANSFEH', param.valor);
        break;
        case 'INGTRSFOD':
          localStorage.setItem('INGTRSFOD', param.valor);
        break;
        case 'INGTRSFOH':
          localStorage.setItem('INGTRSFOH', param.valor);
        break;
        case 'INGDONAD':
          localStorage.setItem('INGDONAD', param.valor);
        break; 
        case 'INGDONAH':
          localStorage.setItem('INGDONAH', param.valor);
        break;
        case 'INGOTROD':
          localStorage.setItem('INGOTROD', param.valor);
        break;
        case 'INGOTROH':
          localStorage.setItem('INGOTROH', param.valor);
        break;
        case 'EGRTRANSFED':
          localStorage.setItem('EGRTRANSFED', param.valor);
        break;
        case 'EGRTRANSFEH':
          localStorage.setItem('EGRTRANSFEH', param.valor);
        break;
        case 'EGRTRSFOD':
          localStorage.setItem('EGRTRSFOD', param.valor);
        break;
        case 'EGRTRSFOH':
          localStorage.setItem('EGRTRSFOH', param.valor);
        break;
        case 'EGRCONINTD':
          localStorage.setItem('EGRCONINTD', param.valor);
        break;
        case 'EGRCONINTH':
          localStorage.setItem('EGRCONINTH', param.valor);
        break;
        case 'EGROTROD':
          localStorage.setItem('EGROTROD', param.valor);
        break;
        case 'EGROTROH':
          localStorage.setItem('EGROTROH', param.valor);
        break;
        case 'EGROBSOD':
          localStorage.setItem('EGROBSOD', param.valor);
        break;
        case 'EGROBSOH':
          localStorage.setItem('EGROBSOH', param.valor);
        break;
        case 'PROVISIOND':
          localStorage.setItem('PROVISIOND', param.valor);
        break;
        case 'PROVISIONH':
          localStorage.setItem('PROVISIONH', param.valor);
        break;
        case 'CTATOTEMPR':
          localStorage.setItem('CTATOTEMPR', param.valor);
        break;
        case 'CTAIGVEMPR':
          localStorage.setItem('CTAIGVEMPR', param.valor);
        break;
        case 'CTAISCEMPR':
            localStorage.setItem('CTAISCEMPR', param.valor);
          break;
        case 'CTAIGVNGEMPR':
          localStorage.setItem('CTAIGVNGEMPR', param.valor);
        break;
        case 'CTAOTREMPR':
          localStorage.setItem('CTAOTREMPR', param.valor);
        break;
        case 'CTAASIVTAD':
          localStorage.setItem('CTAASIVTAD', param.valor);
        break;
        case 'CTAASIVTAH':
          localStorage.setItem('CTAASIVTAH', param.valor);
        break;
        case 'CTAMERC':
          localStorage.setItem('CTAMERC', param.valor);
        break;

      }
    }
  }
    });
  }

  setStorageUsuario(event) {                 
    //this.almacen= new Almacen();

    if(event != null){
      //this.almacen= new Almacen();
      localStorage.setItem('empresaselect', String(event.id_empresa));
      localStorage.setItem('empresaselectid', event.id_empresa);
      localStorage.setItem('datempresa',  JSON.stringify(event));
      //localStorage.setItem('almacenselectid','00');
     
    }else{
      // tslint:disable-next-line:no-unused-expression
      localStorage.empresaselectid = -1;
     }
      //this.ListarAlmacen();
      //this.lsParamCtaxEmpr();
      this.refrescaPagina();
  }
    
  refrescaPagina() {                
      this.redirectTo(this.router.url);
  
    }
    redirectTo(uri) {         
      //let id_almacen = localStorage.getItem('almacenselectid'); //id_almacen
     let id_empresa = localStorage.getItem('empresaselectid'); //id_empresa

      // let mes: any={};
      // let año: any={};
      // mes = localStorage.getItem('pdo_mes');
      // año = localStorage.getItem('pdo_ano');

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
    }
 
  periodoActual() {        
    var f = new Date();
    let mes: any={};
    let año: any={};
    mes = localStorage.getItem('pdo_mes');
    año = localStorage.getItem('pdo_ano');
    // tslint:disable-next-line:no-non-null-assertion
    // tslint:disable-next-line:curly
    if( mes=='00' || año=='00' || mes==null || año==null){
      let m: number=0;
      let m2: string='';
      m=(f.getMonth()+1) ;
      m2= m.toString();
        if(m2.length==1){
          m2='0'+m2;
        }
     this.mes.valor=m2;
      let ano: any={};
      ano=f.getFullYear();
      this.ano.valor=ano;
      }else{
      if(mes.length==1){
        mes='0'+mes;
      }
      this.mes.valor=mes ;
      this.ano.valor=año;
      localStorage.setItem('pdo_mes',this.mes.valor);
      localStorage.setItem('pdo_ano',this.ano.valor);
    }
 
}

  // setStorageAlmacen(event){ 
  //   if(event != null){
  //   localStorage.setItem('almacenselectid',String(event.id_almacen));
  //     let pdo_mes = localStorage.getItem('pdo_mes');  //
  //     let pdo_ano = localStorage.getItem('pdo_ano');  // 
  //     if(pdo_ano=='' ||pdo_ano==null ||pdo_ano=='00'){
  //       pdo_ano=this.lsAno[0].valor;
  //       this.ano.valor=pdo_ano;
  //       localStorage.setItem('pdo_ano',pdo_ano);
  //     }
  //     if(pdo_mes=='' ||pdo_mes==null ||pdo_mes=='00'){
  //       pdo_mes=this.lsMes[0].valor;
  //       this.mes.valor=pdo_mes;
  //       localStorage.setItem('pdo_mes',pdo_mes);
  //     }
  //     this.fechaDisabled=false;

  //   this.refrescaPagina();
  //    }else{
  //     // tslint:disable-next-line:no-unused-expression
  //     localStorage.almacenselectid = undefined;
  //   }
  // }

    

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }
  logout(){
    this._headerService.logout();
  }

// ListarAlmacen(){       
  //     let id_empr = (localStorage.getItem('empresaselectid'));
  //     // tslint:disable-next-line:radix
  //     this.almacen.id_empresa =  parseInt(id_empr);
  //   if(this.almacen.id_empresa != -1){
  //     this.idDisabled = false;
  //   }else{
  //     this.almacen = new Almacen();
  //     this.idDisabled = true;
  //   }
  //   this.almacenService.retornarAlmacen(this.almacen).subscribe((resp: any) => {
               
  //     this.lsAlmacen = resp.aaData;
  //     if( this.lsAlmacen!=undefined&&this.lsAlmacen.length>0){
  //     let id_almacen = localStorage.getItem('almacenselectid'); //id_almacen
  //     if(id_almacen=='00' || id_almacen==null){
  //       this.almacen=this.lsAlmacen[0];
  //       localStorage.setItem('almacenselectid',String(this.almacen.id_almacen));
  //     }else{
  //     if(id_almacen!=null){
  //        for(let almacen of this.lsAlmacen){
  //         if(almacen.id_almacen==id_almacen){
  //           this.almacen=almacen.desc_almacen;
  //           localStorage.setItem('almacenselectid',almacen.id_almacen);
  //         break;
  //           }
  //         }
  //       } 
  //     }       
  //     let pdo_mes = localStorage.getItem('pdo_mes'); //id_almacen
  //     let pdo_ano = localStorage.getItem('pdo_ano'); //id_almacen
  //     if(pdo_ano=='' ||pdo_ano==null ||pdo_ano=='00'){
  //       pdo_ano=this.lsAno[0].valor;
  //       this.ano.valor=pdo_ano;
  //       localStorage.setItem('pdo_ano',pdo_ano);
  //     }
  //     if(pdo_mes=='' ||pdo_mes==null ||pdo_mes=='00'){
  //       pdo_mes=this.lsMes[0].valor;
  //       this.mes.valor=pdo_mes;
  //       localStorage.setItem('pdo_mes',pdo_mes);
  //     }
  //     this.fechaDisabled=false;
  //   }
  //      this.refrescaPagina();
  //   }
  //    );
  // }
   
  
//   setStorageMes(event) {
                  
//     if(event==null||event=='00'){
//        localStorage.setItem('pdo_mes','00');
//        this.mes.valor=null;
//     }else{
//       this.mes.valor=event.valor;
//       localStorage.setItem('pdo_mes', String(this.mes.valor));
//       if(this.ano.valor==null||this.ano.valor=='00'){
//         this.ano.valor=this.lsAno[0].valor;
//         localStorage.setItem('pdo_ano',this.ano.valor);
//       }
//      this.refrescaPagina(); 

//    }
// }
  

// setStorageAno(event) {         
                       
//   if(event==null){
//     localStorage.setItem('pdo_ano','00');
//     localStorage.setItem('pdo_mes','00');
//       this.mes.valor=null;
//     this.fechaDisabled=true;
//   }else{
//     this.ano.valor=event.valor;
//     localStorage.setItem('pdo_ano', this.ano.valor);
//     if(this.mes.valor==null||this.mes.valor=='00'){
//       this.mes.valor=this.lsMes[0].valor;
//       localStorage.setItem('pdo_mes',this.mes.valor);
//     }
//    this.fechaDisabled=false;
//    this.refrescaPagina(); 
//     }
// }

 

  // cambiaEmpresa(emp:any){
  //   let usersto:any={};
  //   usersto=JSON.parse(localStorage.getItem('usuario'));
  //   usersto.empresa={};
  //   usersto.empresa=emp;
  //   localStorage.setItem('usuario', JSON.stringify(usersto));
  //   this.empresa=emp;
  //   localStorage.setItem('empresaselect', String(emp.idempresa));
  //   this.router.navigate(['/dashboard']);  
  // }

}
