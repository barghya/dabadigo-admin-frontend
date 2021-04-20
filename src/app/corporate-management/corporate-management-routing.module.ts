import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CorporateManagementComponent } from './page/corporate-management/corporate-management.component';
import { CorporateManagementMainContainerComponent } from './container/corporate-management-main-container/corporate-management-main-container.component';
import { AddCorporateContainerComponent } from './container/add-corporate-container/add-corporate-container.component';
import { EditCorporateContainerComponent } from './container/edit-corporate-container/edit-corporate-container.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'corporate-management-main',
        pathMatch: 'full'
      },
      {
        path: 'corporate-management-main',
        component: CorporateManagementMainContainerComponent
      },
      {
        path: 'corporate-management-add',
        component: AddCorporateContainerComponent
      },
      {
        path: 'edit-corporate/:id',
        component: EditCorporateContainerComponent
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CorporateManagementRoutingModule { }
