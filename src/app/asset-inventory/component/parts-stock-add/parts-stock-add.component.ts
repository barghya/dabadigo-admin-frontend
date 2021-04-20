import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { PartsMasterItem, AddPartsStockPayload } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { FsqSearchAssetInventoryComponent } from '../../container/fsq-search-asset-inventory/fsq-search-asset-inventory.component';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-parts-stock-add',
  templateUrl: './parts-stock-add.component.html',
  styleUrls: ['./parts-stock-add.component.scss']
})
export class PartsStockAddComponent implements OnInit {
  @Input() regions$: Observable<RegionItem[]>;
  @Input() partsMasters$: Observable<PartsMasterItem[]>;
  @Input() storeTypes$: Observable<DomainData[]>;
  @Input() rentalPoints$: Observable<RentalPoint[]>;
  @Input() partsStatuses$: Observable<DomainData[]>;
  filteredRegion$: Observable<RegionItem[]>;
  @Input() city$: Observable<CityItem[]>;
  @Input() singleFsq$: Observable<FSQDetails>;
  @Input() parts_master_id: number;
  @Input() region_id: number;
  @Input() store_type: number;
  @Input() store_id: number;
  @Input() status: number;
  city_id: number;
  selectedFsq: FSQDetails;
  fsqRequired: boolean = false;

  @Output() addStock = new EventEmitter<AddPartsStockPayload>();
  @Output() regionSelected = new EventEmitter<number>();
  @Output() cancel = new EventEmitter();
  StockAddForm: FormGroup;
  private subs = new SubSink();
  constructor(private fb: FormBuilder, public languageService: LanguageService, public dialog: MatDialog) { }

  ngOnInit() {
    this.StockAddForm = this.fb.group({
      parts_master_id: [null, [Validators.required]],
      city_name: [null, [Validators.required]],
      region_id: [null, [Validators.required]],
      store_type: [null, [Validators.required]],
      store_id: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(0), Ms3Validators.integer]],
      status: [null, [Validators.required]],
      txn_reference: [""],
    })

    if(!!this.parts_master_id) {
      this.StockAddForm.controls.parts_master_id.patchValue(this.parts_master_id)
    }

    if(!!this.region_id) {
      this.SelectedRegion(this.region_id);
      this.regions$.pipe(take(1)).subscribe(
        regionList => {
          this.city_id = regionList.find(m => m.region_id == this.region_id).city_id;
          this.StockAddForm.controls.city_name.patchValue(this.city_id);
          this.SelectedCity(this.city_id);
          this.StockAddForm.controls.region_id.patchValue(this.region_id);
        }
      )
    }

    if(!!this.store_type) {
      this.StockAddForm.controls.store_type.patchValue(this.store_type)
      this.StoreTypeChanged(this.store_type);
    }

    if(!!this.store_id) {
      if(this.store_type != 4) {
        this.StockAddForm.controls.store_id.patchValue(this.store_id)
      }
    }

    if(!!this.status) {
      this.StockAddForm.controls.status.patchValue(this.status)
    }

    this.subs.add(this.singleFsq$.subscribe(
      fsq => {
        if(!!fsq && !!this.store_type && this.store_type == 4 &&!!this.store_id) {
          this.selectedFsq = fsq;
          this.StockAddForm.controls.store_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    ))
  }

  ngOnDestroy() {{
    this.subs.unsubscribe();
  }}

  StoreTypeChanged(value: number) {
    console.log("Store Type:", value);
    this.StockAddForm.controls.store_id.patchValue(null);
    if(value == 1) {
      this.StockAddForm.controls.store_id.setValidators(null);
    }
    else {
      this.StockAddForm.controls.store_id.setValidators([Validators.required]);
    }
    if(value == 4) {
      this.StockAddForm.controls.store_id.disable();
      this.fsqRequired = true;
    } else {
      this.StockAddForm.controls.store_id.enable();
      this.fsqRequired = false;
    }

    this.StockAddForm.controls.store_id.updateValueAndValidity();
  }

  SelectedCity(city_id: number) {
    this.filteredRegion$ = this.regions$.pipe(map(
      regions => regions.filter(m => m.city_id == city_id)
    ))
    this.StockAddForm.controls.region_id.patchValue(null);
  }

  SelectedRegion(region_id: number) {
    this.StockAddForm.controls.store_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
    }
  }

  Search() {
    var dialogRef = this.dialog.open(
      FsqSearchAssetInventoryComponent,
      {
        width: '90%',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(
      result=> {
        if (result) {
          console.log('selected', result);
          this.selectedFsq = result;
          this.StockAddForm.controls.store_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    )
  }


  AddStock() {
    if(this.StockAddForm.controls.store_type.value == 4) {
      this.addStock.emit({
        parts_master_id: this.StockAddForm.controls.parts_master_id.value,
        region_id: this.StockAddForm.controls.region_id.value,
        store_type: this.StockAddForm.controls.store_type.value,
        store_id: +this.selectedFsq.admn_user_id,
        quantity: +this.StockAddForm.controls.quantity.value,
        status: this.StockAddForm.controls.status.value,
        txn_reference: this.StockAddForm.controls.txn_reference.value,
      })
    } else {
      this.addStock.emit({
        parts_master_id: this.StockAddForm.controls.parts_master_id.value,
        region_id: this.StockAddForm.controls.region_id.value,
        store_type: this.StockAddForm.controls.store_type.value,
        store_id: this.StockAddForm.controls.store_id.value,
        quantity: +this.StockAddForm.controls.quantity.value,
        status: this.StockAddForm.controls.status.value,
        txn_reference: this.StockAddForm.controls.txn_reference.value,
      })
    }
    
  }

  Cancel() {
    this.cancel.emit();
  }
}
