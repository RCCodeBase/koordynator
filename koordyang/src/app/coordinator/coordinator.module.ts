import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { cooridinatorRoutingModule } from './coordinator-routing.module';



@NgModule({
  declarations: [CoordinatorComponent],
  imports: [
    CommonModule,
    cooridinatorRoutingModule
  ]
})
export class CoordinatorModule { }
