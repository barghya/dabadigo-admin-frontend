import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FranchiseePayments, FranchiseeBillsFilterPayload } from 'src/app/models/franchiseeBillingModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { GetFranchiseePaymentsLoadAction, FranchiseePaymentsFilterAction } from 'src/app/store/actions/franchisee_billing.action';

@Component({
  selector: 'app-franchise-bills-main-container',
  templateUrl: './franchise-bills-main-container.component.html',
  styleUrls: ['./franchise-bills-main-container.component.scss']
})
export class FranchiseBillsMainContainerComponent implements OnInit {

  payments$: Observable<FranchiseePayments[]>;
  countries$: Observable<countries[]>;
  states$: Observable<states[]>;
  cities$: Observable<CityItem[]>;
  paymentStatusList$: Observable<DomainData[]>;

  private subs = new SubSink();

  constructor( private router: Router, private store: Store<AppState>, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subs.add(this.store.select(state => state.profile_management.singleProfile).subscribe(
      data => {
        if(!!data) {
          var franchise_id = data.corporate_id;
          var filteredData: FranchiseeBillsFilterPayload = {
            city: null,
            country: null,
            franchise_id: franchise_id,
            start_date: null,
            end_date: null,
            state: null,
            status: null,
            days_pending: null,
          }
        this.store.dispatch(new GetFranchiseePaymentsLoadAction(filteredData));
      }
    }));
    this.payments$ = this.store.select( state => state.franchisee_billing.payments );
    this.countries$ = this.store.select( state => state.franchisee_billing.countries );
    this.states$ = this.store.select( state => state.franchisee_billing.states );
    this.cities$ = this.store.select( state => state.franchisee_billing.cities );
    this.paymentStatusList$ = this.store.select( state => state.franchisee_billing.paymentStatusList );
  }

  viewBillsDetails(franchise_payment_id: number) {
    if(!!franchise_payment_id) {
      console.log(franchise_payment_id);
      this.router.navigate(['franchisee-bills', 'franchise-payment-details', franchise_payment_id]);
    }
  }

  filterBills(data: FranchiseeBillsFilterPayload) {
    this.store.dispatch(new FranchiseePaymentsFilterAction(data));
  }

}