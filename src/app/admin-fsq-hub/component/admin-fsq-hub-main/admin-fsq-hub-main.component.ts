import { Component, OnInit, Input, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-fsq-hub-main',
  templateUrl: './admin-fsq-hub-main.component.html',
  styleUrls: ['./admin-fsq-hub-main.component.scss']
})
export class AdminFsqHubMainComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["hub_short_code","hub_name","address","states_name", "countries_name", "city_name", "active_hub_managers", "status_name", "action"];
  @Input() adminhubDetails$: Observable<FSQHubDetails[]>;
  @Output() EditFSQHub = new EventEmitter<number>();
  dataSource: MatTableDataSource<FSQHubDetails>;
  dataSourceWithoutInactive: MatTableDataSource<FSQHubDetails>;
  dataSourceWithInactive: MatTableDataSource<FSQHubDetails>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subs = new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.adminhubDetails$.subscribe(
      (data) => {
        if (!!data) {
          var reducedData = data.filter(m => m.hub_status !=0)
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<FSQHubDetails>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<FSQHubDetails>(reducedData);
          this.dataSource = this.dataSourceWithoutInactive;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }
  
  ShowHideInactive(checked: boolean) {
    if (checked) {
      this.dataSource = this.dataSourceWithInactive;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
    else {
      this.dataSource = this.dataSourceWithoutInactive;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }

  editFSQHub(value: number) {
    this.EditFSQHub.emit(value);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
