import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApproveRequestFSQ, FSQDetail, FsqAllHub, EditHubLevel } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ApproveRequestAction, VerifyDocumentAction, UpdateFsqAction } from 'src/app/store/actions/fsq_management.action';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-verify-document-container',
  templateUrl: './verify-document-container.component.html',
  styleUrls: ['./verify-document-container.component.scss']
})
export class VerifyDocumentContainerComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  verifiedDetail$: Observable<FSQDetail>;
  AllfsqLevel$: Observable<DomainData[]>;
  AllFsqHub$: Observable<FsqAllHub[]>;
  constructor(private router: Router,private store: Store<AppState>,private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var admin__user_id = +params['id'];
      this.store.dispatch(new VerifyDocumentAction({
       admn_user_id : admin__user_id}))
    }));
    this.verifiedDetail$ = this.store.select(state => state.fsq_management.FSQdetails);
    this.AllfsqLevel$= this.store.select(state=> state.fsq_management.fsq_level);
    this.AllFsqHub$= this.store.select(state=> state.fsq_management.fsq_hub);
  }

  Approve(value: ApproveRequestFSQ){
    this.store.dispatch(new ApproveRequestAction(value));
    console.log(value);
    
  }

  cancelDocument(){
    this.router.navigate(['fsq-request-management' , 'fsq-request-management'])
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  EditLevelHub(data: EditHubLevel){
    this.store.dispatch(new UpdateFsqAction(data));
  }
}
