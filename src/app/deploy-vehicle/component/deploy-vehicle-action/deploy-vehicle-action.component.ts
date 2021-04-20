import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { DeployRequestVehicle, VehicleDetails, DeployRequestVehicleInDetail, deploymentRequestID, drlineitems } from 'src/app/models/deployVehicleModel';
import { SubSink } from 'subsink';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-deploy-vehicle-action',
  templateUrl: './deploy-vehicle-action.component.html',
  styleUrls: ['./deploy-vehicle-action.component.scss']
})
export class DeployVehicleActionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'vehicle_idnumber', 'manufacturer', 'model', 'manufacture_date', 'warranty_expiry', 'warranty_terms', 'QRCode', 'vehicle_type_name', 'vehicle_current_status_name','deployed_on'];
  DataSource: MatTableDataSource<VehicleDetails>;

  @Output() cancelDeployRequestVehicle = new EventEmitter;
  @Output() requestDeployVehicle = new EventEmitter();

  @Input() getVehicle$: Observable<DeployRequestVehicleInDetail>;

  selectedDeployRequestVehicle: drlineitems[] = [];
  requestDeployVehicleList: drlineitems[] = []
  deployVehicleList: any[] = []
  deployment_request_id: number;
  dataSource: any;

  private subs = new SubSink();
  
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    console.log(this.getVehicle$);
    this.subs.add(this.getVehicle$.subscribe(
      (data) => {
        this.dataSource = data;
        this.DataSource = new MatTableDataSource<VehicleDetails>(data.drlineitems);
        console.log('From Component action', data);
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  RequestDeployVehicle(deployRequestVehicle: VehicleDetails, value: any) {
    if (value) {
      this.selectedDeployRequestVehicle.push({
        vehicle: deployRequestVehicle.vehicle_id
      });
    }
    else {
      this.selectedDeployRequestVehicle = this.selectedDeployRequestVehicle.filter(m => m.vehicle != deployRequestVehicle.vehicle_id);
    }
    console.log(this.selectedDeployRequestVehicle);
  }
  DeployVehicle() {
    var Data: DeployRequestVehicle = {
      deployment_request_id: this.dataSource.deployment_request_id,
      drlineitems: this.selectedDeployRequestVehicle
    }
    this.requestDeployVehicle.emit(Data)
    console.log(Data);
  }

  cancel(){
    this.cancelDeployRequestVehicle.emit()
  }
}
