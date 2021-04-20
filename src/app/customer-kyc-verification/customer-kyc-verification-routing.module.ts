import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerKycVerificationMainContainerComponent } from './container/customer-kyc-verification-main-container/customer-kyc-verification-main-container.component';
import { CustomerKycVerificationViewContainerComponent } from './container/customer-kyc-verification-view-container/customer-kyc-verification-view-container.component';
import { CustomerKycVerificationComponent } from './page/customer-kyc-verification/customer-kyc-verification.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerKycVerificationComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer-kyc-verification-main',
        pathMatch: 'full'
      },
      {
        path: 'customer-kyc-verification-main',
        component: CustomerKycVerificationMainContainerComponent,
      },
      {
        path: 'customer-kyc-detail/:id',
        component: CustomerKycVerificationViewContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerKycVerificationRoutingModule { }
