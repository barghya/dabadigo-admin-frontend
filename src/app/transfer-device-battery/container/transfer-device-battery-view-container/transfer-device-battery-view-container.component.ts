import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeployItemListMain, getSingleRequestItem } from 'src/app/models/transferDeviceBatteryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SingleBatteryDeviceTransferRequestLoadAction } from 'src/app/store/actions/transfer_device_battery.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transfer-device-battery-view-container',
  templateUrl: './transfer-device-battery-view-container.component.html',
  styleUrls: ['./transfer-device-battery-view-container.component.scss']
})
export class TransferDeviceBatteryViewContainerComponent implements OnInit {
  sourcedetail$: Observable<getSingleRequestItem[]>;
  constructor(public dialog: MatDialogRef<TransferDeviceBatteryViewContainerComponent>, @Inject(MAT_DIALOG_DATA) public data: DeployItemListMain, private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.data);
    this.store.dispatch(new SingleBatteryDeviceTransferRequestLoadAction({transfer_id: this.data.transfer_id}))
    this.sourcedetail$ = this.store.select(state=> state.transferDeviceBattery.singleItem);
  }
  CancelOperation() {
    this.dialog.close();
}


}
