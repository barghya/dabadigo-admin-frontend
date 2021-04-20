import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleCustomerInDetail, TxnDetail, TripDetail, ContactDetail } from 'src/app/models/customerManagementModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  @Input() singleCustomer$: Observable<SingleCustomerInDetail>;
  CustomereDetails: TripDetail[];
  
  dateFilter: FormGroup;
  @ViewChild("tripPaginator", {static: true}) tripPaginator: MatPaginator;
  @ViewChild("tripSort", {static: true}) tripSort: MatSort;
  @ViewChild("txnPaginator", {static: false}) txnPaginator: MatPaginator;
  @ViewChild("txnSort", {static: false}) set content(sort: MatSort) {
    if(!!this.txnDataSource) {
      this.txnDataSource.sort = sort;
    }
  }

  tripDataSource: MatTableDataSource<TripDetail>;
  txnDataSource: MatTableDataSource<TxnDetail>;
  contactDataSource: MatTableDataSource<ContactDetail>;

  tripDisplayedColumns = [
    "trip_ref_no", 
    "vehicle_id",  
    "booking_time", 
    "start_location", 
    "corporate_enabled", 
    "coupon_code", 
    "end_time",
    "end_location", 
    "distance_travelled",
    "riding_time",
    "pause_time",
    "total_trip_time",
    "trip_status"
  ]
  txnDisplayedColumns = [
    "txn_refid",
    "bank_txn_id",
    "gateway_txn_id",
    "txn_status",
    "update_timestamp",
    "txn_amount",
    "transaction_type"
  ]
  contactDisplayedColumns = [
    "contact_name",
    "contact_phone"
  ]
  private subs = new SubSink();

  constructor(private fb: FormBuilder,public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.singleCustomer$.subscribe(
      customer => {
        if(!!customer) {
          this.tripDataSource = new MatTableDataSource(customer.trip_details);
          this.tripDataSource.paginator = this.tripPaginator;
          this.tripDataSource.sort = this.tripSort;
          this.txnDataSource = new MatTableDataSource(customer.txn_details);
          this.txnDataSource.paginator = this.txnPaginator;
          // this.txnDataSource.sort = this.txnSort;
          this.contactDataSource = new MatTableDataSource(customer.contact_details);
          this.CustomereDetails = customer.trip_details;
          console.log(customer);
          console.log(this.CustomereDetails)
        }
      }
    ))
    this.dateFilter = this.fb.group({
      filterStartTime: [null],
      filterEndTime:[null]
    })
  }
 

  applyFilter(filterValue: string) {
    this.tripDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tripDataSource.paginator) {
      this.tripDataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }

  filterDate(){
    console.log('filter');
    console.log(this.dateFilter);
    
    if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value == null){
      this.tripDataSource.data=this.CustomereDetails.filter(m=> (new Date(m.booking_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value == null && this.dateFilter.controls['filterEndTime'].value != null){
      this.tripDataSource.data= this.CustomereDetails.filter(m=>(new Date(m.booking_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value != null){
      this.tripDataSource.data= this.CustomereDetails.filter(m=> ((new Date(m.booking_time).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()))
     && ((new Date(m.booking_time).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime())))
    }
    else{
      this.tripDataSource.data= this.CustomereDetails;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
