import { Component } from '@angular/core';
import{ Location} from'@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KOORDYNATOR';
  public nav = true;

  constructor(location: Location){
    
  }
  ngOnInit() {
    console.log(location.pathname);
    if(location.pathname == '/'){
      this.nav = true;
    }
    else{
      this.nav = false;
    }
  }

 
}

