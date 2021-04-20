import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SubSink } from 'subsink';
import { adminDevice, editDevice, addDevice, countries } from 'src/app/models/asset-inventoryModel';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EditDeviceAction, EditDeviceLoadAction } from 'src/app/store/actions/asset_inventory.action';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-device-container',
  templateUrl: './edit-device-container.component.html',
  styleUrls: ['./edit-device-container.component.scss']
})
export class EditDeviceContainerComponent implements OnInit, OnDestroy {

  subs = new SubSink();
  singleDevice$: Observable<adminDevice>;
  deviceStatus$: Observable<DomainData[]>;
  countriesName$: Observable<countries[]>;
  cities$: Observable<CityItem[]>;
  availableRegions$: Observable<RegionItem[]>;
  deviceModels$: Observable<DomainData[]>;
  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
  this.subs.add(this.route.params.subscribe(params => {
    var device_id = +params['id'];
    this.store.dispatch(new EditDeviceLoadAction({
      device_id: device_id
    }))
  }));
  this.countriesName$ = this.store.select(state => state.asset_inventory.Countries);
  this.deviceStatus$ = this.store.select(state => state.asset_inventory.device_status);
  this.singleDevice$ = this.store.select(state => state.asset_inventory.singleDevice);
  this.cities$ = this.store.select(state => state.asset_inventory.cities);
  this.availableRegions$ = this.store.select(state => state.asset_inventory.regions);
  this.deviceModels$ = this.store.select(state => state.asset_inventory.deviceModels);
  }
  
  deviceEditForm(value:adminDevice){
    console.log('edit device',value);
    
    this.store.dispatch(new EditDeviceAction(value));
   }
  
  cancelDevice() {
    this.router.navigate(['asset-inventory', 'device-main']);
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
