import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { FranchiseeBillsFilterPayload, FranchiseePayments, FranchiseeSetUps } from 'src/app/models/franchiseeBillingModel';
import { GetFranchiseePaymentsLoadAction, FranchiseePaymentsFilterAction } from 'src/app/store/actions/franchisee_billing.action';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-franchisee-payments-container',
  templateUrl: './franchisee-payments-container.component.html',
  styleUrls: ['./franchisee-payments-container.component.scss']
})
export class FranchiseePaymentsContainerComponent implements OnInit {

  payments$: Observable<FranchiseePayments[]>;
  countries$: Observable<countries[]>;
  states$: Observable<states[]>;
  cities$: Observable<CityItem[]>;
  paymentStatusList$: Observable<DomainData[]>;
  franchiseeSetups$: Observable<FranchiseeSetUps[]>;

  private subs = new SubSink();

  constructor( private router: Router, private store: Store<AppState>, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      var admn_partner_id = +params['id'];
      var filteredData: FranchiseeBillsFilterPayload = {
        city: null,
        country: null,
        franchise_id: !!admn_partner_id ? admn_partner_id : null,
        start_date: null,
        end_date: null,
        state: null,
        status: null,
        days_pending: null,
      }
      this.store.dispatch(new GetFranchiseePaymentsLoadAction(filteredData));
    }));
    this.payments$ = this.store.select( state => state.franchisee_billing.payments );
    this.countries$ = this.store.select( state => state.franchisee_billing.countries );
    this.states$ = this.store.select( state => state.franchisee_billing.states );
    this.cities$ = this.store.select( state => state.franchisee_billing.cities );
    this.paymentStatusList$ = this.store.select( state => state.franchisee_billing.paymentStatusList );
    this.franchiseeSetups$ = this.store.select( state => state.franchisee_billing.franchiseeSetUps );
  }

  viewBillsDetails(franchise_payment_id: number) {
    if(!!franchise_payment_id) {
      console.log(franchise_payment_id);
      this.router.navigate(['franchisee-billing', 'view-payment-details', franchise_payment_id]);
    }
  }

  filterBills(data: FranchiseeBillsFilterPayload) {
    console.log(data);
    this.store.dispatch(new FranchiseePaymentsFilterAction(data));
  }

}
