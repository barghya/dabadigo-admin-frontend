import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FranchiseePayments, FranchiseeBillsFilterPayload } from 'src/app/models/franchiseeBillingModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Component({
  selector: 'app-franchise-bills-main',
  templateUrl: './franchise-bills-main.component.html',
  styleUrls: ['./franchise-bills-main.component.scss']
})
export class FranchiseBillsMainComponent implements OnInit {

  displayedColumns: string[] = [
    'corporate_name',
    'total_adjusted_amount', 
    'job_run_date',
    'status_name', 
    'action'
  ];
  
  dataSource: MatTableDataSource<FranchiseePayments>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  FilterForm: FormGroup;
  minDate: Date = new Date(1, 1, 1);

  @Input() payments$: Observable<FranchiseePayments[]>;
  //@Input() franchiseeSetups$: Observable<Franchisees[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() states$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() paymentStatusList$: Observable<DomainData[]>;

  @Output() filterPayments = new EventEmitter<FranchiseeBillsFilterPayload>();
  @Output() viewPaymentInfoEvent = new EventEmitter<number>();

  subs = new SubSink();
  franchise_id: number;

  constructor( public languageService: LanguageService, private formbuilder: FormBuilder, private store: Store<AppState>,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.FilterForm = this.formbuilder.group({
      status: [null],
      city: [null],
      state: [null],
      country: [null],
      start_date: [null],
      end_date: [null],
      days_pending: [null],
    })

    this.subs.add(this.payments$.subscribe(
      data => {
        if(!!data) {
          this.dataSource = new MatTableDataSource<FranchiseePayments>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ));

    this.subs.add(this.store.select(state => state.profile_management.singleProfile).subscribe(
      data => {
        if(!!data) {
          this.franchise_id = data.corporate_id;
        }
      }
    ))

  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
    console.log(filtervalue);
  }

  billingStartDate() {
    if (this.FilterForm.controls.start_date.value) {
      if (this.FilterForm.controls.end_date.value && 
         (this.FilterForm.controls.start_date.value >= this.FilterForm.controls.end_date.value)) {
          this.FilterForm.controls.end_date.reset();
      }
    }
    var startDate: Date = new Date(this.FilterForm.controls.start_date.value);
    this.minDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1)
  }

  ClearFilter() {
    var patchData = {
      franchise_id: this.franchise_id,
      status: null,
      city: null,
      state: null,
      country: null,
      start_date: null,
      end_date: null,
      days_pending: null,
    }
    this.minDate = new Date(1, 1, 1);
    this.FilterForm.patchValue(patchData);
    this.filterPayments.emit(patchData);
  }

  FilterBills() {
    var startDate = this.FilterForm.controls.start_date.value;
    if(!!startDate) {
      var timeZoneDifference = startDate.getTimezoneOffset() * -1;
      startDate.setTime(startDate.getTime() + timeZoneDifference * 60 * 1000);
      startDate.toISOString()
    }
    var endDate = this.FilterForm.controls.end_date.value;
    if(!!endDate) {
      var timeZoneDifference = endDate.getTimezoneOffset() * -1;
      endDate.setTime(endDate.getTime() + timeZoneDifference * 60 * 1000);
      endDate.toISOString()
    }
    this.filterPayments.emit({
      franchise_id: this.franchise_id,
      status: !!this.FilterForm.controls.status.value ? this.FilterForm.controls.status.value : null,
      city: !!this.FilterForm.controls.city.value ? this.FilterForm.controls.city.value : null,
      state: !!this.FilterForm.controls.state.value ? this.FilterForm.controls.state.value : null,
      country: !!this.FilterForm.controls.country.value ? this.FilterForm.controls.country.value : null,
      start_date: !!startDate ? startDate : null,
      end_date: !!endDate ? endDate : null,
      days_pending: !!this.FilterForm.controls.days_pending.value ? this.FilterForm.controls.days_pending.value : null,
    })
  }

  get status() {
    return this.FilterForm.controls.status.value;
  }

  StatusFilterChange(status: number) {
    if(!!status && status == 3 || status == 4 || status == 0) {
      this.FilterForm.controls.days_pending.setValue(null);
      this.FilterForm.updateValueAndValidity();
    }
  }

  viewBillsDetails(franchise_payment_id: number) {
    this.viewPaymentInfoEvent.emit(franchise_payment_id);
  }

}