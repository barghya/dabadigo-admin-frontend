import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { battery, BatteryTransactions } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { GetBatteryTransactionAction } from 'src/app/store/actions/asset_inventory.action';

@Component({
  selector: 'app-view-battery-transactions-container',
  templateUrl: './view-battery-transactions-container.component.html',
  styleUrls: ['./view-battery-transactions-container.component.scss']
})
export class ViewBatteryTransactionsContainerComponent implements OnInit, OnDestroy {

  singleBattery: battery;
  
  subs = new SubSink();

  batteryTransactions$: Observable<BatteryTransactions[]>;
  
  constructor( private store: Store<AppState>, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(
      params => {
        var battery_id = +params['id'];
        this.store.select(state => state.asset_inventory.Battery).subscribe(
          data => {
            this.singleBattery = data.find( m => m.vehicle_battery_id == battery_id );
          }
        )
        this.store.dispatch(new GetBatteryTransactionAction(battery_id));
      }
    ))
    this.batteryTransactions$ = this.store.select(state => state.asset_inventory.batteryTransactions);
  }

  cancel() {
    this.router.navigate(['asset-inventory', 'battery-main'], {replaceUrl: true});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}