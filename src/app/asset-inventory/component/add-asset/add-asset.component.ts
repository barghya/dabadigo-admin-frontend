import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Assets, battery, adminDevice, parts, device, AddAsset, deviceId, partID, countries } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { DomainData } from 'src/app/models/domainModel';
import { startWith, map, take, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { region, regionId } from 'src/app/models/userManagement';
import { states, CityItem } from 'src/app/models/regionManagement';
import { AvailableFranchise } from 'src/app/models/rentalPoint';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit, OnChanges, OnDestroy {
  @Output() addassetevent = new EventEmitter();
  @Output() addanotherassetevent = new EventEmitter();
  @Input() vehicle_types$: Observable<DomainData[]>;
  @Input() ownership_types$: Observable<DomainData[]>;
  @Input() availableRegions$: Observable<region[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() franchise$: Observable<AvailableFranchise[]>;
  filteredRegions$: Observable<region[]>;
  regionsList: regionId[] = [];
  @Input() vehicle_status$: Observable<DomainData[]>;
  @Input() availableBattery$: Observable<battery[]>;
  filteredBattery$: Observable<battery[]>;
  @Input() availableDevice$: Observable<adminDevice[]>;
  filteredDevices$: Observable<adminDevice[]>;
  @Input() availableParts$: Observable<parts[]>;
  filteredParts$: Observable<parts[]>;
  @Output() addAsset = new EventEmitter<Assets>();
  @Output() addAnotherAsset = new EventEmitter<Assets>();
  @Output() cancel = new EventEmitter();
  AssetForm: FormGroup;
  assetFranchiseForm: FormGroup;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  private subs = new SubSink();
  deviceList: deviceId[] = [];
  partsList: partID[] = [];
  removable = true;
  selectable = true;
  buttonDisabled: boolean = true;
  selectedDevice: adminDevice;
  selectedBattery: battery;
  Franchise: boolean = false;

  constructor(private fb: FormBuilder, public languageService: LanguageService, private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.AssetForm = this.fb.group({
      vehicle_type: ["", [Validators.required]],
      manufacturer: ["", [Validators.required]],
      model: ["", [Validators.required]],
      manufacture_date: ["", [Validators.required]],
      warranty_expiry: [""],
      warranty_terms: ["", [Validators.required]],
      qrcode: ["", [Validators.required]],
      vehicle_idnumber: ["", [Validators.required], [this.validateID.bind(this)]],
      insurance_no: ["",[Validators.required]],
      insurance_career: ["",[Validators.required]],
      insurance_upto: ["",[Validators.required]],
      chassis_number: ["", [Validators.required]],
      ownership_type: ["", [Validators.required]],
      region_id: ["", [Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      country_id: ['',[Validators.required]],
      vehicle_status: [{ value: 1, disabled: true }, [Validators.required]],
      device: ["", [Validators.required]],
      battery: ["", [Validators.required]],
      parts: [""],
    });


      this.assetFranchiseForm = this.fb.group({
        franchise_id: [''],
      });

    this.filteredBattery$ = this.AssetForm.controls.battery.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showBattery(value).battery_tag + " - " + this.showBattery(value).battery_make + " - " + this.showBattery(value).battery_model),
      switchMap(value => !!this.availableBattery$ ?
        this.availableBattery$.pipe(take(1), map(batteries => !!batteries ? batteries.filter(m => (m.battery_tag + " - " + m.battery_make + " - " + m.battery_model).toLowerCase().includes(value.trim().toLowerCase())) : batteries))
        : this.availableBattery$
      )
    )
    this.filteredDevices$ = this.AssetForm.controls.device.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showDevice(value).device_name + " - " + this.showDevice(value).device_code),
      switchMap(value => !!this.availableDevice$ ?
        this.availableDevice$.pipe(take(1), map(devices => !!devices ? devices.filter(m => (m.device_name + " - " + m.device_code).toLowerCase().includes(value.trim().toLowerCase())) : devices))
        : this.availableDevice$
      )
    )
    this.filteredParts$ = this.AssetForm.controls.parts.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showPart(value).part_name + " - " + this.showPart(value).part_code),
      switchMap(value => !!this.availableParts$ ?
        this.availableParts$.pipe(take(1), map(part => !!part ? part.filter(m => (m.part_name + " - " + m.part_code).toLowerCase().includes(value.trim().toLowerCase())) : part))
        : this.availableParts$
      )
    )
  }

  ngOnChanges() {
  }

  AddAsset() {
    var formData = this.BuildData();
    if (this.CheckData()) {
      this.addassetevent.emit(formData);
    }
    else {
      //TODO: 
    }
  }

  // AddAnotherAsset() {
  //   var postedData = this.BuildData();
  //   if (this.CheckData()) {
  //       this.addanotherassetevent.emit(postedData);
  //       this.AssetForm.reset();
  //       this.AssetForm.setErrors(null);
  //       this.AssetForm.updateValueAndValidity();
  //   }
  //   else {
  //     //TODO:       
  //   }
  // }

  CheckData(): boolean {
    var batteryFlag = this.CheckBattery();
    var deviceFlag = this.CheckDevice();

    return (batteryFlag && deviceFlag);
  }

  CheckBattery(): boolean {
    if (!this.selectedBattery) {
      this.emptyBattery();
      return false;
    }
    if (isNaN(+this.AssetForm.controls.battery.value)) {
      this.emptyBattery();
      return false;
    }
    else {
      this.availableBattery$.pipe(take(1)).subscribe(
        data => {
          var battery = data.find(m => m.vehicle_battery_id == +this.AssetForm.controls.battery.value);
          if (battery != this.selectedBattery) {
            this.emptyBattery();
            return false;
          }
        }
      );
    }
    return true;
  }

  CheckDevice(): boolean {
    if (!this.selectedDevice) {
      this.emptyDevice();
      return false;
    }
    if (isNaN(+this.AssetForm.controls.device.value)) {
      this.emptyDevice();
      return false;
    }
    else {
      this.availableDevice$.pipe(take(1)).subscribe(
        data => {
          var device = data.find(m => m.device_id == +this.AssetForm.controls.device.value);
          if (device != this.selectedDevice) {
            this.emptyDevice();
            return false;
          }
        }
      );
    }
    return true;
  }

  emptyBattery() {
    this.AssetForm.controls.battery.setValue('');
    this.selectedBattery = null;
    this.filteredBattery$ = this.AssetForm.controls.battery.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showBattery(value).battery_tag + " - " + this.showBattery(value).battery_make + " - " + this.showBattery(value).battery_model),
      switchMap(value => !!this.availableBattery$ ?
        this.availableBattery$.pipe(take(1), map(batteries => !!batteries ? batteries.filter(m => (m.battery_tag + " - " + m.battery_make + " - " + m.battery_model).toLowerCase().includes(value.trim().toLowerCase())) : batteries))
        : this.availableBattery$
      )
    );
  }

  emptyDevice() {
    this.AssetForm.controls.device.setValue('');
    this.selectedDevice = null;
    this.filteredDevices$ = this.AssetForm.controls.device.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showDevice(value).device_name + " - " + this.showDevice(value).device_code),
      switchMap(value => !!this.availableDevice$ ?
        this.availableDevice$.pipe(take(1), map(devices => !!devices ? devices.filter(m => (m.device_name + " - " + m.device_code).toLowerCase().includes(value.trim().toLowerCase())) : devices))
        : this.availableDevice$
      )
    );
  }

  BuildData() {
    if(this.AssetForm.value.ownership_type != 3) {
      var postedData: AddAsset = {
        vehicle_type: this.AssetForm.controls.vehicle_type.value,
        manufacturer: this.AssetForm.controls.manufacturer.value,
        model: this.AssetForm.controls.model.value,
        manufacture_date: this.AssetForm.controls.manufacture_date.value,
        warranty_expiry: this.AssetForm.controls.warranty_expiry.value,
        warranty_terms: this.AssetForm.controls.warranty_terms.value,
        qrcode: this.AssetForm.controls.qrcode.value,
        vehicle_idnumber: this.AssetForm.controls.vehicle_idnumber.value,
        chassis_number: this.AssetForm.controls.chassis_number.value,
        ownership_type: this.AssetForm.controls.ownership_type.value,
        region_id: this.AssetForm.controls.region_id.value,
        state_id:  this.AssetForm.controls.state_id.value,
        city_id:  this.AssetForm.controls.city_id.value,
        country_id:  this.AssetForm.controls.country_id.value,
        vehicle_status: this.AssetForm.controls.vehicle_status.value,
        insurance_no: this.AssetForm.controls.insurance_no.value,
        insurance_career: this.AssetForm.controls.insurance_career.value,
        insurance_upto: this.AssetForm.controls.insurance_upto.value,
        batterydetails: [{
          vehicle_battery_id: this.AssetForm.controls.battery.value
        }],
        devicedetails: [{
          device_id: this.AssetForm.controls.device.value
        }],
        partsdetails: this.partsList,
      }
    }
   
      else {
        var postedData: AddAsset = {
          vehicle_type: this.AssetForm.controls.vehicle_type.value,
          manufacturer: this.AssetForm.controls.manufacturer.value,
          model: this.AssetForm.controls.model.value,
          manufacture_date: this.AssetForm.controls.manufacture_date.value,
          warranty_expiry: this.AssetForm.controls.warranty_expiry.value,
          warranty_terms: this.AssetForm.controls.warranty_terms.value,
          qrcode: this.AssetForm.controls.qrcode.value,
          vehicle_idnumber: this.AssetForm.controls.vehicle_idnumber.value,
          chassis_number: this.AssetForm.controls.chassis_number.value,
          ownership_type: this.AssetForm.controls.ownership_type.value,
          franchise_id: this.assetFranchiseForm.controls.franchise_id.value,
          region_id: this.AssetForm.controls.region_id.value,
          state_id:  this.AssetForm.controls.state_id.value,
          city_id:  this.AssetForm.controls.city_id.value,
          country_id:  this.AssetForm.controls.country_id.value,
          vehicle_status: this.AssetForm.controls.vehicle_status.value,
          insurance_no: this.AssetForm.controls.insurance_no.value,
          insurance_career: this.AssetForm.controls.insurance_career.value,
          insurance_upto: this.AssetForm.controls.insurance_upto.value,
          batterydetails: [{
            vehicle_battery_id: this.AssetForm.controls.battery.value
          }],
          devicedetails: [{
            device_id: this.AssetForm.controls.device.value
          }],
          partsdetails: this.partsList,
        }
      }

    return postedData;
  }

  displayFnBattery(vehicle_battery_id?: number): string | undefined {
    var battery: battery = !!vehicle_battery_id && !!this.availableBattery$ ? this.showBattery(vehicle_battery_id) : undefined;
    return battery ? battery.battery_tag + " - " + battery.battery_make + " - " + battery.battery_model : undefined;
  }
  displayFnDevice(device_id?: number): string | undefined {
    var device: adminDevice = !!device_id && !!this.availableDevice$ ? this.showDevice(device_id) : undefined;
    return device ? device.device_name + " - " + device.device_code : undefined;
  }
  displayFnParts(vehicle_part_id?: number): string | undefined {
    var parts: parts = !!vehicle_part_id && !!this.availableParts$ ? this.showPart(vehicle_part_id) : undefined;
    return parts ? parts.part_name + " - " + parts.part_code : undefined;
  }


  showBattery(vehicle_battery_id?: number): battery {
    var battery: battery = {}
    this.availableBattery$.pipe(take(1)).subscribe(
      batteries => {
        battery = batteries.find(m => m.vehicle_battery_id == vehicle_battery_id)
      }
    );

    return battery;
  }
  showDevice(device_id?: number): adminDevice {
    var device: adminDevice = {}
    this.availableDevice$.pipe(take(1)).subscribe(
      devices => {
        device = devices.find(m => m.device_id == device_id)
      }
    );
    return device;
  }
  showPart(vehicle_part_id?: number): parts {
    var parts: parts = {}
    this.availableParts$.pipe(take(1)).subscribe(
      part => {
        parts = part.find(m => m.vehicle_part_id == vehicle_part_id)
      }
    );


    return parts;
  }

  removeDevice(value: deviceId): void {
    this.deviceList = this.deviceList.filter(m => m != value);
  }

  removeParts(value: partID): void {
    this.partsList = this.partsList.filter(m => m != value);
  }

  showDevices(event: MatAutocompleteSelectedEvent): void {
    this.deviceList.push({
      device_id: event.option.value
    });
    this.AssetForm.controls.device.setValue("");
    console.log(this.deviceList.length);
    //console.log(this.partsList.length);
  }

  showParts(event: MatAutocompleteSelectedEvent): void {
    this.partsList.push({
      vehicle_part_id: event.option.value
    });
    this.AssetForm.controls.parts.setValue("");
    //console.log(this.deviceList.length);
    console.log(this.partsList.length);
  }

  formatResponseAssetCode = map((val: boolean) => {
    return val ? { duplicateAssetcode: true } : null;
  });

  validateAsset(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.duplicateAssetcode(control.value);
    return this.formatResponseAssetCode(booleanResponse);
  }

  formatResponseValidateID = map((val: any) => {
    return val.response ? { duplicateVehicleID: true } : null;
  });

  StartDateChange() {
    if (this.AssetForm.controls.manufacture_date.value) {
      if (this.AssetForm.controls.warranty_expiry.value &&
        (this.AssetForm.controls.manufacture_date.value >= this.AssetForm.controls.warranty_expiry.value)) {
        this.AssetForm.get('warranty_expiry').reset();
      }
    }
    var fromDate: Date = new Date(this.AssetForm.controls.manufacture_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  validateID(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.duplicateVehicleID(control.value);
    return this.formatResponseValidateID(booleanResponse);
  }

  Cancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  BatterySelected(select: any) {
    if (!!select.option.value) {
      this.availableBattery$.pipe(take(1)).subscribe(
        data => {
          this.selectedBattery = undefined;
          this.selectedBattery = data.find(m => m.vehicle_battery_id == select.option.value);
        }
      );
    }
  }

  DeviceSelected(select: any) {
    if (!!select.option.value) {
      this.availableDevice$.pipe(take(1)).subscribe(
        data => {
          this.selectedDevice = undefined;
          this.selectedDevice = data.find(m => m.device_id == select.option.value);
        }
      );
    }
  }

  OnChange(value: number) {
    console.log(value);
    if (value == 3) {
      this.assetFranchiseForm.get('franchise_id').setValidators([Validators.required]);
      this.Franchise = true;
    }

    else {
      this.assetFranchiseForm.get('franchise_id').clearValidators();
      this.Franchise = false;
    }
    this.assetFranchiseForm.get('franchise_id').updateValueAndValidity();
  }

}