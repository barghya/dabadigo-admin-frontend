import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UsageDetails, UsageHistoryItem } from 'src/app/models/couponManagementModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-usage-history',
  templateUrl: './usage-history.component.html',
  styleUrls: ['./usage-history.component.scss']
})
export class UsageHistoryComponent implements OnInit {
  @Input() usageDetail$: Observable<UsageDetails>;
  displayedColumns = [
    "first_name",
    "last_name",
    "phone_no",
    "email_id",
    "trip_ref_no",
    "total_payable",
    "discount",
    "paid_amount"
  ]
  dataSource: MatTableDataSource<UsageHistoryItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subs = new SubSink();
  usageList: UsageHistoryItem[] = [];

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.usageDetail$.subscribe(
      usageData => {
        if(!!usageData) {
          this.usageList = JSON.parse(JSON.stringify(usageData.coupon_usage_history));
          this.dataSource = new MatTableDataSource<UsageHistoryItem>(this.usageList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
