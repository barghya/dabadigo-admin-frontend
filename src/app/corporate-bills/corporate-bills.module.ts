import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateBillsRoutingModule } from './corporate-bills-routing.module';
import { CorporateBillsComponent } from './page/corporate-bills/corporate-bills.component';
import { CorporateBillsMainComponent } from './component/corporate-bills-main/corporate-bills-main.component';
import { CorporateBillsDetailComponent } from './component/corporate-bills-detail/corporate-bills-detail.component';
import { CorporateBillsMainContainerComponent } from './container/corporate-bills-main-container/corporate-bills-main-container.component';
import { CorporateBillsDetailContainerComponent } from './container/corporate-bills-detail-container/corporate-bills-detail-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { CorporateBasicDetailsComponent } from './component/corporate-basic-details/corporate-basic-details.component';


@NgModule({
  declarations: [CorporateBillsComponent, CorporateBillsMainComponent, CorporateBillsDetailComponent, CorporateBillsMainContainerComponent, CorporateBillsDetailContainerComponent, CorporateBasicDetailsComponent],
  imports: [
    CommonModule,
    CorporateBillsRoutingModule,
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
    ReactiveFormsModule,
  ]
})
export class CorporateBillsModule { }
