import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Referrals } from 'src/app/models/couponManagementModel';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-referral-main',
  templateUrl: './referral-main.component.html',
  styleUrls: ['./referral-main.component.scss']
})
export class ReferralMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'customer',
    'referrer',
    'status_name',
    'updated_on',
    'coupon_code', 
    'coupon_name',
    'coupon_status_name',
    'coupon_start_date',
    'referrer_coupon_code',
    'referrer_coupon_name',
    'referrer_coupon_status_name',
    'referrer_coupon_start_date'
  ];

  @Input() referrals$: Observable<Referrals[]>;

  dataSource: MatTableDataSource<Referrals>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subs = new SubSink();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.referrals$.subscribe(
      data => {
        if(!!data) {
          this.dataSource = new MatTableDataSource<Referrals>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
