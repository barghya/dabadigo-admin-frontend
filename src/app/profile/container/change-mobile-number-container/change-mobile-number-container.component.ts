import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { changeMobile } from 'src/app/models/profileManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { ChangeMobileNumberAction } from 'src/app/store/actions/profile_management.action';

@Component({
  selector: 'app-change-mobile-number-container',
  templateUrl: './change-mobile-number-container.component.html',
  styleUrls: ['./change-mobile-number-container.component.scss']
})
export class ChangeMobileNumberContainerComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

  }

  cancel() {
    this.router.navigate(['profile-management']);
  }

  ChangeMobile(data: changeMobile) {
    this.store.dispatch(new ChangeMobileNumberAction(data))
  }

}
