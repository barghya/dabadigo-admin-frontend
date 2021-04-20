import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PricingItem } from 'src/app/models/pricingManagement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { LanguageService } from 'src/app/service/language/language.service';
import { ActivatedRoute } from '@angular/router';
import { CorporateManagement } from 'src/app/models/corporateManagement';

@Component({
  selector: 'app-pricing-add',
  templateUrl: './pricing-add.component.html',
  styleUrls: ['./pricing-add.component.scss']
})
export class PricingAddComponent implements OnInit {

  @Output() addPricing = new EventEmitter<PricingItem>();
  @Output() addAnotherPricing = new EventEmitter<PricingItem>();
  @Output() cancelAdd = new EventEmitter();
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() regions$: Observable<RegionItem[]>;
  PricingForm: FormGroup;
  UserCorporateForm: FormGroup;
  @Input() priceTabletype$: Observable<DomainData[]>;
  @Input() corporate$: Observable<CorporateManagement[]>;
  adminPartnerid: number;
  adminPartner: boolean = false;
  

  constructor(private formbuilder: FormBuilder, public languageService: LanguageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.createCorporateUserForm();
  }
  createForm(){
    this.PricingForm = this.formbuilder.group({
      display_name: ["", [Validators.required]],
      tier: ["", [Validators.required, Ms3Validators.integer]],
      tier_min_value: ["", [Validators.required, Ms3Validators.integer]],
      tier_max_value: ["", [Validators.required, Ms3Validators.integer]],
      per_minute_unit: ["", [Validators.required, Ms3Validators.integer]],
      cost: ["", [Validators.required, Ms3Validators.Currency]],
      temp_cost: [null],
      min_amount: ["", [Validators.required, Ms3Validators.Currency]],
      vehicle_unlocked_cost: ["", [Validators.required, Ms3Validators.Currency]],
      vehicle_type: ["", [Validators.required]],
      region: [""],
      price_table_type: ["", [Validators.required]], 
    })
  }
  createCorporateUserForm(){
    this.UserCorporateForm = this.formbuilder.group({
      admn_partner_id: [''],
    });
  }
  
 
  AddPricing() {
    if (+this.PricingForm.value.price_table_type != 2) {
      var data: PricingItem = {
        cost: +this.PricingForm.controls.cost.value,
        temp_cost: !!this.PricingForm.controls.temp_cost.value ? +this.PricingForm.controls.temp_cost.value : null,
        display_name: this.PricingForm.controls.display_name.value,
        min_amount: +this.PricingForm.controls.min_amount.value,
        per_minute_unit: +this.PricingForm.controls.per_minute_unit.value,
        region: +this.PricingForm.controls.region.value ? +this.PricingForm.controls.region.value : null,
        tier: +this.PricingForm.controls.tier.value,
        tier_max_value: +this.PricingForm.controls.tier_max_value.value,
        tier_min_value: +this.PricingForm.controls.tier_min_value.value,
        vehicle_type: +this.PricingForm.controls.vehicle_type.value,
        vehicle_unlocked_cost: +this.PricingForm.controls.vehicle_unlocked_cost.value,
        price_table_type: +this.PricingForm.controls.price_table_type.value,
      }

      this.addPricing.emit(data);
    }
    else {
      var data: PricingItem = {
        cost: +this.PricingForm.controls.cost.value,
        temp_cost: !!this.PricingForm.controls.temp_cost.value ? +this.PricingForm.controls.temp_cost.value : null,
        display_name: this.PricingForm.controls.display_name.value,
        min_amount: +this.PricingForm.controls.min_amount.value,
        per_minute_unit: +this.PricingForm.controls.per_minute_unit.value,
        region: +this.PricingForm.controls.region.value ? +this.PricingForm.controls.region.value : null ,
        tier: +this.PricingForm.controls.tier.value,
        tier_max_value: +this.PricingForm.controls.tier_max_value.value,
        tier_min_value: +this.PricingForm.controls.tier_min_value.value,
        vehicle_type: +this.PricingForm.controls.vehicle_type.value,
        vehicle_unlocked_cost: +this.PricingForm.controls.vehicle_unlocked_cost.value,
        price_table_type: +this.PricingForm.controls.price_table_type.value,
        admn_partner_id: +this.UserCorporateForm.controls.admn_partner_id.value,
      }

      this.addPricing.emit(data);
    }
  }

  OnChange(value: number) {
    console.log(value);
    if (value == 2) {
      this.UserCorporateForm.get('admn_partner_id').setValidators([Validators.required]);
      this.adminPartner = true;
    }
    else {
      this.UserCorporateForm.get('admn_partner_id').clearValidators();
      this.adminPartner = false;
    }
    this.UserCorporateForm.get('admn_partner_id').updateValueAndValidity();
  }
  CancelAdd() {
    this.cancelAdd.emit();
  }
  pricingTierMaxValidation(){
    if (+this.PricingForm.controls.tier_max_value.value) {
      if (+this.PricingForm.controls.tier_min_value.value && 
        (+this.PricingForm.controls.tier_max_value.value < +this.PricingForm.controls.tier_min_value.value)) {
        this.PricingForm.get('tier_max_value').reset();
      }
    }
  }
  
  pricingTierMinValidation(){
    if (+this.PricingForm.controls.tier_min_value.value) {
      if (+this.PricingForm.controls.tier_max_value.value && 
        (+this.PricingForm.controls.tier_min_value.value > +this.PricingForm.controls.tier_max_value.value)) {
          this.PricingForm.get('tier_min_value').reset();
      }
    }
  }
 

}
