import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalPointComponent } from './page/rental-point/rental-point.component';
import { RentalPointMainContainerComponent } from './container/rental-point-main-container/rental-point-main-container.component';
import { RentalPointMainComponent } from './component/rental-point-main/rental-point-main.component';
import { RentalPointRoutingModule } from './rental-point-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatSlideToggleModule, MatAutocompleteModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddRentalPointComponent } from './component/add-rental-point/add-rental-point.component';
import { AddRentalPointContainerComponent } from './container/add-rental-point-container/add-rental-point-container.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { EditRentalPointComponent } from './component/edit-rental-point/edit-rental-point.component';
import { EditRentalPointContainerComponent } from './container/edit-rental-point-container/edit-rental-point-container.component';
import { MoveRentalPointComponent } from './component/move-rental-point/move-rental-point.component';
import { MoveRentalPointContainerComponent } from './container/move-rental-point-container/move-rental-point-container.component';
import { RentalPointHistoryComponent } from './component/rental-point-history/rental-point-history.component';
import { RentalPointHistoryContainerComponent } from './container/rental-point-history-container/rental-point-history-container.component';
import { RentalPointMapViewComponent } from './component/rental-point-map-view/rental-point-map-view.component';
import { RentalPointMapViewContainerComponent } from './container/rental-point-map-view-container/rental-point-map-view-container.component';
import { AngularOpenlayersModule} from "ngx-openlayers";
import { DirectivesModule } from '../directives/directives.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [RentalPointComponent, RentalPointMainContainerComponent, RentalPointMainComponent, AddRentalPointComponent, AddRentalPointContainerComponent, EditRentalPointComponent, EditRentalPointContainerComponent, MoveRentalPointComponent, MoveRentalPointContainerComponent, RentalPointHistoryComponent, RentalPointHistoryContainerComponent, RentalPointMapViewComponent, RentalPointMapViewContainerComponent ],
  imports: [
    CommonModule,
    RentalPointRoutingModule,
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
export class RentalPointModule { }
