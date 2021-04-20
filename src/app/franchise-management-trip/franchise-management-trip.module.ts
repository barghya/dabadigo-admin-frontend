import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseManagementTripRoutingModule } from './franchise-management-trip-routing.module';
import { FranchiseTripMainComponent } from './component/franchise-trip-main/franchise-trip-main.component';
import { FranchiseTripMainContainerComponent } from './container/franchise-trip-main-container/franchise-trip-main-container.component';
import { FranchiseManagementTripPageComponent } from './page/franchise-management-trip-page/franchise-management-trip-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatCheckboxModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { PipeModule } from '../pipe/pipe.module';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FranchiseTripDetailsComponent } from './component/franchise-trip-details/franchise-trip-details.component';
import { FranchiseTripDetailsContainerComponent } from './container/franchise-trip-details-container/franchise-trip-details-container.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FranchiseTripMainComponent, FranchiseTripMainContainerComponent, FranchiseManagementTripPageComponent, FranchiseTripDetailsComponent, FranchiseTripDetailsContainerComponent],
  imports: [
    CommonModule,
    FranchiseManagementTripRoutingModule,
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
export class FranchiseManagementTripModule { }
