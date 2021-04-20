import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripManagementRoutingModule } from './trip-management-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TripManagementComponent } from './page/trip-management/trip-management.component';
import { TripManagementListMainComponent } from './component/trip-management-list-main/trip-management-list-main.component';
import { TripManagementListMainContainerComponent } from './container/trip-management-list-main-container/trip-management-list-main-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../directives/directives.module';
import { EndTripComponent } from './component/end-trip/end-trip.component';
import { EndTripContainerComponent } from './container/end-trip-container/end-trip-container.component';
import { TripDetailsComponent } from './component/trip-details/trip-details.component';
import { TripDetailsContainerComponent } from './container/trip-details-container/trip-details-container.component';
import { PipeModule } from '../pipe/pipe.module';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [TripManagementComponent,TripManagementListMainComponent,TripManagementListMainContainerComponent, EndTripComponent, EndTripContainerComponent, TripDetailsComponent, TripDetailsContainerComponent],
  imports: [
    ReactiveFormsModule,
    TripManagementRoutingModule,
    CommonModule,
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
    MatDialogModule,
    MatCheckboxModule,
    PipeModule,
    MatNativeDateModule,
    MatCardModule,
    AngularOpenlayersModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  entryComponents:[EndTripComponent,EndTripContainerComponent]
})
export class TripManagementModule { }
