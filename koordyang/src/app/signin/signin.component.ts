import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  ifError = false;
  errorMessage = "";
  constructor(private _login: UserService, private router: Router,  private authService: AuthService) { }

  ngOnInit() {
  }

  // onSubmit(userloginForm) {
  //   console.log(userloginForm.value);
  //   this._login.loginCoordinator(userloginForm.value)
  //     .subscribe(
  //       resp => {
  //         // display its headers
  //         console.log(resp.headers.get('token'));
  //         localStorage.setItem('auth-token', resp.headers.get('token'));
  //         this.router.navigate(['/coordinator']);
  //       },
  //       error => {
  //         console.log(error);
  //         this.ifError = true;
  //         this.errorMessage = error.error;
  //       }
  //     )
  // }

 

}
