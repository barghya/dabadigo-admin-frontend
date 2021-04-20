import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { ParameterLoadAction } from 'src/app/store/actions/parameter_management.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameters-management-container',
  templateUrl: './parameters-management-container.component.html',
  styleUrls: ['./parameters-management-container.component.scss']
})
export class ParametersManagementContainerComponent implements OnInit {
  parameterList$: Observable<Parameter[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new ParameterLoadAction());
    this.parameterList$ = this.store.select(state => state.parameter_management.ParameterList);
  }
  addParameter(){
    this.router.navigate(["parameter-management", "add-parameter"]);
  }
editParameter(admn_parameters_id: number){
  this.router.navigate(["parameter-management", "edit-parameter", admn_parameters_id]);
}
}
