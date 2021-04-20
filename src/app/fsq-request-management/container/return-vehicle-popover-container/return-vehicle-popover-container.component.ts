import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { GetReturnRegionAction, GetReturnRPAction, FSQReturnVehicleAction } from 'src/app/store/actions/fsq_management.action';
import { Observable } from 'rxjs';
import { ReturnRegion, ReturnRP, FsqReturnVehicleService } from 'src/app/models/fsqManagement';

@Component({
  selector: 'app-return-vehicle-popover-container',
  templateUrl: './return-vehicle-popover-container.component.html',
  styleUrls: ['./return-vehicle-popover-container.component.scss']
})
export class ReturnVehiclePopoverContainerComponent implements OnInit {
  Region$ : Observable<ReturnRegion[]>;
  RentalPoint$ : Observable<ReturnRP[]>;
  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ReturnVehiclePopoverContainerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() { 
    this.store.dispatch(new GetReturnRegionAction({region_id: this.data.region_id}));
    this.Region$=this.store.select(state=> state.fsq_management.Return_region);
    this.RentalPoint$= this.store.select(state=> state.fsq_management.Return_RP);
  }
  CancelOption(){
    this.dialogRef.close();
  }
  GetRpEvent(data: number){
    this.store.dispatch(new GetReturnRPAction({region_id: data}));
  }
  returnVehicleEvent(id: number){
    this.dialogRef.close();
    var sendData: FsqReturnVehicleService ={
            fsq_vehicle_association_id: this.data.fsq_vehicle_association_id,
            fsq_shift_management_id: this.data.fsq_shift_management_id,
            rentalpoint_id: id
          }
    this.store.dispatch(new FSQReturnVehicleAction(sendData));
    console.log(sendData);
  }
}
