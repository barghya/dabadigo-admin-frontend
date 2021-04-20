import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { TripDetailsAction } from 'src/app/store/actions/trip_management.action';
import { Observable } from 'rxjs';
import { singleTripDetails, tripAssociationID } from 'src/app/models/tripManagementModel';

@Component({
  selector: 'app-trip-details-container',
  templateUrl: './trip-details-container.component.html',
  styleUrls: ['./trip-details-container.component.scss']
})
export class TripDetailsContainerComponent implements OnInit, OnDestroy {
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
