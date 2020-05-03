import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DatashareService } from "../service/datashare.service";
import { UserService } from "../service/user.service";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExternalLibraryService } from "../utilAddExteranalFiles";

declare let Razorpay: any;

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
  event = [];
  Address: boolean;
  Age: boolean;
  Phoneno: boolean;
  Education: boolean;
  Company: boolean;
  Id: boolean;
  Amount;
  EventId;
  ToggleButton = false;
  paymentMethod = ["Cash on Counter", "Online Payment"];
  details;

  constructor(
    private _Participant: UserService,
    private router: Router,
    public Actrouter: ActivatedRoute,
    private razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef
  ) {
    if (localStorage.getItem("Event-Id")) {
      this.EventId = localStorage.getItem("Event-Id");
      this._Participant.loadOneEvent(this.EventId).subscribe(
        (data) => {
          this.event = data;
          this.ParticpantSettings = JSON.parse(data.ParticipantSettings);
          this.Settings();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.Actrouter.params.subscribe(
        (params) => (this.EventId = params.eventid)
      );
      this._Participant.loadOneEventDetailsAnonymous(this.EventId).subscribe(
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
  }

  response;
  razorpayResponse;
  showModal = false;

  Settings() {
    this.partipantinput = this.ParticpantSettings["checkArray"];
    this.payment = this.ParticpantSettings["PaymentRequired"];
    if (this.payment) {
      this.Amount = this.ParticpantSettings["Amount"];
    }
  }

  ngOnInit() {
    this.razorpayService
      .lazyLoadLibrary("https://checkout.razorpay.com/v1/checkout.js")
      .subscribe();
  }

  savingParticipant(participantDetails) {
    participantDetails.value["eventid"] = this.EventId;
    participantDetails.value["PaymentData"] = this.selectedOption;

    if (localStorage.getItem("Event-Id")) {
      console.log(participantDetails.value);
      this.participantSavingbyCoordintor(participantDetails);
    } else {
      console.log(participantDetails.value);
      this.ParticipantSavingThroughLinks(participantDetails);
    }
  }


  //Changing Method of payment in Select option
  ChangingMethod(Method) {
    if (Method == "Cash on Counter") {
      this.ToggleButton = false;
    } else {
      this.ToggleButton = true;
    }
  }

  RAZORPAY_OPTIONS = {
    key: "rzp_test_XW9NGLlqHRtTuO",
    amount: "",
    name: "Novopay",
    order_id: "",
    description: "Load Wallet",
    image:
      "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    prefill: {
      name: "",
      email: "test@test.com",
      contact: "",
      method: "",
    },
    modal: {},
    theme: {
      color: "#0096C5",
    },
  };

  paymentandSaving(partDetails) {
    this.details = partDetails;
    console.log("payement gateway starting");
    this.RAZORPAY_OPTIONS.amount = this.Amount + "00";
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS["handler"] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    console.log(response.razorpay_payment_id);
    this.razorpayResponse = `Razorpay Response`;
    // this.cd.detectChanges();
    console.log(this.details);
    this.details.value["paymentId"] = response.razorpay_payment_id;
    this.details.value["eventid"] = this.EventId;
    this.details.value["PaymentData"] = this.selectedOption;
    
    if (localStorage.getItem("Event-Id")) {
      this.participantSavingbyCoordintor(this.details);
    } else {
      this.ParticipantSavingThroughLinks(this.details);
    }
  }




  //Saving Participant by coordinator
  participantSavingbyCoordintor(participantDetails) {
    this._Participant.saveParticipant(participantDetails.value).subscribe(
      (data) => {
        console.log("Success Participant Registered with this Event!", data);
        window.alert("Successfully Registered");
        window.location.reload();
        this.router.navigate(["/coordinator"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Saving throgh links sent
  ParticipantSavingThroughLinks(participantDetails) {
    this._Participant
      .saveParticipantAnonymous(participantDetails.value)
      .subscribe(
        (data) => {
          console.log("Success Participant Registered with this Event!", data);
          window.alert("Successfully Registered");
          this.router.navigate(["/"]);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
