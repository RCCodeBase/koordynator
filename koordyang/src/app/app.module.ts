import { BrowserModule} from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators , ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from "../environments/environment";
import { UserService } from "./service/user.service";
import { AuthService } from "./service/auth.service";
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { DatashareService } from "./service/datashare.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SignupModule } from "./signup/signup.module";
import { CoordinatorModule } from "./coordinator/coordinator.module";
import { EventsModule } from "./events/events.module";
import { SigninComponent } from "./signin/signin.component";
import { VerificationmailComponent } from "./verificationmail/verificationmail.component";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ParticipantComponent } from './participant/participant.component';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    VerificationmailComponent,
    ForgotpasswordComponent,
    ParticipantComponent,
    ActivitiesComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SignupModule,
    CoordinatorModule,
    EventsModule,
    ZXingScannerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxSpinnerModule
  ],
  providers: [
    UserService,
    AuthService,
    DatashareService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
