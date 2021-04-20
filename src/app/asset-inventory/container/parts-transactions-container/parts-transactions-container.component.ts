import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { PartsTransactionsItem, PartsMasterItem, PartsTransactionsFilter } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PartsTransactionsLoadAction, PartsStockAddLoadAction, PartsRentalpointLoadAction, PartsFsqLoadByIdAction } from 'src/app/store/actions/asset_inventory.action';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';

@Component({
  selector: 'app-parts-transactions-container',
  templateUrl: './parts-transactions-container.component.html',
  styleUrls: ['./parts-transactions-container.component.scss']
})
export class PartsTransactionsContainerComponent implements OnInit {
  private subs = new SubSink();
  transactions$: Observable<PartsTransactionsItem[]>;

  regions$: Observable<RegionItem[]>;
  partsMasters$: Observable<PartsMasterItem[]>;
  storeTypes$: Observable<DomainData[]>;
  rentalPoints$: Observable<RentalPoint[]>;
  partsStatuses$: Observable<DomainData[]>;
  city$: Observable<CityItem[]>;
  singleFsq$: Observable<FSQDetails>;
  parts_master_id: number;
  region_id: number;
  store_type: number;
  store_id: number;
  status: number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new PartsStockAddLoadAction());
    this.regions$ = this.store.select(state => state.asset_inventory.regions);
    this.partsMasters$ = this.store.select(state => state.asset_inventory.partsMasterList);
    this.storeTypes$ = this.store.select(state => state.asset_inventory.storeTypes);
    this.rentalPoints$ = this.store.select(state => state.asset_inventory.rentalPoints);
    this.partsStatuses$ = this.store.select(state => state.asset_inventory.partsStatuses);
    this.city$ = this.store.select( state => state.asset_inventory.city );
    this.singleFsq$ = this.store.select(state => state.asset_inventory.singleFsq);

    this.subs.add(this.route.queryParams.subscribe(params => {
      this.parts_master_id = +params['parts_master_id'];
      this.region_id = +params['region_id'];
      this.store_type = +params['store_type'];
      this.store_id = +params['store_id'];
      this.status = +params['status'];
      
      if(!!this.store_type && this.store_type == 4 && !!this.store_id) {
        this.store.dispatch(new PartsFsqLoadByIdAction(this.store_id));
      }

      this.store.dispatch(new PartsTransactionsLoadAction({
        parts_master_id: this.parts_master_id,
        region_id: this.region_id,
        store_type: this.store_type,
        status: this.status,
        store_id: this.store_id
      }))
    }));

    this.transactions$ = this.store.select(state => state.asset_inventory.partsTransactionsList);
  }

  FilterData(data: PartsTransactionsFilter) {
    this.store.dispatch(new PartsTransactionsLoadAction({
      parts_master_id: data.parts_master_id,
      region_id: data.region_id,
      store_type: data.store_type,
      status: data.status,
      store_id: data.store_id
    }))
  }

  SelectedRegion(region_id: number) {
    this.store.dispatch(new PartsRentalpointLoadAction(region_id));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
