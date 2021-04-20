import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
// import { GetTokenAction } from 'src/app/store/actions/mapmy_india.action';
// import { LatLng } from 'src/app/models/mapMyIndiaModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
//import { SendengRp } from 'src/app/models/rentalPoint';
import { AddRentalPointAction, AddAnotherRentalPoint, AddRentalPointLoadAction } from 'src/app/store/actions/rental_point.action';
import { RentalPoint, RentalPoint2, AvailableFranchise } from 'src/app/models/rentalPoint';
import { countries } from 'src/app/models/asset-inventoryModel';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers } from 'src/app/models/fsqhubModel';
@Component({
  selector: 'app-add-rental-point-container',
  templateUrl: './add-rental-point-container.component.html',
  styleUrls: ['./add-rental-point-container.component.scss']
})
export class AddRentalPointContainerComponent implements OnInit {

  rentalPointType$: Observable<DomainData[]>;
  ownerShipcode$: Observable<DomainData[]>;
  rentalPointStatus$: Observable<DomainData[]>;
  countries$: Observable<countries[]>;
  regions$: Observable<RegionItem[]>;
  availableManagers$: Observable<managers[]>; 
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;
  franchise$: Observable<AvailableFranchise[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AddRentalPointLoadAction());
    this.rentalPointType$ = this.store.select(state => state.rental_point.rentalpoint_type);
    this.ownerShipcode$ = this.store.select(state => state.rental_point.ownership_code);
    this.rentalPointStatus$ = this.store.select(state => state.rental_point.rentalpoint_status);
    this.countries$ = this.store.select(state => state.rental_point.countries);
    this.regions$ = this.store.select(state => state.rental_point.regionitem);
    this.availableManagers$ = this.store.select(state => state.rental_point.availableManagers);
    this.statesName$ = this.store.select(state => state.rental_point.States);
    this.cities$ = this.store.select(state => state.rental_point.cities);
    this.franchise$ = this.store.select(state => state.rental_point.franchise);
    //console.log('add rentalpoint oninit',this.rentalPointStatus$, this.rentalPointType$,this.ownerShipcode$);
  }


  // getGeocoding(value: LatLng) {
  //   var data: LatLng = {
  //     latitude: +value.latitude,
  //     longitude: +value.longitude
  //   }
  //   this.store.dispatch(new ReverseGeocodingLoadAction(data));
  // }

  addRentalpoint(data: RentalPoint2) {
    this.store.dispatch(new AddRentalPointAction(data));
  }

  addAnotherRentalPoint(value: RentalPoint2) {
    this.store.dispatch(new AddAnotherRentalPoint(value));
  }

}
