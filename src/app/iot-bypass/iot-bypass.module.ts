import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IotcontrollerMainComponent } from './component/iotcontroller-main/iotcontroller-main.component';
import { IotcontrollerMainContainerComponent } from './container/iotcontroller-main-container/iotcontroller-main-container.component';
import { IotcontrollerMainPageComponent } from './page/iotcontroller-main-page/iotcontroller-main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule, MatTableModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatAutocompleteModule, MatChipsModule, MatTabsModule, MatSnackBarModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IotBypassRoutingModule } from './iot-bypass-routing.module';
import { DeviceBypassMainComponent } from './component/device-bypass-main/device-bypass-main.component';
import { DeviceBypassMainContainerComponent } from './container/device-bypass-main-container/device-bypass-main-container.component';
import { TripBypassMainContainerComponent } from './container/trip-bypass-main-container/trip-bypass-main-container.component';
import { TripBypassMainComponent } from './component/trip-bypass-main/trip-bypass-main.component';
import { DemoDeviceMainComponent } from './component/demo-device-main/demo-device-main.component';
import { DemoDeviceMainContainerComponent } from './container/demo-device-main-container/demo-device-main-container.component';
import { ConfigureDeviceContainerComponent } from './container/configure-device-container/configure-device-container.component';
import { ConfigureDeviceComponent } from './component/configure-device/configure-device.component';
import { ActionMainComponent } from './component/action-main/action-main/action-main.component';
import { ActionMainContainerComponent } from './container/action-main-container/action-main-container/action-main-container.component';
import { MoreActionDetailsComponent } from './component/more-action-details/more-action-details.component';
import { MoreActionDetailsContainerComponent } from './container/more-action-details-container/more-action-details-container.component';
import { SlotBookingPopoverContainerComponent } from './container/slot-booking-popover-container/slot-booking-popover-container.component';
import { SlotBookingPopoverComponent } from './component/slot-booking-popover/slot-booking-popover.component';
import { ShowMessageComponent } from './component/show-message/show-message.component';
import { ShowMessageContainerComponent } from './container/show-message-container/show-message-container.component';
import { AddDemoDeviceComponent } from './component/add-demo-device/add-demo-device.component';
import { AddDemoDeviceContainerComponent } from './container/add-demo-device-container/add-demo-device-container.component';
import { CalculateDemoDeviceComponent } from './component/calculate-demo-device/calculate-demo-device.component';
import { CalculateDemoDeviceContainerComponent } from './container/calculate-demo-device-container/calculate-demo-device-container.component';
import { EditDemoDeviceComponent } from './component/edit-demo-device/edit-demo-device.component';
import { EditDemoDeviceContainerComponent } from './container/edit-demo-device-container/edit-demo-device-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [IotcontrollerMainComponent, IotcontrollerMainContainerComponent, IotcontrollerMainPageComponent, DeviceBypassMainComponent, DeviceBypassMainContainerComponent, DemoDeviceMainComponent, DemoDeviceMainContainerComponent, ConfigureDeviceContainerComponent, ConfigureDeviceComponent,TripBypassMainComponent, TripBypassMainContainerComponent, ActionMainComponent, ActionMainContainerComponent, MoreActionDetailsComponent, MoreActionDetailsContainerComponent, SlotBookingPopoverComponent, SlotBookingPopoverContainerComponent, ShowMessageComponent, ShowMessageContainerComponent, AddDemoDeviceComponent, AddDemoDeviceContainerComponent, CalculateDemoDeviceComponent, CalculateDemoDeviceContainerComponent, EditDemoDeviceComponent, EditDemoDeviceContainerComponent],
  imports: [
    CommonModule,
    IotBypassRoutingModule,
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  entryComponents:[ShowMessageComponent,ShowMessageContainerComponent]
})
export class IotBypassModule { }
