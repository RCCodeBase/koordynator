import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  ifError = false;
  errorMessage = "";
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}
