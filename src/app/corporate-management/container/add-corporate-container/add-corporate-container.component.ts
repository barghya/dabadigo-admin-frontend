import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { AddCorporateLoadAction, AddCorporateAction, AddAnotherCorporateAction } from 'src/app/store/actions/corporate_management.action';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-add-corporate-container',
  templateUrl: './add-corporate-container.component.html',
  styleUrls: ['./add-corporate-container.component.scss']
})
export class AddCorporateContainerComponent implements OnInit {
  partnerType$ : Observable<DomainData[]>
  partnerCategory$: Observable<DomainData[]>
  countries$: Observable<countries[]>;
  corporateSize$: Observable<DomainData[]>;
  corporateContract$: Observable<DomainData[]>;
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;
  billing$: Observable<DomainData[]>;
  paymentTerm$: Observable<DomainData[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddCorporateLoadAction());
    this.partnerType$ = this.store.select(state => state.corporate_management.partner_type);
    this.partnerCategory$ = this.store.select(state => state.corporate_management.partner_category);
    this.countries$ = this.store.select(state => state.corporate_management.countries);
    this.corporateSize$ = this.store.select(state => state.corporate_management.corporate_size);
    this.corporateContract$ = this.store.select(state => state.corporate_management.corporate_contract);
    this.billing$ = this.store.select(state => state.corporate_management.billing_type);
    this.statesName$ = this.store.select(state => state.corporate_management.States);
    this.paymentTerm$ = this.store.select( state => state.corporate_management.payment_term );
    this.cities$ = this.store.select(state => state.corporate_management.cities);
  }

  corporateform(value: CorporateManagement) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        value.updated_by = admn_user_id
        this.store.dispatch(new AddCorporateAction(value));
      }
    )
  }

  addanotherCorporateevent(value: CorporateManagement) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        value.updated_by = admn_user_id
        this.store.dispatch(new AddAnotherCorporateAction(value))
      }
    )
  }

  cancelcorporate() {
    this.router.navigate(['corporate-management', 'corporate-management-main'])
  }
  
}
