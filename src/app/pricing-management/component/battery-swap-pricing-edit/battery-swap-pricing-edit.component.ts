import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-battery-swap-pricing-edit',
  templateUrl: './battery-swap-pricing-edit.component.html',
  styleUrls: ['./battery-swap-pricing-edit.component.scss']
})
export class BatterySwapPricingEditComponent implements OnInit {
  @Output() update = new EventEmitter<BatteryswapPricingItem>();
  @Output() cancel = new EventEmitter();
  @Input() priceTabletype$: Observable<DomainData[]>;
  @Input() pricingItem$: Observable<BatteryswapPricingItem>;
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() regions$: Observable<RegionItem[]>;
  @Input() corporate$: Observable<CorporateManagement[]>;
  subs = new SubSink();
  BatterySwapPricingForm: FormGroup;
  UserCorporateForm: FormGroup;
  adminPartner: boolean = false;
  constructor(private formbuilder: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.BatterySwapPricingForm = this.formbuilder.group({
      display_name: ["", [Validators.required]],
      no_of_initial_swap: ["", [Validators.required]],
      initial_swap_price: ["", [Validators.required]],
      consecutive_swap_price: ["", [Validators.required]],
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
            this.BatterySwapPricingForm.patchValue(data);
            this.UserCorporateForm.patchValue(data);
            this.priceTypeSelection(2);            
            this.adminPartner = true;
          }
          else {
            this.BatterySwapPricingForm.patchValue(data);
            this.adminPartner = false;
          }
        }
      }
    ));
  }

  Update() {
    if (+this.BatterySwapPricingForm.value.price_table_type != 2) {
      this.pricingItem$.pipe(take(1)).subscribe(
        (pricingItem) => {
          var data = { ...pricingItem };
         
          data.display_name = this.BatterySwapPricingForm.controls.display_name.value;
          data.no_of_initial_swap = this.BatterySwapPricingForm.controls.no_of_initial_swap.value;
          data.initial_swap_price = this.BatterySwapPricingForm.controls.initial_swap_price.value;
          data.consecutive_swap_price = this.BatterySwapPricingForm.controls.consecutive_swap_price.value;
          data.vehicle_type = +this.BatterySwapPricingForm.controls.vehicle_type.value;
          data.region = +this.BatterySwapPricingForm.controls.region.value? +this.BatterySwapPricingForm.controls.region.value: null;
          data.price_table_type = +this.BatterySwapPricingForm.controls.price_table_type.value;
          data.admn_partner_id = null;

          this.update.emit(data);
        }
      );
    }
    else {
      this.pricingItem$.pipe(take(1)).subscribe(
        (pricingItem) => {
          var data = { ...pricingItem };
          data.display_name = this.BatterySwapPricingForm.controls.display_name.value;
          data.no_of_initial_swap = this.BatterySwapPricingForm.controls.no_of_initial_swap.value;
          data.initial_swap_price = this.BatterySwapPricingForm.controls.initial_swap_price.value;
          data.consecutive_swap_price = this.BatterySwapPricingForm.controls.consecutive_swap_price.value;
          data.vehicle_type = +this.BatterySwapPricingForm.controls.vehicle_type.value;
          data.region = +this.BatterySwapPricingForm.controls.region.value;
          data.price_table_type = +this.BatterySwapPricingForm.controls.price_table_type.value;
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


}
