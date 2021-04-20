import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripManagementComponent } from './page/trip-management/trip-management.component';
import { TripManagementListMainContainerComponent } from './container/trip-management-list-main-container/trip-management-list-main-container.component';
import { EndTripContainerComponent } from './container/end-trip-container/end-trip-container.component';
import { TripDetailsContainerComponent } from './container/trip-details-container/trip-details-container.component';


const routes: Routes = [
  {
    path: '',
    component: TripManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'trip-management-main',
        pathMatch: 'full'
      },
      {
        path: 'trip-management-main',
        component: TripManagementListMainContainerComponent,
      },
      {
        path: 'end-trip',
        component: EndTripContainerComponent,
      },
      {
        path: 'trip-details/:id',
        component: TripDetailsContainerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripManagementRoutingModule { }
