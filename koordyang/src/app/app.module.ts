import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS }from '@angular/common/http';

import{UserService} from './service/user.service';
import {AuthService} from './service/auth.service';
import {AuthGuard} from './auth.guard';

import { HomeComponent } from './home/home.component';
import { SignupModule } from './signup/signup.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { EventsModule } from './events/events.module';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SignupModule,
    CoordinatorModule,
    EventsModule
   
  ],
  providers: [AuthGuard,UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
