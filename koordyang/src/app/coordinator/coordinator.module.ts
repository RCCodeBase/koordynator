import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { cooridinatorRoutingModule } from './coordinator-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';



@NgModule({
  declarations: [CoordinatorComponent, ProfileComponent, EventGalleryComponent],
  imports: [
    CommonModule,
    FormsModule,
    cooridinatorRoutingModule
  ]
})
export class CoordinatorModule { }
