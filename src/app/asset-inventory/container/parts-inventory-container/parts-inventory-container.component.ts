import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { PartsStockLoadAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { PartsStockItem, PartsTransactionsFilter } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-parts-inventory-container',
  templateUrl: './parts-inventory-container.component.html',
  styleUrls: ['./parts-inventory-container.component.scss']
})
export class PartsInventoryContainerComponent implements OnInit {
  private subs = new SubSink();
  partsInventory$: Observable<PartsStockItem[]>;
  parts_master_id: number;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      this.parts_master_id = +params['id'];
      if(!!this.parts_master_id) {
        this.store.dispatch(new PartsStockLoadAction(this.parts_master_id))
      }
      else {
        this.store.dispatch(new PartsStockLoadAction())
      }
    }));

    this.partsInventory$ = this.store.select(state => state.asset_inventory.partsStockList);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Transactions(data: PartsTransactionsFilter) {
    this.router.navigate(["asset-inventory","parts-transactions"], {queryParams: {
      parts_master_id: data.parts_master_id,
      region_id: data.region_id,
      store_type: data.store_type,
      store_id: data.store_id,
      status: data.status
    }});
  }

  AddPartsStock() {
    if(!!this.parts_master_id) {
      this.router.navigate(["asset-inventory","parts-stock-add"], {queryParams: {
        parts_master_id: this.parts_master_id
      }});
    }
    else {
      this.router.navigate(["asset-inventory","parts-stock-add"]);
    }
  }

  AddPartsStockSpecific(data: PartsTransactionsFilter) {
    this.router.navigate(["asset-inventory","parts-stock-add"], {queryParams: {
      parts_master_id: data.parts_master_id,
      region_id: data.region_id,
      store_type: data.store_type,
      store_id: data.store_id,
      status: data.status
    }});
  }
}
