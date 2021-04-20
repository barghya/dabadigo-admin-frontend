import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { tripDetail } from 'src/app/models/tripManagementModel';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { EndTripContainerComponent } from '../../container/end-trip-container/end-trip-container.component';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-management-list-main',
  templateUrl: './trip-management-list-main.component.html',
  styleUrls: ['./trip-management-list-main.component.scss']
})
export class TripManagementListMainComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  dataSource: MatTableDataSource<tripDetail>;
  @Input() regions$: Observable<RegionItem[]>;
  @Input() city$: Observable<CityItem[]>;
  @Input() tripList$: Observable<tripDetail[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() pageSizeOptions: number[];
  @Input() submitEvent;
  @Output() TripDetails = new EventEmitter()
  dataSourceWithoutPastride: MatTableDataSource<tripDetail>;
  Tripdetails:tripDetail[];
  dataSourceWithPastride: MatTableDataSource<tripDetail>;
  viewDialog: MatDialogRef<EndTripContainerComponent>;
  dateFilter:FormGroup;
  selectedRegion: number = 0;
  selectedCity: number = 0;
  filteredRegions$: Observable<RegionItem[]>;
  displayedColumns: string[] = ['trip_ref_no','customer_name','phone_no','city_name','region_name','start_location_name','end_location_name', 'vehicle_idnumber','ontrip_start_time', 'end_time',  'company_name','total_trip_time','total_payable', 'Trip_Status_Name','action'];
  constructor(private fb: FormBuilder,public languageService: LanguageService,public dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.tripList$.subscribe(
      (data) => {
        if(!!data){
         
          console.log(data);
          
          var reducedData = data.filter(m => m.trip_status != 5 && m.trip_status != 6);
          
          this.dataSourceWithPastride = new MatTableDataSource<tripDetail>(data);
          this.dataSourceWithoutPastride = new MatTableDataSource<tripDetail>(reducedData);
          this.Tripdetails = data;
          console.log(this.Tripdetails);
          this.dataSource = this.dataSourceWithoutPastride;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
    this.dateFilter = this.fb.group({
      filterStartTime: [null],
      filterEndTime:[null]
    })
  }

  filterDate(){
    console.log('filter');
    console.log(this.dateFilter);
    
    if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value == null){
      this.dataSource.data=this.Tripdetails.filter(m=> (new Date(m.booking_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value == null && this.dateFilter.controls['filterEndTime'].value != null){
      this.dataSource.data= this.Tripdetails.filter(m=>(new Date(m.booking_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value != null){
      this.dataSource.data= this.Tripdetails.filter(m=> ((new Date(m.booking_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()))
     && ((new Date(m.booking_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime())))
    }
    else{
      this.dataSource.data= this.Tripdetails;
    }
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  regionChange(value: number) {
    this.selectedRegion = value;
    this.calculateFilter();
  }
  cityChange(value: number) {
    if (!!value) {
      this.filteredRegions$ = this.regions$.pipe(map(
        regions => regions.filter(m => m.city_id == value)
      ))
    }
    else {
      this.filteredRegions$ = this.regions$;
    }
    this.selectedCity = value;
    this.calculateFilter();
  }

  calculateFilter() {
    if (this.selectedCity == 0 && this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<tripDetail>(this.Tripdetails);
    }
    else if (this.selectedCity == 0) {
      this.dataSource = new MatTableDataSource<tripDetail>(this.Tripdetails.filter(m => m.region == this.selectedRegion));
    }
    else if (this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<tripDetail>(this.Tripdetails.filter(m => m.city_id == this.selectedCity));
    }
    else {
      this.dataSource = new MatTableDataSource<tripDetail>(this.Tripdetails.filter(m => m.city_id == this.selectedCity && m.region == this.selectedRegion));
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ShowHideUnchecked(checked: boolean){
    if(checked) {
      this.dataSource = this.dataSourceWithPastride;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
    else {
      this.dataSource = this.dataSourceWithoutPastride;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }

  endTrip(value: tripDetail){
    console.log(value);
    this.viewDialog = this.dialog.open(EndTripContainerComponent, {
      data: {
        customer_id: value.customer_id,
        trip_uuid: value.trip_uuid,
        vehicle_id: value.vehicle_id,
      },
      disableClose: true,
      width: "30%",
    });

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
  tripDetails(customer_trip_association_id: number){
    this.TripDetails.emit(customer_trip_association_id)
  }
}
