import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { battery, countries } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EditBatteryLoadAction, EditBatteryAction } from 'src/app/store/actions/asset_inventory.action';
import { SubSink } from 'subsink';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-battery-container',
  templateUrl: './edit-battery-container.component.html',
  styleUrls: ['./edit-battery-container.component.scss']
})

export class EditBatteryContainerComponent implements OnInit, OnDestroy {

  Battery: battery;
  singleBattery$: Observable<battery>;
  BatteryState$: Observable<DomainData[]>;
  countryName$: Observable<countries[]>;
  subs = new SubSink();
  cities$: Observable<CityItem[]>;
  availableRegions$: Observable<RegionItem[]>;
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var battery_id = +params['id'];
      this.store.dispatch(new EditBatteryLoadAction({
        vehicle_battery_id: battery_id
      }))
    }));
    
    this.BatteryState$ = this.store.select(state => state.asset_inventory.battery_state);
    this.countryName$ = this.store.select(state => state.asset_inventory.Countries);
    this.singleBattery$ = this.store.select(state => state.asset_inventory.singleBattery);
    this.cities$ = this.store.select(state => state.asset_inventory.cities);
    this.availableRegions$ = this.store.select(state => state.asset_inventory.regions);
  }

  saveBatteryForm(value: battery) {
    console.log("edit battery", value);
    this.store.dispatch(new EditBatteryAction(value));
  }

  cancelSaveBattery() {
    this.router.navigate(['asset-inventory', 'battery-main']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
