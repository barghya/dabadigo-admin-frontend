import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { DeviceDetails } from 'src/app/models/iotControllereModel';
import { Observable } from 'rxjs';
import { DeviceListLoadAction } from 'src/app/store/actions/iot_controller.action';

@Component({
  selector: 'app-device-bypass-main-container',
  templateUrl: './device-bypass-main-container.component.html',
  styleUrls: ['./device-bypass-main-container.component.scss']
})
export class DeviceBypassMainContainerComponent implements OnInit {
  AllactiveDeviceList$: Observable<DeviceDetails[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new DeviceListLoadAction());
    this.AllactiveDeviceList$ = this.store.select(state => state.iot_bypass.deviceDetails);
    console.log(this.AllactiveDeviceList$);
  }

  addIOT(vehicle_id: number){
    this.router.navigate(['iot-controller-bypass', 'configure-device', vehicle_id]);
  }


}
