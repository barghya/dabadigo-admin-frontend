import { Component, OnInit, Inject } from '@angular/core';
import { PenaltyMaintain } from 'src/app/models/franchiseeBillingModel';
import { AddPenaltyComponent } from '../../component/add-penalty/add-penalty.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-penalty-container',
  templateUrl: './add-penalty-container.component.html',
  styleUrls: ['./add-penalty-container.component.scss']
})
export class AddPenaltyContainerComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddPenaltyComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {

  }

  addPenalty(value: PenaltyMaintain) {
    console.log(value);
    this.dialog.close(value);
  }

}