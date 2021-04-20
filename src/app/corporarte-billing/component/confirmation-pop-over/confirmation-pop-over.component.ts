import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/models/corporateBillingModel';

@Component({
  selector: 'app-confirmation-pop-over',
  templateUrl: './confirmation-pop-over.component.html',
  styleUrls: ['./confirmation-pop-over.component.scss']
})
export class ConfirmationPopOverComponent implements OnInit {

  dialogData: DialogData;
  title:string;
  message:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationPopOverComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

}
