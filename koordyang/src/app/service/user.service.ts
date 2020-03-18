import { Injectable } from '@angular/core';
import{HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  //Registering User to the Database
  register(user)
  {
    return this._http.post<any>("http://localhost:3000/signup/coordinator",user);
  }
}
