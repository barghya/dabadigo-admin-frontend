import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { PartsMasterItem, AddPartsStockPayload } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { PartsStockAddLoadAction, PartsStockAddAction, PartsRentalpointLoadAction, PartsFsqLoadByIdAction } from 'src/app/store/actions/asset_inventory.action';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { TransferRequestRentalpointLoadAction } from 'src/app/store/actions/transfer_parts.action';

@Component({
  selector: 'app-parts-stock-add-container',
  templateUrl: './parts-stock-add-container.component.html',
  styleUrls: ['./parts-stock-add-container.component.scss']
})
export class PartsStockAddContainerComponent implements OnInit {
  regions$: Observable<RegionItem[]>;
  partsMasters$: Observable<PartsMasterItem[]>;
  storeTypes$: Observable<DomainData[]>;
  rentalPoints$: Observable<RentalPoint[]>;
  partsStatuses$: Observable<DomainData[]>;
  city$: Observable<CityItem[]>;
  singleFsq$: Observable<FSQDetails>;
  private subs = new SubSink();
  parts_master_id: number;
  region_id: number;
  store_type: number;
  store_id: number;
  status: number;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      this.parts_master_id = +params['parts_master_id'];
      this.region_id = +params['region_id'];
      this.store_type = +params['store_type'];
      this.store_id = +params['store_id'];
      this.status = +params['status'];

      if(!!this.store_type && this.store_type == 4 && !!this.store_id) {
        this.store.dispatch(new PartsFsqLoadByIdAction(this.store_id));
      }
    }));
    this.store.dispatch(new PartsStockAddLoadAction());
    this.regions$ = this.store.select(state => state.asset_inventory.regions);
    this.partsMasters$ = this.store.select(state => state.asset_inventory.partsMasterList);
    this.storeTypes$ = this.store.select(state => state.asset_inventory.storeTypes);
    this.rentalPoints$ = this.store.select(state => state.asset_inventory.rentalPoints);
    this.partsStatuses$ = this.store.select(state => state.asset_inventory.partsStatuses);
    this.city$ = this.store.select( state => state.asset_inventory.city );
    this.singleFsq$ = this.store.select(state => state.asset_inventory.singleFsq);
  }

  AddStock(data: AddPartsStockPayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id;
        //console.log(data);
        this.store.dispatch(new PartsStockAddAction(data)); 
      }
    )
  }

  SelectedRegion(region_id: number) {
    this.store.dispatch(new PartsRentalpointLoadAction(region_id));
  }


  Cancel() {
    if(!!this.parts_master_id) {
      this.router.navigate(["asset-inventory", "parts-inventory"], {replaceUrl: true, queryParams: { id: this.parts_master_id }});
    }
    else {
      this.router.navigate(["asset-inventory", "parts-inventory"], {replaceUrl: true});
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
