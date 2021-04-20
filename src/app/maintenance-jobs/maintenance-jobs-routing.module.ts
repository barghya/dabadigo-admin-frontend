import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceJobsComponent } from './page/maintenance-jobs/maintenance-jobs.component';
import { MaintenanceJobsMainContainerComponent } from './container/maintenance-jobs-main-container/maintenance-jobs-main-container.component';
import { MaintenanceJobDetailContainerComponent } from './container/maintenance-job-detail-container/maintenance-job-detail-container.component';
import { MaintenanceJobCreateContainerComponent } from './container/maintenance-job-create-container/maintenance-job-create-container.component';
import { MaintenanceScheduleContainerComponent } from './container/maintenance-schedule-container/maintenance-schedule-container.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceJobsComponent,
    children: [
      {
        path: '',
        redirectTo: 'maintenance-jobs-main',
        pathMatch: 'full'
      },
      {
        path: 'maintenance-jobs-main',
        component: MaintenanceJobsMainContainerComponent
      },
      {
        path: 'maintenance-job-detail/:id',
        component: MaintenanceJobDetailContainerComponent
      },
      {
        path: 'maintenance-job-create',
        component: MaintenanceJobCreateContainerComponent
      },
      {
        path: 'maintenance-schedule',
        component: MaintenanceScheduleContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceJobsRoutingModule { }
