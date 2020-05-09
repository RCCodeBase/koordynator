import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./signup/signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { VerificationmailComponent } from "./verificationmail/verificationmail.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { ParticipantComponent } from "./participant/participant.component";
import { ActivitiesComponent } from "./activities/activities.component";

// Import canActivate guard services
import { AuthGuard } from "./guard/auth.guard";
import { SecureInnerPagesGuard } from "./guard/secure-inner-pages.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: "verificationMail",
    component: VerificationmailComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: "forgotpassword",
    component: ForgotpasswordComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: "participant/:eventid",
    component: ParticipantComponent,
  },
  {
    path: "participant",
    component: ParticipantComponent,
  },
  {
    path: "Activities/:userid",
    component: ActivitiesComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
