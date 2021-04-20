import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PenaltyMaintain } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-add-penalty',
  templateUrl: './add-penalty.component.html',
  styleUrls: ['./add-penalty.component.scss']
})
export class AddPenaltyComponent implements OnInit {

  addPenaltyForm: FormGroup;

  @Output() addPenaltyEvent = new EventEmitter<PenaltyMaintain>();

  constructor(public languageService: LanguageService, private formBuilder: FormBuilder,
    public dialog: MatDialogRef<AddPenaltyComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.addPenaltyForm = this.formBuilder.group({
      descriptions: ['', [Validators.required]],
      penalty_amount: ['', [Ms3Validators.integer]]
    })
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    var formData: PenaltyMaintain = {
      descriptions: this.addPenaltyForm.controls.descriptions.value,
      penalty_amount: +this.addPenaltyForm.controls.penalty_amount.value,
    }
    this.addPenaltyEvent.emit(formData);
    this.addPenaltyForm.setErrors(null);
  }

}