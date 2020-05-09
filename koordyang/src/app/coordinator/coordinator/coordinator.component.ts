import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-coordinator",
  templateUrl: "./coordinator.component.html",
  styleUrls: ["./coordinator.component.css"]
})
export class CoordinatorComponent implements OnInit {

  constructor(
    private _EventAdd: UserService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    console.log("here");
    (await this._EventAdd.loginCoordinator())
    .subscribe(
        resp => {
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    );
}
  


  
}
