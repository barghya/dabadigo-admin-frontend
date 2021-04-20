import { Component, OnInit } from '@angular/core';
import { userRole } from 'src/app/models/roleManagementModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRoleLoadAction, EditRoleAction } from 'src/app/store/actions/role-management.action';

@Component({
  selector: 'app-edit-role-container',
  templateUrl: './edit-role-container.component.html',
  styleUrls: ['./edit-role-container.component.scss']
})
export class EditRoleContainerComponent implements OnInit {
  singleRole$: Observable<userRole>;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var admn_role_id = +params['id'];
      this.store.dispatch(new EditRoleLoadAction({admn_role_id: admn_role_id}))
    }));
    this.singleRole$ = this.store.select(state => state.role_management.SingleRole);
  }
  cancelEdit(){
    this.router.navigate(['role-management', 'role-management-main']);
  }
  editRole(value:userRole){
    console.log('edit role',value);
    
    this.store.dispatch(new EditRoleAction(value));
  }

}
