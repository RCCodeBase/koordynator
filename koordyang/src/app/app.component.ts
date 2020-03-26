import { Component } from '@angular/core';
import { AuthService }from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KOORDYNATOR';

  constructor(public _authserv:AuthService){
    
  }
  ngOnInit() {
  }

 
}

