import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { adminDevice, DeviceTransactions } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-device-transactions',
  templateUrl: './view-device-transactions.component.html',
  styleUrls: ['./view-device-transactions.component.scss']
})
export class ViewDeviceTransactionsComponent implements OnInit, OnDestroy {

  @Input() singleDevice: adminDevice;
  @Input() deviceTransactions$: Observable<DeviceTransactions[]>;
  
  @Output() cancelEvent = new EventEmitter();

  dataSource: MatTableDataSource<DeviceTransactions>;
  displayedColumns: string[] = ['assignemnt_type', 'assignee', 'effective_start_date', 'effective_end_date', 'stock_status_name'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subs = new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.deviceTransactions$.subscribe(
      data => {
        if(!!data) {
          this.dataSource = new MatTableDataSource<DeviceTransactions>(data);
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