import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { battery, adminDevice, parts, Assets, AddAsset, editAssetLoad, editAsset, countries } from 'src/app/models/asset-inventoryModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { EditAssetLoadAction, EditAssetAction } from 'src/app/store/actions/asset_inventory.action';
import { region } from 'src/app/models/userManagement';
import { states, CityItem } from 'src/app/models/regionManagement';
import { AvailableFranchise } from 'src/app/models/rentalPoint';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Component({
  selector: 'app-edit-asset-container',
  templateUrl: './edit-asset-container.component.html',
  styleUrls: ['./edit-asset-container.component.scss']
})
export class EditAssetContainerComponent implements OnInit, OnDestroy {
  singleAsset$: Observable<AddAsset>;
  vehicle_types$: Observable<DomainData[]>;
  vehicle_status$: Observable<DomainData[]>;
  availableBattery$: Observable<battery[]>;
  availableDevice$: Observable<adminDevice[]>;
  availableParts$: Observable<parts[]>;
  ownership_types$: Observable<DomainData[]>;
  availableRegions$: Observable<region[]>;
  countries$: Observable<countries[]>;
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;
  franchise$: Observable<AvailableFranchise[]>;
  subs = new SubSink();
  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute, private rentalpointService: RentalPointService) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var vehicle_id = +params['id'];
      this.store.dispatch(new EditAssetLoadAction({
        vehicle_id: vehicle_id
      }))
    }));
    this.vehicle_types$ = this.store.select(state => state.asset_inventory.Vehicle_Types);
    this.vehicle_status$ = this.store.select(state => state.asset_inventory.Vehicle_Status);
    this.availableBattery$ = this.store.select(state => state.asset_inventory.availableBatteries);
    this.availableDevice$ = this.store.select(state => state.asset_inventory.availableDevices);
    this.availableParts$ = this.store.select(state => state.asset_inventory.availableParts);
    this.singleAsset$ = this.store.select(state => state.asset_inventory.singleAsset);
    this.availableRegions$ = this.store.select(state => state.asset_inventory.Region);
    this.ownership_types$ = this.store.select(state => state.asset_inventory.Ownership_Types);
    this.countries$ = this.store.select(state => state.asset_inventory.countries);
    this.statesName$ = this.store.select(state => state.asset_inventory.States);
    this.cities$ = this.store.select(state => state.asset_inventory.cities);
    this.franchise$ = this.rentalpointService.GetavailableFranchise();
  }
  AssetEdit(value: AddAsset){
    this.store.dispatch(new EditAssetAction(value));
  }
  cancelAsset(){
    this.router.navigate(["asset-inventory", "assets-main"], { replaceUrl: true });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
