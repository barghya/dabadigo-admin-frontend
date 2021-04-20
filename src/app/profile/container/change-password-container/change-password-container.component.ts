import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { changePassword } from 'src/app/models/profileManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { ChangePasswordAction, ProfileManagementLoadAction } from 'src/app/store/actions/profile_management.action';
import { Observable } from 'rxjs';
import { users } from 'src/app/models/userManagement';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-change-password-container',
  templateUrl: './change-password-container.component.html',
  styleUrls: ['./change-password-container.component.scss']
})
export class ChangePasswordContainerComponent implements OnInit, OnDestroy {
  singleprofile$: Observable<users>;
  changepassword$: Observable<changePassword>
  private subs = new SubSink();
  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  cancelchangePassword(){
    this.router.navigate(['profile-management' , 'profile-main'], {replaceUrl: true});
  }

  changepasswordForm(value: changePassword){
    this.store.dispatch(new ChangePasswordAction(value));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
