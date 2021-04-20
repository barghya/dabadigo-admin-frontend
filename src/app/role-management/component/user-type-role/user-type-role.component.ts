import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatTableDataSource } from '@angular/material';
import { SubSink } from 'subsink';
import { UserType, EditUserType, userRole, userrole, userRoleId } from 'src/app/models/roleManagementModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { take, map } from 'rxjs/operators';
import { userType } from 'src/app/models/userManagement';

@Component({
  selector: 'app-user-type-role',
  templateUrl: './user-type-role.component.html',
  styleUrls: ['./user-type-role.component.scss']
})
export class UserTypeRoleComponent implements OnInit {
  UserTypeForm: FormGroup;
  AddPartsForm: FormGroup;
  @Input() Usertypename$: Observable<DomainData[]>;
  @Input() Usertype$: Observable<UserType>;
  @Output() UserTypenameChangeEvent = new EventEmitter();
  dataSource: MatTableDataSource<userrole>;
  displayedColumns: string[] = ["role_name", "action"];
  private subs = new SubSink();
  admn_role_id:userRoleId[]=[]
  rolesDetailList: userrole[] = [];
  unusedrolesDetailList: userrole[] = [];
  filteredUserList$: Observable<userrole[]>;
  Availableuser: userrole[]=[];
  Filteruser: userrole[]= [];
  @Output() updateuserType = new EventEmitter<UserType>();
  constructor(public languageService: LanguageService, private fb: FormBuilder, public store: Store<AppState> ) { }

  ngOnInit() {
    this.UserTypeForm = this.fb.group({
      user_type_name: ["", [Validators.required]]
    })
    this.AddPartsForm = this.fb.group({
      unused_roles: ["", [Validators.required]]
    })
    this.subs.add(this.Usertype$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.rolesDetailList = JSON.parse(JSON.stringify(data.roles));
          this.unusedrolesDetailList = JSON.parse(JSON.stringify(data.unused_roles.filter(
            role => role.admn_role_id != 8
          )));
          console.log(this.rolesDetailList);
          this.dataSource = new MatTableDataSource(this.rolesDetailList);
          console.log(this.Filteruser);
         
        }
      }
    ))
  }
 
  UserTypeChange(data: EditUserType) {
    this.UserTypenameChangeEvent.emit(data);
  }
  AddPart(){
    var admn_role_id = +this.AddPartsForm.controls.unused_roles.value;
    this.rolesDetailList.push(this.unusedrolesDetailList.find(m=> m.admn_role_id == admn_role_id))
    this.unusedrolesDetailList = this.unusedrolesDetailList.filter(m=> m.admn_role_id != admn_role_id)
    this.dataSource = new MatTableDataSource<userrole>(this.rolesDetailList);
    this.AddPartsForm.reset();

  }
  Save(){
    this.store.select(state => state.role_management.usertype).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        if(!!data) {
          var emittedvalue: UserType = {
            roles: this.rolesDetailList,
            unused_roles: this.unusedrolesDetailList,
            user_type: data.user_type,
            user_type_name:data.user_type_name
           
          }
          this.updateuserType.emit(emittedvalue);
          console.log(emittedvalue);
        }
      }
    )
  }
  DeletePart(admn_role_id:number){
    this.unusedrolesDetailList.push(this.rolesDetailList.find(m=> m.admn_role_id == admn_role_id))
    this.rolesDetailList = this.rolesDetailList.filter(m=> m.admn_role_id != admn_role_id)
    this.dataSource = new MatTableDataSource<userrole>(this.rolesDetailList);
   
  }
  
}
