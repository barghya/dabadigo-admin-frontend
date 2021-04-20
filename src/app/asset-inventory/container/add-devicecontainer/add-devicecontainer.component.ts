import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addDevice, countries } from 'src/app/models/asset-inventoryModel';
import { AddDeviceAction, AddAnotherDeviceAction, AddDeviceLoadAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';


@Component({
  selector: 'app-add-devicecontainer',
  templateUrl: './add-devicecontainer.component.html',
  styleUrls: ['./add-devicecontainer.component.scss']
})
export class AddDevicecontainerComponent implements OnInit {
  deviceStatus$: Observable<DomainData[]>;
  countriesName$: Observable<countries[]>;
  cities$: Observable<CityItem[]>;
  availableRegions$: Observable<RegionItem[]>;
  deviceModels$: Observable<DomainData[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddDeviceLoadAction());
    this.countriesName$ = this.store.select(state => state.asset_inventory.Countries);
    this.deviceStatus$ = this.store.select(state => state.asset_inventory.device_status);
    this.cities$ = this.store.select(state => state.asset_inventory.cities);
    this.availableRegions$ = this.store.select(state => state.asset_inventory.regions);
    this.deviceModels$ = this.store.select(state => state.asset_inventory.deviceModels);
  }

  AddDevice(value: addDevice) {
    this.store.dispatch(new AddDeviceAction(value));
  }

  AddAnotherDevice(value: addDevice) {
    this.store.dispatch(new AddAnotherDeviceAction(value))
  }

  CancelAdd() {
    this.router.navigate(['asset-inventory', 'device-main']);
  }
}
