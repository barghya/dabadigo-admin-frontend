import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManagementComponent } from './page/role-management/role-management.component';
import { RoleManagementMainContainerComponent } from './container/role-management-main-container/role-management-main-container.component';
import { AddRoleContainerComponent } from './container/add-role-container/add-role-container.component';
import { EditRoleContainerComponent } from './container/edit-role-container/edit-role-container.component';
import { EditPermissionContainerComponent } from './container/edit-permission-container/edit-permission-container.component';
import { UserTypeRoleContainerComponent } from './container/user-type-role-container/user-type-role-container.component';


const routes: Routes = [
  {
    path: '',
    component: RoleManagementComponent,
    children:[
      {
        path:'',
        redirectTo: 'role-management-main',
        pathMatch: 'full'
      },
      {
        path: 'role-management-main',
        component: RoleManagementMainContainerComponent,
      },
      {
        path: 'add-role',
        component: AddRoleContainerComponent,
      },
      {
        path: 'edit-role/:id',
        component: EditRoleContainerComponent,
      },
      {
        path: 'edit-permission/:id',
        component: EditPermissionContainerComponent,
      },
      {
        path: 'user-type-role',
        component: UserTypeRoleContainerComponent,
      },
    
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
