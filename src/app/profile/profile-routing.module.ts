import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileMainContainerComponent } from './container/profile-main-container/profile-main-container.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ChangePasswordContainerComponent } from './container/change-password-container/change-password-container.component';
import { ChangeMobileNumberContainerComponent } from './container/change-mobile-number-container/change-mobile-number-container.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile-main',
        pathMatch: 'full'
      },
      {
        path: 'profile-main',
        component: ProfileMainContainerComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordContainerComponent,
      },
      {
        path: 'change-mobile-number',
        component: ChangeMobileNumberContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
