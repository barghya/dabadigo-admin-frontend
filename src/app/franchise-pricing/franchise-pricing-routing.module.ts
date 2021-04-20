import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchisePricingComponent } from './page/franchise-pricing/franchise-pricing.component';
import { FranchisePricingMainContainerComponent } from './container/franchise-pricing-main-container/franchise-pricing-main-container.component';
import { FranchisePricingAddContainerComponent } from './container/franchise-pricing-add-container/franchise-pricing-add-container.component';
import { FranchisePricingEditContainerComponent } from './container/franchise-pricing-edit-container/franchise-pricing-edit-container.component';


const routes: Routes = [
  {
    path: '',
    component: FranchisePricingComponent,
    children: [
      {
        path: '',
        redirectTo: 'franchise-pricing-main',
        pathMatch: 'full'
      },
      {
        path: 'franchise-pricing-main',
        component: FranchisePricingMainContainerComponent,
      },
      {
        path: 'franchise-pricing-add',
        component: FranchisePricingAddContainerComponent,
      },
      {
        path: 'franchise-pricing-edit/:id',
        component: FranchisePricingEditContainerComponent,
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchisePricingRoutingModule { }
