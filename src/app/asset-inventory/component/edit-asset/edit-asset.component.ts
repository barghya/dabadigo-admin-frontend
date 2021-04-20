import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { battery, adminDevice, parts, deviceId, partID, AddAsset, editAssetLoad, countries } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { startWith, map, switchMap, take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { region } from 'src/app/models/userManagement';
import { states, CityItem } from 'src/app/models/regionManagement';
import { AvailableFranchise } from 'src/app/models/rentalPoint';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent implements OnInit, OnDestroy {
  // @Output() editassetevent = new EventEmitter();
  editassetFranchiseForm: FormGroup;
  Franchise: boolean = false;
  @Input() vehicle_types$: Observable<DomainData[]>;
  @Input() vehicle_status$: Observable<DomainData[]>;
  @Input() availableBattery$: Observable<battery[]>;
  @Output() AssetEdit = new EventEmitter();
  filteredBattery$: Observable<battery[]>;
  @Input() availableDevice$: Observable<adminDevice[]>;
  filteredDevices$: Observable<adminDevice[]>;
  @Input() availableParts$: Observable<parts[]>;
  filteredParts$: Observable<parts[]>;
  AsseteditedForm: FormGroup;
  deviceList: deviceId[] = [];
  partsList: partID[] = [];
  removable = true;
  selectable = true;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  public updatedOn: Date;
  @Output() cancelassetevent = new EventEmitter();
  @Input() ownership_types$: Observable<DomainData[]>;
  @Input() availableRegions$: Observable<region[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() franchise$: Observable<AvailableFranchise[]>;
  @Input() singleAsset$: Observable<editAssetLoad>;
  private subs = new SubSink();
  selectedDevice: adminDevice;
  selectedBattery: battery;

  constructor(private fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.AsseteditedForm = this.fb.group({
      vehicle_type: ["", [Validators.required]],
      manufacturer: ["", [Validators.required]],
      model: ["", [Validators.required]],
      manufacture_date: ["", [Validators.required]],
      warranty_expiry: [""],
      warranty_terms: ["", [Validators.required]],
      qrcode: ["", [Validators.required]],
      vehicle_idnumber: ["", [Validators.required]],
      chassis_number: ["", [Validators.required]],
      ownership_type: ["", [Validators.required]],
      region_id: ["", [Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      country_id: ['',[Validators.required]],
      vehicle_status: ["", [Validators.required]],
      device: ["", [Validators.required]],
      battery: ["", [Validators.required]],
      parts: [""],
      insurance_no: ["",[Validators.required]],
      insurance_career: ["",[Validators.required]],
      insurance_upto: ["",[Validators.required]],
    });

    this.editassetFranchiseForm = this.fb.group({
      franchise_id: [''],
    });

    this.filteredBattery$ = this.AsseteditedForm.controls.battery.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFnBattery(value)),
      switchMap(value => !!this.availableBattery$ ?
        this.availableBattery$.pipe(take(1), map(batteries => !!batteries ? batteries.filter(m => (m.battery_tag + " - " + m.battery_make + " - " + m.battery_model).toLowerCase().includes(value.trim().toLowerCase())) : batteries))
        : this.availableBattery$
      )
    )
    this.filteredDevices$ = this.AsseteditedForm.controls.device.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFnDevice(value)),
      switchMap(value => !!this.availableDevice$ ?
        this.availableDevice$.pipe(take(1), map(devices => !!devices ? devices.filter(m => (m.device_name + " - " + m.device_code).toLowerCase().includes(value.trim().toLowerCase())) : devices))
        : this.availableDevice$
      )
    )
    this.filteredParts$ = this.AsseteditedForm.controls.parts.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFnParts(value)),
      switchMap(value => !!this.availableParts$ ?
        this.availableParts$.pipe(take(1), map(part => !!part ? part.filter(m => (m.part_name + " - " + m.part_code).toLowerCase().includes(value.trim().toLowerCase())) : part))
        : this.availableParts$
      )
    )
  }

  ngAfterViewInit() {
    this.subs.add(this.singleAsset$.subscribe(
      (data) => {
        if (!!data) {
          // this.AsseteditedForm.patchValue(data);
          // this.editassetFranchiseForm.patchValue(data);
          if (data.ownership_type == 3) {
            this.AsseteditedForm.patchValue(data);
            this.editassetFranchiseForm.patchValue(data);   
            this.OnChange(3);         
            this.Franchise = true;
          }
          else {
            this.AsseteditedForm.patchValue(data);
            this.Franchise = false;
          }
          this.AsseteditedForm.controls.vehicle_idnumber.disable();
          if (data.batterydetails.length > 0) {
            this.AsseteditedForm.controls.battery.setValue(data.batterydetails[0].vehicle_battery_id);
          }

          if (data.devicedetails.length > 0) {
            this.AsseteditedForm.controls.device.setValue(data.devicedetails[0].device_id);
          }
          this.partsList = [];
          data.partsdetails.forEach(part => {
            if (!!part) {
              this.partsList.push({
                vehicle_part_id: part.vehicle_part_id
              })
            }
          })
        }
      }
    ));
  }

  saveAsset() {
    if (this.CheckData()) {
      this.AssetEdit.emit(this.BuildData());
    }
    else {
      //TODO: 
    }
  }
  BuildData(): editAssetLoad {
    var assetData;
    if(this.AsseteditedForm.value.ownership_type != 3){
      this.singleAsset$.pipe(take(1)).subscribe(
        (data) => {
          assetData = { ...data };
          assetData.vehicle_type = this.AsseteditedForm.controls.vehicle_type.value;
          assetData.manufacturer = this.AsseteditedForm.controls.manufacturer.value;
          assetData.model = this.AsseteditedForm.controls.model.value;
          assetData.manufacture_date = this.AsseteditedForm.controls.manufacture_date.value;
          assetData.warranty_expiry = this.AsseteditedForm.controls.warranty_expiry.value;
          assetData.warranty_terms = this.AsseteditedForm.controls.warranty_terms.value;
          assetData.qrcode = this.AsseteditedForm.controls.qrcode.value;
          assetData.vehicle_status = this.AsseteditedForm.controls.vehicle_status.value;
          assetData.chassis_number = this.AsseteditedForm.controls.chassis_number.value,
          assetData.ownership_type = this.AsseteditedForm.controls.ownership_type.value,
          assetData.region_id = this.AsseteditedForm.controls.region_id.value,
          assetData.state_id =  this.AsseteditedForm.controls.state_id.value,
          assetData.city_id =  this.AsseteditedForm.controls.city_id.value,
          assetData.country_id =  this.AsseteditedForm.controls.country_id.value,
          assetData.insurance_no= this.AsseteditedForm.controls.insurance_no.value,
          assetData.insurance_career= this.AsseteditedForm.controls.insurance_career.value,
          assetData.insurance_upto= this.AsseteditedForm.controls.insurance_upto.value,
          assetData.batterydetails = [{
            vehicle_battery_id: this.AsseteditedForm.controls.battery.value
          }];
          assetData.devicedetails = [{
            device_id: this.AsseteditedForm.controls.device.value
          }];
          assetData.partsdetails = this.partsList;
        }
      );
    }
    else {
      this.singleAsset$.pipe(take(1)).subscribe(
        (data) => {
          assetData = { ...data };
          assetData.vehicle_type = this.AsseteditedForm.controls.vehicle_type.value;
          assetData.manufacturer = this.AsseteditedForm.controls.manufacturer.value;
          assetData.model = this.AsseteditedForm.controls.model.value;
          assetData.manufacture_date = this.AsseteditedForm.controls.manufacture_date.value;
          assetData.warranty_expiry = this.AsseteditedForm.controls.warranty_expiry.value;
          assetData.warranty_terms = this.AsseteditedForm.controls.warranty_terms.value;
          assetData.qrcode = this.AsseteditedForm.controls.qrcode.value;
          assetData.vehicle_status = this.AsseteditedForm.controls.vehicle_status.value;
          assetData.chassis_number = this.AsseteditedForm.controls.chassis_number.value,
          assetData.ownership_type = this.AsseteditedForm.controls.ownership_type.value,
          assetData.franchise_id = this.editassetFranchiseForm.controls.franchise_id.value,
          assetData.region_id = this.AsseteditedForm.controls.region_id.value,
          assetData.state_id =  this.AsseteditedForm.controls.state_id.value,
          assetData.city_id =  this.AsseteditedForm.controls.city_id.value,
          assetData.country_id =  this.AsseteditedForm.controls.country_id.value,
          assetData.insurance_no= this.AsseteditedForm.controls.insurance_no.value,
          assetData.insurance_career= this.AsseteditedForm.controls.insurance_career.value,
          assetData.insurance_upto= this.AsseteditedForm.controls.insurance_upto.value,
          assetData.batterydetails = [{
            vehicle_battery_id: this.AsseteditedForm.controls.battery.value
          }];
          assetData.devicedetails = [{
            device_id: this.AsseteditedForm.controls.device.value
          }];
          assetData.partsdetails = this.partsList;
        }
      );
    }
    return assetData;
  }

  cancelAsset() {
    this.cancelassetevent.emit();
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

  showBattery(vehicle_battery_id: number = 1): battery {
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


  showDevices(value: number): void {
    this.deviceList.push({
      device_id: value
    });
    this.AsseteditedForm.controls.device.setValue("");
    console.log(this.deviceList.length);
    console.log(this.partsList.length);


  }
  showParts(value: number): void {
    this.partsList.push({
      vehicle_part_id: value
    });
    this.AsseteditedForm.controls.parts.setValue("");
    console.log(this.deviceList.length);
    console.log(this.partsList.length);
  }


  //  get vehicle_id(): FormControl {
  //    return <FormControl> this.AsseteditedForm.get('vehicle_id');
  //  }

  StartDateChange() {
    if (this.AsseteditedForm.controls.manufacture_date.value) {
      if (this.AsseteditedForm.controls.warranty_expiry.value &&
        (this.AsseteditedForm.controls.manufacture_date.value >= this.AsseteditedForm.controls.warranty_expiry.value)) {
        this.AsseteditedForm.get('warranty_expiry').reset();
      }
    }
    var fromDate: Date = new Date(this.AsseteditedForm.controls.manufacture_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }
  CheckData(): boolean {
    var batteryFlag = false;
    var deviceFlag = false;
    if(this.AsseteditedForm.controls.battery.dirty){
      batteryFlag = this.CheckBattery();
    }
    else {
      batteryFlag = true;
    }

    if(this.AsseteditedForm.controls.device.dirty){
      deviceFlag = this.CheckDevice();
    }
    else {
      deviceFlag = true;
    }

    return (batteryFlag && deviceFlag);
  }

  CheckBattery(): boolean {
    if (!this.selectedBattery) {
      this.emptyBattery();
      return false;
    }
    if (isNaN(+this.AsseteditedForm.controls.battery.value)) {
      this.emptyBattery();
      return false;
    }
    else {
      this.availableBattery$.pipe(take(1)).subscribe(
        data => {
          var battery = data.find(m => m.vehicle_battery_id == +this.AsseteditedForm.controls.battery.value);
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
    if (isNaN(+this.AsseteditedForm.controls.device.value)) {
      this.emptyDevice();
      return false;
    }
    else {
      this.availableDevice$.pipe(take(1)).subscribe(
        data => {
          var device = data.find(m => m.device_id == +this.AsseteditedForm.controls.device.value);
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
    this.AsseteditedForm.controls.battery.setValue('');
    this.selectedBattery = null;
    this.filteredBattery$ = this.AsseteditedForm.controls.battery.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showBattery(value).battery_tag + " - " + this.showBattery(value).battery_make + " - " + this.showBattery(value).battery_model),
      switchMap(value => !!this.availableBattery$ ?
        this.availableBattery$.pipe(take(1), map(batteries => !!batteries ? batteries.filter(m => (m.battery_tag + " - " + m.battery_make + " - " + m.battery_model).toLowerCase().includes(value.trim().toLowerCase())) : batteries))
        : this.availableBattery$
      )
    );
  }

  emptyDevice() {
    this.AsseteditedForm.controls.device.setValue('');
    this.selectedDevice = null;
    this.filteredDevices$ = this.AsseteditedForm.controls.device.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showDevice(value).device_name + " - " + this.showDevice(value).device_code),
      switchMap(value => !!this.availableDevice$ ?
        this.availableDevice$.pipe(take(1), map(devices => !!devices ? devices.filter(m => (m.device_name + " - " + m.device_code).toLowerCase().includes(value.trim().toLowerCase())) : devices))
        : this.availableDevice$
      )
    );
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
      this.editassetFranchiseForm.get('franchise_id').setValidators([Validators.required]);
      this.Franchise = true;
    }

    else {
      this.editassetFranchiseForm.get('franchise_id').clearValidators();
      this.Franchise = false;
    }
    this.editassetFranchiseForm.get('franchise_id').updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}