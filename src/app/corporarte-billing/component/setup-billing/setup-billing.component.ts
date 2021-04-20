import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CorporateDetails, CreateBillSetupModel } from 'src/app/models/corporateBillingModel';
import { LanguageService } from 'src/app/service/language/language.service';


@Component({
  selector: 'app-setup-billing',
  templateUrl: './setup-billing.component.html',
  styleUrls: ['./setup-billing.component.scss']
})
export class SetupBillingComponent implements OnInit {

  setupBillingForm: FormGroup;
  @Input() legalEntities$: Observable<CorporateDetails[]>;
  @Input() Corporates$: Observable<CorporateDetails[]>;
  @Output() AddBillingSetupEvent = new EventEmitter();
  @Output() cancelEvents = new EventEmitter();

  minDate: Date;
  currentdate =  Date.now();
  constructor( public fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.setupBillingForm = this.fb.group({
      legal_entities: ['', [Validators.required]],
      corporate_name: ['', [Validators.required]],
      billing_start_date: ['', [Validators.required]],
    })
    var fromDate: Date = new Date(this.currentdate);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1);
  }

  add() {
    var formData: CreateBillSetupModel = {
      legal_entity_id : +this.setupBillingForm.controls.legal_entities.value,
      corporate_id : +this.setupBillingForm.controls.corporate_name.value,
      bill_start_date : this.setupBillingForm.controls.billing_start_date.value,
    }
    console.log(formData);
    this.AddBillingSetupEvent.emit(formData);
  }

  cancel(){
    this.cancelEvents.emit();
  }

}