import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseBillsRoutingModule } from './franchise-bills-routing.module';
import { FranchiseBillsComponent } from './page/franchise-bills/franchise-bills.component';
import { FranchiseBillsMainComponent } from './component/franchise-bills-main/franchise-bills-main.component';
import { FranchiseBillsMainContainerComponent } from './container/franchise-bills-main-container/franchise-bills-main-container.component';
import { FranchiseBillDetailsComponent } from './component/franchise-bill-details/franchise-bill-details.component';
import { FranchiseBillDetailsContainerComponent } from './container/franchise-bill-details-container/franchise-bill-details-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FranchiseBillsComponent, FranchiseBillsMainComponent, FranchiseBillsMainContainerComponent, FranchiseBillDetailsComponent, FranchiseBillDetailsContainerComponent],
  imports: [
    CommonModule,
    FranchiseBillsRoutingModule,
    FlexLayoutModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatTooltipModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatPaginatorModule, 
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class FranchiseBillsModule { }
