import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseManagementTripPageComponent } from './page/franchise-management-trip-page/franchise-management-trip-page.component';
import { FranchiseTripMainContainerComponent } from './container/franchise-trip-main-container/franchise-trip-main-container.component';
import { FranchiseTripDetailsContainerComponent } from './container/franchise-trip-details-container/franchise-trip-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: FranchiseManagementTripPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'franchise-management-trip-main',
        pathMatch: 'full'
      },
      {
        path: 'franchise-management-trip-main',
        component: FranchiseTripMainContainerComponent,
      },
      {
        path: 'franchise-trip-details/:id',
        component: FranchiseTripDetailsContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseManagementTripRoutingModule { }
