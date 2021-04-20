import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { CorporateManagement } from 'src/app/models/corporateManagement';
@Component({
  selector: 'app-battery-swap-pricing-add',
  templateUrl: './battery-swap-pricing-add.component.html',
  styleUrls: ['./battery-swap-pricing-add.component.scss']
})
export class BatterySwapPricingAddComponent implements OnInit {
  @Output() addPricing = new EventEmitter<BatteryswapPricingItem>();
  @Output() cancelAdd = new EventEmitter();
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() regions$: Observable<RegionItem[]>;
  BatterySwapPricingForm: FormGroup;
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

  createForm() {
    this.BatterySwapPricingForm = this.formbuilder.group({
      display_name: ["", [Validators.required]],
      no_of_initial_swap: ["", [Validators.required]],
      initial_swap_price: ["", [Validators.required]],
      consecutive_swap_price: ["", [Validators.required]],
      vehicle_type: ["", [Validators.required]],
      region: [""],
      price_table_type: ["", [Validators.required]],
    })
  }
  createCorporateUserForm() {
    this.UserCorporateForm = this.formbuilder.group({
      admn_partner_id: [''],
    });
  }

  AddPricing() {
    if (+this.BatterySwapPricingForm.value.price_table_type != 2) {
      var data: BatteryswapPricingItem = {

        display_name: this.BatterySwapPricingForm.controls.display_name.value,
        region: +this.BatterySwapPricingForm.controls.region.value ? +this.BatterySwapPricingForm.controls.region.value: null,
        vehicle_type: +this.BatterySwapPricingForm.controls.vehicle_type.value,
        no_of_initial_swap: +this.BatterySwapPricingForm.controls.no_of_initial_swap.value,
        initial_swap_price: +this.BatterySwapPricingForm.controls.initial_swap_price.value,
        consecutive_swap_price: +this.BatterySwapPricingForm.controls.consecutive_swap_price.value,
        price_table_type: +this.BatterySwapPricingForm.controls.price_table_type.value,
      }

      this.addPricing.emit(data);
    }
    else {
      var data: BatteryswapPricingItem = {
        display_name: this.BatterySwapPricingForm.controls.display_name.value,
        region: +this.BatterySwapPricingForm.controls.region.value? +this.BatterySwapPricingForm.controls.region.value: null,
        vehicle_type: +this.BatterySwapPricingForm.controls.vehicle_type.value,
        no_of_initial_swap: +this.BatterySwapPricingForm.controls.no_of_initial_swap.value,
        initial_swap_price: +this.BatterySwapPricingForm.controls.initial_swap_price.value,
        consecutive_swap_price: +this.BatterySwapPricingForm.controls.consecutive_swap_price.value,
        price_table_type: +this.BatterySwapPricingForm.controls.price_table_type.value,
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

}
