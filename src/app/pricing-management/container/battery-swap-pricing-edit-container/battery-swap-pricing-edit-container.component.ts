import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EditBatterySwapPricingLoadAction, EditBatterySwapPricingAction } from 'src/app/store/actions/pricing_management.action';

@Component({
  selector: 'app-battery-swap-pricing-edit-container',
  templateUrl: './battery-swap-pricing-edit-container.component.html',
  styleUrls: ['./battery-swap-pricing-edit-container.component.scss']
})
export class BatterySwapPricingEditContainerComponent implements OnInit {
  pricingItem$: Observable<BatteryswapPricingItem>;
  vehicleTypes$: Observable<DomainData[]>;
  regions$: Observable<RegionItem[]>;
  corporate$: Observable<CorporateManagement[]>;
  priceTabletype$: Observable<DomainData[]>;
  subs = new SubSink();

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var batteryswap_price_table_id = +params['id'];
      this.store.dispatch(new EditBatterySwapPricingLoadAction(batteryswap_price_table_id));
    }));

    this.regions$ = this.store.select(state => state.pricing_management.RegionList);
    this.vehicleTypes$ = this.store.select(state => state.pricing_management.VehicleTypesList);
    this.pricingItem$ = this.store.select(state => state.pricing_management.SinglebatteryswapPricing);
    this.priceTabletype$ = this.store.select(state => state.pricing_management.PricingTypeList);
    this.corporate$ = this.store.select(state => state.pricing_management.corporate);
  }
  Update(data: BatteryswapPricingItem) {
    this.store.dispatch(new EditBatterySwapPricingAction(data));
  }

  CancelUpdate() {
    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
