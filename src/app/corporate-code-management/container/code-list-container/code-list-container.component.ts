import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { corporateCodeList, corporateCodeID } from 'src/app/models/corporateCodeManagementModel';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { CodeListLoadAction, DeleteCodeAction } from 'src/app/store/actions/corporate_code_management.action';

@Component({
  selector: 'app-code-list-container',
  templateUrl: './code-list-container.component.html',
  styleUrls: ['./code-list-container.component.scss']
})
export class CodeListContainerComponent implements OnInit {

  code$: Observable<corporateCodeList[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new CodeListLoadAction());
    this.code$ = this.store.select(state => state.corporate_code_management.CorporateCodeList);
    console.log(this.code$);
  }

  addCode() {
    this.router.navigate(['corporate-code-management', 'add-code']);
  }

  editCode(admn_corporatecode_id:number) {
    this.router.navigate(['corporate-code-management', 'edit-code', admn_corporatecode_id]);
    console.log(admn_corporatecode_id);
  }

  deleteCode(value: corporateCodeID) {
    this.store.dispatch(new DeleteCodeAction(value));
  }
  

}
