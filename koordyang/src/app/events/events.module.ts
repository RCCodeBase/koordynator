import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { eventsRoutingModule } from './events-routing.module';



@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    eventsRoutingModule
  ]
})
export class EventsModule { }
