import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SlotBookingPopoverContainerComponent } from '../../container/slot-booking-popover-container/slot-booking-popover-container.component';
import { SlotBookingService } from 'src/app/models/iotControllereModel';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  viewDialog: MatDialogRef<SlotBookingPopoverContainerComponent>;
  constructor(public snackBarRef: MatSnackBarRef<ShowMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.data);
  }
  yes() {
    this.viewDialog = this.dialog.open(SlotBookingPopoverContainerComponent, {
      data: {
        trip_uuid: this.data.trip_uuid,
        customer_id: this.data.customer_id,
        vehicle_id: this.data.vehicle_id,
      },
      disableClose: true,
      width: "90%",
    });
    this.snackBarRef.dismiss();
  }
}
