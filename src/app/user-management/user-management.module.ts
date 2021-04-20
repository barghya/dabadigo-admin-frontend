import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './page/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddUserComponent } from './component/add-user/add-user.component';
import { AddUserContainerComponent } from './container/add-user-container/add-user-container.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UserListMainComponent } from './component/user-list-main/user-list-main.component';
import { UserListMainContainerComponent } from './container/user-list-main-container/user-list-main-container.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { EditUserContainerComponent } from './container/edit-user-container/edit-user-container.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DirectivesModule } from '../directives/directives.module';
@NgModule({
  declarations: [UserManagementComponent, AddUserComponent, AddUserContainerComponent, UserListMainComponent, UserListMainContainerComponent, EditUserComponent, EditUserContainerComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    DirectivesModule,
    MatAutocompleteModule,
    MatChipsModule
  ]
})
export class UserManagementModule { }
