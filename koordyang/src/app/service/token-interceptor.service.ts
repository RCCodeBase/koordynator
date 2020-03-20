import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req,next){
    let AuthServices = this.injector.get(AuthService);
    let token = AuthServices.getToken();
    if(!token){
      let tokenizedReq = req.clone({
        setHeaders:{
          'auth-token' : ''
        }
      })
      return next.handle(tokenizedReq);   
    }
    else{
      let tokenizedReq = req.clone({
        setHeaders:{
          'auth-token' : token
        }
      })
      return next.handle(tokenizedReq); 
    }
 
     
  }
}
