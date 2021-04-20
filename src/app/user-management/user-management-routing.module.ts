import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './page/user-management/user-management.component';
import { AddUserContainerComponent } from './container/add-user-container/add-user-container.component';
import { UserListMainContainerComponent } from './container/user-list-main-container/user-list-main-container.component';
import { EditUserContainerComponent } from './container/edit-user-container/edit-user-container.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-main',
        pathMatch: 'full'
      },
      {
        path: 'admin-main',
        component: UserListMainContainerComponent,
      },
      {
        path: 'add-user',
        component: AddUserContainerComponent,
      },
      {
        path: 'edit-user/:id',
        component: EditUserContainerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
