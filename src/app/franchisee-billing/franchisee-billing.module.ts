import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseeBillingRoutingModule } from './franchisee-billing-routing.module';
import { FranchiseeBillingPageComponent } from './page/franchisee-billing-page/franchisee-billing-page.component';
import { SetupsMainComponent } from './component/setups-main/setups-main.component';
import { SetupsMainContainerComponent } from './container/setups-main-container/setups-main-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddSetupComponent } from './component/add-setup/add-setup.component';
import { AddSetupContainerComponent } from './container/add-setup-container/add-setup-container.component';
import { FranchiseePaymentsComponent } from './component/franchisee-payments/franchisee-payments.component';
import { FranchiseePaymentsContainerComponent } from './container/franchisee-payments-container/franchisee-payments-container.component';
import { ViewPaymentDetailsComponent } from './component/view-payment-details/view-payment-details.component';
import { ViewPaymentDetailsContainerComponent } from './container/view-payment-details-container/view-payment-details-container.component';
import { AddPenaltyComponent } from './component/add-penalty/add-penalty.component';
import { AddPenaltyContainerComponent } from './container/add-penalty-container/add-penalty-container.component';
import { EditPenaltyComponent } from './component/edit-penalty/edit-penalty.component';
import { EditPenaltyContainerComponent } from './container/edit-penalty-container/edit-penalty-container.component';
import { ConfirmationPopoverComponent } from './component/confirmation-popover/confirmation-popover.component';


@NgModule({
  declarations: [FranchiseeBillingPageComponent, SetupsMainComponent, SetupsMainContainerComponent, AddSetupComponent, AddSetupContainerComponent, FranchiseePaymentsComponent, FranchiseePaymentsContainerComponent, ViewPaymentDetailsComponent, ViewPaymentDetailsContainerComponent, AddPenaltyComponent, AddPenaltyContainerComponent, EditPenaltyComponent, EditPenaltyContainerComponent, ConfirmationPopoverComponent],
  imports: [
    CommonModule,
    FranchiseeBillingRoutingModule,
    FlexLayoutModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatTooltipModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatPaginatorModule, 
    MatSortModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  entryComponents: [EditPenaltyContainerComponent, AddPenaltyContainerComponent, ConfirmationPopoverComponent]
})
export class FranchiseeBillingModule { }
