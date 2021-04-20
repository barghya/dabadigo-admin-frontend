import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { BatteryListLoadAction, DeleteBatteryAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { battery, batteryID } from 'src/app/models/asset-inventoryModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battery-main-container',
  templateUrl: './battery-main-container.component.html',
  styleUrls: ['./battery-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BatteryMainContainerComponent implements OnInit {

  battery$: Observable<battery[]>;
  
  constructor(private router: Router,private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new BatteryListLoadAction());
    this.battery$ = this.store.select(state => state.asset_inventory.Battery);
  }

  addBattery() {
    this.router.navigate(['asset-inventory', 'add-battery']);
  }

  editBattery(vehicle_battery_id: number) {
    this.router.navigate(['asset-inventory', 'edit-battery', vehicle_battery_id]);
    console.log(vehicle_battery_id);
  }
    
  deleteBattery(value: batteryID) {
    this.store.dispatch(new DeleteBatteryAction(value));
  }

  viewTransactions(vehicle_battery_id: number) {
    this.router.navigate(['asset-inventory', 'view-battery-transactions', vehicle_battery_id])
  }
}