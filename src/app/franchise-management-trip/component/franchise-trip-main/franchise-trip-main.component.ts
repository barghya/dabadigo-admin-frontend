import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { tripDetail } from 'src/app/models/tripManagementModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-franchise-trip-main',
  templateUrl: './franchise-trip-main.component.html',
  styleUrls: ['./franchise-trip-main.component.scss']
})
export class FranchiseTripMainComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  dataSource: MatTableDataSource<tripDetail>;
  @Input() tripList$: Observable<tripDetail[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() pageSizeOptions: number[];
  @Output() TripDetails = new EventEmitter()
  dataSourceWithoutPastride: MatTableDataSource<tripDetail>;
  dataSourceWithPastride: MatTableDataSource<tripDetail>;
  displayedColumns: string[] = ['trip_ref_no', 'vehicle_idnumber', 'ontrip_start_time', 'end_time', 'total_trip_time', 'Trip_Status_Name','action'];
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.tripList$.subscribe(
      (data) => {
        if(!!data){
         
          console.log(data);
          
          var reducedData = data.filter(m => m.trip_status != 5 && m.trip_status != 6);
          console.log(reducedData);
          this.dataSourceWithPastride = new MatTableDataSource<tripDetail>(data);
          this.dataSourceWithoutPastride = new MatTableDataSource<tripDetail>(reducedData);
          this.dataSource = this.dataSourceWithoutPastride;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  tripDetails(customer_trip_association_id: number){
    this.TripDetails.emit(customer_trip_association_id)
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
