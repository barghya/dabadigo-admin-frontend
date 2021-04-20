import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { PartsMasterItem, PartsStockItem } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferRequestCreatePayload } from 'src/app/models/transferpartsModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { SubSink } from 'subsink';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { map } from 'rxjs/operators';
import { FsqSearchComponent } from '../../container/fsq-search/fsq-search.component';

@Component({
  selector: 'app-transfer-parts-create',
  templateUrl: './transfer-parts-create.component.html',
  styleUrls: ['./transfer-parts-create.component.scss']
})
export class TransferPartsCreateComponent implements OnInit {
  @Input() regions$: Observable<RegionItem[]>;
  @Input() filteredRegions$: Observable<RegionItem[]>;
  @Input() partsMasters$: Observable<PartsMasterItem[]>;
  @Input() partsStocks$: Observable<PartsStockItem[]>;
  @Input() storeTypes$: Observable<DomainData[]>;
  @Input() rentalPoints$: Observable<RentalPoint[]>;
  @Input() partsStatuses$: Observable<DomainData[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Output() addRequest = new EventEmitter<TransferRequestCreatePayload>();
  @Output() partMasterChanged = new EventEmitter<number>();
  @Output() cancel = new EventEmitter();
  @Output() regionSelected = new EventEmitter<number>();
  sourceSelection: PartsStockItem = undefined;
  selectedFsq: FSQDetails;

  dataSource: MatTableDataSource<PartsStockItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'part_name', 'part_short_code', 'region_id', 'store_type', 'store_id', 'quantity', 'status']

  DestinationForm: FormGroup;
  SourceForm: FormGroup;
  private subs = new SubSink();
  constructor(private fb: FormBuilder, public dialog: MatDialog, public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.partsStocks$.subscribe(
      partsStocks => {
        if(!!partsStocks) {
          this.dataSource = new MatTableDataSource<PartsStockItem>(partsStocks);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ))

    this.DestinationForm = this.fb.group({
      destination_city_id: [null, [Validators.required]],
      destination_region_id: [null, [Validators.required]],
      destination_store_type: [null, [Validators.required]],
      destination_store_id: [null, [Validators.required]],
      destination_part_status: [null, [Validators.required]]
    })

    this.SourceForm = this.fb.group({
      parts_master_id: [null, [Validators.required]],
      quantity: [0, [Validators.required, Ms3Validators.integer, Validators.min(0)]]
    })
  }

  CitySelected(city_id: number) {
    this.filteredRegions$ = this.regions$.pipe(map(
      regionList => regionList.filter(m => m.city_id == city_id)
    ))
    this.DestinationForm.controls.destination_region_id.patchValue(null);
  }

  RegionSelected(region_id: number) {
    this.DestinationForm.controls.destination_store_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
    }
  }

  AddRequest() {
    var data: TransferRequestCreatePayload = {
      destination_region_id: this.DestinationForm.controls.destination_region_id.value,
      destination_store_type: this.DestinationForm.controls.destination_store_type.value,
      source_region_id: this.sourceSelection.region_id,
      source_store_type: this.sourceSelection.store_type,
      source_store_id: this.sourceSelection.store_id,
      source_part_status: this.sourceSelection.status,
      destination_part_status: this.DestinationForm.controls.destination_part_status.value,
      parts_master_id: this.SourceForm.controls.parts_master_id.value,
      quantity: +this.SourceForm.controls.quantity.value
    }

    if(this.DestinationForm.controls.destination_store_type.value != 4) {
      data.destination_store_id = this.DestinationForm.controls.destination_store_id.value;
    }
    else{
      data.destination_store_id = this.selectedFsq.admn_user_id;
    }
    this.addRequest.emit(data);
  }

  StoreTypeChanged(value: number) {
    console.log("Store Type:", value);
    this.DestinationForm.controls.destination_store_id.patchValue(null);
    if(value == 1) {
      this.DestinationForm.controls.destination_store_id.setValidators(null);
    }
    else {
      this.DestinationForm.controls.destination_store_id.setValidators([Validators.required]);
    }

    if(value == 4) {
      this.DestinationForm.controls.destination_store_id.disable();
    }
    else {
      this.DestinationForm.controls.destination_store_id.enable();
    }
    this.DestinationForm.controls.destination_store_id.updateValueAndValidity();
  }

  PartMasterChanged(part_master_id: number) {
    this.partMasterChanged.emit(part_master_id);
    this.sourceSelection = undefined;
    this.SourceForm.controls.quantity.patchValue(0);
    this.SourceForm.controls.quantity.updateValueAndValidity();
  }

  SourceSelection(data: PartsStockItem) {
    console.log(data);
    this.sourceSelection = data;
    this.SourceForm.controls.quantity.setValidators([Validators.required, Ms3Validators.integer, Validators.max(data.quantity), Validators.min(0)]);
    this.SourceForm.controls.quantity.updateValueAndValidity();
  }

  Search() {
    var dialogRef = this.dialog.open(
      FsqSearchComponent,
      {
        width: '90%',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('selected', result);
        this.selectedFsq = result;
        this.DestinationForm.controls.destination_store_id.patchValue(
          this.selectedFsq.firstname + ' ' + 
          this.selectedFsq.lastname + ' (' +
          this.selectedFsq.contact_phone + ')'
        )
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Cancel() {
    this.cancel.emit();
  }
}
