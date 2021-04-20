import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateManagementComponent } from './page/corporate-management/corporate-management.component';
import { CorporateManagementMainComponent } from './component/corporate-management-main/corporate-management-main.component';
import { CorporateManagementMainContainerComponent } from './container/corporate-management-main-container/corporate-management-main-container.component';
import { CorporateManagementRoutingModule } from './corporate-management-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatSlideToggleModule, MatAutocompleteModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { AddCorporateComponent } from './component/add-corporate/add-corporate.component';
import { AddCorporateContainerComponent } from './container/add-corporate-container/add-corporate-container.component';
import { EditCorporateComponent } from './component/edit-corporate/edit-corporate.component';
import { EditCorporateContainerComponent } from './container/edit-corporate-container/edit-corporate-container.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [CorporateManagementComponent, CorporateManagementMainComponent, CorporateManagementMainContainerComponent, AddCorporateComponent, AddCorporateContainerComponent, EditCorporateComponent, EditCorporateContainerComponent],
  imports: [
    CommonModule,
    CorporateManagementRoutingModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    DirectivesModule,
    MatDividerModule,
    MatCheckboxModule
  ]
})
export class CorporateManagementModule { }
