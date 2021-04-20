import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PricingManagementComponent } from './page/pricing-management/pricing-management.component';
import { PricingMainContainerComponent } from './container/pricing-main-container/pricing-main-container.component';
import { PricingAddContainerComponent } from './container/pricing-add-container/pricing-add-container.component';
import { PricingEditContainerComponent } from './container/pricing-edit-container/pricing-edit-container.component';
import { BatterySwapPricingAddContainerComponent } from './container/battery-swap-pricing-add-container/battery-swap-pricing-add-container.component';
import { BatterySwapPricingEditContainerComponent } from './container/battery-swap-pricing-edit-container/battery-swap-pricing-edit-container.component';

const routes: Routes = [
  {
    path: '',
    component: PricingManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'pricing-main',
        pathMatch: 'full'
      },
      {
        path: 'pricing-main',
        component: PricingMainContainerComponent
      },
      {
        path: 'pricing-add',
        component: PricingAddContainerComponent
      },
      {
        path: 'pricing-edit/:id',
        component: PricingEditContainerComponent
      },
      {
        path: 'battery-swap-pricing-add',
        component: BatterySwapPricingAddContainerComponent
      },
      {
        path: 'battery-swap-pricing-edit/:id',
        component: BatterySwapPricingEditContainerComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PricingManagementRoutingModule { }
