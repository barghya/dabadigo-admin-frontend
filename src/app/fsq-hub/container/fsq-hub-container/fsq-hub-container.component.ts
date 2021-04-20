import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { FSQHubListLoadAction } from 'src/app/store/actions/fsq_hub.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fsq-hub-container',
  templateUrl: './fsq-hub-container.component.html',
  styleUrls: ['./fsq-hub-container.component.scss']
})
export class FsqHubContainerComponent implements OnInit {
  fsqhubdetails$: Observable<FSQHubDetails[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new FSQHubListLoadAction(admn_user_id));
      }
    );
    this.fsqhubdetails$ = this.store.select(state => state.fsq_hub.fsqHubDetails);
   
  }

  addFsqHub(){
    this.router.navigate(['fsq-hub', 'add-fsq-hub']);
  }
  editFsqHub(hub_id:number){
    this.router.navigate(['fsq-hub', 'edit-fsq-hub', hub_id]);
  }
}
