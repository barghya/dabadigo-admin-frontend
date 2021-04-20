import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { GetRentalPointHistoryAction, AddBatteryRPAction, RemoveBatteryRPAction } from 'src/app/store/actions/rental_point.action';
import { SubSink } from 'subsink';
import { GetFranchiseRentalPointHistoryAction } from 'src/app/store/actions/franchise_management.action';
import { RentalPoint, AvailableBattery, RpId } from 'src/app/models/franchiseRentalPointModel';

@Component({
  selector: 'app-franchise-rental-point-details-container',
  templateUrl: './franchise-rental-point-details-container.component.html',
  styleUrls: ['./franchise-rental-point-details-container.component.scss']
})
export class FranchiseRentalPointDetailsContainerComponent implements OnInit {
  rentalpoint_history$: Observable<RentalPoint>;
  available_battery$: Observable<AvailableBattery[]>;
  rp_id: number;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rp_id = +params['id'];
      var data:RpId = {
        rentalpoint_id: this.rp_id
      }
      this.store.dispatch(new GetFranchiseRentalPointHistoryAction(data));
    });
    this.rentalpoint_history$ = this.store.select(state => state.franchisee_rental_point.rentalPointHistory);
    this.available_battery$ = this.store.select(state=> state.rental_point.available_battery);
  }
  cancelEvent(){
    this.router.navigate(['franchise-rental-point', 'franchise-rental-point-main']);
  }
  removeBatteryEvent(battery_id) {

  }
  AddBatteryEvent(bettery_id) {
    
  }
}
