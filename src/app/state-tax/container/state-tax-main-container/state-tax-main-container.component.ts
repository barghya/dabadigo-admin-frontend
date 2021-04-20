import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { StateTaxLoadAction, StateTaxCreateLoadAction, StateTaxCreateAction, StateTaxUpdateLoadAction, StateTaxUpdateAction, StateTaxDeleteAction } from 'src/app/store/actions/state_tax.action';
import { Observable } from 'rxjs';
import { StateTaxItem } from 'src/app/models/stateTaxModel';
import { states } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-state-tax-main-container',
  templateUrl: './state-tax-main-container.component.html',
  styleUrls: ['./state-tax-main-container.component.scss']
})
export class StateTaxMainContainerComponent implements OnInit {

  stateTaxList$: Observable<StateTaxItem[]>;
  singleStateTax$: Observable<StateTaxItem>;
  states$: Observable<states[]>;
  taxTypes$: Observable<DomainData[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new StateTaxLoadAction());
    this.stateTaxList$ = this.store.select(state => state.stateTaxManagement.stateTaxList);
    this.singleStateTax$ = this.store.select(state => state.stateTaxManagement.singleStateTax);
    this.states$ = this.store.select(state => state.stateTaxManagement.states);
    this.taxTypes$ = this.store.select(state => state.stateTaxManagement.taxTypes);
  }

  AddStateTax() {
    this.store.dispatch(new StateTaxCreateLoadAction());
  }

  AddStateTaxSubmit(data: StateTaxItem) {
    this.store.dispatch(new StateTaxCreateAction(data));
  }

  EditStateTax(admn_state_tax_id: number) {
    this.store.dispatch(new StateTaxUpdateLoadAction(admn_state_tax_id));
  }

  EditStateTaxSubmit(data: StateTaxItem) {
    this.store.dispatch(new StateTaxUpdateAction(data));
  }

  DeleteStateTax(admn_state_tax_id: number) {
    this.store.dispatch(new StateTaxDeleteAction(admn_state_tax_id));
  }
}
