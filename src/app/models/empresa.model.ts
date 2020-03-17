import { Pagination } from '../modulos/Pagination.model';

export class	Empresa extends Pagination{
public	idempresa:number;
public	razonsocial:String;
public	razon_social:String;
public	ruc:string;
public	direccioncomercial:String;
public	estado:number;
public	fecharegistro:Date;
public	idcuenta:Number;
public	urlimagen:String;
public	telefono:String;
public	email:String;
public	website:String;
public	idubigeo:Number;
public	logo:String;
public	idsuregimenempresa:Number;
public	idsuactividadcomercial:Number;
public	idtipomoneda:Number;
public	idmatriz:Number;
public	nombrecomercial:String;
public	celular:String;
public	anexo:String;
public accion:String;
public lsEmpresa:Array<Empresa>;
public id_empresa?:number;
public periodo_anno?:String;
}