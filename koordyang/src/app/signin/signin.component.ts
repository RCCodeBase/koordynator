import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  ifError = false;
  errorMessage = "";
  constructor(private _register: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
