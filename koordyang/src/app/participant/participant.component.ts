import { Component, OnInit } from "@angular/core";
import { DatashareService } from "../service/datashare.service";
import { UserService } from "../service/user.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"],
})
export class ParticipantComponent implements OnInit {
  ParticpantSettings = [];
  partipantinput = [];
  selectedOption: string;
  payment;
  event =[];
  Address: boolean;
  Age: boolean ;
  Phoneno: boolean ;
  Education: boolean;
  Company: boolean;
  Id: boolean;
  Amount;
  paymentMethod = ["Cash on Counter", "Online Payment"];

  constructor(private _Participant: UserService, private router: Router) {
    const EventId = localStorage.getItem("Event-Id");
    this._Participant.loadOneEvent(EventId).subscribe(
      (data) => {
        this.event = data;
        this.ParticpantSettings = JSON.parse(data.ParticipantSettings);
        this.Settings();
      },
      (error) => {
        console.log(error);
      }
    );

  }
  Settings(){
    this.partipantinput = this.ParticpantSettings["checkArray"];
    this.payment = this.ParticpantSettings["PaymentRequired"];
    if(this.payment){
      this.Amount = this.ParticpantSettings["Amount"];
    }
  }

  ngOnInit() {
   
  }

  savingParticipant(participantDetails){
    participantDetails.value["eventid"] = localStorage.getItem("Event-Id");
    participantDetails.value["PaymentData"] = this.selectedOption;
    console.log(participantDetails.value);
    this._Participant.saveParticipant(participantDetails.value).subscribe(
      (data) => {
        console.log("Success Participant Registered with this Event!", data);
        this.router.navigate(["/events/participant"]);
      },
      (error) => {
        console.log(error);
      }
    );
    }

  // register() {
  //   if(this.ParticpantSettings["PaymentRequired"]){

  //   }
  //   this.router.navigate(["/events/participant"]);
  // }
}
