import { Component, OnInit } from "@angular/core";
import { DatashareService } from "../../service/datashare.service";
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  EventId = "";
  Event = {};
  status: boolean = false;
  constructor(
    private router: Router,
    private DatashareService: DatashareService,
    private _EventAdd: UserService,
    private authService:AuthService
  ) {

  
  }

  ngOnInit() {
    if (localStorage.getItem("Event-Id") === null) {
      console.log("Here setting");
      this.DatashareService.sharingEvent.subscribe(
        message => (this.EventId = message)
      );
      localStorage.setItem("Event-Id", this.EventId);
    } else {
      this.EventId = localStorage.getItem("Event-Id");
    }
    console.log("Here", this.Event);
    this._EventAdd.loadOneEvent(this.EventId).subscribe(
      data => {
        this.Event = data;
        console.log(this.Event);
      },
      error => {
        console.log(error);
      }
    );
  }

  navEvent() {
    this.status = !this.status;
  }
}
