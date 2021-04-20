import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { Observable, Subject } from 'rxjs';
import { moreActionDetail, TripStart, PauseResumeService, SlotBookingService, EndTripService, TripCancel, cancelSlot, LoaderState } from 'src/app/models/iotControllereModel';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';


@Component({
  selector: 'app-more-action-details',
  templateUrl: './more-action-details.component.html',
  styleUrls: ['./more-action-details.component.scss']
})
export class MoreActionDetailsComponent implements OnInit, OnDestroy {
  @Input() moreActionDetails$: Observable<moreActionDetail>;
  Details: moreActionDetail;
  subs = new SubSink();
  // @Input() loading$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  //  @Input() loading$: Observable<boolean>;
  loading: boolean = false;
  @Output() cancelslot = new EventEmitter();
  @Output() tripcancel = new EventEmitter();
  @Output() tripstarted = new EventEmitter();
  @Output() pauseRide = new EventEmitter();
  @Output() resumeRide = new EventEmitter();
  @Output() bookslot = new EventEmitter();
  @Output() Endtrip = new EventEmitter();
  showPin: Boolean = false;
  // private loaderSubject = new Subject<LoaderState>();
  // loaderState = this.loaderSubject.asObservable();
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 10000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  constructor(public languageService: LanguageService, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.subs.add(this.moreActionDetails$.subscribe(
      data => {
        if (!!data) {
          console.log(data);
          this.Details = data
        }
      }
    ))
  }

  // show() {
  //   this.loaderSubject.next(<LoaderState>{ show: true });
  // }
  // hide() {
  //   this.loaderSubject.next(<LoaderState>{ show: false });
  // }

  ShowHideButton() {
    this.showPin = true;

    setTimeout(() => {
      this.showPin = false;
    }, 5000)
  }

  Tripcancel() {
    var data: TripCancel = {
      customer_id: this.Details.customer_id,
      vehicle_id: this.Details.vehicle_id,
      trip_uuid: this.Details.trip_uuid,
      admin_flag: 1
    }
    this.tripcancel.emit(data);
  }

  TripStart() {
    var data: TripStart = {
      dpin: this.Details.customer_booking_pin,
      customer_id: this.Details.customer_id,
      trip_uuid: this.Details.trip_uuid,
      admin_flag: 1
    }
    this.loading = true;
    this.tripstarted.emit(data);
  }


  TripPause() {
    var data: PauseResumeService = {
      trip_uuid: this.Details.trip_uuid,
      latitude: null,
      longitude: null,
      bluetooth_success: false,
      customer_id: this.Details.customer_id,
      admin_flag: 1
    }
    this.pauseRide.emit(data);
  }

  TripResume() {
    var data: PauseResumeService = {
      trip_uuid: this.Details.trip_uuid,
      latitude: null,
      longitude: null,
      bluetooth_success: false,
      customer_id: this.Details.customer_id,
      admin_flag: 1
    }
    this.resumeRide.emit(data);
  }

  BookSlot() {
    if (this.Details.trip_status == 3) {
      this.snackBar.openFromComponent(ShowMessageComponent, {
        duration: 10000,
        data: {
          trip_uuid: this.Details.trip_uuid,
          customer_id: this.Details.customer_id,
          admin_flag: 1,
          rentalpoint_id: this.Details.token_rentalpoint_id,
          vehicle_id: this.Details.vehicle_id
        }
        // ...this.configSuccess
      });
    }

    else {
      var data: SlotBookingService = {
        trip_uuid: this.Details.trip_uuid,
        customer_id: this.Details.customer_id,
        admin_flag: 1,
        rentalpoint_id: this.Details.token_rentalpoint_id,
        vehicle_id: this.Details.vehicle_id
      }
      this.bookslot.emit(data);
    }

  }

  CancelSlot() {
    var data: cancelSlot = {
      customer_id: this.Details.customer_id,
      trip_uuid: this.Details.trip_uuid,
      admin_flag: 1
    }
    this.cancelslot.emit(data);
  }

  EndTrip() {
    var data: EndTripService = {
      customer_id: this.Details.customer_id,
      trip_uuid: this.Details.trip_uuid,
      rentalpoint_id: this.Details.token_rentalpoint_id,
      latitude: null,
      longitude: null,
      token: this.Details.token_id,
      admin_flag: 1,
    }
    this.loading = true;
    this.Endtrip.emit(data);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
