import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { userRole } from 'src/app/models/roleManagementModel';

@Component({
  selector: 'app-role-management-main',
  templateUrl: './role-management-main.component.html',
  styleUrls: ['./role-management-main.component.scss']
})
export class RoleManagementMainComponent implements OnInit {
  dataSource: MatTableDataSource<userRole>;
  displayedColumns: string[] = ["role_name","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() AlluserRoleList$: Observable<userRole[]>;
  @Output() addRole = new EventEmitter();
  @Output() editrole = new EventEmitter<number>();
  @Output() editpermission = new EventEmitter<number>();
  private subs =  new SubSink();
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.AlluserRoleList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<userRole>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )); 

  }

  AddRole(){
    this.addRole.emit();
  }

  editRole(value:number){
    this.editrole.emit(value);
  }
  editPermission(value:number){
    this.editpermission.emit(value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(filterValue);
  }

}
