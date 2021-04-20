import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateRequestManagementRoutingModule } from './corporate-request-management-routing.module';
import { CorporateRequestManagementMainComponent } from './component/corporate-request-management-main/corporate-request-management-main.component';
import { CorporateRequestManagementMainContainerComponent } from './container/corporate-request-management-main-container/corporate-request-management-main-container.component';
import { CorporateRequestManagementComponent } from './page/corporate-request-management/corporate-request-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { CorporateRequestDetailComponent } from './component/corporate-request-detail/corporate-request-detail.component';
import { CorporateRequestDetailContainerComponent } from './container/corporate-request-detail-container/corporate-request-detail-container.component';


@NgModule({
  declarations: [CorporateRequestManagementMainComponent, CorporateRequestManagementMainContainerComponent, CorporateRequestManagementComponent, CorporateRequestDetailComponent, CorporateRequestDetailContainerComponent],
  imports: [
    CommonModule,
    CorporateRequestManagementRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatCheckboxModule,
  ]
})
export class CorporateRequestManagementModule { }
