import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Adjustments, AdjustmentsMaintain } from 'src/app/models/corporateBillingModel';

@Component({
  selector: 'app-edit-adjustment',
  templateUrl: './edit-adjustment.component.html',
  styleUrls: ['./edit-adjustment.component.scss']
})
export class EditAdjustmentComponent implements OnInit {

  editAdjustmentForm: FormGroup;

  @Input() singleAdjustment: AdjustmentsMaintain;
  @Output() editAdjustmentEvent = new EventEmitter<AdjustmentsMaintain>();
  minDate: Date = new Date(1, 1, 1);

  constructor(public languageService: LanguageService, private formBuilder: FormBuilder,
    public dialog: MatDialogRef<EditAdjustmentComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.editAdjustmentForm = this.formBuilder.group({
      trip_ref_no: [null],
      rider_name: [null],
      booking_time: [null],
      descriptions: ['', [Validators.required]],
      adjusted_amount: ['', [Validators.required]]
    })
    this.editAdjustmentForm.patchValue(this.singleAdjustment);
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    var formData = { ...this.singleAdjustment };
    formData.trip_ref_no = this.editAdjustmentForm.controls.trip_ref_no.value;
    formData.rider_name = this.editAdjustmentForm.controls.rider_name.value;
    formData.booking_time = this.editAdjustmentForm.controls.booking_time.value;
    formData.descriptions = this.editAdjustmentForm.controls.descriptions.value;
    formData.adjusted_amount = +this.editAdjustmentForm.controls.adjusted_amount.value;

    this.editAdjustmentEvent.emit(formData);
  }
}
