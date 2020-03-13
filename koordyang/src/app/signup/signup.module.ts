import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { signupRoutingModule } from './signup-routing.module';



@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    signupRoutingModule
  ]
})
export class SignupModule { }
