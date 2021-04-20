import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { GetTermsAndConditionsAction, EditTermsandConditionsAction } from 'src/app/store/actions/term_and_conditions.action';
import { Observable } from 'rxjs';
import { GetTermsandConditions } from 'src/app/models/termsandconditionsModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions-container',
  templateUrl: './terms-and-conditions-container.component.html',
  styleUrls: ['./terms-and-conditions-container.component.scss']
})
export class TermsAndConditionsContainerComponent implements OnInit {

  termsandconditions$: Observable<GetTermsandConditions[]>;

  constructor(public store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetTermsAndConditionsAction());
    this.termsandconditions$ = this.store.select(state => state.terms_and_conditions.getTermsandConditions);
  }
  
  addConditions() {
    this.router.navigate(['terms-and-conditions', 'add-tandc']);
  }

  edit(data: GetTermsandConditions) {
    console.log(data);
    this.store.dispatch(new EditTermsandConditionsAction(data));
  }

}
