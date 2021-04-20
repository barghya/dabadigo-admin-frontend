import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Assets, battery, adminDevice, parts, AddAsset, countries } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AddAssetLoadAction, AddAssetAction, AddAnotherAssetAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { tap } from 'rxjs/operators';
import { region } from 'src/app/models/userManagement';
import { states, CityItem } from 'src/app/models/regionManagement';
import { AvailableFranchise } from 'src/app/models/rentalPoint';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Component({
  selector: 'app-add-asset-container',
  templateUrl: './add-asset-container.component.html',
  styleUrls: ['./add-asset-container.component.scss']
})
export class AddAssetContainerComponent implements OnInit {

  vehicle_types$: Observable<DomainData[]>;
  ownership_types$: Observable<DomainData[]>;
  vehicle_status$: Observable<DomainData[]>;
  availableBattery$: Observable<battery[]>;
  availableDevice$: Observable<adminDevice[]>;
  availableParts$: Observable<parts[]>;
  availableRegions$: Observable<region[]>;
  countries$: Observable<countries[]>;
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;
  franchise$: Observable<AvailableFranchise[]>;

  constructor(private router: Router, private store: Store<AppState>, private rentalpointService: RentalPointService) { }

  ngOnInit() {
    this.store.dispatch(new AddAssetLoadAction());
    this.vehicle_types$ = this.store.select(state => state.asset_inventory.Vehicle_Types);
    this.availableRegions$ = this.store.select(state => state.asset_inventory.Region);
    this.ownership_types$ = this.store.select(state => state.asset_inventory.Ownership_Types);
    this.vehicle_status$ = this.store.select(state => state.asset_inventory.Vehicle_Status);
    this.availableBattery$ = this.store.select(state => state.asset_inventory.availableBatteries);
    this.availableDevice$ = this.store.select(state => state.asset_inventory.availableDevices);
    this.availableParts$ = this.store.select(state => state.asset_inventory.availableParts);
    this.countries$ = this.store.select(state => state.asset_inventory.countries);
    this.statesName$ = this.store.select(state => state.asset_inventory.States);
    this.cities$ = this.store.select(state => state.asset_inventory.cities);
    this.franchise$ = this.rentalpointService.GetavailableFranchise();
  }

  AddAsset(data: AddAsset) {
    this.store.dispatch(new AddAssetAction(data));
    console.log(data);
    
  }

  AddAnotherAsset(data: AddAsset) {
    this.store.dispatch(new AddAnotherAssetAction(data));
  }

  Cancel() {
    this.router.navigate(["asset-inventory", "assets-main"], { replaceUrl: true });
  }
}
