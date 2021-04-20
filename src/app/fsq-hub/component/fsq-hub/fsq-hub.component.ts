import { Component, OnInit, EventEmitter, Output, ViewChild, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-fsq-hub',
  templateUrl: './fsq-hub.component.html',
  styleUrls: ['./fsq-hub.component.scss']
})
export class FsqHubComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["hub_short_code", "hub_name", "address", "state_name", "country_name", "city_name", "status_name", "action",];
  @Output() addFsqHub = new EventEmitter();
  @Output() editFsqHub = new EventEmitter();
  @Input() fsqhubdetails$: Observable<FSQHubDetails[]>
  dataSource: MatTableDataSource<FSQHubDetails>;
  dataSourceWithoutInactive: MatTableDataSource<FSQHubDetails>;
  dataSourceWithInactive: MatTableDataSource<FSQHubDetails>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private subs = new SubSink();

  constructor(public languageService: LanguageService, ) { }

  ngOnInit() {
    this.subs.add(this.fsqhubdetails$.subscribe(
      (data) => {
        if (!!data) {
          var reducedData = data.filter(m => m.hub_status != 0)
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<FSQHubDetails>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<FSQHubDetails>(reducedData);
          this.dataSource = this.dataSourceWithoutInactive;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ));
  }
  addFSQHUB() {
    this.addFsqHub.emit();
  }
  editFSQHub(hub_id: number) {
    this.editFsqHub.emit(hub_id);
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
