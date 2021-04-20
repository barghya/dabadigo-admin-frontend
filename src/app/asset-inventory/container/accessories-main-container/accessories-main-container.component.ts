import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { accessory } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AccessoriesListLoadAction } from 'src/app/store/actions/asset_inventory.action';

@Component({
  selector: 'app-accessories-main-container',
  templateUrl: './accessories-main-container.component.html',
  styleUrls: ['./accessories-main-container.component.scss']
})
export class AccessoriesMainContainerComponent implements OnInit {

  accessories$: Observable<accessory[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AccessoriesListLoadAction());
    this.accessories$ = this.store.select(state => state.asset_inventory.Accessory);
    // console.log(this.accessories);
  }

  AddAccessories() {
    console.log("event fired");
  }

}
