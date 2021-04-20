import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PricingItem } from 'src/app/models/pricingManagement';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { LanguageService } from 'src/app/service/language/language.service';
import { take } from 'rxjs/operators';
import { CorporateManagement } from 'src/app/models/corporateManagement';

@Component({
  selector: 'app-pricing-edit',
  templateUrl: './pricing-edit.component.html',
  styleUrls: ['./pricing-edit.component.scss']
})
export class PricingEditComponent implements OnInit {

  @Output() update = new EventEmitter<PricingItem>();
  @Output() cancel = new EventEmitter();
  @Input() priceTabletype$: Observable<DomainData[]>;
  @Input() pricingItem$: Observable<PricingItem>;
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() regions$: Observable<RegionItem[]>;
  @Input() corporate$: Observable<CorporateManagement[]>;
  subs = new SubSink();
  PricingForm: FormGroup;
  UserCorporateForm: FormGroup;
  adminPartner: boolean = false;

  constructor(private formbuilder: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
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
    });

    this.UserCorporateForm = this.formbuilder.group({
      admn_partner_id: [""], 
    });

    this.subs.add(this.pricingItem$.subscribe(
      (data) => {
        if (!!data) {
          console.log("Patching");
          console.log(data);
          if(data.price_table_type == 2){
            this.PricingForm.patchValue(data);
            this.UserCorporateForm.patchValue(data);
            this.priceTypeSelection(2);            
            this.adminPartner = true;
          }
          else {
            this.PricingForm.patchValue(data);
            this.adminPartner = false;
          }
        }
      }
    ));
  }

  Update() {
    if (+this.PricingForm.value.price_table_type != 2) {
      this.pricingItem$.pipe(take(1)).subscribe(
        (pricingItem) => {
          var data = { ...pricingItem };
          data.cost = +this.PricingForm.controls.cost.value;
          data.temp_cost = !!this.PricingForm.controls.temp_cost.value ? +this.PricingForm.controls.temp_cost.value : null;
          data.display_name = this.PricingForm.controls.display_name.value;
          data.min_amount = +this.PricingForm.controls.min_amount.value;
          data.per_minute_unit = +this.PricingForm.controls.per_minute_unit.value;
          data.region = +this.PricingForm.controls.region.value ? +this.PricingForm.controls.region.value : null;
          data.tier = +this.PricingForm.controls.tier.value;
          data.tier_max_value = +this.PricingForm.controls.tier_max_value.value;
          data.tier_min_value = +this.PricingForm.controls.tier_min_value.value;
          data.vehicle_type = +this.PricingForm.controls.vehicle_type.value;
          data.vehicle_unlocked_cost = +this.PricingForm.controls.vehicle_unlocked_cost.value;
          data.price_table_type = +this.PricingForm.controls.price_table_type.value;
          data.admn_partner_id = null;

          this.update.emit(data);
        }
      );
    }
    else {
      this.pricingItem$.pipe(take(1)).subscribe(
        (pricingItem) => {
          var data = { ...pricingItem };
          data.cost = +this.PricingForm.controls.cost.value;
          data.temp_cost = !!this.PricingForm.controls.temp_cost.value ? +this.PricingForm.controls.temp_cost.value : null;
          data.display_name = this.PricingForm.controls.display_name.value;
          data.min_amount = +this.PricingForm.controls.min_amount.value;
          data.per_minute_unit = +this.PricingForm.controls.per_minute_unit.value;
          data.region = +this.PricingForm.controls.region.value;
          data.tier = +this.PricingForm.controls.tier.value;
          data.tier_max_value = +this.PricingForm.controls.tier_max_value.value;
          data.tier_min_value = +this.PricingForm.controls.tier_min_value.value;
          data.vehicle_type = +this.PricingForm.controls.vehicle_type.value;
          data.vehicle_unlocked_cost = +this.PricingForm.controls.vehicle_unlocked_cost.value;
          data.price_table_type = +this.PricingForm.controls.price_table_type.value;
          data.admn_partner_id = +this.UserCorporateForm.controls.admn_partner_id.value;

          this.update.emit(data);
        }
      );
    }
  }

  Cancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  priceTypeSelection(value: number){
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
