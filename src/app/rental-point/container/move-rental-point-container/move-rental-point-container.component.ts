import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { GetRp, RpId, AvailableFranchise } from 'src/app/models/rentalPoint';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditRentalPointLoadAction, MoveRentalPointAction } from 'src/app/store/actions/rental_point.action';
import { countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers } from 'src/app/models/fsqhubModel';

@Component({
  selector: 'app-move-rental-point-container',
  templateUrl: './move-rental-point-container.component.html',
  styleUrls: ['./move-rental-point-container.component.scss']
})
export class MoveRentalPointContainerComponent implements OnInit, OnDestroy {

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

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

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

  moveRentalPoint(value: GetRp) {
    console.log('move rp container:  ', value);
    this.store.dispatch(new MoveRentalPointAction(value));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
