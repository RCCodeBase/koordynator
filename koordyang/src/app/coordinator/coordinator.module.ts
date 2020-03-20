import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { cooridinatorRoutingModule } from './coordinator-routing.module';



@NgModule({
  declarations: [CoordinatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    cooridinatorRoutingModule
  ]
})
export class CoordinatorModule { }
