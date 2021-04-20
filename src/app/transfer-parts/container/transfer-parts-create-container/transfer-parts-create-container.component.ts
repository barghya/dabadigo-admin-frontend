import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { TransferRequestCreateLoadAction, PartsStockLoadAction, TransferRequestCreateAction, TransferRequestRentalpointLoadAction } from 'src/app/store/actions/transfer_parts.action';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { PartsMasterItem, PartsStockItem } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQDetails, FSQHubDetails } from 'src/app/models/fsqhubModel';
import { Observable } from 'rxjs';
import { TransferRequestCreatePayload } from 'src/app/models/transferpartsModel';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-parts-create-container',
  templateUrl: './transfer-parts-create-container.component.html',
  styleUrls: ['./transfer-parts-create-container.component.scss']
})
export class TransferPartsCreateContainerComponent implements OnInit {

  regions$: Observable<RegionItem[]>;
  partsMasters$: Observable<PartsMasterItem[]>;
  partsStocks$: Observable<PartsStockItem[]>;
  storeTypes$: Observable<DomainData[]>;
  rentalPoints$: Observable<RentalPoint[]>;
  partsStatuses$: Observable<DomainData[]>;
  cities$: Observable<CityItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new TransferRequestCreateLoadAction());
    this.regions$ = this.store.select(state => state.transferParts.regions);
    this.partsMasters$ = this.store.select(state => state.transferParts.partsMasters);
    this.partsStocks$ = this.store.select(state => state.transferParts.partsStocks);
    this.storeTypes$ = this.store.select(state => state.transferParts.storeTypes);
    this.rentalPoints$ = this.store.select(state => state.transferParts.rentalPoints);
    this.partsStatuses$ = this.store.select(state => state.transferParts.partsStatuses);
    this.cities$ = this.store.select(state => state.transferParts.cities);
  }

  PartSelection(parts_master_id: number) {
    this.store.dispatch(new PartsStockLoadAction(parts_master_id));
  }

  AddRequest(data: TransferRequestCreatePayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id;
        this.store.dispatch(new TransferRequestCreateAction(data)); 
      }
    )
  }

  RegionSelected(region_id: number) {
    this.store.dispatch(new TransferRequestRentalpointLoadAction(region_id));
  }

  Cancel() {
    this.router.navigate(["transfer-parts", "transfer-list"], {replaceUrl: true});
  }
}
