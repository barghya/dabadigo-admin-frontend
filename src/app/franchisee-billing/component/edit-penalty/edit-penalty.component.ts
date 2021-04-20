import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { PenaltyMaintain } from 'src/app/models/franchiseeBillingModel';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-penalty',
  templateUrl: './edit-penalty.component.html',
  styleUrls: ['./edit-penalty.component.scss']
})
export class EditPenaltyComponent implements OnInit {

  editPenaltyForm: FormGroup;
  @Input() singlePenalty: PenaltyMaintain;
  @Output() editPenaltyEvent = new EventEmitter<PenaltyMaintain>();
  constructor( public languageService: LanguageService, private fb: FormBuilder,
    public dialog: MatDialogRef<EditPenaltyComponent> ) { }

  ngOnInit() {
    this.editPenaltyForm = this.fb.group({
      descriptions: ['', [Validators.required]],
      penalty_amount: ['', [Ms3Validators.integer]]
    })
    this.editPenaltyForm.patchValue(this.singlePenalty);
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    var formData = { ...this.singlePenalty };
    formData.descriptions = this.editPenaltyForm.controls.descriptions.value;
    formData.penalty_amount = +this.editPenaltyForm.controls.penalty_amount.value;
    this.editPenaltyEvent.emit(formData);
    this.editPenaltyForm.setErrors(null);
  }

}