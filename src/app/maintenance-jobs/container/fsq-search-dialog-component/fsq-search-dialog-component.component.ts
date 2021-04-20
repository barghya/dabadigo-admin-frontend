import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MaintenanceFsqLoadAction } from 'src/app/store/actions/maintenance_jobs.action';

@Component({
  selector: 'app-fsq-search-dialog-component',
  templateUrl: './fsq-search-dialog-component.component.html',
  styleUrls: ['./fsq-search-dialog-component.component.scss']
})
export class FsqSearchDialogComponent implements OnInit {

  fsqList$: Observable<FSQDetails[]>;
  displayedColumns: string[] = ["firstname", "lastname", "contact_phone", "email_id", "fsq_skill_level_name"]
  headers = { 
    "firstname": this.languageService.getText("firstNameText"),
    "lastname": this.languageService.getText("lastNameText"),
    "contact_phone": this.languageService.getText("phoneNumberText"),
    "email_id": this.languageService.getText("emailIDText"),
    "fsq_skill_level_name": this.languageService.getText("fsqSkillText") 
  }

  constructor(private store: Store<AppState>, private languageService: LanguageService, public dialogRef: MatDialogRef<FsqSearchDialogComponent>) { }

  ngOnInit() {
    this.fsqList$ = this.store.select(state => state.maintenanceJobManagement.fsqList);
  }

  Search(search_string: string) {
    this.store.dispatch(new MaintenanceFsqLoadAction(search_string));
  }

  Cancel() {
    this.dialogRef.close();
  }

  FsqSelected(data: FSQDetails) {
    this.dialogRef.close(data);
  }

}
