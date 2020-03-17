import { Documento_gemp } from './Documento_gemp.model';
 

export class Pagos_documento{
  
///////////////
public	id_documento?:number| null;
   
public fecha_pago?:Date; 
public	monto_pagado?:number| null;
public	moneda?:String| null;
public bloqueado?:Boolean|false;




}