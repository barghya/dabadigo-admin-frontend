import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IotControllerDetails } from 'src/app/models/iotControllereModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
// import { IotControllerListLoadAction } from 'src/app/store/actions/iot_controller.action';

@Component({
  selector: 'app-iotcontroller-main-container',
  templateUrl: './iotcontroller-main-container.component.html',
  styleUrls: ['./iotcontroller-main-container.component.scss']
})
export class IotcontrollerMainContainerComponent implements OnInit {
  iotControllerDetails$: Observable<IotControllerDetails[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    // this.store.dispatch(new IotControllerListLoadAction());
    // this.iotControllerDetails$ = this.store.select(state => state.iot_bypass.iotControllerDetails);
  }

  addIotBypass(vehicle_id:number){
    this.router.navigate(['iot-controller-bypass', 'add-iot-controller-bypass', vehicle_id]);
  }

}
