import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseManagementAssetPageComponent } from './page/franchise-management-asset-page/franchise-management-asset-page.component';
import { FranchiseAssetMainContainerComponent } from './container/franchise-asset-main-container/franchise-asset-main-container.component';

const routes: Routes = [
  {
    path: '',
    component: FranchiseManagementAssetPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'franchise-asset-main',
        pathMatch: 'full'
      },
      {
        path: 'franchise-asset-main',
        component: FranchiseAssetMainContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseManagementAssetRoutingModule { }
