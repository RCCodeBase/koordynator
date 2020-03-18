import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  User ={};
  ifError = false;
  errorMessage="";
  constructor(private _register:UserService,private router:Router) { }
  
  ngOnInit() {
  }
  onSubmit()
  {
    console.log(this.User);
    this._register.register(this.User)
    .subscribe(
      data => {
        console.log('Success Registered User!', data)
        this.router.navigate(['/signin']);
      },
      error => {
        console.log(error);
        this.ifError = true;
        this.errorMessage = error.error;
      }
    )
  }
}
