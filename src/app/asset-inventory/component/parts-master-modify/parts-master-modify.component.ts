import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PartsMasterItem, countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { take, map } from 'rxjs/operators';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';

@Component({
  selector: 'app-parts-master-modify',
  templateUrl: './parts-master-modify.component.html',
  styleUrls: ['./parts-master-modify.component.scss']
})
export class PartsMasterModifyComponent implements OnInit, OnDestroy {
  PartsMasterForm: FormGroup;
  private subs = new SubSink();

  @Input() singlePartsMaster$: Observable<PartsMasterItem>;
  @Input() countries$: Observable<countries[]>;
  @Output() addPartsMaster = new EventEmitter<PartsMasterItem>();
  @Output() editPartsMaster = new EventEmitter<PartsMasterItem>();
  @Output() cancel = new EventEmitter();
  
  constructor(private fb: FormBuilder, public languageService: LanguageService, private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.PartsMasterForm = this.fb.group({
      part_name: ["", [Validators.required]],
      part_short_code: ["", [Validators.required], [this.validatePartCode.bind(this)]],
      part_tag: ["", [Validators.required], [this.validatePart.bind(this)]],
      part_manufacturer: [""],
      part_source_country: [null],
      part_price: [0, [Ms3Validators.Currency]]
    });

    this.subs.add(this.singlePartsMaster$.subscribe(
      singlePartsMaster => {
        if(!!singlePartsMaster) {
          this.PartsMasterForm.controls.part_short_code.disable();
          this.PartsMasterForm.controls.part_tag.disable();
          this.PartsMasterForm.controls.part_short_code.setAsyncValidators(null);
          this.PartsMasterForm.controls.part_tag.setAsyncValidators(null);
          this.PartsMasterForm.controls.part_short_code.updateValueAndValidity();
          this.PartsMasterForm.controls.part_tag.updateValueAndValidity();
          this.PartsMasterForm.patchValue(singlePartsMaster);
        }
      }
    ))
  }

  AddPartsMaster() {
    var partsMasterData: PartsMasterItem = {
      part_name: this.PartsMasterForm.controls.part_name.value,
      part_short_code: this.PartsMasterForm.controls.part_short_code.value,
      part_tag: this.PartsMasterForm.controls.part_tag.value,
      part_manufacturer: this.PartsMasterForm.controls.part_manufacturer.value,
      part_source_country: this.PartsMasterForm.controls.part_source_country.value,
      part_price: +this.PartsMasterForm.controls.part_price.value,
    }

    console.log(partsMasterData);
    this.addPartsMaster.emit(partsMasterData);
  }

  EditPartsMaster() {
    this.singlePartsMaster$.pipe(take(1)).subscribe(
      singlePartsMaster => {
        var partsMasterData = {...singlePartsMaster};
        partsMasterData.part_name= this.PartsMasterForm.controls.part_name.value;
        partsMasterData.part_short_code= this.PartsMasterForm.controls.part_short_code.value;
        partsMasterData.part_tag= this.PartsMasterForm.controls.part_tag.value;
        partsMasterData.part_manufacturer= this.PartsMasterForm.controls.part_manufacturer.value;
        partsMasterData.part_source_country= this.PartsMasterForm.controls.part_source_country.value;
        partsMasterData.part_price= +this.PartsMasterForm.controls.part_price.value;
        console.log(partsMasterData);
        this.editPartsMaster.emit(partsMasterData);
      }
    )
  }

  Cancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicatePart: true } : null;
  });

  validatePart(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.checkDuplicatePartsMaster(control.value);
    return this.formatResponse(booleanResponse);
  }

  formatCodeResponse = map((val: any) => {
    return val.response ? {duplicatePartCode: true } : null;
  });

  validatePartCode(control: AbstractControl) {
    var booleanResponse = this.assetInventoryService.checkDuplicatePartsMasterCode(control.value);
    return this.formatCodeResponse(booleanResponse);
  }

}
