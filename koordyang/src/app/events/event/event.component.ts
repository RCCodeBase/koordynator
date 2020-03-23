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
  constructor(private router: Router,private DatashareService: DatashareService) { }

  ngOnInit() {
    if(localStorage.getItem('Event-Id') === null){
    this.DatashareService.sharingEvent.subscribe(message => this.EventId = message)
    localStorage.setItem('Event-Id',this.EventId);
  }
  else{
    this.EventId = localStorage.getItem('Event-Id');
  }
  }

}
