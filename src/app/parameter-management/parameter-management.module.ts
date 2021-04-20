import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterManagementRoutingModule } from './parameter-management-routing.module';
import { ParameterManagementComponent } from './page/parameter-management/parameter-management.component';
import { ParametersManagementComponent } from './component/parameters-management/parameters-management.component';
import { ParametersManagementContainerComponent } from './container/parameters-management-container/parameters-management-container.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatSelectModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { EditParameterContainerComponent } from './container/edit-parameter-container/edit-parameter-container.component';
import { EditParameterComponent } from './component/edit-parameter/edit-parameter.component';
import { AddParameterComponent } from './component/add-parameter/add-parameter.component';
import { AddParameterContainerComponent } from './container/add-parameter-container/add-parameter-container.component';


@NgModule({
  declarations: [ParameterManagementComponent,ParametersManagementComponent,ParametersManagementContainerComponent, AddParameterComponent, AddParameterContainerComponent, EditParameterContainerComponent, EditParameterComponent,],
  imports: [
    CommonModule,
    ParameterManagementRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    DirectivesModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})
export class ParameterManagementModule { }
