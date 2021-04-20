import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetMainComponent } from './component/asset-main/asset-main.component';
import { AssetMainContainerComponent } from './container/asset-main-container/asset-main-container.component';
import { AssetInventoryComponent } from './page/asset-inventory/asset-inventory.component';
import { AccessoriesMainComponent } from './component/accessories-main/accessories-main.component';
import { AccessoriesMainContainerComponent } from './container/accessories-main-container/accessories-main-container.component';
import { PartMainContainerComponent } from './container/part-main-container/part-main-container.component';
import { PartMainComponent } from './component/part-main/part-main.component';
import { BatteryMainComponent } from './component/battery-main/battery-main.component';
import { DeviceMainComponent } from './component/device-main/device-main.component';
import { BatteryMainContainerComponent } from './container/battery-main-container/battery-main-container.component';
import { DeviceMainContainerComponent } from './container/device-main-container/device-main-container.component';
import { AssetInventoryRoutingModule } from './asset-inventory-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddAccessoriesComponent } from './component/add-accessories/add-accessories.component';
import { AddAccessoriescontainerComponent } from './container/add-accessoriescontainer/add-accessoriescontainer.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AddPartsComponent } from './component/add-parts/add-parts.component';
import { AddPartsContainerComponent } from './container/add-parts-container/add-parts-container.component';
import { AddBatteryComponent } from './component/add-battery/add-battery.component';
import { AddBatterycontainerComponent } from './container/add-batterycontainer/add-batterycontainer.component';
import { AddDevicecontainerComponent } from './container/add-devicecontainer/add-devicecontainer.component';
import { AddDeviceComponent } from './component/add-device/add-device.component';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddAssetComponent } from './component/add-asset/add-asset.component';
import { AddAssetContainerComponent } from './container/add-asset-container/add-asset-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditDeviceComponent } from './component/edit-device/edit-device.component';
import { EditDeviceContainerComponent } from './container/edit-device-container/edit-device-container.component';
import { EditBatteryComponent } from './component/edit-battery/edit-battery.component';
import { EditBatteryContainerComponent } from './container/edit-battery-container/edit-battery-container.component';
import { EditAssetContainerComponent } from './container/edit-asset-container/edit-asset-container.component';
import { EditAssetComponent } from './component/edit-asset/edit-asset.component';
import { EditPartsComponent } from './component/edit-parts/edit-parts.component';
import { EditPartsContainerComponent } from './container/edit-parts-container/edit-parts-container.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DirectivesModule } from '../directives/directives.module';
import {MatChipsModule} from '@angular/material/chips';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { PartsMasterMainContainerComponent } from './container/parts-master-main-container/parts-master-main-container.component';
import { PartsMasterMainComponent } from './component/parts-master-main/parts-master-main.component';
import { PartsMasterModifyContainerComponent } from './container/parts-master-modify-container/parts-master-modify-container.component';
import { PartsMasterModifyComponent } from './component/parts-master-modify/parts-master-modify.component';
import { PartsInventoryComponent } from './component/parts-inventory/parts-inventory.component';
import { PartsInventoryContainerComponent } from './container/parts-inventory-container/parts-inventory-container.component';
import { PartsTransactionsComponent } from './component/parts-transactions/parts-transactions.component';
import { PartsTransactionsContainerComponent } from './container/parts-transactions-container/parts-transactions-container.component';
import { PartsStockAddComponent } from './component/parts-stock-add/parts-stock-add.component';
import { PartsStockAddContainerComponent } from './container/parts-stock-add-container/parts-stock-add-container.component';
import { PartsDefinitionContainerComponent } from './container/parts-definition-container/parts-definition-container.component';
import { PartsDefinitionComponent } from './component/parts-definition/parts-definition.component';
import { SharedModule } from '../common/shared.module';
import { FsqSearchAssetInventoryComponent } from './container/fsq-search-asset-inventory/fsq-search-asset-inventory.component';
import { ViewBatteryTransactionsComponent } from './component/view-battery-transactions/view-battery-transactions.component';
import { ViewBatteryTransactionsContainerComponent } from './container/view-battery-transactions-container/view-battery-transactions-container.component';
import { ViewDeviceTransactionsComponent } from './component/view-device-transactions/view-device-transactions.component';
import { ViewDeviceTransactionsContainerComponent } from './container/view-device-transactions-container/view-device-transactions-container.component';

@NgModule({
  declarations: [AssetMainComponent, AssetMainContainerComponent, AssetInventoryComponent, AccessoriesMainComponent, AccessoriesMainContainerComponent, PartMainContainerComponent, PartMainComponent, BatteryMainComponent, DeviceMainComponent, BatteryMainContainerComponent, DeviceMainContainerComponent, AddAssetComponent, AddAssetContainerComponent, AddAccessoriesComponent, AddAccessoriescontainerComponent, AddPartsComponent, AddPartsContainerComponent, AddBatteryComponent, AddBatterycontainerComponent, AddDevicecontainerComponent, AddDeviceComponent, EditDeviceComponent, EditDeviceContainerComponent, EditAssetComponent, EditAssetContainerComponent, EditBatteryContainerComponent, EditBatteryComponent, EditPartsComponent, EditPartsContainerComponent, PartsMasterMainContainerComponent, PartsMasterMainComponent, PartsMasterModifyContainerComponent, PartsMasterModifyComponent, PartsInventoryComponent, PartsInventoryContainerComponent, PartsTransactionsComponent, PartsTransactionsContainerComponent, PartsStockAddComponent, PartsStockAddContainerComponent, PartsDefinitionContainerComponent, PartsDefinitionComponent, FsqSearchAssetInventoryComponent, ViewBatteryTransactionsComponent, ViewBatteryTransactionsContainerComponent, ViewDeviceTransactionsComponent, ViewDeviceTransactionsContainerComponent],
  imports: [
    CommonModule,
    AssetInventoryRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    DirectivesModule,
    MatAutocompleteModule,
    MatChipsModule,
    AngularOpenlayersModule,
    SharedModule
  ],
  entryComponents: [FsqSearchAssetInventoryComponent]
})
export class AssetInventoryModule { }
