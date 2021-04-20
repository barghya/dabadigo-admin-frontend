import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { countries, parts, AddParts } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { map } from 'rxjs/operators';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { Ms3Validators } from 'src/app/validators/ms3-validators';

@Component({
  selector: 'app-add-parts',
  templateUrl: './add-parts.component.html',
  styleUrls: ['./add-parts.component.scss']
})
export class AddPartsComponent implements OnInit {
  PartForm: FormGroup;
  @Input() countryName$: Observable<countries[]>;
  @Input() vehiclePartState$: Observable<DomainData[]>;
  @Output() cancelParts = new EventEmitter();
  @Output() partForm = new EventEmitter<parts>();
  @Output() addAnotherParts = new EventEmitter();
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder, private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.PartForm = this.formbuilder.group({
      part_code: ['', [Validators.required], [this.validatePart.bind(this)]], 
      part_name: ['', [Validators.required]],
      part_manufacturer: ['', [Validators.required]],
      part_source_country: ['', [Validators.required]],
      part_price: ['', [Validators.required, Ms3Validators.Currency]],
      status: ['', [Validators.required]],
      warranty_period: ['', [Validators.required,Ms3Validators.integer]],
      manufacturing_date: ['', [Validators.required]],
      commissioning_date: [''],
    })
    
  }

  AddPart(){
    var formData: AddParts = {
      part_code: this.PartForm.value.part_code,
      part_name: this.PartForm.value.part_name,
      part_manufacturer: this.PartForm.value.part_manufacturer,
      part_source_country: this.PartForm.value.part_source_country,
      part_price: +this.PartForm.value.part_price,
      status: this.PartForm.value.status,
      warranty_period: this.PartForm.value.warranty_period,
      manufacturing_date: this.PartForm.value.manufacturing_date,
      commissioning_date: this.PartForm.value.commissioning_date,
    }
    this.partForm.emit(formData);
    console.log(formData);
  }
  addAnotherPart(){
    var postedData: AddParts;
    postedData = {
      part_code:this.PartForm.controls.part_code.value,
      part_name:this.PartForm.controls.part_name.value,
      part_manufacturer:this.PartForm.controls.part_manufacturer.value,
      part_source_country:this.PartForm.controls.part_source_country.value,
      part_price: +this.PartForm.controls.part_price.value,
      status:this.PartForm.controls.status.value,
      warranty_period:this.PartForm.controls.warranty_period.value,
      manufacturing_date:this.PartForm.controls.manufacturing_date.value,
      commissioning_date:this.PartForm.controls.commissioning_date.value,
    }
    this.addAnotherParts.emit(postedData)
    this.PartForm.reset()
    this.PartForm.setErrors(null);
    this.PartForm.updateValueAndValidity();
    console.log(postedData);
  }
  cancelPart(){
    this.cancelParts.emit()
  }

  StartDateChanged(){
    if (this.PartForm.controls.manufacturing_date.value) {
      if (this.PartForm.controls.commissioning_date.value && 
        (this.PartForm.controls.manufacturing_date.value >= this.PartForm.controls.commissioning_date.value)) {
          this.PartForm.get('commissioning_date').reset();
        }
    }
    var fromDate: Date = new Date(this.PartForm.controls.manufacturing_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicatePart: true } : null;
  });

  validatePart(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.duplicatePart(control.value);
    return this.formatResponse(booleanResponse);
  }
}
