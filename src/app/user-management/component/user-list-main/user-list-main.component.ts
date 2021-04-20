import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { users, userId } from 'src/app/models/userManagement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-user-list-main',
  templateUrl: './user-list-main.component.html',
  styleUrls: ['./user-list-main.component.scss']
})
export class UserListMainComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'contact_phone', 'email_id', 'role_name', 'user_type_name', 'corporate_name', 'user_status_name', 'action']
  dataSource: MatTableDataSource<users>;
  dataSourceWithoutInactive: MatTableDataSource<users>;
  dataSourceWithInactive: MatTableDataSource<users>;
  @Input() admindetails$: Observable<users[]>;
  @Output() openadd = new EventEmitter()
  @Output() edituser = new EventEmitter()
  @Output() deleteuser = new EventEmitter()
  @Output() resetPassword = new EventEmitter()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() pageSizeOptions: number[];
  private subs = new SubSink();
  constructor(private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.admindetails$.subscribe(
      (data) => {
        if (!!data) {
          var reducedData = data.filter(m => m.user_status != 2);
          console.log(reducedData);
          this.dataSourceWithInactive = new MatTableDataSource<users>(data);
          this.dataSourceWithoutInactive = new MatTableDataSource<users>(reducedData);
          this.dataSource = this.dataSourceWithoutInactive;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
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
  ngOnChanges() {
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  OpenAdd() {
    this.openadd.emit();
  }
  editUser(admn_user_id: number) {
    this.edituser.emit(admn_user_id);
  }
  deleteUser(value: number) {
    var data: userId = {
      admn_user_id: value
    }
    this.deleteuser.emit(data);
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

  resetpassword(value: number) {
    var data: userId = {
      admn_user_id: value
    }
    this.resetPassword.emit(data);
  }
}
