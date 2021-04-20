import { Component, OnInit, Inject } from '@angular/core';
import { EditAdjustmentComponent } from '../../component/edit-adjustment/edit-adjustment.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdjustmentsMaintain } from 'src/app/models/corporateBillingModel';

@Component({
  selector: 'app-edit-adjustment-container',
  templateUrl: './edit-adjustment-container.component.html',
  styleUrls: ['./edit-adjustment-container.component.scss']
})
export class EditAdjustmentContainerComponent implements OnInit {

  singleAdjustment: AdjustmentsMaintain;

  constructor( public dialog: MatDialogRef<EditAdjustmentComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.singleAdjustment = this.data;
   }

  ngOnInit() {
    
  }

  saveAdjustment(value: AdjustmentsMaintain) {
    console.log(value);
    this.dialog.close(value);
  }

}
