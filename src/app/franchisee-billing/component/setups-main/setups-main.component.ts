import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FranchiseeSetUps } from 'src/app/models/franchiseeBillingModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-setups-main',
  templateUrl: './setups-main.component.html',
  styleUrls: ['./setups-main.component.scss']
})
export class SetupsMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['partner_name', 'payment_start_date', 'action']
  dataSource: MatTableDataSource<FranchiseeSetUps>;

  @Output() setupBillEvent = new EventEmitter();
  @Output() getSingleFranchiseePaymentsEvent = new EventEmitter<number>();
  @Output() getAllPaymentsEvent = new EventEmitter();

  @Input() franchisee$: Observable<FranchiseeSetUps[]>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private subs = new SubSink();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.franchisee$.subscribe(
      data => {
        if(!!data) {
          this.dataSource = new MatTableDataSource<FranchiseeSetUps>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ))
  }

  addBillSetup() {
    this.setupBillEvent.emit();
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase();
    console.log(filtervalue);
  }

  getAllPayments() {
    this.getAllPaymentsEvent.emit();
  }

  viewBills(admn_partner_id: number) {
    console.log(admn_partner_id);
    this.getSingleFranchiseePaymentsEvent.emit(admn_partner_id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}