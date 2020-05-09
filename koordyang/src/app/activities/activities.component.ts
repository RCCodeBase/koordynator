import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ProfileComponent } from "../coordinator/profile/profile.component";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"],
})
export class ActivitiesComponent implements OnInit {
  UserId;
  ParticipantDetails = {};
  eventid;
  eventActivities = "";
  ButtonShow = "";
  FoodShow= "";
  constructor(
    private userServices: UserService,
    private router: Router,
    public Actrouter: ActivatedRoute,
    private authService: AuthService,
    private SpinnerService: NgxSpinnerService
  ) {}

  async ngOnInit() {
    this.SpinnerService.show();

    this.Actrouter.params.subscribe((params) => (this.UserId = params.userid));
    (await this.userServices.loadoneParticipantDetails(this.UserId)).subscribe(
      (data) => {
        this.ParticipantDetails = data;

        if (
          localStorage.getItem("Event-Id") != this.ParticipantDetails["event"]
        ) {
          window.alert(
            "This participant is not Registered for this event but regiistered for another event"
          );
          this.router.navigate(["/events"]);
        } else {
          //loading Specified Event Details for finding Buttons needded
          this.userServices
            .loadOneEvent(this.ParticipantDetails["event"])
            .subscribe(
              (data) => {
                this.eventActivities = data["ActiviteSettings"];
                console.log(data["ActiviteSettings"]);
              },
              (error) => {
                alert(error.error);
              }
            );
          console.log("Here", this.UserId);
          this.userServices.getActivities(this.UserId).subscribe(
            (data) => {
              if (data.message == "DoesnotExist") {
                console.log("Show in Participant");
                this.ButtonShow = "Inparticipant";
              } else {
                if (data.Outpatrticipant){
                  this.ButtonShow = "InOutDone";
                }else if(data.Inpatrticipant){
                  this.ButtonShow = "Outpatrticipant";
                }
                if(data.Foodcoupon){
                  this.FoodShow = "CouponUsed";
                }else{
                this.FoodShow = "FoodCoupon";
              }
              }
              console.log(this.ButtonShow);
            },
            (error) => {
              console.log(error);
            }
          );
        }
        //Spinner Turning off
        this.SpinnerService.hide();
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  ParticipantIN() {
    const sendDetails = {};
    sendDetails["Event_id"] = localStorage.getItem("Event-Id");
    sendDetails["Participant"] = this.UserId;
    sendDetails["Inpatrticipant"] = "true";
    this.userServices.ActivitesChange(sendDetails).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/events"]);
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  ParticipantOut() {
    const sendDetails = {};
    sendDetails["Event_id"] = localStorage.getItem("Event-Id");
    sendDetails["Participant"] = this.UserId;
    sendDetails["Outpatrticipant"] = "true";
    this.userServices.ActivitesChange(sendDetails).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/events"]);
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  FoodCoupon() {
    const sendDetails = {};
    sendDetails["Event_id"] = localStorage.getItem("Event-Id");
    sendDetails["Participant"] = this.UserId;
    sendDetails["FoodCoupon"] = "true";
    this.userServices.ActivitesChange(sendDetails).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/events"]);
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}
