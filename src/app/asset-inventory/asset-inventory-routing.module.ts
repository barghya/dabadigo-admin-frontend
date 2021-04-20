import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetInventoryComponent } from './page/asset-inventory/asset-inventory.component';
import { AccessoriesMainContainerComponent } from './container/accessories-main-container/accessories-main-container.component';
import { AssetMainContainerComponent } from './container/asset-main-container/asset-main-container.component';
import { PartMainContainerComponent } from './container/part-main-container/part-main-container.component';
import { BatteryMainContainerComponent } from './container/battery-main-container/battery-main-container.component';
import { DeviceMainContainerComponent } from './container/device-main-container/device-main-container.component';
import { AddAccessoriescontainerComponent } from './container/add-accessoriescontainer/add-accessoriescontainer.component';
import { AddPartsContainerComponent } from './container/add-parts-container/add-parts-container.component';
import { AddBatterycontainerComponent } from './container/add-batterycontainer/add-batterycontainer.component';
import { AddDevicecontainerComponent } from './container/add-devicecontainer/add-devicecontainer.component';
import { AddAssetContainerComponent } from './container/add-asset-container/add-asset-container.component';
import { EditDeviceContainerComponent } from './container/edit-device-container/edit-device-container.component';
import { EditBatteryContainerComponent } from './container/edit-battery-container/edit-battery-container.component';
import { EditAssetContainerComponent } from './container/edit-asset-container/edit-asset-container.component';
import { EditPartsContainerComponent } from './container/edit-parts-container/edit-parts-container.component';
import { PartsMasterMainContainerComponent } from './container/parts-master-main-container/parts-master-main-container.component';
import { PartsMasterModifyContainerComponent } from './container/parts-master-modify-container/parts-master-modify-container.component';
import { PartsInventoryContainerComponent } from './container/parts-inventory-container/parts-inventory-container.component';
import { PartsTransactionsContainerComponent } from './container/parts-transactions-container/parts-transactions-container.component';
import { PartsStockAddContainerComponent } from './container/parts-stock-add-container/parts-stock-add-container.component';
import { PartsDefinitionContainerComponent } from './container/parts-definition-container/parts-definition-container.component';
import { ViewBatteryTransactionsContainerComponent } from './container/view-battery-transactions-container/view-battery-transactions-container.component';
import { ViewDeviceTransactionsContainerComponent } from './container/view-device-transactions-container/view-device-transactions-container.component';


const routes: Routes = [
  {
    path: '',
    component: AssetInventoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'assets-main',
        pathMatch: 'full'
      },
      {
        path: 'assets-main',
        component: AssetMainContainerComponent,
      },
      {
        path: 'accessories-main',
        component: AccessoriesMainContainerComponent,
      },
      {
        path: 'add-accessories',
        component: AddAccessoriescontainerComponent,
      },
      {
        path: 'parts-master-main',
        component: PartsMasterMainContainerComponent,
      },
      {
        path: 'parts-master-modify',
        component: PartsMasterModifyContainerComponent,
      },
      {
        path: 'parts-inventory',
        component: PartsInventoryContainerComponent,
      },
      {
        path: 'parts-transactions',
        component: PartsTransactionsContainerComponent,
      },
      {
        path: 'parts-stock-add',
        component: PartsStockAddContainerComponent,
      },
      {
        path: 'parts-definition',
        component: PartsDefinitionContainerComponent,
      },
      // {
      //   path: 'part-main',
      //   component: PartMainContainerComponent,
      // },
      // {
      //   path: 'add-part',
      //   component: AddPartsContainerComponent,
      // },
      // {
      //   path: 'edit-part/:id',
      //   component: EditPartsContainerComponent,
      // },
      {
        path: 'add-battery',
        component: AddBatterycontainerComponent,
      },
      {
        path: 'battery-main',
        component: BatteryMainContainerComponent,
      },
      {
        path: 'device-main',
        component: DeviceMainContainerComponent,
      },
      {
        path: 'add-device',
        component: AddDevicecontainerComponent,
      },
      {
        path: 'add-asset',
        component: AddAssetContainerComponent,
      },
      {
        path: 'edit-device/:id',
        component: EditDeviceContainerComponent,
      },
      {
        path: 'edit-battery/:id',
        component: EditBatteryContainerComponent,
      },
      {
        path: 'edit-asset/:id',
        component: EditAssetContainerComponent,
      },
      {
        path: 'view-battery-transactions/:id',
        component: ViewBatteryTransactionsContainerComponent,
      },
      {
        path: 'view-device-transactions/:id',
        component: ViewDeviceTransactionsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetInventoryRoutingModule { }
