import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Inject, OnChanges, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { VehicleDetails } from 'src/app/models/deployVehicleModel';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-vehicle-popover',
  templateUrl: './select-vehicle-popover.component.html',
  styleUrls: ['./select-vehicle-popover.component.scss']
})
export class SelectVehiclePopoverComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'vehicle_idnumber', 'manufacturer', 'model', 'manufacture_date', 'warranty_expiry', 'warranty_terms', 'QRCode', 'vehicle_type_name', 'vehicle_current_status_name'];
  dataSource: MatTableDataSource<VehicleDetails>;
  selectedDeployVehicle: VehicleDetails[] = [];
  checkedArray : boolean[] = [];
  id:any;
  vehicleId: any[] = [];
  @Input() DeployVehicle$: Observable<VehicleDetails[]>
  @Input() deployRequestVehicle: Observable<VehicleDetails[]>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() emitSelectVehicle = new EventEmitter<VehicleDetails[]>();
  popupData: VehicleDetails[]
  private subs = new SubSink();
  constructor(private router: Router, public languageService: LanguageService, public dialogRef: MatDialogRef<SelectVehiclePopoverComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) {
    this.popupData = data;
  }

  ngOnInit() {
    console.log(this.DeployVehicle$);
    this.subs.add(this.DeployVehicle$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<VehicleDetails>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (!!this.popupData && !!this.dataSource.data) {
          this.selectedDeployVehicle = this.popupData;
          this.dataSource.data.forEach(
            sourceData => {
              if (this.popupData.findIndex(m => m.vehicle_id === sourceData.vehicle_id) >= 0) {
                this.checkedArray[sourceData.vehicle_id] = true;
              }
              else {
                this.checkedArray[sourceData.vehicle_id] = false;
              }
            }
          )
        }
      }
    ));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }
  CancelOperation() {
      this.dialogRef.close();
  }

  SelectVehicle() {
    this.emitSelectVehicle.emit(this.selectedDeployVehicle);
    this.dialogRef.close(this.selectedDeployVehicle);
  }

  AddToVehicleList(deployVehicle: VehicleDetails, value: any) {
    if(value) {
      this.selectedDeployVehicle.push(deployVehicle);
    
    } 
    else {
      this.selectedDeployVehicle = this.selectedDeployVehicle.filter(m => m.vehicle_id != deployVehicle.vehicle_id);
    }   
    console.log(this.selectedDeployVehicle);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}