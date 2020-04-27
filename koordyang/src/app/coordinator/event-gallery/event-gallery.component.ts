import { Component, OnInit } from '@angular/core';
import { DatashareService } from "../../service/datashare.service";
import { AuthService } from "../../service/auth.service";
import { UserService } from "../../service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.css']
})
export class EventGalleryComponent implements OnInit {

  EventId = "";
  coordinatorEvents = [];
  events = ["TradeFair", "Seminar", "Conference"];

  constructor(    private _EventAdd: UserService,
    private router: Router,
    private DatashareService: DatashareService,
    public authService: AuthService) { }

  ngOnInit() {
       this.onload();
       localStorage.removeItem("Event-Id");
       //Add when loacl storage is not loading the data
       //  this.DatashareService.sharingEvent.subscribe(message => this.EventId = message)
  }

    // //on loading the event page
  onload() {
    this._EventAdd.loadEvent().subscribe(
      data => {
        this.coordinatorEvents = data;
        console.log("Event Data loading ",this.coordinatorEvents);
      },
      error => {
        console.log(error);
      }
    );
  }


  //adding Event by the cooordinator
  onSubmit(event) {
    this._EventAdd.AddEvent(event.value).subscribe(
      data => {
        console.log("Success Event Registered with Coordinator!");
        this.DatashareService.nextMessage(data);
        this.router.navigate(["/events"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  onEdit(event) {
    console.log("Successfully Selected Event");
    this.DatashareService.nextMessage(event._id);
    this.router.navigate(["/events"]);
  }

}
