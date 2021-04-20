import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { BatteryDeviceTransferRequestLoadAction, MultiTransferAction } from 'src/app/store/actions/transfer_device_battery.action';
import { Observable } from 'rxjs';
import { DeployItemListMain, multiTransferService } from 'src/app/models/transferDeviceBatteryModel';
import { MatDialog } from '@angular/material';
import { TransferDeviceBatteryViewContainerComponent } from '../transfer-device-battery-view-container/transfer-device-battery-view-container.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-device-battery-list-container',
  templateUrl: './transfer-device-battery-list-container.component.html',
  styleUrls: ['./transfer-device-battery-list-container.component.scss']
})
export class TransferDeviceBatteryListContainerComponent implements OnInit {
  ItemList$: Observable<DeployItemListMain[]>
  toggle: number = 1;
  constructor(private store: Store<AppState>, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new BatteryDeviceTransferRequestLoadAction({active_flag: 1}));
    this.ItemList$=this.store.select(state=> state.transferDeviceBattery.transferListMain);
  }
  AddTransfer() {
    this.router.navigate(["transfer-device-battery", "add-transfer-request"]);
  }
  ViewEvent(element: DeployItemListMain){
    var dialogRef = this.dialog.open(
      TransferDeviceBatteryViewContainerComponent,
      {
        width: '90%',
        disableClose: true,
        data: element
      }
    );
  }
  multiActionEvent(data: multiTransferService){
    this.store.select(state=> state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      (userId)=>{
        data.updated_by = userId;
        data.active_flag = this.toggle;
        console.log(data);
        this.store.dispatch(new MultiTransferAction(data))
      }
    )
  }
  getPastToggle(data: boolean){
    if(data){
      this.toggle= 0;
      this.store.dispatch(new BatteryDeviceTransferRequestLoadAction({active_flag: 0}));
    } else {
      this.toggle= 1;
      this.store.dispatch(new BatteryDeviceTransferRequestLoadAction({active_flag: 1}));
    }
  }
}
