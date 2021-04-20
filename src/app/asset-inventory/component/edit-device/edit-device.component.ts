import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { adminDevice, addDevice, countries } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { take, map } from 'rxjs/operators';
import { DomainData } from 'src/app/models/domainModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit,OnChanges, OnDestroy {
  deviceeditForm: FormGroup;
  @Output() editdeviceevent = new EventEmitter();
  @Output() canceldeviceevent = new EventEmitter();
  @Input() singleDevice$: Observable<adminDevice>;
  @Output() deviceEditForm = new EventEmitter<adminDevice>();
  @Input() deviceStatus$: Observable<DomainData[]>;
  @Input() countriesName$: Observable<countries[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() availableRegions$: Observable<RegionItem[]>;
  @Input() deviceModels$: Observable<DomainData[]>;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  private subs = new SubSink();
  public updatedOn: Date;
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private router: Router, private store: Store<AppState>,private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.deviceeditForm = this.formbuilder.group({
      device_name: ['', [Validators.required]],
      device_make: ['', [Validators.required]],
      device_code: [''],
      device_model: ['', [Validators.required]],
      country_of_origin: ['', [Validators.required]],
      manufacturing_date: ['',[Validators.required]],
      commissioning_date: [''],
      device_imei: ['', [Validators.required,Ms3Validators.integer]],
      device_status: ['', [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
    })

    this.subs.add(this.singleDevice$.subscribe(
      (data) => {
        if (!!data) {
          var patchData = {...data};
          patchData.commissioning_date = new Date(patchData.commissioning_date);
          patchData.manufacturing_date = new Date(patchData.manufacturing_date);
          this.deviceeditForm.patchValue(data);
          this.device_code.disable();
          this.device_imei.disable();
          this.StartDateChanged();
          this.updatedOn = data.last_updated_on;
          console.log('updated on',this.updatedOn);
          this.deviceeditForm.controls['city'].disable()
          this.deviceeditForm.controls['region'].disable()
        }
      }
    ));
  }
  // formatResponseImeiNumber = map((val: any) => {
  //   return val.response ? {duplicateImeiCode: true} : null;
  // });

  // validateImeiCode(control: AbstractControl) {
  //   var booleanresponse = this.assetInventoryService.DuplicateImeiNumber(control.value);
  //   return this.formatResponseImeiNumber(booleanresponse);
  // }
  ngOnChanges() {
  }
  saveDevice() {
    this.singleDevice$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.device_name = this.deviceeditForm.controls.device_name.value;
        formData.device_make = this.deviceeditForm.controls.device_make.value;
        formData.device_code = this.deviceeditForm.controls.device_code.value;
        formData.device_model = this.deviceeditForm.controls.device_model.value;
        formData.country_of_origin = this.deviceeditForm.controls.country_of_origin.value;
        formData.manufacturing_date = this.deviceeditForm.controls.manufacturing_date.value;
        formData.commissioning_date = this.deviceeditForm.controls.commissioning_date.value;
        formData.device_imei = this.deviceeditForm.controls.device_imei.value;
        formData.device_status = this.deviceeditForm.controls.device_status.value,
        formData.city= +this.deviceeditForm.controls.city.value,
        formData.region= +this.deviceeditForm.controls.region.value,
        console.log(data);
        this.deviceEditForm.emit(formData);
      }
    );
    
    
  }
  cancelDevice() {
   this.canceldeviceevent.emit();
  }

  get device_code(): FormControl {
    return <FormControl> this.deviceeditForm.get('device_code');
  }

  get device_imei(): FormControl {
    return <FormControl> this.deviceeditForm.get('device_imei');
  }


  StartDateChanged(){
    if (this.deviceeditForm.controls.manufacturing_date.value) {
      if (this.deviceeditForm.controls.commissioning_date.value && 
        (this.deviceeditForm.controls.manufacturing_date.value >= this.deviceeditForm.controls.commissioning_date.value)) {
          this.deviceeditForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.deviceeditForm.controls.manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
