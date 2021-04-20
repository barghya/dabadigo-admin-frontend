import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentManagementComponent } from './page/incident-management/incident-management.component';
import { ReportListContainerComponent } from './container/report-list-container/report-list-container.component';
import { ReportDetailPopoverContainerComponent } from './container/report-detail-popover-container/report-detail-popover-container.component';
import { TaskDetailPopoverContainerComponent } from './container/task-detail-popover-container/task-detail-popover-container.component';


const routes: Routes = [
  {
    path: '',
    component: IncidentManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'incident-management-main',
        pathMatch: 'full'
      },
      {
        path: 'incident-management-main',
        component: ReportListContainerComponent,
      },
      {
        path: 'incident-detail/:id',
        component: ReportDetailPopoverContainerComponent,
      },
      {
        path: 'task-detail',
        component: TaskDetailPopoverContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentManagementRoutingModule { }
