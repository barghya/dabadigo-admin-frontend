import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialogRef } from '@angular/material';
import { TransferRequestFsqLoadAction } from 'src/app/store/actions/transfer_parts.action';

@Component({
  selector: 'app-fsq-search',
  templateUrl: './fsq-search.component.html',
  styleUrls: ['./fsq-search.component.scss']
})
export class FsqSearchComponent implements OnInit {
  fsqList$: Observable<FSQDetails[]>;
  displayedColumns: string[] = ["firstname", "lastname", "contact_phone", "email_id", "fsq_skill_level_name"]
  headers = { 
    "firstname": this.languageService.getText("firstNameText"),
    "lastname": this.languageService.getText("lastNameText"),
    "contact_phone": this.languageService.getText("phoneNumberText"),
    "email_id": this.languageService.getText("emailIDText"),
    "fsq_skill_level_name": this.languageService.getText("fsqSkillText") 
  }

  constructor(private store: Store<AppState>, private languageService: LanguageService, public dialogRef: MatDialogRef<FsqSearchComponent>) { }

  ngOnInit() {
    this.fsqList$ = this.store.select(state => state.transferParts.fsqList);
  }
  
  Search(search_string: string) {
    this.store.dispatch(new TransferRequestFsqLoadAction(search_string));
  }

  Cancel() {
    this.dialogRef.close();
  }

  FsqSelected(data: FSQDetails) {
    this.dialogRef.close(data);
  }
}
