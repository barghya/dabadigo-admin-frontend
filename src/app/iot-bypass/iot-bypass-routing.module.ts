import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IotcontrollerMainPageComponent } from './page/iotcontroller-main-page/iotcontroller-main-page.component';
import { IotcontrollerMainContainerComponent } from './container/iotcontroller-main-container/iotcontroller-main-container.component';
import { DeviceBypassMainContainerComponent } from './container/device-bypass-main-container/device-bypass-main-container.component';
import { DemoDeviceMainContainerComponent } from './container/demo-device-main-container/demo-device-main-container.component';
import { ConfigureDeviceContainerComponent } from './container/configure-device-container/configure-device-container.component';
import { ActionMainContainerComponent } from './container/action-main-container/action-main-container/action-main-container.component';
import { MoreActionDetailsContainerComponent } from './container/more-action-details-container/more-action-details-container.component';
import { SlotBookingPopoverContainerComponent } from './container/slot-booking-popover-container/slot-booking-popover-container.component';
import { ShowMessageContainerComponent } from './container/show-message-container/show-message-container.component';
import { AddDemoDeviceContainerComponent } from './container/add-demo-device-container/add-demo-device-container.component';
import { CalculateDemoDeviceContainerComponent } from './container/calculate-demo-device-container/calculate-demo-device-container.component';
import { EditDemoDeviceContainerComponent } from './container/edit-demo-device-container/edit-demo-device-container.component';


const routes: Routes = [
  {
    path: '',
    component: IotcontrollerMainPageComponent,
    children:[
      {
        path:'',
        redirectTo: 'device-bypass',
        pathMatch: 'full'
      },
      {
        path: 'device-bypass',
        component: DeviceBypassMainContainerComponent,
      },
      {
        path: 'action-main',
        component: ActionMainContainerComponent,
      },
      {
        path: 'demo-device',
        component: DemoDeviceMainContainerComponent,
      },
      {
        path: 'add-demo-device',
        component: AddDemoDeviceContainerComponent,
      },
      {
        path: 'edit-demo-device/:id',
        component: EditDemoDeviceContainerComponent,
      },
      {
        path: 'calculate-demo-device',
        component: CalculateDemoDeviceContainerComponent,
      },

      {
        path: 'configure-device/:id',
        component: ConfigureDeviceContainerComponent,
      },
      {
        path: 'more-action-details/:id',
        component: MoreActionDetailsContainerComponent,
      },
      {
        path: 'slot-booking-popover',
        component: SlotBookingPopoverContainerComponent,
      },
      {
        path: 'show-message',
        component: ShowMessageContainerComponent,
      },

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotBypassRoutingModule { }
