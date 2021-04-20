import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFsqHubComponent } from './page/admin-fsq-hub/admin-fsq-hub.component';
import { AdminFsqHubMainContainerComponent } from './container/admin-fsq-hub-main-container/admin-fsq-hub-main-container.component';


const routes: Routes = [
  {
    path: '',
    component: AdminFsqHubComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-fsq-hub-main',
        pathMatch: 'full'
      },
      {
        path: 'admin-fsq-hub-main',
        component: AdminFsqHubMainContainerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFsqHubRoutingModule { }
