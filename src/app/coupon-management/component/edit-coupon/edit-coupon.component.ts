import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { couponManagement } from 'src/app/models/couponManagementModel';
import { DomainData } from 'src/app/models/domainModel';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit, OnDestroy {
  CouponForm: FormGroup;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  @Input() discountType$: Observable<DomainData[]>;
  @Input() couponType$: Observable<DomainData[]>;
  @Input() usageRestriction$: Observable<DomainData[]>;
  @Input() singleCoupon$: Observable<couponManagement>;
  @Input() countries$?: Observable<countries[]>;
  @Input() states$?: Observable<states[]>;
  @Input() cities$?: Observable<CityItem[]>;
  @Output() editCouponEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  subs = new SubSink();

  constructor(public languageService: LanguageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.CouponForm = this.fb.group({
      coupon_code: ["", [Validators.required]],
      coupon_description: ["", [Validators.required]],
      discount_type: ["", [Validators.required]],
      coupon_type: ["", [Validators.required]],
      usage_restriction: ["", [Validators.required]],
      value: ["", [Validators.required]],
      time: ["", [Validators.required]],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      countries_id: ["", [Validators.required]],
      states_id: [""],
      city_id: [""],
    })
    this.subs.add(this.singleCoupon$.subscribe(
      (data) => {
        if(!!data) {
          console.log("patching");
          console.log(data);
          var patchData = {...data};
          patchData.start_date = new Date(patchData.start_date);
          patchData.end_date = new Date(patchData.end_date);
          this.CouponForm.patchValue(patchData);
          this.onSelectValueChange(patchData.discount_type);
          this.StartDateChanged();
        }
      }
    ));
  }
  
  editCoupon() {
    this.singleCoupon$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.coupon_code = this.CouponForm.controls.coupon_code.value;
        formData.coupon_description = this.CouponForm.controls.coupon_description.value;
        formData.discount_type = this.CouponForm.controls.discount_type.value;
        formData.coupon_type = this.CouponForm.controls.coupon_type.value;
        formData.usage_restriction = this.CouponForm.controls.usage_restriction.value;
        formData.value = this.CouponForm.controls.value.value;
        formData.time = this.CouponForm.controls.time.value;
        formData.start_date = this.CouponForm.controls.start_date.value;
        formData.end_date = this.CouponForm.controls.end_date.value;
        formData.countries_id = this.CouponForm.controls.countries_id.value;
        formData.states_id = this.CouponForm.controls.states_id.value;
        formData.city_id = this.CouponForm.controls.city_id.value;
        console.log(data);
        this.editCouponEvent.emit(formData);
      }
    );
  }
  
  CancelCoupon() { 
    this.cancelEvent.emit();
  }

  StartDateChanged(){
    if (this.CouponForm.controls.start_date.value) {
      if (this.CouponForm.controls.end_date.value && 
        (this.CouponForm.controls.start_date.value >= this.CouponForm.controls.end_date.value)) {
          this.CouponForm.get('end_date').reset();
        }
    }
    var fromDate: Date = new Date(this.CouponForm.controls.start_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  get time(): FormControl {
    return <FormControl> this.CouponForm.get('time');
  }

  onSelectValueChange(value: any) {
    console.log(value);
    if (value == 1) {
      this.CouponForm.get('value').setValidators([Validators.required]);
      this.CouponForm.get('time').setValidators([Validators.required]);
    }
    else if(value == 2 || value == 4) {
      this.CouponForm.get('value').setValidators([Validators.required]);
      this.CouponForm.get('time').clearValidators();
    }
    else if(value == 3) {
      this.CouponForm.get('time').setValidators([Validators.required]);
      this.CouponForm.get('value').clearValidators();
    }
    else {
      this.CouponForm.get('value').clearValidators();
      this.CouponForm.get('time').clearValidators();
    }
    this.CouponForm.get('value').updateValueAndValidity();
    this.CouponForm.get('time').updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
