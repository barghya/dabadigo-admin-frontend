import { Component, OnInit, Inject } from '@angular/core';
import { RentalPoint, SlotPoint, SlotBookingService } from 'src/app/models/iotControllereModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSlotAction, SlotBookingAction } from 'src/app/store/actions/iot_controller.action';
import { Observable } from 'rxjs';
import { rentalPointDetails } from 'src/app/models/tripManagementModel';
import { TripManagementService } from 'src/app/service/trip-management/trip-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-slot-booking-popover-container',
  templateUrl: './slot-booking-popover-container.component.html',
  styleUrls: ['./slot-booking-popover-container.component.scss']
})
export class SlotBookingPopoverContainerComponent implements OnInit {
  rentalPoint$: Observable<SlotPoint[]>;
  tripUuid: string;
  customerId: number; 
  latitude: number;
  longitude: number;
  vehicleId: number
  private subs = new SubSink();
  constructor(private route: ActivatedRoute,private store: Store<AppState>,private router: Router,private tripManagementService: TripManagementService,public dialogRef: MatDialogRef<SlotBookingPopoverContainerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) {
    this.tripUuid = data.trip_uuid;
    this.customerId = data.customer_id;
    this.vehicleId = data.vehicle_id
  }

  ngOnInit() {

     this.subs.add(this.tripManagementService.getLatLon({trip_uuid:this.tripUuid}).subscribe(
      (data) => {
        console.log(data);
        this.latitude = data.latitude;
        this.longitude = data.longitude;
       console.log(this.customerId);
       
        this.store.dispatch(new GetSlotAction(data));
        
      },
     
    ));


     this.rentalPoint$ = this.store.select(state => state.iot_bypass.SlotPoints);
  }
  
  Canceloption(){
    this.dialogRef.close();
  }

  slotBookingRequest(value: SlotBookingService) {
    this.store.dispatch(new SlotBookingAction(value));
    this.dialogRef.close(value);
    console.log(value);
  }

}
