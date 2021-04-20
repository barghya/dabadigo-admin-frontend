import { Component, OnInit, ViewChild, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { ActionMainDetails } from 'src/app/models/iotControllereModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-action-main',
  templateUrl: './action-main.component.html',
  styleUrls: ['./action-main.component.scss']
})
export class ActionMainComponent implements OnInit, OnDestroy  {

  dataSource: MatTableDataSource<ActionMainDetails>;
  displayedColumns: string[] = ["trip_ref_no","trip_status_name","booking_time","vehicle_number","trip_uuid","device_imei","customer_name","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() AllactiveTripList$: Observable<ActionMainDetails[]>;
  @Output() MoreAction = new EventEmitter<string>();
  private subs =  new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {

    this.subs.add(this.AllactiveTripList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<ActionMainDetails>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )); 
  
  }

  moreAction(value:string){
    this.MoreAction.emit(value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
    
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(filterValue);
  }

}
