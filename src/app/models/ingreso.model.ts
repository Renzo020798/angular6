import { Documento_gemp } from './Documento_gemp.model';
 

export class Ingreso{
public	id_ingreso?:number| null;

///////////////
public	id_empresa?:number| null;

 public cuenta_ingreso?:String| null;
public tipo_cobro?:String| null; 
public cobro?:String| null; 
public cuenta_numero?:String| null; 
 public moneda_descripcion?:String| null; 
public fecha_estimada_cobro?:Date; 
public fecha_documento?:Date; 
public fecha_real_cobro?:Date; 
public fecha_pago_detraccion?:Date; 
public	id_centro_costo?:number| null;
public fecha_estimada_cobro_dat?:Date; 
public fecha_real_cobro_dat?:Date; 
public id_cuenta?:number|null;

public	descripcion?:String| null;
public	documento?:Documento_gemp| null;

public bloqueado?:Boolean|false;
public   lsFechasEstimadas: Array<any> = [];

}