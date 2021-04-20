import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { customerDetails, ActiveInactiveRequest } from 'src/app/models/customerManagementModel';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss']
})
export class CustomerMainComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = [
    'first_name', 
    'last_name', 
    'phone_no', 
    'email_id',
    'email_verify_status_name', 
    'corporate_enabled_name',
    'dpin_status_name',
    'kyc_status_name',
    'status_name',
    'current_state',
    'action'];
  dataSource: MatTableDataSource<customerDetails>;
  dataSourceWithInactiveCustomer: MatTableDataSource<customerDetails>;
  dataSourceWithoutInactiveCustomer: MatTableDataSource<customerDetails>;
  @Input() customerDetails$: Observable<customerDetails[]>
  @Output() Active = new EventEmitter<ActiveInactiveRequest>();
  @Output() Inactive = new EventEmitter<ActiveInactiveRequest>();
  @Output() ViewDetail = new EventEmitter<number>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private subs = new SubSink();
  constructor(public languageService: LanguageService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.customerDetails$.subscribe(
      (data) => {
        console.log(data);
        var reducedData = data.filter(m => m.status != 2);
        this.dataSourceWithInactiveCustomer = new MatTableDataSource<customerDetails>(data);
        this.dataSourceWithoutInactiveCustomer = new MatTableDataSource<customerDetails>(reducedData);
        this.dataSource = this.dataSourceWithoutInactiveCustomer;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  active(customer_id: number) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      (admn_user_id) => {
        this.Active.emit({ customer_id: customer_id, admn_user_id: admn_user_id });
      }
    );
  }
  inactive(customer_id: number) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      (admn_user_id) => {
        this.Inactive.emit({ customer_id: customer_id, admn_user_id: admn_user_id });
      }
    );
  }
  Includeinactive(checked: boolean){
    if (checked) {
      this.dataSource = this.dataSourceWithInactiveCustomer;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
    else {
      this.dataSource = this.dataSourceWithoutInactiveCustomer;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }
  viewDetail(customer_id: number) {
    this.ViewDetail.emit(customer_id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
