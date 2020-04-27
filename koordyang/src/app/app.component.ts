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

  constructor(public authService:AuthService,private router: Router, ){
    
  }
  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.router.navigate(['/coordinator']);
    }
  }

 
}

