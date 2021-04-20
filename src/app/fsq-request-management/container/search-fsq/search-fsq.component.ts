import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { FsqSearchLoadAction } from 'src/app/store/actions/fsq_management.action';
import { FSQDetails } from 'src/app/models/fsqManagement';

@Component({
  selector: 'app-search-fsq',
  templateUrl: './search-fsq.component.html',
  styleUrls: ['./search-fsq.component.scss']
})
export class SearchFsqComponent implements OnInit {
  fsqList$: Observable<FSQDetails[]>;
  displayedColumns: string[] = ["firstname", "lastname", "contact_phone", "email_id","hub_city", "fsq_skill_level_name"]
  headers = { 
    "firstname": this.languageService.getText("firstNameText"),
    "lastname": this.languageService.getText("lastNameText"),
    "hub_city": this.languageService.getText("cityText"),
    "contact_phone": this.languageService.getText("phoneNumberText"),
    "email_id": this.languageService.getText("emailIDText"),
    "fsq_skill_level_name": this.languageService.getText("fsqSkillText") 
  }

  constructor(private store: Store<AppState>, private languageService: LanguageService, public dialogRef: MatDialogRef<SearchFsqComponent>) { }

  ngOnInit() {
    this.fsqList$ = this.store.select(state => state.fsq_management.activeFsq);
  }

  Search(search_string: string) {
    this.store.dispatch(new FsqSearchLoadAction(search_string));
  }

  Cancel() {
    this.dialogRef.close();
  }

  FsqSelected(data: FSQDetails) {
    this.dialogRef.close(data);
  }



}
