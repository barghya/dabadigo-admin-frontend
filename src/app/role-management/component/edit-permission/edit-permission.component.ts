import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PermissionDetails,  Rolepermission, Unusedcontrolelement, domainData, permission } from 'src/app/models/roleManagementModel';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {
  dataSource: MatTableDataSource<Rolepermission>;
  displayedColumns: string[] = ["control_element_name","permission", "action"];
  private subs = new SubSink();
  @Input() ActivePermission$: Observable<PermissionDetails>;
  AddPermissionForm: FormGroup;
  @Input() Permissions$: Observable<DomainData[]>;
  filteredelement$: Observable<Unusedcontrolelement[]>;
  filteredPermissionsList$: Observable<Rolepermission[]>;
  unusedpermissionDetailList:Unusedcontrolelement[]= [];
  permissionDetailList: Rolepermission[] = [];
  // controlElement:permission []= [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() cancelEdit = new EventEmitter();
  @Output() updatePermission = new EventEmitter<PermissionDetails>();
  
  constructor(public languageService: LanguageService, private fb: FormBuilder, public store: Store<AppState>) { }

  ngOnInit() {
    this.AddPermissionForm = this.fb.group({
      unused_control: ["", [Validators.required]],
      permission_type: ["", [Validators.required]]
    })
    this.subs.add(this.ActivePermission$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.permissionDetailList = JSON.parse(JSON.stringify(data.role_permission));
          this.unusedpermissionDetailList = JSON.parse(JSON.stringify(data.unused_control_elements.filter(
            permission => permission.control_element_id != 17
          )));
          this.dataSource = new MatTableDataSource(this.permissionDetailList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
 
        }
      }
    ))
  }

  Delete(control_element_id:number){
    this.unusedpermissionDetailList.push(this.permissionDetailList.find(m=>m.control_element_id == control_element_id))
    this.permissionDetailList = this.permissionDetailList.filter(m=>m.control_element_id != control_element_id)
    this.dataSource = new MatTableDataSource<Rolepermission>(this.permissionDetailList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
  }

  Save(){
    this.store.select(state => state.role_management.permissionDetails).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        if(!!data) {
          var emittedvalue: PermissionDetails = {
            admn_role_id: data.admn_role_id,
            role_permission: this.permissionDetailList,
            unused_control_elements: this.unusedpermissionDetailList
           
          }
          this.updatePermission.emit(emittedvalue);
          console.log(emittedvalue);
        }
      }
    )
  }

  Cancel(){
    this.cancelEdit.emit();
  }

  Add(){
   
    var control_element_id = +this.AddPermissionForm.controls.unused_control.value;
    console.log("control_element_id:",control_element_id);

    var control_element_name = this.unusedpermissionDetailList.find(m=>m.control_element_id == control_element_id).control_element_name;
    console.log("control_element_name:",control_element_name);
    var permission_type = +this.AddPermissionForm.controls.permission_type.value;
    console.log("permission_code:", permission_type);

  
    this.Permissions$.pipe(take(1)).subscribe(
      permissions => {
        
        var selected = permissions.find(m => m.domain_code == permission_type);
        console.log("selectedPermission", selected);
       
        this.permissionDetailList.push({
          
          permission_code: permission_type,
          control_element_id: control_element_id,
          control_element_name:control_element_name,
          permission: selected.domain_value
         
        })
        this.unusedpermissionDetailList = this.unusedpermissionDetailList.filter(m=> m.control_element_id != control_element_id)
        console.log(permissions);
        console.log(this.permissionDetailList);
        this.dataSource = new MatTableDataSource<Rolepermission>(this.permissionDetailList);
        this.AddPermissionForm.reset();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )
  }

}
