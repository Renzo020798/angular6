


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class GlobalInterceptor implements HttpInterceptor {       
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |HttpEvent<any>> {
    const re = 'api/';  
    let token=localStorage.getItem('token') || '';    
    if (request.url.search(re) === -1 ) {
        request = request.clone({
          setHeaders: {
           
            Authorization:  `Basic `+ btoa('clientIdPassword:secret')
          }
        });
    
    }else{
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer `+token
        }
      });
    }        

    return next.handle(request);
  }
}