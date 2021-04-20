import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionMainDetails } from 'src/app/models/iotControllereModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { ActionMainListLoadAction } from 'src/app/store/actions/iot_controller.action';

@Component({
  selector: 'app-action-main-container',
  templateUrl: './action-main-container.component.html',
  styleUrls: ['./action-main-container.component.scss']
})
export class ActionMainContainerComponent implements OnInit {
  AllactiveTripList$: Observable<ActionMainDetails[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new ActionMainListLoadAction());
    this.AllactiveTripList$ = this.store.select(state => state.iot_bypass.actionMainDetails);
    console.log(this.AllactiveTripList$);
  }

  MoreAction(trip_uuid: string){
    this.router.navigate(['iot-controller-bypass', 'more-action-details', trip_uuid]);
  }

}
