import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import { Router } from '@angular/router';
import { DatashareService } from '../../service/datashare.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {
  event = {};
  EventId = '';
  coordinatorEvents = [];
  events= ['TradeFair','Seminar','Conference']
  constructor(private _EventAdd: UserService, private router: Router,private DatashareService: DatashareService) { }

  ngOnInit() {
   this.onload();
   //Add when loacl storage is not loading the data
  //  this.DatashareService.sharingEvent.subscribe(message => this.EventId = message)
  }

  //on loading the event page
  onload(){
    this._EventAdd.loadEvent()
    .subscribe(
      data =>{
        this.coordinatorEvents = data;
      },
      error => {
        console.log(error);
      }
    )
  }


  //adding Event by the cooordinator
  onSubmit(event){
    this._EventAdd.AddEvent(event.value)
    .subscribe(
      data => {
        console.log('Success Event Registered with Coordinator!');
        this.DatashareService.nextMessage(data)
        this.router.navigate(['/events']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
