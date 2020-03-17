import { Pagination } from '../modulos/Pagination.model';
import { Empresa } from './empresa.model';
export class	Empleado extends Pagination{
public	id?:number| null;
public	apellido_paterno?:String| null;
public	apellido_materno?:String| null;
public	nombres?:String| null;
public	email?:String| null;
public	password?:String| null;
public	estado?:number| null;
public	fechacumpleanios?:| null;
public	idarea?:number| null;
public	idcargo?:number| null;
public	documentoidentidad?:String| null;
public	idsutipodocumentoidentidad?:number| null;
public	estadoregistrado?:number| null;
public	idempresa?:number| null;
public	idtipoempleado?:number| null;
public	username?:String| null;
public	role?:String| null;
public accion?:String|null;
public idperfiles:number|null;
public nombre_perfil?:String|null;
public empresa?:Empresa|null;
}