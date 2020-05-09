import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { ParticipantComponent } from "./participant/participant.component";
import { InviteComponent } from "./invite/invite.component";
import {ScanComponent} from './scan/scan.component';

// Import canActivate guard services
import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: "events",
    component: EventComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "participant",
        component: ParticipantComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "invite",
        component: InviteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "scan",
        component: ScanComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class eventsRoutingModule {}
