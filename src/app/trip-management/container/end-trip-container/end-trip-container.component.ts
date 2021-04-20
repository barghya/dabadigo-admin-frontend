import { Component, OnInit } from '@angular/core';
import { tripDetail, rentalPointDetails, rentalPoint } from 'src/app/models/tripManagementModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable } from 'rxjs';
import { rentalPointLoadAction, EndTripAction, TripManagementListLoadAction } from 'src/app/store/actions/trip_management.action';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end-trip-container',
  templateUrl: './end-trip-container.component.html',
  styleUrls: ['./end-trip-container.component.scss']
})
export class EndTripContainerComponent implements OnInit {
  rentalPoint$: Observable<rentalPointDetails[]>;
  subs = new SubSink();
  constructor(private store: Store<AppState>,private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  rentalPointData(value: rentalPoint) { 
    console.log("from container", value);
    this.store.dispatch(new rentalPointLoadAction(value));
    this.rentalPoint$ = this.store.select(state => state.trip_management.RentalPointDetails);
    console.log(this.rentalPoint$);
  }

  Submit(value: tripDetail) {
    this.store.dispatch(new EndTripAction(value));
    console.log(value);
  }

}
