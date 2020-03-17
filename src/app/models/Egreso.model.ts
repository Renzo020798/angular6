import { Documento_gemp } from './Documento_gemp.model';
 

export class Egreso{
public	id_egreso?:number| null;

///////////////
public	id_empresa?:number| null;

public cuenta_egreso?:String| null;
public tipo_cobro?:String| null; 
public cobro?:String| null; 
public cuenta_numero?:String| null; 
public moneda_descripcion?:String| null; 
public fecha_estimada_cobro?:Date; 
public fecha_documento?:Date; 
public fecha_real_cobro?:Date; 
public fecha_pago_detraccion?:Date; 
public id_centro_costo?:number| null;
public fecha_estimada_cobro_dat?:Date; 
public fecha_real_cobro_dat?:Date; 


public id_cuenta?:any| null;
public descripcion?:String| null;
public documento?:Documento_gemp| null;
public   lsFechasEstimadas: Array<any> = [];


}