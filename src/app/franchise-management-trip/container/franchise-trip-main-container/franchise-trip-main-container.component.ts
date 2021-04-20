import { Component, OnInit } from '@angular/core';
import { tripDetail } from 'src/app/models/tripManagementModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { TripManagementListLoadAction } from 'src/app/store/actions/trip_management.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-franchise-trip-main-container',
  templateUrl: './franchise-trip-main-container.component.html',
  styleUrls: ['./franchise-trip-main-container.component.scss']
})
export class FranchiseTripMainContainerComponent implements OnInit {
  tripList$: Observable<tripDetail[]>;
  private subs = new SubSink();
  
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new TripManagementListLoadAction(admn_user_id));
      }
    )
    this.tripList$ = this.store.select(state => state.trip_management.TripDetail);
  }

  TripDetails(customer_trip_association_id: number){
    this.router.navigate(['franchise-management-trip', 'franchise-trip-details', customer_trip_association_id]);
  }
}
