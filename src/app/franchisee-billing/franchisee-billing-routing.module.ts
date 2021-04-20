import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseeBillingPageComponent } from './page/franchisee-billing-page/franchisee-billing-page.component';
import { SetupsMainContainerComponent } from './container/setups-main-container/setups-main-container.component';
import { AddSetupContainerComponent } from './container/add-setup-container/add-setup-container.component';
import { FranchiseePaymentsContainerComponent } from './container/franchisee-payments-container/franchisee-payments-container.component';
import { ViewPaymentDetailsContainerComponent } from './container/view-payment-details-container/view-payment-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: FranchiseeBillingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'bills-setup',
        pathMatch: 'full',
      },
      {
        path: 'bills-setup',
        component: SetupsMainContainerComponent,
      },
      {
        path: 'add-setup',
        component: AddSetupContainerComponent,
      },
      {
        path: 'view-payments',
        component: FranchiseePaymentsContainerComponent,
      },
      {
        path: 'view-payment-details/:id',
        component: ViewPaymentDetailsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseeBillingRoutingModule { }
