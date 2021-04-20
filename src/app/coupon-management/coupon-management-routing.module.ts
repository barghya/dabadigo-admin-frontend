import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponManagementComponent } from './page/coupon-management/coupon-management.component';
import { CouponManagementMainContainerComponent } from './container/coupon-management-main-container/coupon-management-main-container.component';
import { AddCouponContainerComponent } from './container/add-coupon-container/add-coupon-container.component';
import { EditCouponContainerComponent } from './container/edit-coupon-container/edit-coupon-container.component';
import { AssignCouponContainerComponent } from './container/assign-coupon-container/assign-coupon-container.component';
import { UsageHistoryContainerComponent } from './container/usage-history-container/usage-history-container.component';
import { ReferralMainContainerComponent } from './container/referral-main-container/referral-main-container.component';

const routes: Routes = [
  {
    path: '',
    component: CouponManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'coupon-list',
        pathMatch: 'full',
      },
      {
        path: 'coupon-list',
        component: CouponManagementMainContainerComponent,
      },
      {
        path: 'add-coupon',
        component: AddCouponContainerComponent,
      },
      {
        path: 'edit-coupon/:id',
        component: EditCouponContainerComponent,
      },
      {
        path: 'assign-coupon/:id',
        component: AssignCouponContainerComponent,
      },
      {
        path: 'usage-history/:id',
        component: UsageHistoryContainerComponent,
      },
      {
        path: 'referral-main',
        component: ReferralMainContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule { }
