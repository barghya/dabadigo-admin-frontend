import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { VehicleDetails } from 'src/app/models/deployVehicleModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { VehicleDeployListLoadAction } from 'src/app/store/actions/deploy_vehicle.action';

@Component({
  selector: 'app-select-vehicle-popover-container',
  templateUrl: './select-vehicle-popover-container.component.html',
  styleUrls: ['./select-vehicle-popover-container.component.scss']
})
export class SelectVehiclePopoverContainerComponent implements OnInit {
  DeployVehicle$: Observable<VehicleDetails[]>
  constructor( public dialogRef: MatDialogRef<SelectVehiclePopoverContainerComponent>,private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new VehicleDeployListLoadAction());
    this.DeployVehicle$ = this.store.select(state => state.deploy_vehicle.vehicleDetails);
    console.log(this.DeployVehicle$);
  }

}
