import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { DomainData } from 'src/app/models/domainModel';
import { Router } from '@angular/router';
import { battery, countries } from 'src/app/models/asset-inventoryModel';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { map } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { NativeDateAdapter } from '@angular/material';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';
import { region } from 'src/app/models/userManagement';

@Component({
  selector: 'app-add-battery',
  templateUrl: './add-battery.component.html',
  styleUrls: ['./add-battery.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AddBatteryComponent implements OnInit {

  addBatteryForm: FormGroup;
  formData: battery;

  @Output() addAnotherBatteryEvent = new EventEmitter();
  @Output() addbatteryEvent = new EventEmitter<battery>();
  @Input() batteryStatus$: Observable<DomainData[]>;
  @Input() countryName$: Observable<countries[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() availableRegions$: Observable<RegionItem[]>;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  filteredRegions$ :  Observable<RegionItem[]>;
  constructor(public languageService: LanguageService, public fb: FormBuilder, private store: Store<AppState>, private router: Router, private assetInventoryService: AssetInventoryService) { }

  

  ngOnInit() {
    
    this.addBatteryForm = this.fb.group({
      battery_tag: ['', [Validators.required],[this.validateBatteryTag.bind(this)]],
      battery_manufacturer: ['', [Validators.required]],
      battery_model: ['', [Validators.required]],
      country_of_origin: ['', [Validators.required]],
      battery_manufacturing_date: ['', [Validators.required]],
      commissioning_date: [''],
      battery_power: ['', [Validators.required]],
      warranty_period: ['', [Validators.required,Ms3Validators.integer]],
      battery_status: ['', [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
    })
  }


  addBattery() {
    var formData: battery = {
      battery_tag: this.addBatteryForm.controls.battery_tag.value,
      battery_make: this.addBatteryForm.controls.battery_manufacturer.value,
      battery_model: this.addBatteryForm.controls.battery_model.value,
      country_of_origin: this.addBatteryForm.controls.country_of_origin.value,
      battery_manufacturing_date: this.addBatteryForm.controls.battery_manufacturing_date.value,
      commissioning_date: this.addBatteryForm.controls.commissioning_date.value,
      battery_power: this.addBatteryForm.controls.battery_power.value,
      warranty_period: this.addBatteryForm.controls.warranty_period.value,
      battery_status: +this.addBatteryForm.controls.battery_status.value,
      city: +this.addBatteryForm.controls.city.value,
      region: +this.addBatteryForm.controls.region.value,
      assignment_status: null
    }

    this.addbatteryEvent.emit(formData);
  }

  addAnotherBattery() {
    var formData: battery = {
      battery_tag: this.addBatteryForm.controls.battery_tag.value,
      battery_make: this.addBatteryForm.controls.battery_manufacturer.value,
      battery_model: this.addBatteryForm.controls.battery_model.value,
      country_of_origin: this.addBatteryForm.controls.country_of_origin.value,
      battery_manufacturing_date: this.addBatteryForm.controls.battery_manufacturing_date.value,
      commissioning_date: this.addBatteryForm.controls.commissioning_date.value,
      battery_power: this.addBatteryForm.controls.battery_power.value,
      warranty_period: this.addBatteryForm.controls.warranty_period.value,
      battery_status: +this.addBatteryForm.controls.battery_status.value,
      city: +this.addBatteryForm.controls.city.value,
      region: +this.addBatteryForm.controls.region.value,
      assignment_status: null
    }

    this.addAnotherBatteryEvent.emit(formData);
    this.addBatteryForm.reset();
    this.addBatteryForm.setErrors(null);
    this.addBatteryForm.updateValueAndValidity();
    console.log(formData);
  }

  StartDateChange() {
    if(this.addBatteryForm.controls.battery_manufacturing_date.value) {
      if(this.addBatteryForm.controls.commissioning_date.value && 
        (this.addBatteryForm.controls.battery_manufacturing_date.value >= this.addBatteryForm.controls.commissioning_date.value)) {
          this.addBatteryForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.addBatteryForm.controls.battery_manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  cancelAddBattery() {
    console.log("cancelled");
    this.router.navigate(['asset-inventory', 'battery-main']);
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicateBatteryTag: true} : null;
  });

  validateBatteryTag(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.DuplicateBatteryTagURL(control.value);
    return this.formatResponse(booleanResponse);
  }
  CitySelected(city_id: number) {
    this.filteredRegions$ = this.availableRegions$.pipe(map(
      regionList => regionList.filter(m => m.city_id == city_id)
    ))
    this.addBatteryForm.controls.region.patchValue(null);
  }
}

