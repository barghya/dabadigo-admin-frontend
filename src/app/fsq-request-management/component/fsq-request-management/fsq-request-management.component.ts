import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { FSQDetails, ApproveRequestFSQ } from 'src/app/models/fsqManagement';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-fsq-request-management',
  templateUrl: './fsq-request-management.component.html',
  styleUrls: ['./fsq-request-management.component.scss']
})
export class FsqRequestManagementComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['firstname', 'lastname', 'contact_phone', 'email_id', 'hub_city','updated_on', 'hub_name', 'user_status_name', 'action'];
  dataSource: MatTableDataSource<FSQDetails>;
  @Input() fsqdetails$: Observable<FSQDetails[]>
  @Output() verify = new EventEmitter();
  @Output() ActiveEvent = new EventEmitter<number>();
  @Output() InactiveEvent= new EventEmitter<number>();
  @Output() shiftManagementEvent = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private subs = new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.fsqdetails$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<FSQDetails>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }
  verifyDocument(admn_user_id: number){
    this.verify.emit(admn_user_id);
    console.log(admn_user_id);
    
  }
  ManageShift(){
    this.shiftManagementEvent.emit();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  Inactive(data: number){
    this.InactiveEvent.emit(data);
  }
  Active(data: number){
    this.ActiveEvent.emit(data);
  }
}
