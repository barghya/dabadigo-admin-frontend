import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditRentalPointLoadAction, EditRentalPointAction } from 'src/app/store/actions/rental_point.action';
import { RpId, RentalPoint, GetRp, AvailableFranchise } from 'src/app/models/rentalPoint';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers } from 'src/app/models/fsqhubModel';

@Component({
  selector: 'app-edit-rental-point-container',
  templateUrl: './edit-rental-point-container.component.html',
  styleUrls: ['./edit-rental-point-container.component.scss']
})
export class EditRentalPointContainerComponent implements OnInit, OnDestroy {

  rentalPointType$: Observable<DomainData[]>;
  ownerShipcode$: Observable<DomainData[]>;
  rentalPointStatus$: Observable<DomainData[]>;
  singleRentalpoint$: Observable<GetRp>;
  countries$: Observable<countries[]>;
  regions$: Observable<RegionItem[]>;
  availableManagers$: Observable<managers[]>; 
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;
  franchise$: Observable<AvailableFranchise[]>;
  subs = new SubSink();

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var rp_id = +params['id'];
      var data:RpId = {
        rentalpoint_id: rp_id
      }
      this.store.dispatch(new EditRentalPointLoadAction(data));
    }));
    this.rentalPointType$ = this.store.select(state => state.rental_point.rentalpoint_type);
    this.ownerShipcode$ = this.store.select(state => state.rental_point.ownership_code);
    this.rentalPointStatus$ = this.store.select(state => state.rental_point.rentalpoint_status);
    this.singleRentalpoint$ = this.store.select(state => state.rental_point.singleRentalPoint);
    this.countries$ = this.store.select(state => state.rental_point.countries);
    this.regions$ = this.store.select(state => state.rental_point.regionitem);
    this.availableManagers$ = this.store.select(state => state.rental_point.availableManagers);
    this.statesName$ = this.store.select(state => state.rental_point.States);
    this.cities$ = this.store.select(state => state.rental_point.cities);
    this.franchise$ = this.store.select(state => state.rental_point.franchise);
  }

  editRentalPont(value: GetRp) {
    console.log('edit container:', value);
    this.store.dispatch(new EditRentalPointAction(value));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
