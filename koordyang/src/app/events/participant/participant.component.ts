import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "../../service/user.service";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
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
  @ViewChild("closeButton", { static: true }) public closeButton: ElementRef;
  ParticipantDetails;
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

  dynamicForm: FormGroup;
  submitted = false;
  numberOfParticipants ;

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

    this.dynamicForm = this.fb.group({
      numberOfParticipant: ['', Validators.required],
      tickets: new FormArray([]),
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
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
                console.log(this.ParticipantArr);
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
    console.log(this.ParticpantPrint["_id"]); 
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
        { qr: "/Activities/" + this.ParticpantPrint["_id"] },
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
        this.router.navigate(["/participant"]);
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

  
  onChangeParticipants(e) {
    this.numberOfParticipants = e.target.value || 0;
    if (this.t.length < this.numberOfParticipants) {
      for (let i = this.t.length; i < this.numberOfParticipants; i++) {
        this.t.push(
          this.fb.group({
            email: ["", [Validators.required, Validators.email]],
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= this.numberOfParticipants; i--) {
        this.t.removeAt(i);
      }
    }
  }


  //Sending Mail to Mail reciptants
  sendingMail() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    // alert(
    //   "SUCCESS!! :-)\n\n" + JSON.stringify(this.dynamicForm.value, null, 4)
    // );
    let email = this.dynamicForm.value.tickets;
    let emailstring = new Array;
    for (let i = 0; i < this.numberOfParticipants; i++) {
      emailstring[i] = email[i]["email"];
    }
    const EventId = localStorage.getItem("Event-Id");

    //Creating Json for Sensing Mail with URL
    var sendData = {
      mail:emailstring.join(","),
      url : "http://localhost:4200/participant/" + EventId
    }

    this._Participant.sendingMail(sendData).subscribe(
      (data) => {
            alert(data);
            this.router.navigate(["/events"]);
            this.closeButton.nativeElement.click();
        console.log(data);
      },
      (error) => {
        alert(error.error);
      }
    );
    console.log("data of email",emailstring.join(","));

    console.log("Going to Send Mail");
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}
