import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { eventsRoutingModule } from './events-routing.module';
import { ParticipantComponent } from './participant/participant.component';
import { InviteComponent } from './invite/invite.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';




@NgModule({
  declarations: [EventComponent, ParticipantComponent, InviteComponent, ScanComponent],
  imports: [
    CommonModule,
    eventsRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule
  ]
})
export class EventsModule { }
