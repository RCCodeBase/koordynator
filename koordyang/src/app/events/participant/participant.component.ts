import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "../../service/user.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatashareService } from "../../service/datashare.service";
import { Router } from "@angular/router";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"],
})
export class ParticipantComponent implements OnInit {
  @ViewChild("closeButton", { static: true }) private closeButton: ElementRef;
  ParticipantDetails ;
  ParticipantArr = [];
  ParticpantPrint = [];
  
  headers = ["name", "email"];
  participantNull;
  ifError = false;
  errorMessage = "";
  ParticpantSettings = [];
  ParticipantSet;
  AmountCheck = true;
  partipantinput = [];
  Data: Array<any> = [
    { name: "Address", value: "Address" },
    { name: "Phone No", value: "Phoneno" },
    { name: "Age", value: "Age" },
    { name: "Educational Qualification", value: "Education" },
    { name: "Company", value: "Company" },
    { name: "Id Proof", value: "IdProof" },
  ];
  form: FormGroup;
  constructor(
    private _Participant: UserService,
    private fb: FormBuilder,
    private DatashareService: DatashareService,
    private router: Router
  ) {}

  ngOnInit() {
    this.AllEventParticipant();
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
      PaymentRequired: new FormControl(""),
      Amount: new FormControl(""),
    });
  }

  AllEventParticipant() {
    const EventId = localStorage.getItem("Event-Id");
    this._Participant.loadOneEvent(EventId).subscribe(
      (data) => {
        console.log("Here1");
        if (data.ParticipantSettings == null) {
          this.ParticipantSet = true;
        } else {
          this.ParticpantSettings = JSON.parse(data.ParticipantSettings);
          this.loadParticipantForm();
          this.ParticipantSet = false;
          //Loading Participant From Table
          this._Participant.loadAllParticipantEvent(EventId).subscribe(
            (data) => {
              console.log("Loading Participants", data);
              this.ParticipantDetails = JSON.stringify(data);
              
              if (data.length == 0) {
                this.participantNull = false;
              } else {
                this.partipantinput = this.ParticpantSettings["checkArray"];
                console.log("Here3");
                this.participantNull = true;
                this.ParticipantArr = JSON.parse(this.ParticipantDetails);
                console.log(this.ParticipantArr );
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
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
        (data) => {
          console.log("Success Participant Registered with this Event!", data);
          this.closeButton.nativeElement.click();
          this.ngOnInit();
        },
        (error) => {
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
  onPrint(participant) {
    this.ParticpantPrint = participant;
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open({}, window);
  }

  //For printing Participant
  getDocumentDefinition() {
    return {
      content: [
        {
          text: "Card",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        { qr: "localhost" },
        {
          columns: [
            [
              {
                text: "Name : " + this.ParticpantPrint["name"],
              },
              {
                text: "Email : " + this.ParticpantPrint["email"],
              },
            ],
          ],
        },
      ],
      styles: {
        name: {
          fontSize: 16,
          bold: true,
        },
      },
    };
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get("checkArray") as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    const ParticipantSetting = JSON.stringify(this.form.value);
    const DataSend = {};
    this.DatashareService.sharingEvent.subscribe(
      (message) => (DataSend["Eventid"] = message)
    );
    DataSend["ParticipantSetting"] = ParticipantSetting;
    console.log(DataSend);
    this._Participant.addParticipanttoSetiings(DataSend).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  loadParticipantForm() {
    console.log("Participant Settings", this.ParticpantSettings);
    this.partipantinput = this.ParticpantSettings["checkArray"];
    this.partipantinput.forEach(function (value) {
      console.log(value);
    });
  }
  changeRoute() {
    this.router.navigate(["/participant"]);
  }
}
