import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {
  event = {};
  events= ['TradeFair','Seminar','Conference']
  constructor(private _EventAdd: UserService, private router: Router) { }

  ngOnInit() {
  }
  //adding Event by the cooordinator
  onSubmit(event){
    console.log(event.value);
    this._EventAdd.AddEvent(event.value)
    .subscribe(
      data => {
        console.log('Success Event Registered with Coordinator!');
        // this.router.navigate(['/signin']);
      },
      error => {
        console.log(error);
      }
    )

  }

}
