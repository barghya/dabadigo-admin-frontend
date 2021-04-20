import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRentalPointRoutingModule } from './franchise-rental-point-routing.module';
import { FranchiseRentalPointMainComponent } from './component/franchise-rental-point-main/franchise-rental-point-main.component';
import { FranchiseRentalPointMainContainerComponent } from './container/franchise-rental-point-main-container/franchise-rental-point-main-container.component';
import { FranchiseRentalPointDetailsContainerComponent } from './container/franchise-rental-point-details-container/franchise-rental-point-details-container.component';
import { FranchiseRentalPointDetailsComponent } from './component/franchise-rental-point-details/franchise-rental-point-details.component';
import { FranchiseRentalPointPageComponent } from './page/franchise-rental-point-page/franchise-rental-point-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatSlideToggleModule, MatAutocompleteModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AngularOpenlayersModule} from "ngx-openlayers";
import { DirectivesModule } from '../directives/directives.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [FranchiseRentalPointMainComponent, FranchiseRentalPointMainContainerComponent, FranchiseRentalPointDetailsContainerComponent, FranchiseRentalPointDetailsComponent, FranchiseRentalPointPageComponent],
  imports: [
    CommonModule,
    FranchiseRentalPointRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    AngularOpenlayersModule,
    DirectivesModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatCheckboxModule
  ]
})
export class FranchiseRentalPointModule { }
