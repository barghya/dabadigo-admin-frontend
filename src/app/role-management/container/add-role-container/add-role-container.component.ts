import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { userRole } from 'src/app/models/roleManagementModel';
import { AddRoleAction } from 'src/app/store/actions/role-management.action';

@Component({
  selector: 'app-add-role-container',
  templateUrl: './add-role-container.component.html',
  styleUrls: ['./add-role-container.component.scss']
})
export class AddRoleContainerComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }
  addRole(data: userRole){
    console.log(data);
    this.store.dispatch(new AddRoleAction(data));
  }
 
  Cancel(){
    this.router.navigate(['role-management', 'role-management-main']);
  }

}
