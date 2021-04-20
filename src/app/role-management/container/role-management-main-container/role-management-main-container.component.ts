import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { userRole } from 'src/app/models/roleManagementModel';
import { RoleManagementLoadAction } from 'src/app/store/actions/role-management.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-role-management-main-container',
  templateUrl: './role-management-main-container.component.html',
  styleUrls: ['./role-management-main-container.component.scss']
})
export class RoleManagementMainContainerComponent implements OnInit {
  AlluserRoleList$: Observable<userRole[]>;
  
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new RoleManagementLoadAction());
    this.AlluserRoleList$ = this.store.select(state => state.role_management.UserRole).pipe(map(
      roles => roles.filter(role => role.admn_role_id != 8)
    ));
  }
  addRole(){
    this.router.navigate(["role-management", "add-role"]);
  }

  editrole(role_id: number){
    this.router.navigate(['role-management', 'edit-role', role_id]);
  }
  editpermission(role_id: number){
    this.router.navigate(['role-management', 'edit-permission', role_id]);
  }



}
