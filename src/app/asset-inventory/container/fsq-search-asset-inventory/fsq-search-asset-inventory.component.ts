import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { MatDialogRef } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { PartsFsqLoadAction } from 'src/app/store/actions/asset_inventory.action';

@Component({
  selector: 'app-fsq-search-asset-inventory',
  templateUrl: './fsq-search-asset-inventory.component.html',
  styleUrls: ['./fsq-search-asset-inventory.component.scss']
})
export class FsqSearchAssetInventoryComponent implements OnInit {

  fsqList$: Observable<FSQDetails[]>;
  displayedColumns: string[] = ["firstname", "lastname", "contact_phone", "email_id", "fsq_skill_level_name"]
  headers = { 
    "firstname": this.languageService.getText("firstNameText"),
    "lastname": this.languageService.getText("lastNameText"),
    "contact_phone": this.languageService.getText("phoneNumberText"),
    "email_id": this.languageService.getText("emailIDText"),
    "fsq_skill_level_name": this.languageService.getText("fsqSkillText") 
  }

  constructor(private store: Store<AppState>, private languageService: LanguageService, public dialogRef: MatDialogRef<FsqSearchAssetInventoryComponent>) { }

  ngOnInit() {
    this.fsqList$ = this.store.select(state => state.asset_inventory.fsqList);
  }

  Search(search_string: string) {
    this.store.dispatch(new PartsFsqLoadAction(search_string));
  }

  Cancel() {
    this.dialogRef.close();
  }

  FsqSelected(data: FSQDetails) {
    this.dialogRef.close(data);
  }

}
