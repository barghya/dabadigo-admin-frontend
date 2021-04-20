import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FsqShift, RentalPoint, vehicle, BookVehicleService, ShiftDetails, Job, VehicleDetail } from 'src/app/models/fsqManagement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.scss']
})
export class AssignVehicleComponent implements OnInit, OnDestroy {

  constructor(public languageService: LanguageService, private fb: FormBuilder, private store: Store<AppState>) { }
  @Input() shift: FsqShift;
  @Input() ShiftRegion$: Observable<RentalPoint[]>;
  @Input() vehicle$: Observable<vehicle[]>;
  bookData: BookVehicleService;
  @Input() fsqRegion$: Observable<RegionItem[]>; 
  @Output() cancelbutton = new EventEmitter();
  @Output() startJobEvent = new EventEmitter<Job>();
  @Output() getVehicleEvent = new EventEmitter<number>();
  @Output() getRentalPointEvent = new EventEmitter<number>();
  @Output() SubmitData= new EventEmitter<BookVehicleService>();
  @Output() VehicleReturn = new EventEmitter<VehicleDetail>();
  rentalPointForm: FormGroup;
  shiftDetail: ShiftDetails;
  subs = new SubSink();
  vehicleDisplayedColumns: string[] = ['vehicle_idnumber', 'allocated_by_name', 'allocation_time','vehicle_current_status_name','rentalpoint_name','status_name','Action'];
  jobDisplayedColumns: string[] = ['work_item_ref_no', 'work_item_type_name', 'trip_uuid','job_start_time', 'job_end_time', 'job_status_name', 'action'];
  dataSourceJob: MatTableDataSource<Job>;
  dataSourceVehicle: MatTableDataSource<VehicleDetail>;
  @ViewChild("vehicle",{ static: true }) sort: MatSort;
  @ViewChild("job", { static: true }) pastsort: MatSort;
  @Output() regionSelected = new EventEmitter<number>();
  // @Output() getRegionEvent = new EventEmitter<number>();
  ngOnInit() {
    this.rentalPointForm = this.fb.group({
      region: ['', [Validators.required]],
      rental_point_id: ['', [Validators.required]],
      vehicle: ['', [Validators.required]]
    });
    this.subs.add(this.store.select(state=> state.fsq_management.shift_detail).subscribe(
      data=>{
        console.log(data);
        if(!!data){
          this.shiftDetail= data;
          this.dataSourceVehicle =  new MatTableDataSource(this.shiftDetail.vehicle_details);
          this.dataSourceVehicle.sort = this.sort;
          this.dataSourceJob =  new MatTableDataSource(this.shiftDetail.jobs);
          this.dataSourceVehicle.sort = this.sort;
          // this.getRegion(this.shiftDetail.city_id);
        }
      }
    ))

    this.ShiftRegion$.pipe(take(1)).subscribe(
      data => {
       console.log(data);
      }
    );
    this.fsqRegion$.pipe(take(1)).subscribe(
      data => {
       console.log(data);
      }
    );
    
  }
  // getRegion(value: number){
  //   this.getRegionEvent.emit(value);
  // }
  displayRegion(regionId?: number): string | undefined{
    var region: RegionItem = !!regionId && this.fsqRegion$ ? this.showRegion(regionId) : undefined;
    return region ? region.region_name : undefined;
  }
  showRegion(regionId?: number){
    var region: RegionItem = {}
    this.fsqRegion$.pipe(take(1)).subscribe(
      data=>{
        region = data.find(m=> m.region_id == regionId)
      }
    );
    console.log(region);
    return region;
  }
  
 
  displayRentalPoint(rentalPointId?: number): string | undefined {
    var rentalPoint: RentalPoint = !!rentalPointId && !!this.ShiftRegion$ ? this.showFsq(rentalPointId) : undefined;
    return rentalPoint ? rentalPoint.rentalpoint_name + " (" + rentalPoint.rentalpoint_shortcode + ")" : undefined;
  }
  
  showFsq(fsqRentalPointId?: number): RentalPoint {
    var rentalPoint: RentalPoint = {}
    this.ShiftRegion$.pipe(take(1)).subscribe(
      data => {
        rentalPoint = data.find(m => m.rentalpoint_id == fsqRentalPointId)
      }
    );
    console.log(rentalPoint)
    return rentalPoint;
  }

  displayvehicle(vehicleID?: number): string | undefined {
    var vehicle: vehicle = !!vehicleID && !!this.vehicle$ ? this.showVehicle(vehicleID) : undefined;
    return vehicle ? vehicle.vehicle_idnumber  : undefined;
  }
  showVehicle(vehicleID?: number): RentalPoint {
    var vehicle: vehicle = {}
    this.vehicle$.pipe(take(1)).subscribe(
      data => {
        vehicle = data.find(m => m.vehicle_id == vehicleID)
      }
    );
    return vehicle;
  }
  getVehicle(rentalpoint_id: number){
    this.rentalPointForm.controls['vehicle'].reset();

    this.getVehicleEvent.emit(rentalpoint_id)
  }
  getRentalPoint(region_id:number){
    this.rentalPointForm.controls['rental_point_id'].reset();
    if(!!region_id) {
      this.getRentalPointEvent.emit(region_id);
     
    }
   
    console.log(region_id);
  }
  cancel(){
    this.cancelbutton.emit();
  }
  book(){
    this.bookData={
      region_id: this.rentalPointForm.controls['region'].value,
      rentalpoint_id: this.rentalPointForm.controls['rental_point_id'].value,
      vehicle_id: this.rentalPointForm.controls['vehicle'].value
    }
    this.SubmitData.emit(this.bookData)
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  startJob(element: Job){
    this.startJobEvent.emit(element);
  }
  ReturnVehicle(element: VehicleDetail){
    this.VehicleReturn.emit(element);
  }
}
