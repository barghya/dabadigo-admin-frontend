import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseManagementAssetRoutingModule } from './franchise-management-asset-routing.module';
import { FranchiseAssetMainComponent } from './component/franchise-asset-main/franchise-asset-main.component';
import { FranchiseAssetMainContainerComponent } from './container/franchise-asset-main-container/franchise-asset-main-container.component';
import { FranchiseManagementAssetPageComponent } from './page/franchise-management-asset-page/franchise-management-asset-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { PipeModule } from '../pipe/pipe.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [FranchiseAssetMainComponent, FranchiseAssetMainContainerComponent, FranchiseManagementAssetPageComponent],
  imports: [
    CommonModule,
    FranchiseManagementAssetRoutingModule,
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
    OwlNativeDateTimeModule,
  ]
})
export class FranchiseManagementAssetModule { }
