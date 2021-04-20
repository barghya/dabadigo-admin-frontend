import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegionManagementComponent } from './page/region-management/region-management.component';
import { RegionManagementMainContainerComponent } from './container/region-management-main-container/region-management-main-container.component';
import { AddRegionContainerComponent } from './container/add-region-container/add-region-container.component';
import { EditRegionContainerComponent } from './container/edit-region-container/edit-region-container.component';

const routes: Routes = [
  {
    path: '',
    component: RegionManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'region-management-main',
        pathMatch: 'full'
      },
      {
        path: 'region-management-main',
        component: RegionManagementMainContainerComponent
      },
      {
        path: 'add-region',
        component: AddRegionContainerComponent
      },
      {
        path: 'edit-region/:id',
        component: EditRegionContainerComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionManagementRoutingModule { }
