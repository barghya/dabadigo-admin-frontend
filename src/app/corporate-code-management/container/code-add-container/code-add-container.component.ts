import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { CreateCodeLoadAction, CreateCodeAction, CreateAnotherCorporateCode } from 'src/app/store/actions/corporate_code_management.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { corporateCodeList } from 'src/app/models/corporateCodeManagementModel';

@Component({
  selector: 'app-code-add-container',
  templateUrl: './code-add-container.component.html',
  styleUrls: ['./code-add-container.component.scss']
})
export class CodeAddContainerComponent implements OnInit {
  codeStatus$: Observable<DomainData[]>;
  codeTypes$: Observable<DomainData[]>;
  corporates$: Observable<CorporateManagement[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new CreateCodeLoadAction())
    this.codeStatus$ = this.store.select(state => state.corporate_code_management.CodeStatus);
    this.codeTypes$ = this.store.select(state => state.corporate_code_management.CodeTypes);
    this.corporates$ = this.store.select(state => state.corporate_code_management.CorporateList);
  }

  addCode(data: corporateCodeList) {
    this.store.dispatch(new CreateCodeAction(data));
  }

  addAnotherCode(data: corporateCodeList) {
    this.store.dispatch(new CreateAnotherCorporateCode(data));
  }

  cancelAddCode() {
    this.router.navigate(['corporate-code-management', 'code-list']);
  }

}
