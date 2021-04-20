import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateFranchiseeSetup, Franchisees } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-add-setup',
  templateUrl: './add-setup.component.html',
  styleUrls: ['./add-setup.component.scss']
})
export class AddSetupComponent implements OnInit {

  setupFranchiseeBillingForm: FormGroup;
  minDate: Date;
  currentdate =  Date.now();
  @Output() cancelEvent = new EventEmitter();
  @Output() addSetupEvent = new EventEmitter<CreateFranchiseeSetup>();

  @Input() franchisee$: Observable<Franchisees[]>;

  constructor(public languageService: LanguageService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.setupFranchiseeBillingForm = this.fb.group({
      franchisee_name: ['', [Validators.required]],
      payment_start_date: ['', [Validators.required]],
    })
    var fromDate: Date = new Date(this.currentdate);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  add() {
    var formData: CreateFranchiseeSetup = {
      admn_partner_id: this.setupFranchiseeBillingForm.controls.franchisee_name.value,
      payment_start_date: this.setupFranchiseeBillingForm.controls.payment_start_date.value,
    }
    this.addSetupEvent.emit(formData);
  }

}