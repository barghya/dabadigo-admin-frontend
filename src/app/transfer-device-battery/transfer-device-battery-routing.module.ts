import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferDeviceBatteryComponent } from './page/transfer-device-battery.component';
import { TransferDeviceBatteryListContainerComponent } from './container/transfer-device-battery-list-container/transfer-device-battery-list-container.component';
import { TransferDeviceBatteryCreateContainerComponent } from './container/transfer-device-battery-create-container/transfer-device-battery-create-container.component';

const routes: Routes = [{
  path: '',
  component: TransferDeviceBatteryComponent,
  children: [
    {
      path: '',
      redirectTo: 'transfer-list',
      pathMatch: 'full'
    },
    {
      path: 'transfer-list',
      component: TransferDeviceBatteryListContainerComponent,
    },
    {
      path: 'add-transfer-request',
      component: TransferDeviceBatteryCreateContainerComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferDeviceBatteryRoutingModule { }
