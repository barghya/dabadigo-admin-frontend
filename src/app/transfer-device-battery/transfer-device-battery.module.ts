import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferDeviceBatteryRoutingModule } from './transfer-device-battery-routing.module';
import { TransferDeviceBatteryComponent } from './page/transfer-device-battery.component';
import { TransferDeviceBatteryListComponent } from './component/transfer-device-battery-list/transfer-device-battery-list.component';
import { TransferDeviceBatteryListContainerComponent } from './container/transfer-device-battery-list-container/transfer-device-battery-list-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatDialogModule } from '@angular/material';
import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../common/shared.module';
import { TransferDeviceBatteryCreateContainerComponent } from './container/transfer-device-battery-create-container/transfer-device-battery-create-container.component';
import { TransferDeviceBatteryCreateComponent } from './component/transfer-device-battery-create/transfer-device-battery-create.component';
import { FsqSearchComponent } from './container/fsq-search/fsq-search.component';
import { TransferDeviceBatteryViewContainerComponent } from './container/transfer-device-battery-view-container/transfer-device-battery-view-container.component';
import { TransferDeviceBatteryViewComponent } from './component/transfer-device-battery-view/transfer-device-battery-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TransferDeviceBatteryComponent, 
    TransferDeviceBatteryListComponent, 
    TransferDeviceBatteryListContainerComponent, TransferDeviceBatteryCreateContainerComponent, TransferDeviceBatteryCreateComponent, FsqSearchComponent, TransferDeviceBatteryViewContainerComponent, TransferDeviceBatteryViewComponent,
  ],
  imports: [
    CommonModule,
    TransferDeviceBatteryRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    DirectivesModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    SharedModule,
    MatTooltipModule
  ],
  entryComponents:[FsqSearchComponent, TransferDeviceBatteryViewContainerComponent]
})
export class TransferDeviceBatteryModule { }
