import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { adminUserID, pendingRequest, ApproveRequestPayload } from 'src/app/models/corporateRequestManagementModel';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-corporate-request-management-main',
  templateUrl: './corporate-request-management-main.component.html',
  styleUrls: ['./corporate-request-management-main.component.scss']
})
export class CorporateRequestManagementMainComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ["first_name","last_name", "phone_no", "status_name", "requested_on", "updated_by", "updated_on", "company_name", "action"]
  dataSource: MatTableDataSource<pendingRequest>;
  @Input() getCorporateRequest$: Observable<pendingRequest[]>;
  @Output() View = new EventEmitter<number>();
  @Output() showHidePastData = new EventEmitter<boolean>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private subs = new SubSink();
  constructor(public languageService: LanguageService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.getCorporateRequest$.subscribe(
      (data) => {
        if(!!data) {
          console.log(data);
          this.dataSource = new MatTableDataSource<pendingRequest>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ));
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  viewCorporate(corporate_customer_id: number){
    this.View.emit(corporate_customer_id);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ShowHidePastData(checked: boolean) {
    this.showHidePastData.emit(checked);
  }
}
