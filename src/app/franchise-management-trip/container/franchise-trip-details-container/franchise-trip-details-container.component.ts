import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { singleTripDetails } from 'src/app/models/tripManagementModel';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { TripDetailsAction } from 'src/app/store/actions/trip_management.action';

@Component({
  selector: 'app-franchise-trip-details-container',
  templateUrl: './franchise-trip-details-container.component.html',
  styleUrls: ['./franchise-trip-details-container.component.scss']
})
export class FranchiseTripDetailsContainerComponent implements OnInit, OnDestroy {

  singletripdetails$: Observable<singleTripDetails>;
  private subs = new SubSink();
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var trip_association_id = +params['id'];
      var Start_date = new Date;
      var End_date = new Date;
      this.store.dispatch(new TripDetailsAction({
        customer_trip_association_id: trip_association_id,
        start_date: Start_date,
        end_date: End_date,
      }))
    }));
    this.singletripdetails$ = this.store.select(state => state.trip_management.singletripdetails)
  }

  PreviousData(value:singleTripDetails) {
    this.store.dispatch(new TripDetailsAction(value))
  }

  NextData(value:singleTripDetails){
    this.store.dispatch(new TripDetailsAction(value))
  }

  showdata(value:singleTripDetails){
    this.store.dispatch(new TripDetailsAction(value))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
}
