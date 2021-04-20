import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { singleCoupon, couponManagement, CustomerId } from 'src/app/models/couponManagementModel';
import { customerDetails } from 'src/app/models/customerManagementModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap, take, startWith, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { CouponCustomerSearchComponent } from '../../container/coupon-customer-search/coupon-customer-search.component';

@Component({
  selector: 'app-assign-coupon',
  templateUrl: './assign-coupon.component.html',
  styleUrls: ['./assign-coupon.component.scss']
})
export class AssignCouponComponent implements OnInit {
  @Input() singleCoupon$: Observable<couponManagement>;
  @Output() assign = new EventEmitter<couponManagement>();
  @Output() cancel = new EventEmitter();
  displayedColumns = [
    "first_name",
    "last_name",
    "phone_no",
    "email_id",
    "action"
  ]
  dataSource: MatTableDataSource<customerDetails>;
  CustomerForm: FormGroup;
  unusedCustomers: customerDetails[];
  private subs = new SubSink();
  selectedCustomer: customerDetails;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  validCustomer: boolean = true;

  constructor(private fb: FormBuilder, public languageService: LanguageService, public dialog: MatDialog) { }

  ngOnInit() {
    this.CustomerForm = this.fb.group({
      customer_id: [null, [Validators.required]]
    });

    this.CustomerForm.controls.customer_id.disable();

    this.subs.add(this.singleCoupon$.subscribe(
      singleCouponItem => {
        if(!!singleCouponItem) {
          this.unusedCustomers = JSON.parse(JSON.stringify(singleCouponItem.unused_users));
          this.dataSource = new MatTableDataSource<customerDetails>(this.unusedCustomers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))
  }

  deleteCustomer(customer_id: number) {
    this.unusedCustomers.splice(this.unusedCustomers.findIndex(m => m.customer_id == customer_id), 1);
    this.dataSource = new MatTableDataSource<customerDetails>(this.unusedCustomers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  AddSubmit() {
    this.unusedCustomers.push(this.selectedCustomer);
    this.dataSource = new MatTableDataSource<customerDetails>(this.unusedCustomers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.CustomerForm.controls.customer_id.patchValue(null);
    this.selectedCustomer = undefined;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Assign() {
    var unusedCustomerIds = []
    this.unusedCustomers.forEach(customer => {
      unusedCustomerIds.push({
        customer_id: customer.customer_id
      })
    })
    this.singleCoupon$.pipe(take(1)).subscribe(
      coupon => {
        this.assign.emit({
          coupon_id: coupon.coupon_id,
          unused_users: unusedCustomerIds
        })
      }
    );
  }

  Search() {
    var dialogRef = this.dialog.open(
      CouponCustomerSearchComponent,
      {
        width: '90%',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('selected', result);
        this.selectedCustomer = result;
        this.CustomerForm.controls.customer_id.patchValue(
          this.selectedCustomer.first_name + ' ' + 
          this.selectedCustomer.last_name + ' (' +
          this.selectedCustomer.phone_no + ')'
        )
        this.validateCustomer();
      }
    });
  }

  validateCustomer() {
    this.singleCoupon$.pipe(take(1)).subscribe(
      couponData => {
        if(couponData.unused_users.findIndex(m => m.customer_id == this.selectedCustomer.customer_id) == -1 && 
          couponData.used_users.findIndex(m => m.customer_id == this.selectedCustomer.customer_id) == -1) {
          this.validCustomer = true;
        }
        else{
          this.validCustomer = false;
        }
      }
    )
  }

  Cancel() {
    this.cancel.emit();
  }
}
