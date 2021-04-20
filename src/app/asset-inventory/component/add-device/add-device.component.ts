import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { addDevice, adminDevice, countries} from 'src/app/models/asset-inventoryModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { map } from 'rxjs/operators';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AddDeviceComponent implements OnInit {
  @Output() adddeviceevent = new EventEmitter();
  @Output() addanotherdeviceevent = new EventEmitter();
  @Output() cancelAddDeviceevent = new EventEmitter();
  @Input() deviceStatus$: Observable<DomainData[]>;
  @Input() countriesName$: Observable<countries[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() availableRegions$: Observable<RegionItem[]>;
  @Input() deviceModels$: Observable<DomainData[]>;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  deviceForm : FormGroup;
  filteredRegions$ :  Observable<RegionItem[]>;
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,private router: Router, private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.deviceForm = this.formbuilder.group({
      device_name: ['', [Validators.required]],
      device_make: ['', [Validators.required]],
      device_code: ['',[Validators.required],  [this.validateDevicecode.bind(this)]],
      device_model: ['', [Validators.required]],
      country_of_origin: ['', [Validators.required]],
      manufacturing_date: ['',[Validators.required]],
      commissioning_date: [''],
      device_imei: ['', [Validators.required,Ms3Validators.integer], [this.validateImeiCode.bind(this)]],
      device_status: [{ value: 2, disabled: true }, [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
    })
  }

  addDevice() {
   console.log('123');
   var formData: addDevice = {
     device_name: this.deviceForm.controls.device_name.value,
     device_make: this.deviceForm.controls.device_make.value,
     device_code: this.deviceForm.controls.device_code.value,
     device_model: this.deviceForm.controls.device_model.value,
     country_of_origin: this.deviceForm.controls.country_of_origin.value,
     manufacturing_date: this.deviceForm.controls.manufacturing_date.value,
     commissioning_date: this.deviceForm.controls.commissioning_date.value,
     device_imei: this.deviceForm.controls.device_imei.value,
     device_status : this.deviceForm.controls.device_status.value,
     city: +this.deviceForm.controls.city.value,
     region: +this.deviceForm.controls.region.value,
   }
    this.adddeviceevent.emit(formData);
    console.log(formData);
    
  }

  addAnotherDevice() {
    var postedData: addDevice;
    postedData = {
      device_name: this.deviceForm.controls.device_name.value,
      device_make: this.deviceForm.controls.device_make.value,
      device_code: this.deviceForm.controls.device_code.value,
      device_model: this.deviceForm.controls.device_model.value,
      country_of_origin: this.deviceForm.controls.country_of_origin.value,
      manufacturing_date: this.deviceForm.controls.manufacturing_date.value,
      commissioning_date: this.deviceForm.controls.commissioning_date.value,
      device_imei: this.deviceForm.controls.device_imei.value,
      device_status : this.deviceForm.controls.device_status.value,
      city: +this.deviceForm.controls.city.value,
      region: +this.deviceForm.controls.region.value,
    }
    
    this.addanotherdeviceevent.emit(postedData);
    this.deviceForm.reset();
    this.deviceForm.setErrors(null);
    this.deviceForm.updateValueAndValidity();
    console.log(postedData);
  }

  cancelAddDevice() {
    this.cancelAddDeviceevent.emit();
  }
  formatResponsedeviceTag = map((val: any) => {
    return val.response ? {duplicateDevicecode: true } : null;
  });

  validateDevicecode(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.DuplicateDevice(control.value);
    return this.formatResponsedeviceTag(booleanResponse);
  }

  formatResponseImeiNumber = map((val: any) => {
    return val.response ? {duplicateImeiCode: true} : null;
  });

  validateImeiCode(control: AbstractControl) {
    var booleanresponse = this.assetInventoryService.DuplicateImeiNumber(control.value);
    return this.formatResponseImeiNumber(booleanresponse);
  }
  StartDateChanged(){
    if (this.deviceForm.controls.manufacturing_date.value) {
      if (this.deviceForm.controls.commissioning_date.value && 
        (this.deviceForm.controls.manufacturing_date.value >= this.deviceForm.controls.commissioning_date.value)) {
          this.deviceForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.deviceForm.controls.manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }
  CitySelected(city_id: number) {
    this.filteredRegions$ = this.availableRegions$.pipe(map(
      regionList => regionList.filter(m => m.city_id == city_id)
    ))
    this.deviceForm.controls.region.patchValue(null);
  }
}
