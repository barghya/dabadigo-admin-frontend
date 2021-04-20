import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { AddPricingLoadAction, AddPricingAction, AddAnotherPricingAction } from 'src/app/store/actions/pricing_management.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { PricingItem } from 'src/app/models/pricingManagement';
import { Router } from '@angular/router';
import { CorporateManagement } from 'src/app/models/corporateManagement';

@Component({
  selector: 'app-pricing-add-container',
  templateUrl: './pricing-add-container.component.html',
  styleUrls: ['./pricing-add-container.component.scss']
})
export class PricingAddContainerComponent implements OnInit {

  vehicleTypes$: Observable<DomainData[]>;
  regions$: Observable<RegionItem[]>;
  priceTabletype$: Observable<DomainData[]>;
  corporate$: Observable<CorporateManagement[]>;
  
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddPricingLoadAction());
    this.vehicleTypes$ = this.store.select(state => state.pricing_management.VehicleTypesList);
    this.regions$ = this.store.select(state => state.pricing_management.RegionList);
    this.priceTabletype$ = this.store.select(state => state.pricing_management.PricingTypeList);
    this.corporate$ = this.store.select(state => state.pricing_management.corporate);
    console.log(this.priceTabletype$);
    console.log(this.regions$);
    
  }

  AddPricing(data: PricingItem) {
    console.log(data);
    this.store.dispatch(new AddPricingAction(data));
  }

  AddAnotherPricing(data: PricingItem) {
    this.store.dispatch(new AddAnotherPricingAction(data));
  }

  CancelAdd() {
    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
  }

}
