import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { CreateBatteryAction, AddAnotherBatteryAction, BatteryLoad} from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { battery, countries } from 'src/app/models/asset-inventoryModel';
import { take } from 'rxjs/operators';
import { DomainData } from 'src/app/models/domainModel';
import { Router } from '@angular/router';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';
import { region } from 'src/app/models/userManagement';

@Component({
  selector: 'app-add-batterycontainer',
  templateUrl: './add-batterycontainer.component.html',
  styleUrls: ['./add-batterycontainer.component.scss']
})
export class AddBatterycontainerComponent implements OnInit {

  data: battery;
  countryName$: Observable<countries[]>
  batteryStatus$: Observable<DomainData[]>;
  cities$: Observable<CityItem[]>;
  availableRegions$: Observable<RegionItem[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new BatteryLoad())
    this.countryName$ = this.store.select(state => state.asset_inventory.Countries);
    this.batteryStatus$ = this.store.select(state => state.asset_inventory.battery_state);
    this.cities$ = this.store.select(state => state.asset_inventory.cities);
    this.availableRegions$ = this.store.select(state => state.asset_inventory.regions);
  }

  addbatteryEvent(data: battery) {
    this.data = data;
    console.log(this.data);
    this.store.dispatch (new CreateBatteryAction(data));
    
  }
  
  Addanotherbattery(value: battery) {
    this.store.dispatch(new AddAnotherBatteryAction(value));
  }

  cancelAddBattery() {
    this.router.navigate(['asset-inventory', 'battery-main']);
  }
}