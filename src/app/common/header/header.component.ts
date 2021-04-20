import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { LogoutAction } from 'src/app/store/actions/user.action';
import { Router } from '@angular/router';
import { Userdetail } from 'src/app/models/userModel';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { users } from 'src/app/models/userManagement';
import { take } from 'rxjs/operators';
import { UserListLoadAction } from 'src/app/store/actions/user_management.action';
import { SubSink } from 'subsink';
import { ProfileManagementLoadAction } from 'src/app/store/actions/profile_management.action';
import { usersProfile } from 'src/app/models/profileManagement';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() public sidenavToggle = new EventEmitter();
  @Output() userbyId = new EventEmitter()
  admindetails$: Observable<users[]>
  user: Observable<Userdetail>;
  userProfile$: Observable<usersProfile>;
  private subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.user = this.store.select(state => state.user.userdetail);
    this.subs.add(this.user.subscribe(
      user => {
        if(user.admn_user_id > 0) {
          this.store.dispatch(new ProfileManagementLoadAction({admn_user_id: user.admn_user_id}))
        }
      }
    ))
    this.userProfile$ = this.store.select(state => state.profile_management.singleProfile);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  Logout() {
    this.store.dispatch(new LogoutAction());
    this.router.navigate(['/login'], {replaceUrl: true});
  }
  Profile(){
    this.router.navigate(['profile-management', 'profile-main']);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
