import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchisePricingRoutingModule } from './franchise-pricing-routing.module';
import { FranchisePricingMainComponent } from './component/franchise-pricing-main/franchise-pricing-main.component';
import { FranchisePricingComponent } from './page/franchise-pricing/franchise-pricing.component';
import { FranchisePricingMainContainerComponent } from './container/franchise-pricing-main-container/franchise-pricing-main-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatCheckboxModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { PipeModule } from '../pipe/pipe.module';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReactiveFormsModule } from '@angular/forms';
import { FranchisePricingAddComponent } from './component/franchise-pricing-add/franchise-pricing-add.component';
import { FranchisePricingEditComponent } from './component/franchise-pricing-edit/franchise-pricing-edit.component';
import { FranchisePricingAddContainerComponent } from './container/franchise-pricing-add-container/franchise-pricing-add-container.component';
import { FranchisePricingEditContainerComponent } from './container/franchise-pricing-edit-container/franchise-pricing-edit-container.component';


@NgModule({
  declarations: [FranchisePricingComponent,FranchisePricingMainComponent,FranchisePricingMainContainerComponent, FranchisePricingAddComponent, FranchisePricingEditComponent, FranchisePricingAddContainerComponent, FranchisePricingEditContainerComponent],
  imports: [
    CommonModule,
    FranchisePricingRoutingModule,
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
    MatCheckboxModule,
    PipeModule,
    MatNativeDateModule,
    MatCardModule,
    AngularOpenlayersModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class FranchisePricingModule { }
