import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DashboardMainContainerComponent } from './container/dashboard-main-container/dashboard-main-container.component';
import { AssetDetailsContainerComponent } from './container/asset-details-container/asset-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard-main',
        pathMatch: 'full'
      },
      {
        path: 'dashboard-main',
        component: DashboardMainContainerComponent
      },
      {
        path: 'asset-details/:id',
        component: AssetDetailsContainerComponent,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
