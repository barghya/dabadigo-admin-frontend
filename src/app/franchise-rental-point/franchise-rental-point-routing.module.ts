import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseRentalPointPageComponent } from './page/franchise-rental-point-page/franchise-rental-point-page.component';
import { FranchiseRentalPointMainContainerComponent } from './container/franchise-rental-point-main-container/franchise-rental-point-main-container.component';
import { FranchiseRentalPointDetailsContainerComponent } from './container/franchise-rental-point-details-container/franchise-rental-point-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: FranchiseRentalPointPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'franchise-rental-point-main',
        pathMatch: 'full'
      },
      {
        path: 'franchise-rental-point-main',
        component: FranchiseRentalPointMainContainerComponent,
      },
      {
        path: 'franchise-rental-point-details/:id',
        component: FranchiseRentalPointDetailsContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRentalPointRoutingModule { }
