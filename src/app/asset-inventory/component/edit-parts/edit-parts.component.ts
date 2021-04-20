import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { parts, countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';

@Component({
  selector: 'app-edit-parts',
  templateUrl: './edit-parts.component.html',
  styleUrls: ['./edit-parts.component.scss']
})
export class EditPartsComponent implements OnInit, OnChanges, OnDestroy{
  PartEditForm:FormGroup;
  @Output() cancelpart = new EventEmitter;
  @Output() partEditForm = new EventEmitter<parts>();
  @Input() singlePart$ : Observable<parts>;
  @Input() country$ : Observable<countries[]>;
  @Input() vehiclePartState$ : Observable<DomainData[]>
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  private subs = new SubSink();
  public updatedOn: Date;
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,private store: Store<AppState>) { }

  ngOnInit() {
    this.PartEditForm = this.formbuilder.group({
      part_code: [''],
      part_name: ['', [Validators.required]],
      part_manufacturer: ['', [Validators.required]],
      part_source_country: ['', [Validators.required]],
      part_price: ['', [Validators.required, Ms3Validators.Currency]],
      status: ['', [Validators.required]],
      warranty_period: ['', [Validators.required,Ms3Validators.integer]],
      manufacturing_date: ['', [Validators.required]],
      commissioning_date: [''],
    })

    this.subs.add(this.singlePart$.subscribe(
      (data) => {
        if(!!data) {
          console.log("Patching");
          console.log(data);
          var patchData = {...data};
          patchData.commissioning_date = new Date(patchData.commissioning_date);
          patchData.manufacturing_date = new Date(patchData.manufacturing_date);
          this.PartEditForm.patchValue(data);
          this.part_code.disable();
          this.StartDateChanged();
          this.updatedOn = data.last_updated_on;
        }
      }
    ));

  }

  ngOnChanges(){
  }
  savePart(){
    this.store.select(state => state.asset_inventory.singlePart).pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data};
        formData.part_code = this.PartEditForm.controls.part_code.value;
        formData.part_name = this.PartEditForm.controls.part_name.value;
        formData.part_manufacturer = this.PartEditForm.controls.part_manufacturer.value;
        formData.part_source_country = this.PartEditForm.controls.part_source_country.value;
        formData.part_price = this.PartEditForm.controls.part_price.value;
        formData.status = this.PartEditForm.controls.status.value;
        formData.warranty_period = this.PartEditForm.controls.warranty_period.value;
        formData.manufacturing_date = this.PartEditForm.controls.manufacturing_date.value;
        formData.commissioning_date = this.PartEditForm.controls.commissioning_date.value;
        console.log(data);
        this.partEditForm.emit(formData);
      }
    )
  }

  cancelPart(){
    this.cancelpart.emit()
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  get part_code(): FormControl {
    return <FormControl> this.PartEditForm.get('part_code');
  }
  StartDateChanged(){
    if (this.PartEditForm.controls.manufacturing_date.value) {
      if (this.PartEditForm.controls.commissioning_date.value && 
        (this.PartEditForm.controls.manufacturing_date.value >= this.PartEditForm.controls.commissioning_date.value)) {
          this.PartEditForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.PartEditForm.controls.manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }
}
