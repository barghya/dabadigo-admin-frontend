import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable, pipe } from 'rxjs';
import { users } from 'src/app/models/userManagement';
import { ProfileManagementLoadAction } from 'src/app/store/actions/profile_management.action';
import { take } from 'rxjs/operators';
import { UserListLoadAction } from 'src/app/store/actions/user_management.action';

@Component({
  selector: 'app-profile-main-container',
  templateUrl: './profile-main-container.component.html',
  styleUrls: ['./profile-main-container.component.scss']
})
export class ProfileMainContainerComponent implements OnInit, OnDestroy{
  singleprofile$: Observable<users>;
  private subs = new SubSink();
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new ProfileManagementLoadAction({admn_user_id: admn_user_id}))
      }
    );
    this.singleprofile$ = this.store.select(state => state.profile_management.singleProfile);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  changepassword(){
    this.router.navigate(['profile-management', 'change-password']);
  }

  changeMobileNumber() {
    this.router.navigate(['profile-management', 'change-mobile-number']);
  }
}
