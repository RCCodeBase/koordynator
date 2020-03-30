import { Component, OnInit,ViewChild, ElementRef } from "@angular/core";
import { UserService } from "../../service/user.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"]
})
export class ParticipantComponent implements OnInit {
  @ViewChild('closeButton', { static: true }) private closeButton : ElementRef;
  ParticipantDetails = [];
  headers = ["name","email","company"];
  ifError = false;
  errorMessage="";
  constructor(private _Participant: UserService,private fb: FormBuilder) {}

  ngOnInit() {
    this.AllEventParticipant();
  }

  AllEventParticipant(){
   const EventId = localStorage.getItem("Event-Id")
    this._Participant.loadAllParticipantEvent(EventId).subscribe(
      data => {
        console.log("Loading Participants", data);
        this.ParticipantDetails = data;
        console.log(this.ParticipantDetails);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(participantFormDetails) {
    
    console.log(participantFormDetails.value);
    participantFormDetails.value["eventid"] = localStorage.getItem("Event-Id");
    this._Participant
      .addParticipantEvent(participantFormDetails.value)
      .subscribe(
        data => {
          console.log("Success Participant Registered with this Event!", data);
          this.closeButton.nativeElement.click();
        },
        error => {
          console.log(error);
          this.ifError = true;
          this.errorMessage = error.error;
        }
      );
  }

  onCloseErrorModal(){
    this.ifError = false;
  }
}
