import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatChipsModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RoleManagementComponent } from './page/role-management/role-management.component';
import { RoleManagementMainComponent } from './component/role-management-main/role-management-main.component';
import { RoleManagementMainContainerComponent } from './container/role-management-main-container/role-management-main-container.component';
import { AddRoleComponent } from './component/add-role/add-role.component';
import { AddRoleContainerComponent } from './container/add-role-container/add-role-container.component';
import { EditRoleContainerComponent } from './container/edit-role-container/edit-role-container.component';
import { EditPermissionContainerComponent } from './container/edit-permission-container/edit-permission-container.component';
import { EditPermissionComponent } from './component/edit-permission/edit-permission.component';
import { EditRoleComponent } from './component/edit-role/edit-role.component';
import { UserTypeRoleComponent } from './component/user-type-role/user-type-role.component';
import { UserTypeRoleContainerComponent } from './container/user-type-role-container/user-type-role-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RoleManagementComponent,RoleManagementMainComponent,RoleManagementMainContainerComponent, AddRoleComponent, AddRoleContainerComponent, EditRoleContainerComponent, EditPermissionContainerComponent, EditPermissionComponent, EditRoleComponent, UserTypeRoleComponent, UserTypeRoleContainerComponent,],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class RoleManagementModule { }
