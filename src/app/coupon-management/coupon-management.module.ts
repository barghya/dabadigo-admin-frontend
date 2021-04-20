import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponManagementRoutingModule } from './coupon-management-routing.module';
import { CouponManagementComponent } from './page/coupon-management/coupon-management.component';
import { CouponManagementMainContainerComponent } from './container/coupon-management-main-container/coupon-management-main-container.component';
import { CouponManagementMainComponent } from './component/coupon-management-main/coupon-management-main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatAutocompleteModule, MatTabsModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { AddCouponContainerComponent } from './container/add-coupon-container/add-coupon-container.component';
import { AddCouponComponent } from './component/add-coupon/add-coupon.component';
import { EditCouponComponent } from './component/edit-coupon/edit-coupon.component';
import { EditCouponContainerComponent } from './container/edit-coupon-container/edit-coupon-container.component';
import { AssignCouponComponent } from './component/assign-coupon/assign-coupon.component';
import { AssignCouponContainerComponent } from './container/assign-coupon-container/assign-coupon-container.component';
import { CouponCustomerSearchComponent } from './container/coupon-customer-search/coupon-customer-search.component';
import { SharedModule } from '../common/shared.module';
import { UsageHistoryContainerComponent } from './container/usage-history-container/usage-history-container.component';
import { UsageHistoryComponent } from './component/usage-history/usage-history.component';
import { CouponBasicDetailsComponent } from './component/coupon-basic-details/coupon-basic-details.component';
import { ReferralMainComponent } from './component/referral-main/referral-main.component';
import { ReferralMainContainerComponent } from './container/referral-main-container/referral-main-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CouponManagementComponent, CouponManagementMainContainerComponent, CouponManagementMainComponent, AddCouponContainerComponent, AddCouponComponent, EditCouponComponent, EditCouponContainerComponent, AssignCouponComponent, AssignCouponContainerComponent, CouponCustomerSearchComponent, UsageHistoryContainerComponent, UsageHistoryComponent, CouponBasicDetailsComponent, ReferralMainComponent, ReferralMainContainerComponent],
  imports: [
    CommonModule,
    CouponManagementRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    SharedModule,
  ],
  entryComponents: [CouponCustomerSearchComponent]
})
export class CouponManagementModule { }
