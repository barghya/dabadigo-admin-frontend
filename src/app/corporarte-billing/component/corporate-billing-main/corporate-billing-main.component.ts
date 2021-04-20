import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatSlideToggleChange, MatPaginator } from '@angular/material';
import { BillsTableModel, BillsSetupModel, CorporateBillsFilterPayload, generatePdfExcelService } from 'src/app/models/corporateBillingModel';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-corporate-billing-main',
  templateUrl: './corporate-billing-main.component.html',
  styleUrls: ['./corporate-billing-main.component.scss']
})
export class CorporateBillingMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'corporate_name',
    'invoice_number',
    'last_bill_amount', 
    'last_payment_received',
    'total_adjusted_amount',
    'due_date', 
    'job_run_date',
    'status_name', 
    'action'
  ];
  dataSource: MatTableDataSource<BillsTableModel>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  @Input() bills$: Observable<BillsTableModel[]>;
  @Input() corporatesSetup$: Observable<BillsSetupModel[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() states$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() billStatusList$: Observable<DomainData[]>;
  @Output() viewBillEvent = new EventEmitter();
  @Output() filterBills = new EventEmitter<CorporateBillsFilterPayload>();
  @Output() generatePDF = new EventEmitter<generatePdfExcelService>();
  @Output() sendEmail = new EventEmitter<number>();
  
  subs = new SubSink();
  corporate_id: number;
  minDate: Date = new Date(1, 1, 1);
  FilterForm: FormGroup;

  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {  
    this.FilterForm = this.formbuilder.group({
      corporate_id: [null],
      status: [null],
      city: [null],
      state: [null],
      country: [null],
      start_date: [null],
      end_date: [null],
      days_pending: [null],
    })

    this.subs.add(this.bills$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.dataSource = new MatTableDataSource<BillsTableModel>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      })
    );

    this.subs.add(this.route.queryParams.subscribe(params => {
      var corporate_id = +params['id'];
      if(!!corporate_id) {
        this.FilterForm.controls.corporate_id.patchValue(corporate_id);
      }
    }));
    this.FilterForm.controls.status.patchValue(1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
    console.log(filtervalue);
  }

  ClearFilter() {
    var patchData = {
      corporate_id: null,
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
    this.filterBills.emit(patchData);
  }

  StatusFilterChange(status: number) {
    if(!!status && status == 3 || status == 4 || status == 0) {
      this.FilterForm.controls.days_pending.setValue(null);
      this.FilterForm.updateValueAndValidity();
    }
  }

  get status() {
    return this.FilterForm.controls.status.value;
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
    this.filterBills.emit({
      corporate_id: !!this.FilterForm.controls.corporate_id.value ? this.FilterForm.controls.corporate_id.value : null,
      status: !!this.FilterForm.controls.status.value ? this.FilterForm.controls.status.value : null,
      city: !!this.FilterForm.controls.city.value ? this.FilterForm.controls.city.value : null,
      state: !!this.FilterForm.controls.state.value ? this.FilterForm.controls.state.value : null,
      country: !!this.FilterForm.controls.country.value ? this.FilterForm.controls.country.value : null,
      start_date: !!startDate ? startDate : null,
      end_date: !!endDate ? endDate : null,
      days_pending: !!this.FilterForm.controls.days_pending.value ? this.FilterForm.controls.days_pending.value : null,
    })
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

  viewBillsDetails(corporate_billing_id: number) {
    this.viewBillEvent.emit(corporate_billing_id);
  }

  GeneratePDF(corporate_billing_id: number) {
    var data: generatePdfExcelService = {
      corporate_billing_id: corporate_billing_id,
      doc_type: "pdf",
    }
    this.generatePDF.emit(data);
  }

  GenerateExcel(corporate_billing_id: number) {
    var data: generatePdfExcelService = {
      corporate_billing_id: corporate_billing_id,
      doc_type: "xls",
    }
    this.generatePDF.emit(data);
  }

  SendEmail(corporate_billing_id: number) {
    this.sendEmail.emit(corporate_billing_id);
  }
}
