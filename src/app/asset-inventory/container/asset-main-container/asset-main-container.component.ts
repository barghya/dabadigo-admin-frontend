import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { AssetListLoadAction} from 'src/app/store/actions/asset_inventory.action';
import { Assets, assetID } from 'src/app/models/asset-inventoryModel';
import { Router } from '@angular/router';
import { DomainData } from 'src/app/models/domainModel';
import { AvailableFranchise } from 'src/app/models/rentalPoint';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Component({
  selector: 'app-asset-main-container',
  templateUrl: './asset-main-container.component.html',
  styleUrls: ['./asset-main-container.component.scss']
})
export class AssetMainContainerComponent implements OnInit {
  assets$: Observable<Assets[]>
  ownership_types$: Observable<DomainData[]>;
  franchise$: Observable<AvailableFranchise[]>
  
  constructor(private store: Store<AppState>, private router: Router, private rentalpointService: RentalPointService) { }

  ngOnInit() {
    this.store.dispatch(new AssetListLoadAction());
    this.assets$ = this.store.select(state => state.asset_inventory.Assets);
    this.ownership_types$ = this.store.select(state => state.asset_inventory.Ownership_Types);
    this.franchise$= this.rentalpointService.GetavailableFranchise();
  }

  addAssets(){
    console.log("event fired");  
    this.router.navigate(["asset-inventory", "add-asset"]);
  }

  editAssets(vehicle_id: number){
    this.router.navigate(["asset-inventory", "edit-asset", vehicle_id]);
  }

  ViewAseet(vehicle_id: number) {
    this.router.navigate(["dashboard", "asset-details", vehicle_id]);
  } 

  PartsDefinitions() {
    this.router.navigate(["asset-inventory", "parts-definition"]);
  }
}
