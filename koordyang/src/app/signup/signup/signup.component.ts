import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ifError = false;
  errorMessage="";
  constructor(private _register:UserService,private router:Router) { }
  
  ngOnInit() {
  }
  onSubmit(user)
  {
    console.log(user.value);
    this._register.registerCoordinator(user.value)
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
