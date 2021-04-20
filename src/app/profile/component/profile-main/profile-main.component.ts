import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { users } from 'src/app/models/userManagement';
import { Userdetail } from 'src/app/models/userModel';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { UserListLoadAction } from 'src/app/store/actions/user_management.action';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit, OnDestroy{
  private subs = new SubSink();
  @Input() singleprofile$: Observable<users>;
  @Output() changepassword = new EventEmitter();
  @Output() changeMobileNumberEvent = new EventEmitter();
  constructor(public languageService: LanguageService, private router: Router, private store: Store<AppState>,) { }

  ngOnInit() {
  }

  changePassword(){
    this.changepassword.emit();
  }

  changeMobileNumber() {
    this.changeMobileNumberEvent.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
