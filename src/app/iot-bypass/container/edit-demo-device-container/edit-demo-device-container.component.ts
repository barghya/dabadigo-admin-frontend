import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { addDemoDevice } from 'src/app/models/iotControllereModel';
import { DomainData } from 'src/app/models/domainModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditDemoDeviceLoadAction, EditDemoDeviceAction } from 'src/app/store/actions/iot_controller.action';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CalculateDemoDeviceContainerComponent } from '../calculate-demo-device-container/calculate-demo-device-container.component';

@Component({
  selector: 'app-edit-demo-device-container',
  templateUrl: './edit-demo-device-container.component.html',
  styleUrls: ['./edit-demo-device-container.component.scss']
})
export class EditDemoDeviceContainerComponent implements OnInit {
  subs = new SubSink();
  singleDevice$: Observable<addDemoDevice>;
  deviceStatus$: Observable<DomainData[]>;
  device_imei:string;
  device_data: string;
  
  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute,) {
    this.route.params.subscribe(
      param => {
        this.device_imei = param['id'];
      }
    )
  }

  ngOnInit() {
      this.store.dispatch(new EditDemoDeviceLoadAction({
      device_imei:this.device_imei
      }))
    this.singleDevice$ = this.store.select(state => state.iot_bypass.singleDevice);
   
  }

  editevent(value: addDemoDevice) {
    console.log('edit device', value);

    this.store.dispatch(new EditDemoDeviceAction(value));
  }

  cancelDemoDeviceevent() {
    this.router.navigate(['iot-controller-bypass', 'demo-device']);
  }
 

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
