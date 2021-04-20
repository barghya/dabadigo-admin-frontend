import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BillsSetupModel } from 'src/app/models/corporateBillingModel';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-bill-setups-main',
  templateUrl: './bill-setups-main.component.html',
  styleUrls: ['./bill-setups-main.component.scss']
})
export class BillSetupsMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['corporate_name', 'legal_entity_name', 'bill_start_date', 'action'];
  dataSource: MatTableDataSource<BillsSetupModel>;
  @Output() setupBillEvent = new EventEmitter();
  @Output() viewBillsEvent = new EventEmitter();
  @Output() viewAllBillsEvent = new EventEmitter();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  @Input() setupBills$: Observable<BillsSetupModel[]>;
  subs = new SubSink();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.setupBills$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.dataSource = new MatTableDataSource<BillsSetupModel>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ));
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
    console.log(filtervalue);
  }

  addBillSetup() {
    this.setupBillEvent.emit();
  }

  viewBills(corporate_id: number) {
    console.log(corporate_id);
    this.viewBillsEvent.emit(corporate_id);
  }

  payBills() {

  }

  getAllBills() {
    this.viewAllBillsEvent.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
