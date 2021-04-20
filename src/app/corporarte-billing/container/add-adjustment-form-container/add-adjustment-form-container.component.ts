import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AddAdjustmentsAction } from 'src/app/store/actions/corporate_billing.action';
import { MiscellaneousAdjustmentsModel } from 'src/app/models/corporateBillingModel';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddAdjustmentFormComponent } from '../../component/add-adjustment-form/add-adjustment-form.component';

@Component({
  selector: 'app-add-adjustment-form-container',
  templateUrl: './add-adjustment-form-container.component.html',
  styleUrls: ['./add-adjustment-form-container.component.scss']
})
export class AddAdjustmentFormContainerComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddAdjustmentFormComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    
  }

  save(value: MiscellaneousAdjustmentsModel) {
    console.log(value);
    this.dialog.close(value);
  };
}