import { Pagos_documento } from "./Pagos_documento.model";
import { Cliente } from "./Cliente.models";

 export class	Documento_gemp{
public	id_doc?:number| null;
public	id_ingreso?:number| null;
public	tipo_doc?:number| null;
public	id_empresa?:number| null;
public	cod_prov_cli?:String| null;
public	razon_social?:String| null;
public	serie_comprobante?:String| null;
public	nro_comprobante?:String| null;
public	estado?:number| null;
public	flg_doc_det?:number| null;
public	flg_falta_doc?:number| null;
public	flg_falta_guia?:number| null;
public	fecha_operacion?:Date| null;
public	fecha_emision?:Date| null;
public	tipo_moneda?:String| null;
 public	tot_doc?:number| null;
public	base_impo?:number| null;
public	total_doc_mn?:number| null;
public	total_doc_me?:number| null;
public	fecha_fin?:Date| null;
public	fecha_ini?:Date| null;
public	pdo_mes?:string| null;
public pdo_ano?:String |null;
public dua?:String|null;
 public lsguia:Array<any>;
public lsCostosAsocglobales:Array<any>;
public lsdocumento:Array<any>;
public fech_operac?: Date;
public fehcdt?: Date;
 public total_isc?: number;
public id_doc_referencia?: number;
public fecha_ingreso?:Date;
public id_almacen?: number;


//////////
public cliente_razon_social?:String |null;
public cliente_ruc?:String |null;
public id_cliente?:number |null;
public cod_tipo_documento?:String |null;
public percepcion?:Boolean; 
public detraccion?:Boolean; 
public igv?:Boolean; 
public	total_detracciones?:number| null;
public	total_percepciones?:number| null;
public	total_igv?:number| null;
public	tipo_cambio?:number| null;
public	total_dolares:any| null;
public	total_soles?:any| null;
public	doc_nro?:String| null;
public	fecha_documento?:Date| null;
public	cod_moneda?:String| null;
public	fecha_pago_detraccion?:Date| null;
public	subtotal_soles?:number| null;
public	subtotal_dolares?:number| null;
public	monto_detraccion?:number| null;
public	monto_percepcion?:number| null;
public	monto_igv?:number| null;
public	id_egreso?:number| null;
public lsPagos:Array<Pagos_documento>;
public	total_pagado?:number| 0.00;
 public	cliente?:Cliente| null
 public fecha_estimada?:String| null;
 public id_cuenta?: number | null;

}