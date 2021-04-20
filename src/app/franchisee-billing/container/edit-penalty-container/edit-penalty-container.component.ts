import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditPenaltyComponent } from '../../component/edit-penalty/edit-penalty.component';
import { PenaltyMaintain } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-edit-penalty-container',
  templateUrl: './edit-penalty-container.component.html',
  styleUrls: ['./edit-penalty-container.component.scss']
})
export class EditPenaltyContainerComponent implements OnInit {

  singlePenalty: PenaltyMaintain;

  constructor(public dialog: MatDialogRef<EditPenaltyComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.singlePenalty = this.data;
   }

  ngOnInit() {
    
  }

  save(value: PenaltyMaintain) {
    console.log(value);
    this.dialog.close(value);
  }

}