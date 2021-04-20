import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomainData } from 'src/app/models/domainModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateCodeLoadAction, UpdateCodeAction } from 'src/app/store/actions/corporate_code_management.action';
import { SubSink } from 'subsink';
import { corporateCodeList } from 'src/app/models/corporateCodeManagementModel';
import { CorporateManagement } from 'src/app/models/corporateManagement';

@Component({
  selector: 'app-code-edit-container',
  templateUrl: './code-edit-container.component.html',
  styleUrls: ['./code-edit-container.component.scss']
})
export class CodeEditContainerComponent implements OnInit, OnDestroy{
  codeStatus$: Observable<DomainData[]>;
  codeTypes$: Observable<DomainData[]>;
  corporates$: Observable<CorporateManagement[]>;
  singleCode$: Observable<corporateCodeList>;
  private subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var corporatecode_id = +params['id'];
      this.store.dispatch(new UpdateCodeLoadAction({
        admn_corporatecode_id: corporatecode_id
      }))
    }));
    this.codeStatus$ = this.store.select(state => state.corporate_code_management.CodeStatus)
    this.codeTypes$ = this.store.select(state => state.corporate_code_management.CodeTypes)
    this.corporates$ = this.store.select(state => state.corporate_code_management.CorporateList);
    this.singleCode$ = this.store.select(state => state.corporate_code_management.singleCode)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
  cancelCode() {
    this.router.navigate(['corporate-code-management', 'code-list'])
  }

  CorporateEditForm(value: corporateCodeList) {
    console.log('edit user', value);
    this.store.dispatch(new UpdateCodeAction(value))
  }

}
