import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { RentalPoint, SlotPoint, SlotBookingService } from 'src/app/models/iotControllereModel';
import { rentalPointDetails } from 'src/app/models/tripManagementModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SlotBookingPopoverContainerComponent } from '../../container/slot-booking-popover-container/slot-booking-popover-container.component';

@Component({
  selector: 'app-slot-booking-popover',
  templateUrl: './slot-booking-popover.component.html',
  styleUrls: ['./slot-booking-popover.component.scss']
})
export class SlotBookingPopoverComponent implements OnInit {
  bookingslotForm: FormGroup;
  @Input() rentalPoint$: Observable<SlotPoint[]>;
  @Output() bookSlotEvent = new EventEmitter();
  @Output() Canceloption = new EventEmitter();
  @Output() slotBookingRequest = new EventEmitter();
  @Output() rentalPointData = new EventEmitter<RentalPoint>();
  tripUuid: string;
  customerId: number;
  latitude: number;
  longitude: number;
  vehicleId: number

  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, public dialogRef: MatDialogRef<SlotBookingPopoverContainerComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.tripUuid = data.trip_uuid;
    this.customerId = data.customer_id;
    this.vehicleId = data.vehicle_id
  }

  ngOnInit() {
    this.bookingslotForm = this.formbuilder.group({
      rentalpoint_id: ['', [Validators.required]],
    })


  }
  CancelOperation() {
    this.Canceloption.emit();
  }

  bookSlot() {
    var formdata: SlotBookingService = {
      rentalpoint_id: this.bookingslotForm.value.rentalpoint_id,
      customer_id: this.customerId,
      vehicle_id: this.vehicleId,
      trip_uuid: this.tripUuid

    }
    console.log(formdata);
    this.slotBookingRequest.emit(formdata);
    // this.dialogRef.close(formdata);
  }


}
