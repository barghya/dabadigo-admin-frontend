import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';
import { map, take } from 'rxjs/operators';
import { states, CityItem } from 'src/app/models/regionManagement';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-corporate',
  templateUrl: './add-corporate.component.html',
  styleUrls: ['./add-corporate.component.scss']
})
export class AddCorporateComponent implements OnInit {
  CorporateForm: FormGroup;
  corporatePricingForm: FormGroup;
  pricing_details: boolean = false;
  @Input() partnerType$: Observable<DomainData[]>;
  @Input() partnerCategory$: Observable<DomainData[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() corporateSize$: Observable<DomainData[]>;
  @Input() corporateContract$: Observable<DomainData[]>;
  @Input() billing$: Observable<DomainData[]>;
  @Input() billgenerattionFrequency$: Observable<DomainData[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() paymentTerm$: Observable<DomainData[]>;
  filteredpaymentTerm$: Observable<DomainData[]>;
  FilterBill: DomainData[]=[];
  FilterPayment: DomainData[]=[];
  Bill: DomainData[]=[];
  Payment: DomainData[]=[];
  @Output() corporateform = new EventEmitter<CorporateManagement>();
  @Output() addanotherCorporateevent = new EventEmitter();
  @Output() cancelcorporate = new EventEmitter();
  @Output() billSelected = new EventEmitter<number>();
  on_tripmaintenanceCheck: number;
  subs = new SubSink();
  
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private corporateService: CorporateManagementService) { }

  ngOnInit() {
    this.CorporateForm = this.formbuilder.group({
      partner_type: ['', [Validators.required]],
      partner_code: ['', [Validators.required], [this.validatePartnerCode.bind(this)]],
      partner_name: ['', [Validators.required]],
      partner_category: ['',[Validators.required]],
      company_name: ['',[Validators.required]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      contact_person_firstname: ['',[Validators.required]],
      contact_person_lastname: ['',[Validators.required]],
      contact_phone: ['',[Validators.required, Ms3Validators.phonenumber]],
      contact_email: ['',[Validators.required, Ms3Validators.email]],
      contact_person_designation: ['',[Validators.required]],
      country_id: ['',[Validators.required]],
      billing_name: ['',[Validators.required]],
      gst_numbers: ['',[Validators.required]],
      pan: ['', [Validators.required]],
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
    })

    this.corporatePricingForm = this.formbuilder.group({
      billing_type: [''],
      bill_generation_frequency: [''],
      minimum_wallet_balance: ['',[Ms3Validators.decimal]],
    });

    this.subs.add(this.billing$.subscribe(
      (data)=>{
        this.Bill = data;
        this.FilterBill= data
        console.log("Bill",this.Bill);
        
      }
    ))
    this.subs.add(this.paymentTerm$.subscribe(
      (data)=>{
        this.Payment = data
        this.FilterPayment= data;
        console.log("Payment",this.Payment);
      }
    ))
  }

  AddCorporate() {
    if(this.CorporateForm.value.partner_type != 2) {
      var formData: CorporateManagement = {
        partner_type: this.CorporateForm.value.partner_type,
        partner_code: this.CorporateForm.value.partner_code,
        partner_name: this.CorporateForm.value.partner_name,
        partner_category: this.CorporateForm.value.partner_category,
        company_name: this.CorporateForm.value.company_name,
        addressline1: this.CorporateForm.value.addressline1,
        addressline2: this.CorporateForm.value.addressline2,
        state_id: +this.CorporateForm.value.state_id,
        city_id: this.CorporateForm.value.city_id,
        pin: +this.CorporateForm.value.pin,
        contact_person_firstname: this.CorporateForm.value.contact_person_firstname,
        contact_person_lastname: this.CorporateForm.value.contact_person_lastname,
        contact_phone: this.CorporateForm.value.contact_phone,
        contact_email: this.CorporateForm.value.contact_email,
        contact_person_designation: this.CorporateForm.value.contact_person_designation,
        country_id: this.CorporateForm.value.country_id,
        billing_name: this.CorporateForm.value.billing_name,
        pan: this.CorporateForm.controls.pan.value,
        gst_numbers: this.CorporateForm.value.gst_numbers,
        corporate_size: this.CorporateForm.value.corporate_size,
        corporate_contract: this.CorporateForm.value.corporate_contract,
        payment_term: +this.CorporateForm.value.payment_term ? this.CorporateForm.controls.payment_term.value: null,
        ontrip_maintenance: +this.CorporateForm.controls.ontrip_maintenance.value,
        account_holder_name: this.CorporateForm.value.account_holder_name ? this.CorporateForm.controls.account_holder_name.value: null,
        account_no: this.CorporateForm.value.account_no ? this.CorporateForm.controls.account_no.value: null,
        ifsc_code: this.CorporateForm.value.ifsc_code ? this.CorporateForm.controls.ifsc_code.value: null,
        cin_no: this.CorporateForm.value.cin_no ? this.CorporateForm.controls.cin_no.value: null,
        bank_name: this.CorporateForm.value.bank_name ? this.CorporateForm.controls.bank_name.value: null,
        branch_name: this.CorporateForm.value.branch_name ? this.CorporateForm.controls.branch_name.value: null,
        bank_address: this.CorporateForm.value.bank_address ? this.CorporateForm.controls.bank_address.value: null,
        billing_type: this.corporatePricingForm.value.billing_type,
        bill_generation_frequency: +this.corporatePricingForm.value.bill_generation_frequency,
        minimum_wallet_balance: +this.corporatePricingForm.value.minimum_wallet_balance,
      }
      this.corporateform.emit(formData);
      console.log(formData);
      
    }
   
    else {
      var formData: CorporateManagement = {
        partner_type: this.CorporateForm.value.partner_type,
        partner_code: this.CorporateForm.value.partner_code,
        partner_name: this.CorporateForm.value.partner_name,
        partner_category: this.CorporateForm.value.partner_category,
        company_name: this.CorporateForm.value.company_name,
        addressline1: this.CorporateForm.value.addressline1,
        addressline2: this.CorporateForm.value.addressline2,
        state_id: +this.CorporateForm.value.state_id,
        city_id: this.CorporateForm.value.city_id,
        pin: +this.CorporateForm.value.pin,
        contact_person_firstname: this.CorporateForm.value.contact_person_firstname,
        contact_person_lastname: this.CorporateForm.value.contact_person_lastname,
        contact_phone: this.CorporateForm.value.contact_phone,
        contact_email: this.CorporateForm.value.contact_email,
        contact_person_designation: this.CorporateForm.value.contact_person_designation,
        country_id: this.CorporateForm.value.country_id,
        billing_name: this.CorporateForm.value.billing_name,
        pan: this.CorporateForm.controls.pan.value,
        gst_numbers: this.CorporateForm.value.gst_numbers,
        corporate_size: this.CorporateForm.value.corporate_size,
        corporate_contract: this.CorporateForm.value.corporate_contract,
        payment_term: +this.CorporateForm.value.payment_term ? this.CorporateForm.controls.payment_term.value: null,
        ontrip_maintenance: +this.CorporateForm.controls.ontrip_maintenance.value,
        account_holder_name: this.CorporateForm.value.account_holder_name ? this.CorporateForm.controls.account_holder_name.value: null,
        account_no: this.CorporateForm.value.account_no ? this.CorporateForm.controls.account_no.value: null,
        ifsc_code: this.CorporateForm.value.ifsc_code ? this.CorporateForm.controls.ifsc_code.value: null,
        cin_no: this.CorporateForm.value.cin_no ? this.CorporateForm.controls.cin_no.value: null,
        bank_name: this.CorporateForm.value.bank_name ? this.CorporateForm.controls.bank_name.value: null,
        branch_name: this.CorporateForm.value.branch_name ? this.CorporateForm.controls.branch_name.value: null,
        bank_address: this.CorporateForm.value.bank_address ? this.CorporateForm.controls.bank_address.value: null,
      }
      this.corporateform.emit(formData);
      console.log(formData);
    }
    
  }

  // addAnotherCorporate() {
  //   var postedData: CorporateManagement;
  //   postedData = {
  //    partner_type:this.CorporateForm.controls.partner_type.value,
  //    partner_code:this.CorporateForm.controls.partner_code.value,
  //    partner_name:this.CorporateForm.controls.partner_name.value,
  //    partner_category:this.CorporateForm.controls.partner_category.value,
  //    company_name:this.CorporateForm.controls.company_name.value,
  //    contact_address1:this.CorporateForm.controls.contact_address1.value,
  //    contact_address2: this.CorporateForm.controls.contact_address2.value,
  //    city: this.CorporateForm.controls.city.value,
  //    postal_code: +this.CorporateForm.controls.postal_code.value,
  //    contact_phone: this.CorporateForm.controls.contact_phone.value,
  //    contact_person: this.CorporateForm.controls.contact_person.value,
  //    country_code: this.CorporateForm.controls.country_code.value,
  //    billing_name: this.CorporateForm.controls.billing_name.value,
  //    gst_numbers: this.CorporateForm.controls.gst_numbers.value,
  //    corporate_size: this.CorporateForm.controls.corporate_size.value,
  //    corporate_contract: this.CorporateForm.controls.corporate_contract.value,
  //    billing_type: this.CorporateForm.controls.billing_type.value,
  //    payment_term: +this.CorporateForm.controls.payment_term.value,
  //    bill_generation_frequency: +this.CorporateForm.controls.bill_generation_frequency.value,
  //    minimum_wallet_balance: +this.CorporateForm.controls.minimum_wallet_balance.value,
  //   }
  //   this.addanotherCorporateevent.emit(postedData);
  //   this.CorporateForm.reset();
  //   this.CorporateForm.setErrors(null);
  //   this.CorporateForm.updateValueAndValidity();
  //   console.log(postedData);
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

  formatResponse = map((val: any) => {
    return val.response ? {duplicatePartnerCode: true } : null;
  });

  validatePartnerCode(control: AbstractControl) {
    var booleanResponse = this.corporateService.DuplicateCorporatePartCode(control.value);
    return this.formatResponse(booleanResponse);
  }

  OnChange(value: number) {
    console.log(value);
    // if(!!value){
      if(value != 3){
        this.CorporateForm.get('payment_term').clearValidators();
        this.CorporateForm.get('bank_address').clearValidators();
        this.CorporateForm.get('account_no').clearValidators();
        this.CorporateForm.get('branch_name').clearValidators();
        this.CorporateForm.get('bank_name').clearValidators();
        this.CorporateForm.get('cin_no').clearValidators();
        this.CorporateForm.get('ifsc_code').clearValidators();
        this.CorporateForm.get('account_holder_name').clearValidators();
      }
      else{
        this.CorporateForm.get('payment_term').setValidators([Validators.required,Ms3Validators.integer]);
        this.CorporateForm.get('bank_address').setValidators([Validators.required]);
        this.CorporateForm.get('account_no').setValidators([Validators.required]);
        this.CorporateForm.get('branch_name').setValidators([Validators.required]);
        this.CorporateForm.get('bank_name').setValidators([Validators.required]);
        this.CorporateForm.get('cin_no').setValidators([Validators.required]);
        this.CorporateForm.get('ifsc_code').setValidators([Validators.required]);
        this.CorporateForm.get('account_holder_name').setValidators([Validators.required]);
      }
      
    this.CorporateForm.get('payment_term').updateValueAndValidity();
    this.CorporateForm.get('bank_address').updateValueAndValidity();
    this.CorporateForm.get('account_no').updateValueAndValidity();
    this.CorporateForm.get('branch_name').updateValueAndValidity();
    this.CorporateForm.get('bank_name').updateValueAndValidity();
    this.CorporateForm.get('cin_no').updateValueAndValidity();
    this.CorporateForm.get('ifsc_code').updateValueAndValidity();
    this.CorporateForm.get('account_holder_name').updateValueAndValidity();
    // }
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
    // this.corporatePricingForm.controls.bill_generation_frequency.patchValue(null);
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

  // billSelection(data){
  //   // this.FilterRentalPoint=this.RentalPoint.filter(element => element.region_id==data.value)
  //   this.FilterPayment=this.Bill.filter(element => element.domain_id==data.value)
  //   console.log(data);
  // }

  // paymentSelection(data){
  //   // this.addDeployForm.patchValue({
  //   //   region: this.FilterRentalPoint.find(element => element.rentalpoint_id==data.value).region_id
  //   // })
  //   this.corporatePricingForm.patchValue({
  //     bill: this.FilterPayment.find(element => element.domain_id==data.value).domain_id 
  //   })
  //   console.log(data);
  // }
  

}
