
import {Observable ,  throwError as throwError } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import swal from 'sweetalert';


import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsuarioService {
	usuario: Usuario;
	token: string;
	expire: number;
	menu: any[] = [];
	constructor(public http: HttpClient, public router: Router,
	
		 private spinnerService: Ng4LoadingSpinnerService) {
		this.cargarStorage();
	}
	urlingreso: String = `${environment.NEW_URL_GEMP_API}ingreso/`;
	urlapi: String = `${environment.NEW_URL_GEMP_API}`;
	url: String = `${environment.NEW_URL_GEMP}`;


	checkToken(token: string): Observable < any > {
		let url = this.url+"oauth/check_token" + '?token=' + token;
		return this.http.get(url);
	}
	estaLogueado(): Observable < any > {
		this.token = localStorage.getItem('token');
		if (this.token == null) {
			this.token = "dsdaswer9889r832wjdwhwefshchjsvasgvdfdsgyaifuisadfassdahfsdajfsdkahfsjdfgdsfb"
		}
		return this.checkToken(this.token);
	}
	cargarStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			
			//this.usuario.empresa = JSON.parse(localStorage.setItem('datempresa'));
		} else {
			this.token = '';
			this.usuario = null;
		}
	}
	guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		localStorage.setItem('menu', JSON.stringify(menu));
		this.usuario = usuario;
		this.token = token;
		this.menu = menu;
	}
	setStorageToken(token: string) {
		localStorage.setItem('token', token);
		this.token = token;
	}
	setStorageUsuario(expire: number, usu: any, token: string) {                                       
		localStorage.setItem('usuario', JSON.stringify(usu));
		localStorage.setItem('token', token);
		// localStorage.setItem('empresaselect', String(usu.empresa.idempresa));
		localStorage.setItem('empresaselect', String(usu.empresa.id_empresa));
		this.usuario = usu;
		this.expire = expire
			
	}
	logout() {                      
		this.usuario = null;
		this.token = '';
		this.menu = [];
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		localStorage.removeItem('empresaselect');
		localStorage.removeItem('idmoduloselected');
		localStorage.removeItem('namemoduloselected');
		localStorage.removeItem('periodoselect');
		this.router.navigate(['/login']);
	}

	dashboard() {
		this.router.navigate(['/dashboard']);
	}

	loginGoogle(token: string) {
 		return this.http.post(this.url+"login/google", {
			token
		}).pipe(map((resp: any) => {
			this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
			return true;
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	
	// retornaUsuario(usuario: Usuario, token: String) { 
	// 	let user = {
	// 		'username': usuario.email,
	// 		'password': usuario.password
	// 	}
	// 	let url = NEW_URL_GEMP + '/api/empleado/login';
	// 	const httpOptions = {
	// 		headers: new HttpHeaders({
	// 			'Authorization': 'bearer ' + token
	// 		})
	// 	};
	// 	return this.http.post(url, user, httpOptions).map((resp: any) => {
	// 		return resp;
	// 	}).catch((err: HttpErrorResponse) => {
	// 		swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
	// 		return Observable.throw(err);
	// 	});
	// }

	retornaUsuario(usuario: Usuario, token: String) {                       
		let user = {
			'username': usuario.username,
			'password': usuario.password
		}
 		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'bearer ' + token
			})
		};
		return this.http.post(this.urlapi+"users/loginuser", user, httpOptions).pipe(map((resp: any) => {
			return resp;
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}

	loginAuth(usuario: Usuario, recordar: boolean = false): Observable < any > {                             
		this.spinnerService.show();
		var fd = new FormData();
		fd.append('grant_type', 'password');
		fd.append('username', usuario.username);
		fd.append('password', usuario.password);
		fd.append('client_id', 'clientIdPassword');
 		return this.http.post(this.url+"oauth/token", fd).pipe(map(
			(resp: any) => {                             
				this.spinnerService.hide();
				return resp;
			}),catchError((err: HttpErrorResponse) => {                             
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);;
	}
	recuperaPAssword(usuario: Usuario) {
		// let url = NEW_URL_GEMP + '/public/listplanes/recuperapass';
		return this.http.post(this.url+"public/listplanes/recuperapass", {
			email: usuario.email
		}).pipe(map((resp: any) => {
			if (resp.estado == 1) {
				swal('Recuperación correcta', 'Dirígete a tu casilla de correo para recibir el enlace y crear tu nueva contraseña. ', 'success');
			} else {
				swal('Recuperación incorrecta', 'Imposible enviar el link de recuperacion de password al email ' + usuario.email, 'error');
			}
			return resp;
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	crearUsuario(usuario: Usuario) {
		// let url = NEW_URL_GEMP + '/public/listplanes/insertapub';
		let obj = {
			"empresa": {
				"ruc": usuario.ruc,
				"razonsocial": usuario.razonSocial,
				"empleado": {
					"nombres": usuario.nombre,
					"email": usuario.email
				}
			}
		}
		return this.http.post(this.url+"public/listplanes/insertapub", obj).pipe(map(
			(resp: any) => {
				if (resp.estado == 1) {
					swal('Usuario creado ' + usuario.email + '', resp.msg, 'success');
					return resp;
				} else {
					swal('Error creando la cuenta', usuario.email + " " + resp.msg, 'success');
					return resp;
				}
			}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	buscaSiExisteEmail(email: string) {
		return this.http.post(this.url+"public/listplanes/finidemail", {
			'empresa': {
				'empleado': {
					'email': email
				}
			}
		}).pipe(map((resp: any) => {
			if (resp.estado == 1) {
				swal('Email duplicado', "El Email ingresado ya se encuentra dado de alta", 'warning');
				return resp;
			} else {
				return resp;
			}
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	buscaSiExiste(ruc: string) {
 		return this.http.post(this.url+"public/listplanes/consulta_ruc", {
			'empresa': {
				ruc
			}
		}).pipe(map((resp: any) => {
			if (resp.estado == 1) {
				swal('Ruc duplicado', "El RUC ingresado ya se encuentra dado de alta", 'warning');
				return resp;
			} else {
				return resp;
			}
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	buscaSiTockenActivo(acc: string) {
 		return this.http.post(this.url+"public/listplanes/checktoken", {
			'accion': acc
		}).pipe(map((resp: any) => {
			if (resp.estado == 1) {
				return resp;
			} else {
				swal('Tocken inactivo', "El link ingresado ya no existe", 'warning');
				return resp;
			}
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	updatePassword(acc: string, pass: string) {
 		return this.http.post(this.url+"public/listplanes/updatePassg", {
			'accion': acc,
			"estado": 1,
			"password": pass
		}).pipe(map((resp: any) => {
			if (resp.estado == 1) {
				return resp;
			} else {
				swal('Error activación de cuenta', "Ocurrio un error durante la activación de la cuenta", 'error');
				return resp;
			}
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	consultaRuc(ruc: string) {
		this.spinnerService.show();
		var headers = new Headers();
		var fd = new FormData();
		fd.append('ruc', ruc);
 		return this.http.post(this.url+"public/listplanes/consultarsunat", fd).pipe(map(
			(resp: any) => {
				if (resp.ok == true) {
					this.spinnerService.hide();
					return resp;
				} else {
					swal('Crear cuenta', "El RUC ingresado es incorrecto", 'warning');
					this.spinnerService.hide();
					return resp;
				}
				
			}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	consulta(ruc: string) {
		this.spinnerService.show();
		var headers = new Headers();
		var fd = new FormData();
		fd.append('ruc', ruc);
 		return this.http.post(this.url+"public/listplanes/consultar", fd).pipe(map(
			(resp: any) => {
				if (resp.ok == true) {
					this.spinnerService.hide();
					return resp;
				} else {
					swal('Crear cuenta', "El DNI ingresado es incorrecto", 'warning');
					this.spinnerService.hide();
					return resp;
				}
				
			}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	actualizarUsuario(usuario: Usuario) {                             
		let url = this.url + '/usuario/' + usuario._id;
		url += '?token=' + this.token;
		return this.http.put(url, usuario).pipe(map((resp: any) => {
			if (usuario._id === this.usuario._id) {
				let usuarioDB: Usuario = resp.usuario;
				this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
			}
			swal('Usuario actualizado', usuario.nombre, 'success');
			return true;
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	cambiarImagen(archivo: File, id: string) {
		// this._subirArchivoService.subirArchivo(archivo, 'usuarios', id).then(
		// 	(resp: any) => {
		// 		this.usuario.img = resp.usuario.img;
		// 		swal('Imagen Actualizada', this.usuario.nombre, 'success');
		// 		this.guardarStorage(id, this.token, this.usuario, this.menu);
		// 	}).catch((err: HttpErrorResponse) => {
		// 	swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
		// 	return Observable.throw(err);
		// });
	}
	cargarUsuarios(desde: number = 0) { 
		let url = this.url + '/usuario?desde=' + desde;
		return this.http.get(url).pipe(catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}));;
	}
	buscarUsuarios(termino: string) {
		let url = this.url + '/busqueda/coleccion/usuarios/' + termino;
		return this.http.get(url).pipe(map((resp: any) => resp.usuarios),catchError(
			(err: HttpErrorResponse) => {
				swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
				return throwError(err);
			}),);
	}
	borrarUsuario(id: string) {
		let url = this.url + '/usuario/' + id;
		url += '?token=' + this.token;
		return this.http.delete(url).pipe(map(resp => {
			swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
			return true;
		}),catchError((err: HttpErrorResponse) => {
			swal('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
			return throwError(err);
		}),);
	}
	 

	insertarUsuario(user) {
          
		return this.http.post(this.urlapi+"users/insertUsers", user).pipe(
		map((resp: any)=> {
		  if(resp.estado == 1){
			Swal.fire({
			  type: 'success',
			  title: 'Registro Correcto',
			  text: resp.msg
			});
		  }else{
			Swal.fire({
			  type: 'error',
			  title: 'Registro Incorrecto',
			  text: resp.msg
			})
		  }
		}));
	  }
	
	  listPerfiles(){
		return this.http.post(this.urlapi+"perfiles/listPerfiles", {'accion': ''});
	  }
	  
	  retornarUsuario(dat_user) {
			  
 		return this.http.post(this.urlapi+"users/listarusuarios",dat_user);
	
	  }
	
	  deleteUsuario(dat_usu) {
			  
 		return this.http.post(this.urlapi+"users/eliminaUsuario", dat_usu).pipe(
		map((resp: any)=> {
		  Swal.fire(
			'Eliminado!',
			resp.msg,
			'success'
		  )
	  }));
	  }
	  updateUsuario(id) {
			  
 		return this.http.post(this.urlapi+"users/actualizarUser", id).pipe(
		map((resp: any)=> {
		  if(resp.estado == 1){
			Swal.fire({
			  type: 'success',
			  title: 'Registro Correcto',
			  text: resp.msg
			});
		  }else{
			Swal.fire({
			  type: 'error',
			  title: 'Registro Incorrecto',
			  text: resp.msg
			})
		  }
		}));
	  }
}
