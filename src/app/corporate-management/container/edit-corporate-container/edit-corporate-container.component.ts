import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AdmnPartnerId, CorporateManagement } from 'src/app/models/corporateManagement';
import { EditCorporateLoadAction, EditCorporateAction } from 'src/app/store/actions/corporate_management.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { take } from 'rxjs/operators';
import { states, CityItem } from 'src/app/models/regionManagement';
import { RegionService } from 'src/app/service/region/region.service';

@Component({
  selector: 'app-edit-corporate-container',
  templateUrl: './edit-corporate-container.component.html',
  styleUrls: ['./edit-corporate-container.component.scss']
})
export class EditCorporateContainerComponent implements OnInit, OnDestroy {

  subs = new SubSink();
  partnerType$ : Observable<DomainData[]>
  partnerCategory$: Observable<DomainData[]>
  countries$: Observable<countries[]>;
  corporateSize$: Observable<DomainData[]>;
  corporateContract$: Observable<DomainData[]>;
  billing$: Observable<DomainData[]>;
  statesName$: Observable<states[]>;
  paymentTerm$: Observable<DomainData[]>;
  cities$: Observable<CityItem[]>;
  singleCorporate$: Observable<CorporateManagement>
  constructor(private regionService: RegionService, private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var corporate_id = +params['id'];
      var data: AdmnPartnerId = {
        admn_partner_id: corporate_id
      }
      this.store.dispatch(new EditCorporateLoadAction(data));
    }));
    this.partnerType$ = this.store.select(state => state.corporate_management.partner_type);
    this.partnerCategory$ = this.store.select(state => state.corporate_management.partner_category);
    this.countries$ = this.store.select(state => state.corporate_management.countries);
    this.singleCorporate$ = this.store.select(state => state.corporate_management.singleCorporate);
    this.corporateSize$ = this.store.select(state => state.corporate_management.corporate_size);
    this.corporateContract$ = this.store.select(state => state.corporate_management.corporate_contract);
    this.billing$ = this.store.select(state => state.corporate_management.billing_type);
    this.statesName$ = this.store.select(state => state.corporate_management.States);
    this.paymentTerm$ = this.store.select(state => state.corporate_management.payment_term);
    this.cities$ = this.regionService.getCities();
  
  }

  editCorporatation(value: CorporateManagement) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        value.updated_by = admn_user_id
        this.store.dispatch(new EditCorporateAction(value));
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  cancelcorporate() {
    this.router.navigate(['corporate-management', 'corporate-management-main'])
  }
}
