import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { battery, countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-battery',
  templateUrl: './edit-battery.component.html',
  styleUrls: ['./edit-battery.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class EditBatteryComponent implements OnInit, OnChanges, OnDestroy {

  editBatteryForm: FormGroup;

  @Input() BatteryState$: Observable<DomainData[]>;
  @Input() countryName$: Observable<countries[]>;
  @Input() singleBattery$: Observable<battery>;
  @Output() editBatteryEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();  
  @Input() cities$: Observable<CityItem[]>;
  @Input() availableRegions$: Observable<RegionItem[]>;
  editbattery: battery;
  private subs = new SubSink();

  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);

  public updatedOn: Date;
  constructor( public languageService: LanguageService, public fb: FormBuilder, private store: Store<AppState>, private router: Router ) { }

  ngOnInit() {
    this.editBatteryForm = this.fb.group({
      battery_tag: [''],
      battery_make: ['', [Validators.required]],
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
    this.subs.add(this.singleBattery$.subscribe(
      (data) => {
        if(!!data) {
          console.log("patching");
          console.log(data);
          var patchData = {...data};
          patchData.commissioning_date = new Date(patchData.commissioning_date);
          patchData.battery_manufacturing_date = new Date(patchData.battery_manufacturing_date);
          this.editBatteryForm.patchValue(patchData);
          this.battery_tag.disable();
          this.StartDateChange();
          this.editBatteryForm.controls['city'].disable()
          this.editBatteryForm.controls['region'].disable()
          this.updatedOn = data.updated_on;
          console.log('updated on',this.updatedOn);
        }
      }
    ));
    
  }

  ngOnChanges() {
  }

  saveBattery() {
    this.singleBattery$.pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data };
        formData.battery_tag = this.editBatteryForm.controls.battery_tag.value;
        formData.battery_make = this.editBatteryForm.controls.battery_make.value;
        formData.battery_model = this.editBatteryForm.controls.battery_model.value;
        formData.country_of_origin = this.editBatteryForm.controls.country_of_origin.value;
        formData.battery_manufacturing_date = this.editBatteryForm.controls.battery_manufacturing_date.value;
        formData.commissioning_date = this.editBatteryForm.controls.commissioning_date.value;
        formData.battery_power = this.editBatteryForm.controls.battery_power.value;
        formData.warranty_period = this.editBatteryForm.controls.warranty_period.value;
        formData.battery_status = this.editBatteryForm.controls.battery_status.value;
        formData.city= +this.editBatteryForm.controls.city.value,
        formData.region= +this.editBatteryForm.controls.region.value,
        formData.assignment_status= null
        console.log(data);
        this.editBatteryEvent.emit(formData);
      }
    );
  }

  cancelSaveBattery() {
    this.cancelEvent.emit();
  }

  get battery_tag(): FormControl {
    return <FormControl> this.editBatteryForm.get('battery_tag');
  }

  StartDateChange() {
    if(this.editBatteryForm.controls.battery_manufacturing_date.value) {
      if(this.editBatteryForm.controls.commissioning_date.value && 
        (this.editBatteryForm.controls.battery_manufacturing_date.value >= this.editBatteryForm.controls.commissioning_date.value)) {
          this.editBatteryForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.editBatteryForm.controls.battery_manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}