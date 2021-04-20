import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TransferDeviceBatteryRequestCreateLoadAction, TransferDeviceBatteryRequestRentalpointLoadAction, DeviceBatteryLoadAction, BatteryDeviceTransferRequestCreateAction } from 'src/app/store/actions/transfer_device_battery.action';
import { Observable } from 'rxjs';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { ItemStock, GetItemService, deployDevicebatteryRequest } from 'src/app/models/transferDeviceBatteryModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-device-battery-create-container',
  templateUrl: './transfer-device-battery-create-container.component.html',
  styleUrls: ['./transfer-device-battery-create-container.component.scss']
})
export class TransferDeviceBatteryCreateContainerComponent implements OnInit {
  regions$: Observable<RegionItem[]>;
  storeTypes$: Observable<DomainData[]>;
  cities$: Observable<CityItem[]>;
  ItemType$: Observable<DomainData[]>;
  rentalPoints$: Observable<RentalPoint[]>;
  ItemStock$: Observable<ItemStock[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new TransferDeviceBatteryRequestCreateLoadAction());
    this.regions$ = this.store.select(state => state.transferDeviceBattery.regions);
    this.storeTypes$ = this.store.select(state => state.transferDeviceBattery.storeTypes);
    this.cities$ = this.store.select(state => state.transferDeviceBattery.cities);
    this.ItemType$ = this.store.select(state=> state.transferDeviceBattery.itemType);
    this.rentalPoints$ = this.store.select(state => state.transferDeviceBattery.rentalPoints);
    this.ItemStock$= this.store.select(state => state.transferDeviceBattery.ItemStock)
  }
  RegionSelected(region_id: number) {
    this.store.dispatch(new TransferDeviceBatteryRequestRentalpointLoadAction(region_id));
  }
  Cancel() {
    this.router.navigate(["transfer-device-battery", "transfer-list"], {replaceUrl: true});
  }
  itemChanged(data: GetItemService){
    this.store.dispatch(new DeviceBatteryLoadAction(data))
  }
  RequestCreate(data: deployDevicebatteryRequest){
    this.store.select(state=> state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      (id)=>{
        data.updated_by= id
        this.store.dispatch(new BatteryDeviceTransferRequestCreateAction(data))
      }
    )
  }
}
