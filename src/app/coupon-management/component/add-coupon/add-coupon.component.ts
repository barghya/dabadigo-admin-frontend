import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { couponManagement } from 'src/app/models/couponManagementModel';
import { map } from 'rxjs/operators';
import { CouponManagementService } from 'src/app/service/coupon-management/coupon-management.service';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  addCouponForm: FormGroup
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);

  @Input() discountType$: Observable<DomainData[]>;
  @Input() couponType$: Observable<DomainData[]>;
  @Input() usageRestriction$: Observable<DomainData[]>;
  @Input() countries$?: Observable<countries[]>;
  @Input() states$?: Observable<states[]>;
  @Input() cities$?: Observable<CityItem[]>;
  @Output() addCouponEvent = new EventEmitter();
  @Output() addAnotherCouponEvent = new EventEmitter();
  @Output() cancelCouponEvent = new EventEmitter();

  constructor(private fb: FormBuilder, public languageService: LanguageService, public couponManagementService: CouponManagementService) { }

  ngOnInit() {
    this.addCouponForm = this.fb.group({
      coupon_code: ["", [Validators.required], [this.validateCouponCode.bind(this)]],
      coupon_description: ["", [Validators.required]],
      discount_type: ["", [Validators.required]],
      coupon_type: ["", [Validators.required]],
      usage_restriction: [""],
      value: [""],
      time: [""],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      countries_id: ["", [Validators.required]],
      states_id: [""],
      city_id: [""],
    })
  }

  AddCoupon() { 
    var formdata: couponManagement = {
      coupon_code: this.addCouponForm.controls.coupon_code.value,
      coupon_description: this.addCouponForm.controls.coupon_description.value,
      discount_type: this.addCouponForm.controls.discount_type.value,
      coupon_type: this.addCouponForm.controls.coupon_type.value,
      usage_restriction: this.addCouponForm.controls.usage_restriction.value,
      value: +this.addCouponForm.controls.value.value,
      time: +this.addCouponForm.controls.time.value,
      start_date: this.addCouponForm.controls.start_date.value,
      end_date: this.addCouponForm.controls.end_date.value,
      countries_id: this.addCouponForm.controls.countries_id.value,
      states_id: this.addCouponForm.controls.states_id.value,
      city_id: this.addCouponForm.controls.city_id.value,
    }
    console.log(formdata );
    this.addCouponEvent.emit(formdata);
  }

  Cancelcoupon() { 
    this.cancelCouponEvent.emit();
  }

  StartDateChanged(){
    if (this.addCouponForm.controls.start_date.value) {
      if (this.addCouponForm.controls.end_date.value && 
        (this.addCouponForm.controls.start_date.value >= this.addCouponForm.controls.end_date.value)) {
          this.addCouponForm.get('end_date').reset();
        }
    }
    var fromDate: Date = new Date(this.addCouponForm.controls.start_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  get time(): FormControl {
    return <FormControl> this.addCouponForm.get('time');
  }

  get value(): FormControl {
    return <FormControl> this.addCouponForm.get('value');
  }

  onSelectValueChange(value: any) {
    console.log(value);
    if (value == 1) {
      this.addCouponForm.get('value').setValidators([Validators.required]);
      this.addCouponForm.get('time').setValidators([Validators.required]);
    }
    else if(value == 2 || value == 4) {
      this.addCouponForm.get('value').setValidators([Validators.required]);
      this.addCouponForm.get('time').clearValidators();
    }
    else if(value == 3) {
      this.addCouponForm.get('time').setValidators([Validators.required]);
      this.addCouponForm.get('value').clearValidators();
    }
    else {
      this.addCouponForm.get('value').clearValidators();
      this.addCouponForm.get('time').clearValidators();
    }
    this.addCouponForm.get('value').updateValueAndValidity();
    this.addCouponForm.get('time').updateValueAndValidity();
  }

  onSelectValueChangeofUsageRestriction(value: any) {
    console.log(value);
    if(value == 2) {
      this.addCouponForm.get('usage_restriction').setValue(1);
      this.addCouponForm.get('usage_restriction').disable();
    }
    else if(value == 1){
      this.addCouponForm.get('usage_restriction').setValue(2);
      this.addCouponForm.get('usage_restriction').enable();
    }
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicateCouponCode: true}: null;
  });

  validateCouponCode(control: AbstractControl) {
    var booleanResponse = this.couponManagementService.duplicateCouponCode(control.value);
    return this.formatResponse(booleanResponse);
  }

}
