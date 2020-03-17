
export class Usuario {
  [x: string]: any;
    public nombre: string;
    public ruc: string;
    public razonSocial: string;
    public apePat: string;
    public apeMat: string;
    public email: any;
    public password: string;
    public movil: string;
    public fijo: string;
    public cuenta_detraccion: string;
    public img?: string;
    public role?: string;
    public google?: boolean;
    public _id?: string;
    public condiciones:boolean;
    public username:string;
    public nombre_perfil: string;
    public nombre_empresa: string
    constructor(
         nombre?: string,
         //email?: string,
         username?:string,
         password?: string,
         nombre_perfil?:string,
         nombre_empresa?:string,
         img?: string,
         role?: string,
         google?: boolean,
         _id?: string,
         movil?: string,
         fijo?: string,
         cuenta_detraccion?: string
    ) { 
        this.nombre=nombre,
        //this.email=email,
        this.username=username,
        this.password=password,
        this.nombre_perfil=nombre_perfil,
        this.nombre_empresa=nombre_empresa,
        this.img=img,
        this.role=role,
        this.google=google,
        this._id=_id,
        this.movil= movil,
        this.fijo= fijo,
        this.cuenta_detraccion=cuenta_detraccion
    }

    ov_constructor(email: string) { 
        this.email=email;
    }

    public id_usuarios?:number;
    public	name?:string;
    public idperfiles?: number;
    public accion?: string;
    public id_empresa?: number;
    public estado?: number;
}


