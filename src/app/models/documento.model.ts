

export class Documento {
 
    constructor(


    public accion?: string,

	   public cod_emp?: string,
	   public  pdo_ano?: string,
	   public  pdo_mes?: string,
	   public fech_operac?: Date,
	   public  glosa?: string,
	   public  cod_tipo_doc?: string,
	   public  ser_doc?: string,
	   public  nro_doc?: string,
	   public  ruc_proveedor?: string,
	//    
	   public  raz_proveedor?: string,
	   public  dir_proveedor?: string,
	//    
	   public fech_doc?: Date,
	   public fech_emis_doc?: Date,
	   public fech_detrac?: Date,
	   public fehcdt?: Date,

	   
	   public fech_emis?: Date,
	   public fech_vct?: Date,
	   public tipo_mone?: string,
	   public cod_mone?: string,
	   public tipo_cambio?: number,
	   public flg_doc_det?: number,
	//    public  cod_asnto_tipo?: string,
	   public importe_op_gravada?: number,
	   public importe_op_gravnograv?: number,
	   public importe_op_nogravada?: number,
	   public importe_exoneracion?: number,
	   public importe_igv?: number,
	   public importe_isc?: number,
	   public importe_otros?: number,
	   public importe_total?: number,
	   public impbasref_mn?: number,
	   public impigvref_mn?: number,
	   public  tipo_doc_ref?: string,
	   public  serie_doc_ref?: string,
	   public nro_doc_ref?: string,
	   public num_detrac?: string,
	   public flag_cpr_exter?: number,
	   public cod_dua?: string,
	   public ano_dua?: string,
	   public nro_dua?: string,
	   public flag_reten?: number,
	   public cod_detrac?: string,
	   public tas_detrac?: number,
	   public cod_bn_serv?: string,
	   public tip_cam_ple?: number,
	   public cod_pais_bene?: string,
	   public cod_pais_no_domi?: string,
	   public cod_evi_dob?: string,
	   public cod_tpo_ren?: string,
	   public tasa_reten?: number,
	   public doc_id?: string,
	   public clm_compr?: string,
	   public nro_cpb?: number,
	   public flg_igv?: boolean,
	   public flg_isc?: boolean,


	   public codaux?:String ,
	   public id_tipo_operacion_guia?: number,
	   public  pdoano?: string,
	   public mespvs?:  string,
	   public  fehcpb?: string,
	   public  glocpb?: string,
	   public  tpomon?: string,
	   public  tpo_cambio?:number,
		public id_empresa?: number,
		public  codemp?: string,
		public tipo_operacion_guia?:number,
		public  cta_debe?: string,
		public  cta_haber?: string,
        public  lsCostosAsociadosGlob : Array<any> =[] , 
		public resultOpg?:number,
		public resultExo?:number,
		public tipo_moneda?: string,
		public total_igv?: number,
		public total_isc?: number,
		public cta_total?: string,
		public cta_igv?: string,
		public cta_perdida?: String,

		public  lsCostosAsociadosGlob_aux : Array<any> =[] , 

		public id_almacen?: number


		
) {}


}