import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { customerKycDetails, ActiveInactiveRequest } from 'src/app/models/customerKycVerificationModel';
import { take } from 'rxjs/operators';
// import { customerDetails, ActiveInactiveRequest } from 'src/app/models/customerManagementModel';

@Component({
  selector: 'app-customer-kyc-verification-main',
  templateUrl: './customer-kyc-verification-main.component.html',
  styleUrls: ['./customer-kyc-verification-main.component.scss']
})
export class CustomerKycVerificationMainComponent implements OnInit, OnDestroy {
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
    private subs = new SubSink();
    dataSource: MatTableDataSource<customerKycDetails>;
    dataSourceWithInactiveCustomer: MatTableDataSource<customerKycDetails>;
    dataSourceWithoutInactiveCustomer: MatTableDataSource<customerKycDetails>;
    @Input() customerDetails$: Observable<customerKycDetails[]>
    @Output() ViewDetail = new EventEmitter<number>();
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public languageService: LanguageService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.customerDetails$.subscribe(
      (data) => {
        console.log(data);
        var reducedData = data.filter(m => m.status != 2);
        this.dataSourceWithInactiveCustomer = new MatTableDataSource<customerKycDetails>(data);
        this.dataSourceWithoutInactiveCustomer = new MatTableDataSource<customerKycDetails>(reducedData);
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
