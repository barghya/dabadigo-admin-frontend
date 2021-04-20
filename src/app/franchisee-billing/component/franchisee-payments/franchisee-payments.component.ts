import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { CityItem, states } from 'src/app/models/regionManagement';
import { countries } from 'src/app/models/asset-inventoryModel';
import { FranchiseePayments, Franchisees, FranchiseeBillsFilterPayload } from 'src/app/models/franchiseeBillingModel';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-franchisee-payments',
  templateUrl: './franchisee-payments.component.html',
  styleUrls: ['./franchisee-payments.component.scss']
})
export class FranchiseePaymentsComponent implements OnInit {

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
  @Input() franchiseeSetups$: Observable<Franchisees[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() states$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() paymentStatusList$: Observable<DomainData[]>;

  @Output() filterPayments = new EventEmitter<FranchiseeBillsFilterPayload>();
  @Output() viewPaymentInfoEvent = new EventEmitter<number>();
  
  subs = new SubSink();

  constructor(public languageService: LanguageService, private formbuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.FilterForm = this.formbuilder.group({
      franchise_id: [null],
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
          console.log(data);
          this.dataSource = new MatTableDataSource<FranchiseePayments>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ));

    this.subs.add(this.route.queryParams.subscribe(params => {
      var admn_partner_id = +params['id'];
      if(!!admn_partner_id) {
        this.FilterForm.controls.franchise_id.patchValue(admn_partner_id);
      }
    }));
    this.FilterForm.controls.status.patchValue(null);
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

  get status() {
    return this.FilterForm.controls.status.value;
  }

  ClearFilter() {
    var patchData = {
      franchise_id: null,
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
      franchise_id: !!this.FilterForm.controls.franchise_id.value ? this.FilterForm.controls.franchise_id.value : null,
      status: !!this.FilterForm.controls.status.value ? this.FilterForm.controls.status.value : null,
      city: !!this.FilterForm.controls.city.value ? this.FilterForm.controls.city.value : null,
      state: !!this.FilterForm.controls.state.value ? this.FilterForm.controls.state.value : null,
      country: !!this.FilterForm.controls.country.value ? this.FilterForm.controls.country.value : null,
      start_date: !!startDate ? startDate : null,
      end_date: !!endDate ? endDate : null,
      days_pending: !!this.FilterForm.controls.days_pending.value ? this.FilterForm.controls.days_pending.value : null,
    })
  }

  StatusFilterChange(status: number) {
    if(!!status && status == 3 || status == 4 || status == 0) {
      this.FilterForm.controls.days_pending.setValue(null);
      this.FilterForm.updateValueAndValidity();
    }
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
    console.log(filtervalue);
  }

  viewBillsDetails(franchise_payment_id: number) {
    console.log(franchise_payment_id);
    this.viewPaymentInfoEvent.emit(franchise_payment_id);
  }

}