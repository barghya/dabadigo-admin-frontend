import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { CustomerMainComponent } from './component/customer-main/customer-main.component';
import { CustomerMainContainerComponent } from './container/customer-main-container/customer-main-container.component';
import { CustomerManagementComponent } from './page/customer-management/customer-management.component';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { CustomerDetailContainerComponent } from './container/customer-detail-container/customer-detail-container.component';
import { PipeModule } from '../pipe/pipe.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CustomerMainComponent,CustomerMainContainerComponent,CustomerManagementComponent, CustomerDetailComponent, CustomerDetailContainerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    CustomerManagementRoutingModule,
    PipeModule,
    OwlDateTimeModule, 
    MatCheckboxModule,
    OwlNativeDateTimeModule,
  ]
})
export class CustomerManagementModule { }
