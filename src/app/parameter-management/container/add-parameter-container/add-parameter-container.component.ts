import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { AddParameterAction, AddAnotherParameterAction } from 'src/app/store/actions/parameter_management.action';

@Component({
  selector: 'app-add-parameter-container',
  templateUrl: './add-parameter-container.component.html',
  styleUrls: ['./add-parameter-container.component.scss']
})
export class AddParameterContainerComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }
  AddParameter(data: Parameter){
    console.log(data);
    this.store.dispatch(new AddParameterAction(data));
  }
  AddAnotherParameter(data: Parameter){
    console.log(data);
    this.store.dispatch(new AddAnotherParameterAction(data));
  }
  Cancel(){
    this.router.navigate(['parameter-management', 'parameter-management']);
  }
}
