import { Component, OnInit } from '@angular/core';
import { UserType, domainData } from 'src/app/models/roleManagementModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { UserTypeLoadAction, GetUserTypeLoadAction, UpdateUserTypeAction } from 'src/app/store/actions/role-management.action';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-user-type-role-container',
  templateUrl: './user-type-role-container.component.html',
  styleUrls: ['./user-type-role-container.component.scss']
})
export class UserTypeRoleContainerComponent implements OnInit {
  Usertype$: Observable<UserType>;
  Usertypename$:Observable<DomainData[]>
  subs = new SubSink();
  constructor( private store: Store<AppState>,private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
   
    this.store.dispatch(new GetUserTypeLoadAction())
    this.Usertype$ = this.store.select(state => state.role_management.usertype);
    console.log()
    this.Usertypename$ = this.store.select(state => state.role_management.user_type);
    
   
  }
  UserTypenameChangeEvent(user_type: number) {
    console.log(user_type);
    this.store.dispatch(new UserTypeLoadAction({
      user_type: user_type
    }))
}
updateuserType(data: UserType) {
  console.log(data);
  this.store.dispatch(new UpdateUserTypeAction(data));
}

}
