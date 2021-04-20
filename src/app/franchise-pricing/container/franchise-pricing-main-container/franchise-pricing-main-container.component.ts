import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FranchisePricingItem } from 'src/app/models/franchisePricingModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { FranchisePricingLoadAction } from 'src/app/store/actions/franchise_pricing.action';

@Component({
  selector: 'app-franchise-pricing-main-container',
  templateUrl: './franchise-pricing-main-container.component.html',
  styleUrls: ['./franchise-pricing-main-container.component.scss']
})
export class FranchisePricingMainContainerComponent implements OnInit {
  franchisepricingList$: Observable<FranchisePricingItem[]>;
  regions$: Observable<RegionItem[]>;
 
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new FranchisePricingLoadAction());
    this.franchisepricingList$ = this.store.select(state => state.franchise_pricing.franchisePricingList);
    this.regions$ = this.store.select(state => state.franchise_pricing.RegionList);
  }

  addPricing() {
    this.router.navigate(["franchise-pricing", "franchise-pricing-add"]);
  }

  editPricing(franchise_price_table_id: number) {
    this.router.navigate(["franchise-pricing", "franchise-pricing-edit", franchise_price_table_id]);
  }

  deletePricing(franchise_price_table_id: number) {
    // this.store.dispatch(new DeletePricingAction(franchise_price_table_id));
  }

}
