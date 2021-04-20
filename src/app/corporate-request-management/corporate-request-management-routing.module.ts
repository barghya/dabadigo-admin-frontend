import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateRequestManagementComponent } from './page/corporate-request-management/corporate-request-management.component';
import { CorporateRequestManagementMainContainerComponent } from './container/corporate-request-management-main-container/corporate-request-management-main-container.component';
import { CorporateRequestDetailContainerComponent } from './container/corporate-request-detail-container/corporate-request-detail-container.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateRequestManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'corporate-request-management-main',
        pathMatch: 'full'
      },
      {
        path: 'corporate-request-management-main',
        component: CorporateRequestManagementMainContainerComponent,
      },
      {
        path: 'corporate-request-detail/:id',
        component: CorporateRequestDetailContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateRequestManagementRoutingModule { }
