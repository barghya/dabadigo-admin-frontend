import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Rentalpointdet, RentalPoint, RentalPoint2, ParkedVehicleDetails, AvailableBattery, AddedBatteries, Vehicleinout } from 'src/app/models/rentalPoint';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rental-point-history',
  templateUrl: './rental-point-history.component.html',
  styleUrls: ['./rental-point-history.component.scss']
})
export class RentalPointHistoryComponent implements OnInit, OnDestroy {

  historydisplayedColumns: string[] = [ 'address', 'countries_name','states_name', 'city_name', 'pin',  'commissioning_date', 'max_capacity', 'available_capacity'];
  batterydisplayedColumns: string[] = [ 'battery_tag', 'battery_model', 'battery_make', 'battery_manufacturing_date','effective_start_date', 'battery_power', 'battery_state_name', 'stock_status_name'];
  parkedVehicledisplayedColumns: string[] = [ 'vehicle_idnumber','vehicle_type_name','manufacturer', 'model', 'QRCode', 'manufacture_date', 'warranty_expiry', 'warranty_terms', 'vehicle_status_name'];
  VehicleInOutdisplayedColumns: string[] = ['trip_ref_no','vehicle_idnumber','vehicle_in_out','model','in_out_time','franchise_shared_amount','vehicle_type_name'];
  rentalpointdatasource: MatTableDataSource  <Rentalpointdet>;
  batterydatasource: MatTableDataSource  <AddedBatteries>;
  vehicleinoutdatasource:MatTableDataSource  <Vehicleinout>;
  rentalPointParkedVehicleDetailsdatasource: MatTableDataSource  <ParkedVehicleDetails>;
  rentalpoint: RentalPoint
  AddBatteryForm: FormGroup;
  dateFilter: FormGroup;
  @ViewChild("rentalPointHistorypaginator", {static: true}) rentalPointHistorypaginator: MatPaginator;
  @ViewChild("rentalPointHistorysort", {static: true}) rentalPointHistorysort: MatSort;
  @ViewChild("rentalPointParkedVehicleDetailspaginator", {static: true}) rentalPointParkedVehicleDetailspaginator: MatPaginator;
  @ViewChild("rentalPointParkedVehicleDetailssort", {static: true}) rentalPointParkedVehicleDetailssort: MatSort;
  @ViewChild("batteryDetailspaginator", {static: true}) batteryDetailspaginator: MatPaginator;
  @ViewChild("batteryDetailssort", {static: true}) batteryDetailssort: MatSort;
  @ViewChild("vehicleInOutpaginator", {static: true}) vehicleInOutpaginator: MatPaginator;
  @ViewChild("vehicleInOutsort", {static: true}) vehicleInOutsort: MatSort;
  Allvehicleinout: Vehicleinout[];
  @Input() rentalpoint_history$: Observable<RentalPoint>;
  @Input() available_battery$: Observable<AvailableBattery[]>;
  @Output() cancelEvent = new EventEmitter();
  @Output() AddBatteryEvent = new EventEmitter<number>();
  @Output() removeBatteryEvent = new EventEmitter<number>();  
  subs = new SubSink();
  
  constructor(public languageService: LanguageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.AddBatteryForm = this.fb.group({
      vehicle_battery_id: ["", [Validators.required]]
    });
    this.dateFilter = this.fb.group({
      filterStartTime: [null],
      filterEndTime:[null]
    })
    this.subs.add(this.rentalpoint_history$.subscribe(
      (data) => {
        if(!!data){
        this.rentalpointdatasource = new MatTableDataSource(data.rentalpoint_det);
        this.rentalpointdatasource.paginator = this.rentalPointHistorypaginator;
        this.rentalpointdatasource.sort = this.rentalPointHistorysort;
        this.rentalPointParkedVehicleDetailsdatasource = new MatTableDataSource(data.parked_vehicle_details);
        this.rentalPointParkedVehicleDetailsdatasource.paginator = this.rentalPointParkedVehicleDetailspaginator;
        this.rentalPointParkedVehicleDetailsdatasource.sort = this.rentalPointParkedVehicleDetailssort;
        this.batterydatasource = new MatTableDataSource(data.batteries);
        this.batterydatasource.paginator = this.batteryDetailspaginator;
        this.batterydatasource.sort= this.batteryDetailssort;
        this.vehicleinoutdatasource = new MatTableDataSource(data.vehicle_in_out);
        this.vehicleinoutdatasource.paginator = this.vehicleInOutpaginator;
        this.vehicleinoutdatasource.sort= this.vehicleInOutsort;
        this.Allvehicleinout = data.vehicle_in_out;
        console.log(data);
        this.rentalpoint = data;
        }
      }
    ));

  }
  displayBattery(batteryId?: number): string | undefined {
    var battery: AvailableBattery = !!batteryId && !!this.available_battery$ ? this.showBattery(batteryId) : undefined;
    return battery ? battery.battery_make + " (" + battery.battery_model + ")" : undefined;
  }
  showBattery(batteryId?: number): AvailableBattery {
    var battery: AvailableBattery = {}
    this.available_battery$.pipe(take(1)).subscribe(
      data => {
        battery = data.find(m => m.vehicle_battery_id == batteryId)
      }
    );
    return battery;
  }
  // applyFilter(value: string) {
  //   this.datasource.filter = value.trim().toLowerCase();
  //   if (this.datasource.paginator) {
  //     this.datasource.paginator.firstPage();
  //   }
  // }
  filterDate(){
    if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value == null){
      this.vehicleinoutdatasource.data=this.Allvehicleinout.filter(m=> (new Date(m.in_out_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value == null && this.dateFilter.controls['filterEndTime'].value != null){
      this.vehicleinoutdatasource.data= this.Allvehicleinout.filter(m=>(new Date(m.in_out_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value != null){
      this.vehicleinoutdatasource.data= this.Allvehicleinout.filter(m=> ((new Date(m.in_out_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()))
     && ((new Date(m.in_out_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime())))
    }else{
      this.vehicleinoutdatasource.data= this.Allvehicleinout;
    }
  }
  cancelHistory(){
    this.cancelEvent.emit()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  addBattery(){
    this.AddBatteryEvent.emit(+this.AddBatteryForm.controls['vehicle_battery_id'].value)
  }
  removeBattery(data: number){
    this.removeBatteryEvent.emit(data)
  }
}
