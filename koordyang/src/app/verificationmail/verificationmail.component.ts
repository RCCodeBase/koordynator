import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-verificationmail',
  templateUrl: './verificationmail.component.html',
  styleUrls: ['./verificationmail.component.css']
})
export class VerificationmailComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

}
