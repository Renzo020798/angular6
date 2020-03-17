import { CentroCostoCuenta } from "./centrocostocuenta.model";
import { Cuenta } from "./cuenta.model";

export class CentroCosto{
    
    public	id_centro_costo?:number;
    public	id_tipo_centro_costo?:number;
    public	descripcion?:string;
    public	nombre?:string;
    public	niveles?:any;
    public  lsCuentaIngreso?:Array<CentroCostoCuenta>;
    public  lsCuentaEgreso?:Array<CentroCostoCuenta>;
    public  id_empresa?:number;
    public  lscentro_costo2?:Array<CentroCosto>
    public  id_centro_costo_2?:number;
    public  lscentro_costo3?:Array<CentroCosto>
    public  id_centro_costo_3?:number;
    public  lscentro_costo4?:Array<CentroCosto>
    public  id_centro_costo_4?:number;
    public ultimoNivel?: boolean;
    public cuenta?: Cuenta;
    public tipoCentroCosto?: object;
    
    public esconder:boolean;

 

     }