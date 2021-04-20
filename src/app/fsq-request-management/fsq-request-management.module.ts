import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsqRequestManagementRoutingModule } from './fsq-request-management-routing.module';
import { FsqRequestPageComponent } from './page/fsq-request-page/fsq-request-page.component';
import { FsqRequestManagementComponent } from './component/fsq-request-management/fsq-request-management.component';
import { FsqRequestManagementContainerComponent } from './container/fsq-request-management-container/fsq-request-management-container.component';
import { MatFormField, MatTable, MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../directives/directives.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FsqAssignRegionComponent } from './component/fsq-assign-region/fsq-assign-region.component';
import { FsqAssignRegionContainerComponent } from './container/fsq-assign-region-container/fsq-assign-region-container.component';
import { VerifyDocumentComponent } from './component/verify-document/verify-document.component';
import { VerifyDocumentContainerComponent } from './container/verify-document-container/verify-document-container.component';
import { ManageShiftsContainerComponent } from './container/manage-shifts-container/manage-shifts-container.component';
import { ManageShiftsComponent } from './component/manage-shifts/manage-shifts.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EditShiftComponent } from './component/edit-shift/edit-shift.component';
import { EditShiftContainerComponent } from './container/edit-shift-container/edit-shift-container.component';
import { AssignVehicleComponent } from './component/assign-vehicle/assign-vehicle.component';
import { AssignVehicleContainerComponent } from './container/assign-vehicle-container/assign-vehicle-container.component';
import { ReturnVehiclePopoverComponent } from './component/return-vehicle-popover/return-vehicle-popover.component';
import { ReturnVehiclePopoverContainerComponent } from './container/return-vehicle-popover-container/return-vehicle-popover-container.component';
import { SearchFsqComponent } from './container/search-fsq/search-fsq.component';
import { SharedModule } from '../common/shared.module';





@NgModule({
  declarations: [FsqRequestPageComponent, FsqRequestManagementComponent, FsqRequestManagementContainerComponent, FsqAssignRegionComponent, FsqAssignRegionContainerComponent, VerifyDocumentComponent, VerifyDocumentContainerComponent, ManageShiftsComponent, ManageShiftsContainerComponent, EditShiftComponent, EditShiftContainerComponent, AssignVehicleComponent, AssignVehicleContainerComponent, ReturnVehiclePopoverComponent, ReturnVehiclePopoverContainerComponent,SearchFsqComponent],
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
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    SharedModule,
    FsqRequestManagementRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
  ],
  entryComponents:[ReturnVehiclePopoverContainerComponent, ReturnVehiclePopoverComponent,SearchFsqComponent]
})
export class FsqRequestManagementModule { }
