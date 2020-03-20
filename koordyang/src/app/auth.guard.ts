import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService} from './service/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authServices:AuthService,private _router:Router){

  }
  canActivate():boolean{
    if(this._authServices.loggedIn()){
      return true;
    }
    else{
      this._router.navigate(['/signin']);
      return false;
    }
  }
  }


