import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseBillsComponent } from './page/franchise-bills/franchise-bills.component';
import { FranchiseBillsMainContainerComponent } from './container/franchise-bills-main-container/franchise-bills-main-container.component';
import { FranchiseBillDetailsContainerComponent } from './container/franchise-bill-details-container/franchise-bill-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: FranchiseBillsComponent,
    children: [
      {
        path: '',
        redirectTo: 'franchise-payments',
        pathMatch: 'full'
      },
      {
        path: 'franchise-payments',
        component: FranchiseBillsMainContainerComponent,
      },
      {
        path: 'franchise-payment-details/:id',
        component: FranchiseBillDetailsContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseBillsRoutingModule { }
