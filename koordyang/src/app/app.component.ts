import { Component } from '@angular/core';
import { AuthService }from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KOORDYNATOR';
  Navbardisp = true;

  constructor(public authService:AuthService,private router: Router, ){
    
  }
  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.router.navigate(['/coordinator']);
    }
    if(window.location.href.includes("participant")){
      this.Navbardisp = false;
    }
    else{
      this.Navbardisp = true;
    }
  }

 
}

