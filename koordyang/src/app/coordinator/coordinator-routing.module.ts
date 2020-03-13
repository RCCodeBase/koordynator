import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  CoordinatorComponent } from './coordinator/coordinator.component';




const routes: Routes = [{
    path: '',
    component: CoordinatorComponent ,
    children: [
    ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cooridinatorRoutingModule { }
