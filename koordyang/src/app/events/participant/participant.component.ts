import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "../../service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"]
})
export class ParticipantComponent implements OnInit {
  @ViewChild("closeButton", { static: true }) private closeButton: ElementRef;
  ParticipantDetails = [];
  ParticpantPrint = [];
  headers = ["name", "email", "company"];
  participantNull = false;
  ifError = false;
  errorMessage = "";
  constructor(private _Participant: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.AllEventParticipant();
  }

  AllEventParticipant() {
    const EventId = localStorage.getItem("Event-Id");
    this._Participant.loadAllParticipantEvent(EventId).subscribe(
      data => {
        console.log("Loading Participants", data);
        this.ParticipantDetails = data;
        if (this.ParticipantDetails.length == 0) {
          this.participantNull = false;
        } else {
          this.participantNull = true;
          console.log(this.ParticipantDetails);
        }
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
          this.ngOnInit();
        },
        error => {
          console.log(error);
          this.ifError = true;
          this.errorMessage = error.error;
        }
      );
  }

  onCloseErrorModal() {
    this.ifError = false;
  }

  //For printing the detaills
  onPrint(participant){
    this.ParticpantPrint = participant;
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open({}, window);
  }

  getDocumentDefinition() {
    return {
      content: [
      {
        text: 'Card',
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      { qr: 'localhost' },
      {
      columns: [
        [{
          text: 'Name : ' + this.ParticpantPrint['name']
        },
        {
          text: 'Email : ' + this.ParticpantPrint['email']
        }] 
       ]
      }],
      styles: {
        name: {
          fontSize: 16,
          bold: true
      }
    }
  };
 }
}
