import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EditParameterLoadAction, EditParameterAction } from 'src/app/store/actions/parameter_management.action';

@Component({
  selector: 'app-edit-parameter-container',
  templateUrl: './edit-parameter-container.component.html',
  styleUrls: ['./edit-parameter-container.component.scss']
})
export class EditParameterContainerComponent implements OnInit,OnDestroy {
  singleParameter$: Observable<Parameter>;
  subs = new SubSink();
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var admn_parameters_id = +params['id'];
      this.store.dispatch(new EditParameterLoadAction({
        admn_parameters_id: admn_parameters_id
      }))
    }));
    this.singleParameter$ = this.store.select(state => state.parameter_management.SingleParameter);
  }
  cancel(){
    this.router.navigate(['parameter-management', 'parameter-management']);
  }
  ParameterEdit(value:Parameter){
    console.log('edit parameter',value);
    
    this.store.dispatch(new EditParameterAction(value));
   }
   ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
