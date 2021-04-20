import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { RentalPoint, GetRp } from 'src/app/models/franchiseRentalPointModel';



@Component({
  selector: 'app-franchise-rental-point-main',
  templateUrl: './franchise-rental-point-main.component.html',
  styleUrls: ['./franchise-rental-point-main.component.scss']
})
export class FranchiseRentalPointMainComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [ 'rentalpoint_name','region_name','city_name', 'address','opening_hours', 'closing_hours', 'rentalpoint_type_name', 'max_capacity', 'available_capacity', 'rentalpoint_status_name', 'action' ];
  datasource: MatTableDataSource  <GetRp>;
  @Input() rentalpoint_det$: Observable<GetRp[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() RpHistory = new EventEmitter<number>();
  subs = new SubSink();
  totalList: GetRp[];
  constructor(public languageService: LanguageService, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.rentalpoint_det$.subscribe(
      (data) => {
        this.datasource = new MatTableDataSource<GetRp>(data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        console.log(data);
        this.totalList = data;
        console.log(this.totalList);
      }
    ));
  }

  applyFilter(value: string) {
    this.datasource.filter = value.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  rentalPointHistory(id: number) {
    console.log('History Rp: ', id);
    this.RpHistory.emit(id);
  }
}
