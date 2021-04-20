import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PricingManagementLoadAction, DeletePricingAction, DeleteBatterySwapPricingAction } from 'src/app/store/actions/pricing_management.action';
import { Observable } from 'rxjs';
import { PricingItem, BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { RegionItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-pricing-main-container',
  templateUrl: './pricing-main-container.component.html',
  styleUrls: ['./pricing-main-container.component.scss']
})
export class PricingMainContainerComponent implements OnInit {
  pricingList$: Observable<PricingItem[]>;
  batteryswappricingList$:  Observable<BatteryswapPricingItem[]>; 
  vehicleTypes$: Observable<DomainData[]>;
  regions$: Observable<RegionItem[]>;
 
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new PricingManagementLoadAction());
    this.pricingList$ = this.store.select(state => state.pricing_management.PricingList);
    this.batteryswappricingList$ = this.store.select(state => state.pricing_management.BatterySwapPricingList);
    this.vehicleTypes$ = this.store.select(state => state.pricing_management.VehicleTypesList);
    this.regions$ = this.store.select(state => state.pricing_management.RegionList);
  }

  addPricing() {
    this.router.navigate(["pricing-management", "pricing-add"]);
  }

  addBatterySwapPricing(){
    this.router.navigate(["pricing-management", "battery-swap-pricing-add"]);
  }

  editPricing(price_table_id: number) {
    this.router.navigate(["pricing-management", "pricing-edit", price_table_id]);
  }

  editbatteryswapPricing(batteryswap_price_table_id: number){
    this.router.navigate(["pricing-management", "battery-swap-pricing-edit", batteryswap_price_table_id]);
  }

  deletePricing(price_table_id: number) {
    this.store.dispatch(new DeletePricingAction(price_table_id));
  }

  deletebatteryswapPricing(batteryswap_price_table_id: number){
    this.store.dispatch(new DeleteBatterySwapPricingAction(batteryswap_price_table_id));
  }

}
