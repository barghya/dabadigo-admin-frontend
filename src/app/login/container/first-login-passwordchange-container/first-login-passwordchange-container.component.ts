import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firsttimepasswordchange } from 'src/app/models/userModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { FirstTimePasswordChangeAction } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-first-login-passwordchange-container',
  templateUrl: './first-login-passwordchange-container.component.html',
  styleUrls: ['./first-login-passwordchange-container.component.scss']
})
export class FirstLoginPasswordchangeContainerComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }
  cancelPassword(){
    this.router.navigate(['login' , 'login-main'])
  }
  firsttimechangepasswordForm(value: firsttimepasswordchange){
    this.store.dispatch(new FirstTimePasswordChangeAction(value));
  }
}
