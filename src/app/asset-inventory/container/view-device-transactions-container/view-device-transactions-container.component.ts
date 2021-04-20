import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { adminDevice, DeviceTransactions } from 'src/app/models/asset-inventoryModel';
import { GetDeviceTransactionAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-device-transactions-container',
  templateUrl: './view-device-transactions-container.component.html',
  styleUrls: ['./view-device-transactions-container.component.scss']
})
export class ViewDeviceTransactionsContainerComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  singleDevice: adminDevice;

  deviceTransactions$: Observable<DeviceTransactions[]>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(
      params => {
        var device_id = +params['id'];
        this.store.dispatch(new GetDeviceTransactionAction(device_id));
        this.subs.add(this.store.select( state => state.asset_inventory.Admindevice ).subscribe(
          data => {
            if(!!data) {
              this.singleDevice = data.find(m => m.device_id == device_id);
            }
          }
        ))
      }
    ))
    this.deviceTransactions$ = this.store.select(state => state.asset_inventory.deviceTransactions);
  }

  cancel() {
    this.router.navigate(['asset-inventory', 'device-main'], {replaceUrl: true});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}