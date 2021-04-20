import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { moreActionDetail, TripStart, PauseResumeService, SlotBookingService, EndTripService, TripCancel, cancelSlot } from 'src/app/models/iotControllereModel';
import { MoreActionDetailAction, StartTripAction, PauseTripAction, ResumeTripAction, EndTripAction, CancelTripAction, CancelSlotAction } from 'src/app/store/actions/iot_controller.action';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SlotBookingPopoverContainerComponent } from '../slot-booking-popover-container/slot-booking-popover-container.component';

@Component({
  selector: 'app-more-action-details-container',
  templateUrl: './more-action-details-container.component.html',
  styleUrls: ['./more-action-details-container.component.scss']
})
export class MoreActionDetailsContainerComponent implements OnInit {
  trip_uuid: string;
  viewDialog: MatDialogRef<SlotBookingPopoverContainerComponent>;
  moreActionDetails$: Observable<moreActionDetail>;
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe(
      param => {
        this.trip_uuid = param['id'];
      }
    )
  }

  ngOnInit() {
    this.store.dispatch(new MoreActionDetailAction({ trip_uuid: this.trip_uuid }));
    this.moreActionDetails$ = this.store.select(state => state.iot_bypass.MoreActionDetail);

  }

  tripcancel(data: TripCancel) {
    this.store.dispatch(new CancelTripAction(data));
    console.log(data);
  }

  tripstarted(data: TripStart) {
    this.store.dispatch(new StartTripAction(data));
    console.log(data);
  }

  pauseRide(data: PauseResumeService) {
    this.store.dispatch(new PauseTripAction(data));
    console.log(data);
  }

  resumeRide(data: PauseResumeService) {
    this.store.dispatch(new ResumeTripAction(data));
    console.log(data);
  }

  bookslot(data: SlotBookingService) {
    this.viewDialog = this.dialog.open(SlotBookingPopoverContainerComponent, {
      data: {

        trip_uuid: this.trip_uuid,
        customer_id: data.customer_id,
        vehicle_id: data.vehicle_id

      },
      disableClose: true,
      width: "90%",
    });
  }

  cancelslot(data:cancelSlot){
    this.store.dispatch(new CancelSlotAction(data));
    console.log(data);
  }

  Endtrip(data: EndTripService) {
    this.store.dispatch(new EndTripAction(data));
    console.log(data);
  }

}
