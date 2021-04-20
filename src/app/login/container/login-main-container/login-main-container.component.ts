import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/userModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { LoginAction } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-login-main-container',
  templateUrl: './login-main-container.component.html',
  styleUrls: ['./login-main-container.component.scss']
})
export class LoginMainContainerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  login(data: LoginModel) {
    console.log('Container',data);
    this.store.dispatch(new LoginAction(data));
  }

}
