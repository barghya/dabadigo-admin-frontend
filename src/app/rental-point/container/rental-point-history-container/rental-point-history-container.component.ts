import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RentalPoint, RpId, RentalPoint2, AvailableBattery } from 'src/app/models/rentalPoint';
import { GetRentalPointHistoryAction, AddBatteryRPAction, RemoveBatteryRPAction } from 'src/app/store/actions/rental_point.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-rental-point-history-container',
  templateUrl: './rental-point-history-container.component.html',
  styleUrls: ['./rental-point-history-container.component.scss']
})
export class RentalPointHistoryContainerComponent implements OnInit, OnDestroy {

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
      this.store.dispatch(new GetRentalPointHistoryAction(data));
    });
    this.rentalpoint_history$ = this.store.select(state => state.rental_point.rentalPointHistory);
    this.available_battery$ = this.store.select(state=> state.rental_point.available_battery);
  }
  
  cancelEvent(){
    this.router.navigate(['rental-point', 'rental-point-main']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  AddBatteryEvent(id: number){
    this.store.dispatch(new AddBatteryRPAction({rentalpoint_id: this.rp_id,vehicle_battery_id: id}));
  }
  removeBatteryEvent(data: number){
    this.store.dispatch(new RemoveBatteryRPAction({rentalpoint_id: this.rp_id,stock_id: data}))
  }

}
