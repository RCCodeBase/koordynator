import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { ParticipantComponent } from "./participant/participant.component";
import { InviteComponent } from "./invite/invite.component";
import {ScanComponent} from './scan/scan.component'

const routes: Routes = [
  {
    path: "events",
    component: EventComponent,
    children: [
      {
        path: "participant",
        component: ParticipantComponent
      },
      {
        path: "invite",
        component: InviteComponent
      },
      {
        path: "scan",
        component: ScanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class eventsRoutingModule {}
