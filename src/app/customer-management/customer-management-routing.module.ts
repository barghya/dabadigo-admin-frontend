import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerManagementComponent } from './page/customer-management/customer-management.component';
import { CustomerMainContainerComponent } from './container/customer-main-container/customer-main-container.component';
import { CustomerDetailContainerComponent } from './container/customer-detail-container/customer-detail-container.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer-management-main',
        pathMatch: 'full'
      },
      {
        path: 'customer-management-main',
        component: CustomerMainContainerComponent,
      },
      {
        path: 'customer-detail/:id',
        component: CustomerDetailContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
