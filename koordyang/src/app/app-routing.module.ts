import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup/signup.component';
import { CoordinatorComponent } from './coordinator/coordinator/coordinator.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path: 'signup',
    component: SignupComponent
  },{
    path: 'coordinator',
    component: CoordinatorComponent,
    canActivate:[AuthGuard]
  },{
    path:'signin',
    component:SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
