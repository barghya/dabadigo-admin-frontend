import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { PartsMasterLoadAction, PartsMasterDeleteAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { PartsMasterItem } from 'src/app/models/asset-inventoryModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts-master-main-container',
  templateUrl: './parts-master-main-container.component.html',
  styleUrls: ['./parts-master-main-container.component.scss']
})
export class PartsMasterMainContainerComponent implements OnInit {

  partsMasterList$: Observable<PartsMasterItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new PartsMasterLoadAction());
    this.partsMasterList$ = this.store.select(state => state.asset_inventory.partsMasterList);
  }

  AddPartsMaster() {
    this.router.navigate(["asset-inventory", "parts-master-modify"]);
  }

  EditPartsMaster(parts_master_id: number) {
    this.router.navigate(["asset-inventory", "parts-master-modify"], { queryParams: { id: parts_master_id } });
  }
  
  DeletePartsMaster(parts_master_id: number) {
    this.store.dispatch(new PartsMasterDeleteAction(parts_master_id));
  }

  PartsInventory(parts_master_id?: number) {
    if(!!parts_master_id) {
      this.router.navigate(["asset-inventory", "parts-inventory"], { queryParams: { id: parts_master_id } });
    }
    else {
      this.router.navigate(["asset-inventory", "parts-inventory"]);
    }
  }

}
