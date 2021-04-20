import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tripDetail } from 'src/app/models/tripManagementModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { TripManagementListLoadAction } from 'src/app/store/actions/trip_management.action';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-trip-management-list-main-container',
  templateUrl: './trip-management-list-main-container.component.html',
  styleUrls: ['./trip-management-list-main-container.component.scss']
})
export class TripManagementListMainContainerComponent implements OnInit {
  tripList$: Observable<tripDetail[]>;
  regions$: Observable<RegionItem[]>;
  city$: Observable<CityItem[]>;
  private subs = new SubSink();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    // this.store.dispatch(new TripManagementListLoadAction());
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new TripManagementListLoadAction(admn_user_id));
      }
    )
    this.tripList$ = this.store.select(state => state.trip_management.TripDetail);
    this.regions$ = this.store.select(state => state.trip_management.RegionList);
    this.city$ = this.store.select(state => state.trip_management.CityList);
  }

  TripDetails(customer_trip_association_id: number){
    this.router.navigate(['trip-management', 'trip-details', customer_trip_association_id]);
  }
}
