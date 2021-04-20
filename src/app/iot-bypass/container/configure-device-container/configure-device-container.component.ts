import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bypass, Bypasslist } from 'src/app/models/iotControllereModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { BypassListLoadAction, AddBypassAction } from 'src/app/store/actions/iot_controller.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-configure-device-container',
  templateUrl: './configure-device-container.component.html',
  styleUrls: ['./configure-device-container.component.scss']
})
export class ConfigureDeviceContainerComponent implements OnInit {
  bypasslist$: Observable<Bypass>;
  vehicle_id: number;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router,private route: ActivatedRoute,) {
    this.route.params.subscribe(
      param => {
        this.vehicle_id = param['id'];
      }
    )
   }

  ngOnInit() {
    this.store.dispatch(new BypassListLoadAction({ vehicle_id: this.vehicle_id }));
    this.bypasslist$ = this.store.select(state => state.iot_bypass.bypass);
  }

  cancel() {
    this.router.navigate(['iot-controller-bypass', 'device-bypass'], {replaceUrl: true});
  }

  save(data:Bypass){
    this.store.dispatch(new AddBypassAction(data));
    console.log(data);
  }
  
}
