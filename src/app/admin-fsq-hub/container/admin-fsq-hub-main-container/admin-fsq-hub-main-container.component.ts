import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { AdminFSQHubListLoadAction } from 'src/app/store/actions/fsq_hub.action';
import { Observable } from 'rxjs';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-fsq-hub-main-container',
  templateUrl: './admin-fsq-hub-main-container.component.html',
  styleUrls: ['./admin-fsq-hub-main-container.component.scss']
})
export class AdminFsqHubMainContainerComponent implements OnInit {

  adminhubDetails$: Observable<FSQHubDetails[]>

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AdminFSQHubListLoadAction());
    this.adminhubDetails$ = this.store.select(state => state.fsq_hub.fsqHubDetails);
  }

  EditFSQHub(data: number){
    this.router.navigate(['fsq-hub', 'edit-fsq-hub', data]);
  }
}
