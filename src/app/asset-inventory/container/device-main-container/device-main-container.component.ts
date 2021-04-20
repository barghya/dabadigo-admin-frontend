import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { adminDevice, deviceId, editDevice } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { DeviceLoadAction, DeleteDeviceAction } from 'src/app/store/actions/asset_inventory.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-main-container',
  templateUrl: './device-main-container.component.html',
  styleUrls: ['./device-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceMainContainerComponent implements OnInit {
  admindevice_det$: Observable<adminDevice[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new DeviceLoadAction());
    this.admindevice_det$ = this.store.select(state => state.asset_inventory.Admindevice);
    
  }

  adddevice() {
    console.log("fired");
    this.router.navigate(['asset-inventory', 'add-device']);
  }
  editdevice(device_id: number){
    this.router.navigate(['asset-inventory', 'edit-device', device_id]);
  }
  deletedevice(value:deviceId){
    console.log("Delete device", value);
     this.store.dispatch(new DeleteDeviceAction(value));
  }

  getDeviceTransactions(device_id: number) {
    this.router.navigate(['asset-inventory', 'view-device-transactions', device_id]);
  }

}
