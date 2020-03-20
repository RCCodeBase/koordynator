import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) { }
//for Auth Guard for not access page for loggedin user
//for checking login and logout
  loggedIn(){
    return !!localStorage.getItem('auth-token');
  }
  getToken(){
    return localStorage.getItem('auth-token');

  }
  logoutUser(){
    localStorage.removeItem('auth-token');
    this.router.navigate(['/signin']);
  }
}
