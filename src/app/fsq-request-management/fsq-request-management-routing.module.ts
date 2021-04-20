import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FsqRequestPageComponent } from './page/fsq-request-page/fsq-request-page.component';
import { FsqRequestManagementContainerComponent } from './container/fsq-request-management-container/fsq-request-management-container.component';
import { FsqAssignRegionContainerComponent } from './container/fsq-assign-region-container/fsq-assign-region-container.component';
import { VerifyDocumentContainerComponent } from './container/verify-document-container/verify-document-container.component';
import { ManageShiftsContainerComponent } from './container/manage-shifts-container/manage-shifts-container.component';
import { EditShiftContainerComponent } from './container/edit-shift-container/edit-shift-container.component';
import { AssignVehicleContainerComponent } from './container/assign-vehicle-container/assign-vehicle-container.component';


const routes: Routes = [
  {
    path: '',
    component: FsqRequestPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'fsq-request-management',
        pathMatch: 'full'
      },
      {
        path: 'fsq-request-management',
        component: FsqRequestManagementContainerComponent,
      },
      {
        path: 'fsq-assign-region/:id',
        component: FsqAssignRegionContainerComponent,
      },
      {
        path: 'verify-document/:id',
        component: VerifyDocumentContainerComponent,
      },
      {
        path: 'shift-management',
        component: ManageShiftsContainerComponent,
      },
      {
        path: 'edit-shift-management/:id',
        component: EditShiftContainerComponent,
      },
      {
        path: 'assign-vehicle/:id/:path',
        component: AssignVehicleContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FsqRequestManagementRoutingModule { }
