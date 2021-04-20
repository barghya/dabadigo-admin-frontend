import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateBillingComponent } from './page/corporate-billing/corporate-billing.component';
import { CorporateBillingMainContainerComponent } from './container/corporate-billing-main-container/corporate-billing-main-container.component';
import { ViewBillDetailsContainerComponent } from './container/view-bill-details-container/view-bill-details-container.component';
import { BillSetupsMainContainerComponent } from './container/bill-setups-main-container/bill-setups-main-container.component';
import { SetupBillingContainerComponent } from './container/setup-billing-container/setup-billing-container.component';
import { SendEmailContainerComponent } from './container/send-email-container/send-email-container.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateBillingComponent,
    children: [
      {
        path: '',
        redirectTo: 'bills-set-up',
        pathMatch: 'full',
      }, 
      {
        path: 'bills-set-up',
        component: BillSetupsMainContainerComponent,
      },
      {
        path: "setup-new-bill",
        component: SetupBillingContainerComponent,
      },
      {
        path: 'corporate-bills',
        component: CorporateBillingMainContainerComponent,
      },
      {
        path: 'view-bill/:id',
        component: ViewBillDetailsContainerComponent,
      },
      {
        path: 'send-email/:id',
        component: SendEmailContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporarteBillingRoutingModule { }
