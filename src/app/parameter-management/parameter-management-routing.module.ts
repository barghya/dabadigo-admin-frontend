import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametersManagementContainerComponent } from './container/parameters-management-container/parameters-management-container.component';
import { ParameterManagementComponent } from './page/parameter-management/parameter-management.component';
import { AddParameterContainerComponent } from './container/add-parameter-container/add-parameter-container.component';
import { EditParameterContainerComponent } from './container/edit-parameter-container/edit-parameter-container.component';


const routes: Routes = [
  {
    path: '',
    component: ParameterManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'parameter-management',
        pathMatch: 'full'
      },
      {
        path: 'parameter-management',
        component: ParametersManagementContainerComponent
      },
      {
        path: 'add-parameter',
        component: AddParameterContainerComponent
      },
      {
        path: 'edit-parameter/:id',
        component: EditParameterContainerComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterManagementRoutingModule { }
