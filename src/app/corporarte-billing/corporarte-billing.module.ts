import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporarteBillingRoutingModule } from './corporarte-billing-routing.module';
import { CorporateBillingComponent } from './page/corporate-billing/corporate-billing.component';
import { CorporateBillingMainComponent } from './component/corporate-billing-main/corporate-billing-main.component';
import { CorporateBillingMainContainerComponent } from './container/corporate-billing-main-container/corporate-billing-main-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSlideToggleModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewBillDetailsComponent } from './component/view-bill-details/view-bill-details.component';
import { ViewBillDetailsContainerComponent } from './container/view-bill-details-container/view-bill-details-container.component';
import { BillSetupsMainComponent } from './component/bill-setups-main/bill-setups-main.component';
import { BillSetupsMainContainerComponent } from './container/bill-setups-main-container/bill-setups-main-container.component';
import { SetupBillingComponent } from './component/setup-billing/setup-billing.component';
import { SetupBillingContainerComponent } from './container/setup-billing-container/setup-billing-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewBillCorporateLegalDetailsComponent } from './component/view-bill-corporate-legal-details/view-bill-corporate-legal-details.component';
import { SendEmailComponent } from './component/send-email/send-email.component';
import { SendEmailContainerComponent } from './container/send-email-container/send-email-container.component';
import { AddAdjustmentFormComponent } from './component/add-adjustment-form/add-adjustment-form.component';
import { AddAdjustmentFormContainerComponent } from './container/add-adjustment-form-container/add-adjustment-form-container.component';
import { EditAdjustmentComponent } from './component/edit-adjustment/edit-adjustment.component';
import { EditAdjustmentContainerComponent } from './container/edit-adjustment-container/edit-adjustment-container.component';
import { ConfirmationPopOverComponent } from './component/confirmation-pop-over/confirmation-pop-over.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [CorporateBillingComponent, CorporateBillingMainComponent, CorporateBillingMainContainerComponent, ViewBillDetailsComponent, ViewBillDetailsContainerComponent, BillSetupsMainComponent, BillSetupsMainContainerComponent, SetupBillingComponent, SetupBillingContainerComponent, ViewBillCorporateLegalDetailsComponent, SendEmailComponent, SendEmailContainerComponent, AddAdjustmentFormComponent, AddAdjustmentFormContainerComponent, EditAdjustmentComponent, EditAdjustmentContainerComponent, ConfirmationPopOverComponent],
  imports: [
    CommonModule,
    CorporarteBillingRoutingModule,
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
    MatSlideToggleModule,
    CKEditorModule
  ],
  entryComponents: [AddAdjustmentFormContainerComponent, EditAdjustmentContainerComponent, ConfirmationPopOverComponent]
})
export class CorporarteBillingModule { }
