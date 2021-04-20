import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DashboardMainContainerComponent } from './container/dashboard-main-container/dashboard-main-container.component';
import { DashboardMainComponent } from './component/dashboard-main/dashboard-main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { AssetDetailsContainerComponent } from './container/asset-details-container/asset-details-container.component';
import { AssetDetailsComponent } from './component/asset-details/asset-details.component';
import { PipeModule } from '../pipe/pipe.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [DashboardComponent, DashboardMainComponent, DashboardMainContainerComponent, AssetDetailsContainerComponent, AssetDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    AngularOpenlayersModule,
    PipeModule,
    OwlDateTimeModule,
    MatTooltipModule,
    OwlNativeDateTimeModule,
  ]
})
export class DashboardModule { }
