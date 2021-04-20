import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { couponManagement, singleCoupon } from 'src/app/models/couponManagementModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-coupon-management-main',
  templateUrl: './coupon-management-main.component.html',
  styleUrls: ['./coupon-management-main.component.scss']
})
export class CouponManagementMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'coupon_code', 
    'coupon_name', 
    'coupon_type', 
    'usage_restriction', 
    'value', 
    'time', 
    'countries_name',
    'states_name',
    'city_name',
    'start_date', 
    'end_date', 
    'status_name', 
    'action'
  ];
  dataSource: MatTableDataSource<couponManagement>;
  dataSourceWithoutUnusedCoupon: MatTableDataSource<couponManagement>;
  dataSourceWithUnusedCoupon: MatTableDataSource<couponManagement>;
  @Output() openAdd = new EventEmitter();
  @Output() editCouponEvent = new EventEmitter();
  @Output() deleteCouponEvent = new EventEmitter<singleCoupon>();
  @Output() assignCouponEvent = new EventEmitter<number>();
  @Output() usageHistory = new EventEmitter<number>();
  @Input() couponManagement$ : Observable<couponManagement[]>;
  @Input() pageSizeOptions: number[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public subs = new SubSink();
  checked = false;
  color = "primary";
  couponData:couponManagement[];
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.couponManagement$.subscribe(
      (data) => {
        if (!!data){
        var reducedData = data.filter(m => m.status == 1)
        console.log(reducedData);
        this.dataSourceWithUnusedCoupon = new MatTableDataSource<couponManagement>(data);
        this.dataSourceWithoutUnusedCoupon = new MatTableDataSource<couponManagement>(reducedData);
        this.dataSource = this.dataSourceWithoutUnusedCoupon ;
        // this.couponData=data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
      }
    ));
  }

  OpenAdd() {
    this.openAdd.emit();
  }

  editCoupon(coupon_id: number) {
    this.editCouponEvent.emit(coupon_id);
  }

  deleteCoupon(coupon_id: number) {
    var data: singleCoupon = {
      coupon_id: coupon_id
    }
    this.deleteCouponEvent.emit(data);
  }

  assignCoupon(coupon_id: number) {
    this.assignCouponEvent.emit(coupon_id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  UsageHistory(coupon_id: number) {
    this.usageHistory.emit(coupon_id);
  }

  // changed(value: boolean) {
  //   this.checked = value;
  //   if (value) {
  //     this.dataSource.data=this.couponData.filter(element=>element.status==1)
  //   }
  //   else if(!value) {
  //     this.dataSource.data=this.couponData
  //   }
  // }

  ShowUsedUnusedCoupon(checked: boolean){
    if (checked) {
      this.dataSource = this.dataSourceWithUnusedCoupon;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
    else {
      this.dataSource = this.dataSourceWithoutUnusedCoupon;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
