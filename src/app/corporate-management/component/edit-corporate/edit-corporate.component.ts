import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { SubSink } from 'subsink';
import { take, map } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-corporate',
  templateUrl: './edit-corporate.component.html',
  styleUrls: ['./edit-corporate.component.scss']
})
export class EditCorporateComponent implements OnInit, OnDestroy {

  editCorporateForm: FormGroup;
  corporatePricingForm: FormGroup;
  pricing_details: boolean = false;
  @Input() partnerType$: Observable<DomainData[]>;
  @Input() partnerCategory$: Observable<DomainData[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() singleCorporate$: Observable<CorporateManagement>;
  @Input() corporateSize$: Observable<DomainData[]>;
  @Input() corporateContract$: Observable<DomainData[]>;
  @Input() billing$: Observable<DomainData[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() paymentTerm$: Observable<DomainData[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Output() editCorporateData = new EventEmitter<CorporateManagement>();
  filteredpaymentTerm$: Observable<DomainData[]>;
  @Output() cancelcorporate = new EventEmitter();
  private subs = new SubSink();
  public updatedOn: Date;
  datalist:number;
  on_tripmaintenanceCheck: number;
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.editCorporateForm = this.formbuilder.group({
      partner_type: ['', [Validators.required]],
      partner_code: ['', [Validators.required]],
      partner_name: ['', [Validators.required]],
      partner_category: ['',[Validators.required]],
      company_name: ['',[Validators.required]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      contact_person_firstname: ['',[Validators.required]],
      contact_person_lastname: ['',[Validators.required]],
      contact_phone: ['',[Validators.required, Ms3Validators.phonenumber]],
      contact_email: ['',[Validators.required, Ms3Validators.email]],
      contact_person_designation: ['',[Validators.required]],
      country: ['',[Validators.required]],
      billing_name: ['',[Validators.required]],
      pan: ['', [Validators.required]],
      gst_numbers: ['',[Validators.required]],
      corporate_size: ['',[Validators.required]],
      corporate_contract: ['',[Validators.required]],
      payment_term: ['',[Validators.required, Ms3Validators.integer]],
      ontrip_maintenance: [''],
      account_holder_name: ['',[Validators.required]],
      account_no: ['',[Validators.required]],
      ifsc_code: ['',[Validators.required]],
      cin_no: ['',[Validators.required]],
      bank_name: ['',[Validators.required]],
      branch_name: ['',[Validators.required]],
      bank_address: ['',[Validators.required]],
    });

    this.corporatePricingForm = this.formbuilder.group({
      billing_type: [''],
      bill_generation_frequency: [''],
      minimum_wallet_balance: [''],
    });

    this.subs.add(this.singleCorporate$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          this.datalist = data.bill_generation_frequency
          console.log(this.datalist);
          if (data.partner_type != 1) {
            this.editCorporateForm.patchValue(data);
            this.OnChange(2);  
            this.pricing_details = false;
          }
          else {
            this.editCorporateForm.patchValue(data);
            this.corporatePricingForm.patchValue(data);   
            this.pricing_details = true;
            this.BillSelection(data.billing_type);
          }
          // this.editCorporateForm.patchValue(data);
          this.partner_code.disable();
          this.updatedOn = data.updated_on;
        }
      }
    ));
  }

  editCorporate() {
    if(this.editCorporateForm.value.partner_type == 1) {
      this.singleCorporate$.pipe(take(1)).subscribe(
        (data) => {
          var formData = { ...data };
          formData.partner_type = this.editCorporateForm.controls.partner_type.value;
          formData.partner_code = this.editCorporateForm.controls.partner_code.value;
          formData.partner_name = this.editCorporateForm.controls.partner_name.value;
          formData.partner_category = this.editCorporateForm.controls.partner_category.value;
          formData.company_name = this.editCorporateForm.controls.company_name.value;
          formData.addressline1 = this.editCorporateForm.controls.addressline1.value;
          formData.addressline2 = this.editCorporateForm.controls.addressline2.value;
          formData.state_id = +this.editCorporateForm.controls.state.value,
          formData.city_id = this.editCorporateForm.controls.city.value,
          formData.pin = +this.editCorporateForm.controls.pin.value,
          formData.contact_person_firstname = this.editCorporateForm.controls.contact_person_firstname.value;
          formData.contact_person_lastname = this.editCorporateForm.controls.contact_person_lastname.value;
          formData.contact_phone = this.editCorporateForm.controls.contact_phone.value;
          formData.contact_email = this.editCorporateForm.controls.contact_email.value;
          formData.contact_person_designation = this.editCorporateForm.controls.contact_person_designation.value;
          formData.country_id = this.editCorporateForm.controls.country.value;
          formData.billing_name = this.editCorporateForm.controls.billing_name.value;
          formData.pan = this.editCorporateForm.controls.pan.value;
          formData.gst_numbers = this.editCorporateForm.controls.gst_numbers.value;
          formData.corporate_size = this.editCorporateForm.controls.corporate_size.value;
          formData.account_holder_name = this.editCorporateForm.controls.account_holder_name.value  ? this.editCorporateForm.controls.account_holder_name.value: null;;
          formData.account_no = this.editCorporateForm.controls.account_no.value  ? this.editCorporateForm.controls.account_no.value: null;;
          formData.ifsc_code = this.editCorporateForm.controls.ifsc_code.value  ? this.editCorporateForm.controls.ifsc_code.value: null;;
          formData.cin_no = this.editCorporateForm.controls.cin_no.value  ? this.editCorporateForm.controls.cin_no.value: null;;
          formData.bank_name = this.editCorporateForm.controls.bank_name.value  ? this.editCorporateForm.controls.bank_name.value: null;;
          formData.branch_name = this.editCorporateForm.controls.branch_name.value  ? this.editCorporateForm.controls.branch_name.value: null;;
          formData.bank_address = this.editCorporateForm.controls.bank_address.value  ? this.editCorporateForm.controls.bank_address.value: null;;
          formData.corporate_contract = this.editCorporateForm.controls.corporate_contract.value;
          formData.payment_term = this.editCorporateForm.controls.payment_term.value  ? this.editCorporateForm.controls.payment_term.value: null;;
          formData.billing_type = this.corporatePricingForm.controls.billing_type.value;
          formData.bill_generation_frequency = this.corporatePricingForm.controls.bill_generation_frequency.value;
          formData.minimum_wallet_balance = +this.corporatePricingForm.controls.minimum_wallet_balance.value;
          formData.ontrip_maintenance = this.editCorporateForm.controls.ontrip_maintenance.value;
          this.editCorporateData.emit(formData);
          console.log(formData)
        }
      )
    }
    
    else {
      this.singleCorporate$.pipe(take(1)).subscribe(
        (data) => {
          var formData = { ...data };
          formData.partner_type = this.editCorporateForm.controls.partner_type.value;
          formData.partner_code = this.editCorporateForm.controls.partner_code.value;
          formData.partner_name = this.editCorporateForm.controls.partner_name.value;
          formData.partner_category = this.editCorporateForm.controls.partner_category.value;
          formData.company_name = this.editCorporateForm.controls.company_name.value;
          formData.addressline1 = this.editCorporateForm.controls.addressline1.value;
          formData.addressline2 = this.editCorporateForm.controls.addressline2.value;
          formData.state_id = +this.editCorporateForm.controls.state.value,
          formData.city_id = this.editCorporateForm.controls.city.value,
          formData.pin = +this.editCorporateForm.controls.pin.value,
          formData.contact_person_firstname = this.editCorporateForm.controls.contact_person_firstname.value;
          formData.contact_person_lastname = this.editCorporateForm.controls.contact_person_lastname.value;
          formData.contact_phone = this.editCorporateForm.controls.contact_phone.value;
          formData.contact_email = this.editCorporateForm.controls.contact_email.value;
          formData.contact_person_designation = this.editCorporateForm.controls.contact_person_designation.value;
          formData.country_id = this.editCorporateForm.controls.country.value;
          formData.billing_name = this.editCorporateForm.controls.billing_name.value;
          formData.pan = this.editCorporateForm.controls.pan.value;
          formData.gst_numbers = this.editCorporateForm.controls.gst_numbers.value;
          formData.corporate_size = this.editCorporateForm.controls.corporate_size.value;
          formData.corporate_contract = this.editCorporateForm.controls.corporate_contract.value;
          formData.payment_term = this.editCorporateForm.controls.payment_term.value ? this.editCorporateForm.controls.payment_term.value: null;
          formData.ontrip_maintenance = this.editCorporateForm.controls.ontrip_maintenance.value;
          formData.account_holder_name = this.editCorporateForm.controls.account_holder_name.value ? this.editCorporateForm.controls.account_holder_name.value: null;
          formData.account_no = this.editCorporateForm.controls.account_no.value ? this.editCorporateForm.controls.account_no.value: null;
          formData.ifsc_code = this.editCorporateForm.controls.ifsc_code.value ? this.editCorporateForm.controls.ifsc_code.value: null;
          formData.cin_no = this.editCorporateForm.controls.cin_no.value ? this.editCorporateForm.controls.cin_no.value: null;
          formData.bank_name = this.editCorporateForm.controls.bank_name.value ? this.editCorporateForm.controls.bank_name.value: null;
          formData.branch_name = this.editCorporateForm.controls.branch_name.value ? this.editCorporateForm.controls.branch_name.value: null;
          formData.bank_address = this.editCorporateForm.controls.bank_address.value ? this.editCorporateForm.controls.bank_address.value: null;
          this.editCorporateData.emit(formData);
          console.log(formData)
        }
      )
    }
  }

  // createForm() {
    
  // }

  // corporateForm() {
  
  // }

  OnTripMaintenanceCheck(checked: boolean) {
    if(checked) {
      this.on_tripmaintenanceCheck = 1;
      //this.CorporateForm.controls.ontrip_maintenance.setValue(1);
      console.log(this.on_tripmaintenanceCheck);
    }
    else {
      this.on_tripmaintenanceCheck = 0;
      //this.CorporateForm.controls.ontrip_maintenance.setValue(0);
      console.log(this.on_tripmaintenanceCheck);
    }
  }

  cancelCorporate() {
    this.cancelcorporate.emit()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get partner_code(): FormControl {
    return <FormControl> this.editCorporateForm.get('partner_code');
  }

  OnChange(value: number) {
    console.log(value);
    if(value != 3){
      this.editCorporateForm.get('payment_term').clearValidators();
      this.editCorporateForm.get('bank_address').clearValidators();
      this.editCorporateForm.get('account_no').clearValidators();
      this.editCorporateForm.get('branch_name').clearValidators();
      this.editCorporateForm.get('bank_name').clearValidators();
      this.editCorporateForm.get('cin_no').clearValidators();
      this.editCorporateForm.get('ifsc_code').clearValidators();
      this.editCorporateForm.get('account_holder_name').clearValidators();
    }
    else{
      this.editCorporateForm.get('payment_term').setValidators([Validators.required,Ms3Validators.integer]);
      this.editCorporateForm.get('bank_address').setValidators([Validators.required]);
      this.editCorporateForm.get('account_no').setValidators([Validators.required]);
      this.editCorporateForm.get('branch_name').setValidators([Validators.required]);
      this.editCorporateForm.get('bank_name').setValidators([Validators.required]);
      this.editCorporateForm.get('cin_no').setValidators([Validators.required]);
      this.editCorporateForm.get('ifsc_code').setValidators([Validators.required]);
      this.editCorporateForm.get('account_holder_name').setValidators([Validators.required]);
    }
    
    this.editCorporateForm.get('payment_term').updateValueAndValidity();
    this.editCorporateForm.get('bank_address').updateValueAndValidity();
    this.editCorporateForm.get('account_no').updateValueAndValidity();
    this.editCorporateForm.get('branch_name').updateValueAndValidity();
    this.editCorporateForm.get('bank_name').updateValueAndValidity();
    this.editCorporateForm.get('cin_no').updateValueAndValidity();
    this.editCorporateForm.get('ifsc_code').updateValueAndValidity();
    this.editCorporateForm.get('account_holder_name').updateValueAndValidity();

    if (value == 1) {
      this.corporatePricingForm.get('billing_type').setValidators([Validators.required]);
      this.corporatePricingForm.get('bill_generation_frequency').setValidators([Validators.required,Ms3Validators.integer]);
      this.corporatePricingForm.get('minimum_wallet_balance').setValidators([Validators.required]);
      this.pricing_details = true;
    }

    else {
      this.corporatePricingForm.get('billing_type').clearValidators();
      this.corporatePricingForm.get('bill_generation_frequency').clearValidators();
      this.corporatePricingForm.get('minimum_wallet_balance').clearValidators();
      this.pricing_details = false;
    }
    this.corporatePricingForm.get('billing_type').updateValueAndValidity();
    this.corporatePricingForm.get('bill_generation_frequency').updateValueAndValidity();
    this.corporatePricingForm.get('minimum_wallet_balance').updateValueAndValidity();

  }

  BillSelection(value: number){

    if(!!value) {  
      if(value == 1 ){
        if (!!value) {
          this.filteredpaymentTerm$ = this.paymentTerm$.pipe(map(
            bill => bill.filter(m => m.domain_code != 1)
          ))
      }
    }
      else{
        this.filteredpaymentTerm$ = this.paymentTerm$.pipe(map(
          bill => bill.filter(m => m.domain_code == 1)
        ))
      }  
      
  }
  console.log(value);
  }


}
