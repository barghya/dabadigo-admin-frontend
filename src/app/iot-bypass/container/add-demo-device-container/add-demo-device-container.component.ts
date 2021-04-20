import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { addDemoDevice } from 'src/app/models/iotControllereModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { AddDemoDeviceLoadAction, AddDemoDeviceAction } from 'src/app/store/actions/iot_controller.action';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CalculateDemoDeviceContainerComponent } from '../calculate-demo-device-container/calculate-demo-device-container.component';

@Component({
  selector: 'app-add-demo-device-container',
  templateUrl: './add-demo-device-container.component.html',
  styleUrls: ['./add-demo-device-container.component.scss']
})
export class AddDemoDeviceContainerComponent implements OnInit {
  countriesName$: Observable<countries[]>;
  deviceStatus$: Observable<DomainData[]>;
  device_imei: string;
  device_data: string;
  viewDialog: MatDialogRef<CalculateDemoDeviceContainerComponent>;
  constructor(private store: Store<AppState>, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    this.store.dispatch(new AddDemoDeviceLoadAction());
    this.countriesName$ = this.store.select(state => state.iot_bypass.Countries);
  //   this.deviceStatus$ = this.store.select(state => state.iot_bypass.device_status);
  }

  addevent(value: addDemoDevice) {
    this.store.dispatch(new AddDemoDeviceAction(value));
  }

  cancelDemoDeviceevent() {
    this.router.navigate(['iot-controller-bypass', 'demo-device']);
  }
  // Calculateevent(data: number){
  //   this.viewDialog = this.dialog.open(CalculateDemoDeviceContainerComponent, {
  //     data: {

  //       device_imei: data,
  //       device_data: undefined,

  //     },
  //     disableClose: true,
  //     width: "90%",
  //   });
  //   this.viewDialog.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     // this.dialogValue = result.data;
  //   });
    
  // }

}
