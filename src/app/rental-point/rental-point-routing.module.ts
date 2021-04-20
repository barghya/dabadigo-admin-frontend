import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RentalPointComponent } from './page/rental-point/rental-point.component';
import { RentalPointMainContainerComponent } from './container/rental-point-main-container/rental-point-main-container.component';
import { AddRentalPointContainerComponent } from './container/add-rental-point-container/add-rental-point-container.component';
import { EditRentalPointContainerComponent } from './container/edit-rental-point-container/edit-rental-point-container.component';
import { MoveRentalPointContainerComponent } from './container/move-rental-point-container/move-rental-point-container.component';
import { RentalPointHistoryContainerComponent } from './container/rental-point-history-container/rental-point-history-container.component';
import { RentalPointMapViewContainerComponent } from './container/rental-point-map-view-container/rental-point-map-view-container.component';


const routes: Routes = [
  {
    path: '',
    component: RentalPointComponent,
    children: [
      {
        path: '',
        redirectTo: 'rental-point-main',
        pathMatch: 'full'
      },
      {
        path: 'rental-point-main',
        component: RentalPointMainContainerComponent
      },
      {
        path: 'add-rental-point',
        component: AddRentalPointContainerComponent
      },
      {
        path: 'edit-rental-point/:id',
        component: EditRentalPointContainerComponent
      },
      {
        path: 'move-rental-point/:id',
        component: MoveRentalPointContainerComponent
      },
      {
        path: 'rental-point-history/:id',
        component: RentalPointHistoryContainerComponent
      },
      {
        path: 'rental-point-map-view',
        component: RentalPointMapViewContainerComponent
      }     
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalPointRoutingModule { }
