import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { rentalPointDetails, rentalPoint, endTrip } from 'src/app/models/tripManagementModel';
import { TripManagementService } from 'src/app/service/trip-management/trip-management.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-end-trip',
  templateUrl: './end-trip.component.html',
  styleUrls: ['./end-trip.component.scss']
})
export class EndTripComponent implements OnInit {
  endtripForm: FormGroup;
  @Output() submitEvent = new EventEmitter();
  @Input() rentalPoint$: Observable<rentalPointDetails[]>;
  tripUuid: string;
  customerId: number;
  vehicleId: number;
  latitude: number;
  longitude: number;
  value: number;
  @Output() rentalPointData = new EventEmitter<rentalPoint>();
  private subs = new SubSink();
  constructor(public languageService: LanguageService,private tripManagementService: TripManagementService, private formbuilder: FormBuilder, public dialogRef: MatDialogRef<EndTripComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) { 
    this.tripUuid = data.trip_uuid;
    this.customerId = data.customer_id;
    this.vehicleId = data.vehicle_id;
  }

  ngOnInit() {
    this.endtripForm = this.formbuilder.group({
      rentalpoint_id: ['', [Validators.required]],
    })
    
    this.subs.add(this.tripManagementService.getLatLon({trip_uuid:this.tripUuid}).subscribe(
      (data) => {
        console.log(data);
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.rentalPointData.emit(data);

      },
      (error) => { console.log(error) }
    ));
    console.log(this.tripUuid);
    console.log(this.customerId);
  }

  CancelOperation(){
    this.dialogRef.close();
  }

  Submit(){
    var formdata: endTrip = {
      trip_uuid:this.tripUuid,
      customer_id:this.customerId,
      latitude: this.latitude,
      longitude: this.longitude,
      rentalpoint_id:this.endtripForm.value.rentalpoint_id,
    }
    console.log(formdata);
    this.submitEvent.emit(formdata);
    this.dialogRef.close(formdata);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
