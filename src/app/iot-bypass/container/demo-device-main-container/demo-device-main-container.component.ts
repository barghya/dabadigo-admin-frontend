import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable } from 'rxjs';
import { DemoDeviceDetails } from 'src/app/models/iotControllereModel';
import { DemoDeviceListLoadAction } from 'src/app/store/actions/iot_controller.action';

@Component({
  selector: 'app-demo-device-main-container',
  templateUrl: './demo-device-main-container.component.html',
  styleUrls: ['./demo-device-main-container.component.scss']
})
export class DemoDeviceMainContainerComponent implements OnInit {
  AlldemoDeviceList$: Observable<DemoDeviceDetails[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new DemoDeviceListLoadAction());
    this.AlldemoDeviceList$ = this.store.select(state => state.iot_bypass.demodeviceDetails);
  }

  addDemodevice() {
    this.router.navigate(['iot-controller-bypass', 'add-demo-device']);
  }
  editDemodevice(device_imei:string){
    this.router.navigate(['iot-controller-bypass', 'edit-demo-device', device_imei]);
  }

}
