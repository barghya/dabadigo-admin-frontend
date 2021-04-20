import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeployVehicleComponent } from './page/deploy-vehicle/deploy-vehicle.component';
import { DeployVehicleMainContainerComponent } from './container/deploy-vehicle-main-container/deploy-vehicle-main-container.component';
import { AddDeployRequestContainerComponent } from './container/add-deploy-request-container/add-deploy-request-container.component';
import { DeployVehicleActionContainerComponent } from './container/deploy-vehicle-action-container/deploy-vehicle-action-container.component';


const routes: Routes = [
  {
    path: '',
    component: DeployVehicleComponent,
    children: [
      {
        path: '',
        redirectTo: 'deploy-vehicle-main',
        pathMatch: 'full'
      },
      {
        path: 'deploy-vehicle-main',
        component: DeployVehicleMainContainerComponent
      },
      {
        path: 'add-deploy-request',
        component: AddDeployRequestContainerComponent
      },
      {
        path: 'deploy-vehicle-action/:id',
        component: DeployVehicleActionContainerComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeployVehicleRoutingModule { }
