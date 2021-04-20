import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-confirmation-popover',
  templateUrl: './confirmation-popover.component.html',
  styleUrls: ['./confirmation-popover.component.scss']
})
export class ConfirmationPopoverComponent implements OnInit {

  dialogData: DialogData;
  title:string;
  message:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationPopoverComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

}
