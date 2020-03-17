import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { eventsRoutingModule } from './events-routing.module';
import { ParticipantComponent } from './participant/participant.component';
import { InviteComponent } from './invite/invite.component';



@NgModule({
  declarations: [EventComponent, ParticipantComponent, InviteComponent],
  imports: [
    CommonModule,
    eventsRoutingModule
  ]
})
export class EventsModule { }
