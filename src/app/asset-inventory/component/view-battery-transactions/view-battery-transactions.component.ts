import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { battery, BatteryTransactions } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-battery-transactions',
  templateUrl: './view-battery-transactions.component.html',
  styleUrls: ['./view-battery-transactions.component.scss']
})
export class ViewBatteryTransactionsComponent implements OnInit, OnDestroy {

  @Input() singleBattery: battery;
  @Input() batteryTransactions$: Observable<BatteryTransactions[]>;

  @Output() cancelEvent = new EventEmitter();

  dataSource: MatTableDataSource<BatteryTransactions>;
  displayedColumns: string[] = ['assignemnt_type', 'assignee', 'effective_start_date', 'effective_end_date', 'stock_status_name'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subs = new SubSink();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.batteryTransactions$.subscribe(
      data => {
        if(!!data) {
          this.dataSource = new MatTableDataSource<BatteryTransactions>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ))
  }

  cancel() {
    this.cancelEvent.emit();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}