import { Injectable } from '@angular/core';
import{HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  //Registering Coordinator to the Database
  registerCoordinator(user)
  {
    return this._http.post<any>("http://localhost:3000/signup/coordinator",user);
  }
  //loginig in Coordinator
  loginCoordinator(userLogin):Observable<HttpResponse<any>>{
    return this._http.post<any>("http://localhost:3000/signin/coordinator",userLogin,{observe: 'response'
    ,withCredentials: true });
  }
  AddEvent(event){
    return this._http.post<any>("http://localhost:3000/events/coordinator",event);
  }
}
