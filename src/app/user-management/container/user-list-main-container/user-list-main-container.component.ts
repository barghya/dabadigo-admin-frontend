import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { users, userId} from 'src/app/models/userManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { UserListLoadAction, DeleteUserAction, ResetPasswordAction } from 'src/app/store/actions/user_management.action';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-user-list-main-container',
  templateUrl: './user-list-main-container.component.html',
  styleUrls: ['./user-list-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListMainContainerComponent implements OnInit {
  admindetails$: Observable<users[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new UserListLoadAction(admn_user_id));
      }
    );
    this.admindetails$ = this.store.select(state => state.user_management.Users);
  }

  openadd(){
    this.router.navigate(['user-management', 'add-user'])
  }
  
  deleteuser(value:userId){
    console.log("Delete User", value);
    this.store.dispatch(new DeleteUserAction(value));
  }

  edituser(admn_user_id: number){
    this.router.navigate(['user-management', 'edit-user', admn_user_id]);
  }

  resetPassword(value:userId){
    this.store.dispatch(new ResetPasswordAction(value))
  }
}
