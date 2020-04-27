import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoordinatorComponent } from "./coordinator/coordinator.component";
import { ProfileComponent } from './profile/profile.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'coordinator',
    component: CoordinatorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EventGalleryComponent,
        canActivate: [AuthGuard]
      },{
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cooridinatorRoutingModule {}
