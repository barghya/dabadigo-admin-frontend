import { Component, OnInit, OnDestroy } from '@angular/core';
import { PricingItem } from 'src/app/models/pricingManagement';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditPricingLoadAction, EditPricingAction } from 'src/app/store/actions/pricing_management.action';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { CorporateManagement } from 'src/app/models/corporateManagement';

@Component({
  selector: 'app-pricing-edit-container',
  templateUrl: './pricing-edit-container.component.html',
  styleUrls: ['./pricing-edit-container.component.scss']
})
export class PricingEditContainerComponent implements OnInit, OnDestroy {

  pricingItem$: Observable<PricingItem>;
  vehicleTypes$: Observable<DomainData[]>;
  regions$: Observable<RegionItem[]>;
  corporate$: Observable<CorporateManagement[]>;
  priceTabletype$: Observable<DomainData[]>;
  subs = new SubSink();

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var price_table_id = +params['id'];
      this.store.dispatch(new EditPricingLoadAction(price_table_id));
    }));

    this.regions$ = this.store.select(state => state.pricing_management.RegionList);
    this.vehicleTypes$ = this.store.select(state => state.pricing_management.VehicleTypesList);
    this.pricingItem$ = this.store.select(state => state.pricing_management.SinglePricing);
    this.priceTabletype$ = this.store.select(state => state.pricing_management.PricingTypeList);
    this.corporate$ = this.store.select(state => state.pricing_management.corporate);
  }

  Update(data: PricingItem) {
    this.store.dispatch(new EditPricingAction(data));
  }

  CancelUpdate() {
    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
