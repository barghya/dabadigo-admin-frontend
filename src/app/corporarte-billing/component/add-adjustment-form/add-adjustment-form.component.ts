import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { MiscellaneousAdjustmentsModel, Adjustments } from 'src/app/models/corporateBillingModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ms3Validators } from 'src/app/validators/ms3-validators';

@Component({
  selector: 'app-add-adjustment-form',
  templateUrl: './add-adjustment-form.component.html',
  styleUrls: ['./add-adjustment-form.component.scss']
})
export class AddAdjustmentFormComponent implements OnInit {

  addAdjustmentForm: FormGroup;
  formData: Adjustments;

  @Output() addAdjustmentEvent = new EventEmitter<Adjustments>();
  @Output() cancelEvent = new EventEmitter();

  minDate: Date = new Date(1, 1, 1);

  constructor(public languageService: LanguageService, private formBuilder: FormBuilder,
    public dialog: MatDialogRef<AddAdjustmentFormComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.addAdjustmentForm = this.formBuilder.group({
      trip_ref_no: [null],
      rider_name: [null],
      booking_time: [null],
      descriptions: ['', [Validators.required]],
      adjusted_amount: ['', [Validators.required]]
    })
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    var formData: Adjustments = {
      trip_ref_no: this.addAdjustmentForm.controls.trip_ref_no.value,
      rider_name: this.addAdjustmentForm.controls.rider_name.value,
      booking_time: this.addAdjustmentForm.controls.booking_time.value,
      descriptions: this.addAdjustmentForm.controls.descriptions.value,
      adjusted_amount: +this.addAdjustmentForm.controls.adjusted_amount.value,
    }
    console.log(formData);
    this.addAdjustmentEvent.emit(formData);
  }

}
