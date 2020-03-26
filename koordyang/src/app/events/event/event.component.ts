import { Component, OnInit } from '@angular/core';
import { DatashareService} from '../../service/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  EventId ="";
  status: boolean = false;
  constructor(private router: Router,private DatashareService: DatashareService) { }

  ngOnInit() {
    if(localStorage.getItem('Event-Id') === null){
      console.log("Here setting");
    this.DatashareService.sharingEvent.subscribe(message => this.EventId = message);
    localStorage.setItem('Event-Id',this.EventId);
  }
  else{
    this.EventId = localStorage.getItem('Event-Id');
  }
  }
  
clickEvent(){
  console.log("heresetting status")
    this.status = !this.status;       
}

}
