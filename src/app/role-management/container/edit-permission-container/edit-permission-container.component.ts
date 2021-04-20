import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { PermissionDetails, domainData } from 'src/app/models/roleManagementModel';
import { PermissionLoadAction, UpdatePermissionAction } from 'src/app/store/actions/role-management.action';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-edit-permission-container',
  templateUrl: './edit-permission-container.component.html',
  styleUrls: ['./edit-permission-container.component.scss']
})
export class EditPermissionContainerComponent implements OnInit {
  ActivePermission$: Observable<PermissionDetails>;
  Permissions$:Observable<DomainData[]>;
  subs = new SubSink();
  constructor( private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var admn_role_id = +params['id'];
      this.store.dispatch(new PermissionLoadAction({admn_role_id: admn_role_id}))
    }));
    this.ActivePermission$ = this.store.select(state => state.role_management.permissionDetails);
    this.Permissions$ = this.store.select(state => state.role_management.permission_code);

  }
  cancelEdit(){
    this.router.navigate(['role-management', 'role-management-main']);
  }
  updatePermission(data: PermissionDetails) {
    console.log(data);
    this.store.dispatch(new UpdatePermissionAction(data));
  }

}
