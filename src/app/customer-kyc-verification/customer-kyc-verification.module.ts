import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { PipeModule } from '../pipe/pipe.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomerKycVerificationRoutingModule } from './customer-kyc-verification-routing.module';
import { CustomerKycVerificationMainComponent } from './component/customer-kyc-verification-main/customer-kyc-verification-main.component';
import { CustomerKycVerificationMainContainerComponent } from './container/customer-kyc-verification-main-container/customer-kyc-verification-main-container.component';
import { CustomerKycVerificationViewComponent } from './component/customer-kyc-verification-view/customer-kyc-verification-view.component';
import { CustomerKycVerificationViewContainerComponent } from './container/customer-kyc-verification-view-container/customer-kyc-verification-view-container.component';
import { CustomerKycVerificationComponent } from './page/customer-kyc-verification/customer-kyc-verification.component';


@NgModule({
  declarations: [CustomerKycVerificationComponent,CustomerKycVerificationMainComponent,CustomerKycVerificationMainContainerComponent,CustomerKycVerificationViewComponent,CustomerKycVerificationViewContainerComponent],
  imports: [
    CommonModule,
    CustomerKycVerificationRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    PipeModule,
    OwlDateTimeModule, 
    MatCheckboxModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule
  ]
})
export class CustomerKycVerificationModule { }
