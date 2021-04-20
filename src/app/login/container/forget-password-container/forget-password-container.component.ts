import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { forgetpassword } from 'src/app/models/userModel';
import { UserForgetPasswordAction } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-forget-password-container',
  templateUrl: './forget-password-container.component.html',
  styleUrls: ['./forget-password-container.component.scss']
})
export class ForgetPasswordContainerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }
  forgetPasswordEvent(data: forgetpassword){
    this.store.dispatch(new UserForgetPasswordAction(data));
  }

}
