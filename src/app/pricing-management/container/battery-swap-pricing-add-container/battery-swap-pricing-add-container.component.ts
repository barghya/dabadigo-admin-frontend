import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { AddBatterySwapPricingAction, AddBatterySwapPricingLoadAction } from 'src/app/store/actions/pricing_management.action';

@Component({
  selector: 'app-battery-swap-pricing-add-container',
  templateUrl: './battery-swap-pricing-add-container.component.html',
  styleUrls: ['./battery-swap-pricing-add-container.component.scss']
})
export class BatterySwapPricingAddContainerComponent implements OnInit {

  vehicleTypes$: Observable<DomainData[]>;
  regions$: Observable<RegionItem[]>;
  priceTabletype$: Observable<DomainData[]>;
  corporate$: Observable<CorporateManagement[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddBatterySwapPricingLoadAction());
    this.vehicleTypes$ = this.store.select(state => state.pricing_management.VehicleTypesList);
    this.regions$ = this.store.select(state => state.pricing_management.RegionList);
    this.priceTabletype$ = this.store.select(state => state.pricing_management.PricingTypeList);
    this.corporate$ = this.store.select(state => state.pricing_management.corporate);
    console.log(this.priceTabletype$);
    console.log(this.regions$);
  }

  AddPricing(data: BatteryswapPricingItem) {
    console.log(data);
    this.store.dispatch(new AddBatterySwapPricingAction(data));
  }

  CancelAdd() {
    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
  }

}
