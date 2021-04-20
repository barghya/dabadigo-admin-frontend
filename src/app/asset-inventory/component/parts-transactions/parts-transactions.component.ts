import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PartsTransactionsItem, PartsMasterItem, PartsTransactionsFilter } from 'src/app/models/asset-inventoryModel';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { RegionItem, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FSQHubDetails } from 'src/app/models/fsqhubModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { FsqSearchAssetInventoryComponent } from '../../container/fsq-search-asset-inventory/fsq-search-asset-inventory.component';

@Component({
  selector: 'app-parts-transactions',
  templateUrl: './parts-transactions.component.html',
  styleUrls: ['./parts-transactions.component.scss']
})
export class PartsTransactionsComponent implements OnInit {
  private subs = new SubSink();
  @Input() regions$: Observable<RegionItem[]>;
  filteredRegion$: Observable<RegionItem[]>;
  @Input() partsMasters$: Observable<PartsMasterItem[]>;
  @Input() storeTypes$: Observable<DomainData[]>;
  @Input() rentalPoints$: Observable<RentalPoint[]>;
  @Input() partsStatuses$: Observable<DomainData[]>;
  @Input() fsqList$: Observable<FSQDetails[]>;
  @Input() transactions$: Observable<PartsTransactionsItem[]>;
  @Input() city$: Observable<CityItem[]>;
  @Input() singleFsq$: Observable<FSQDetails>;
  @Input() parts_master_id: number;
  @Input() region_id: number;
  @Input() store_type: number;
  @Input() store_id: number;
  @Input() status: number;
  city_id: number;
  selectedFsq: FSQDetails;

  @Output() filter = new EventEmitter<PartsTransactionsFilter>();
  @Output() regionSelected = new EventEmitter<number>();

  FilterForm: FormGroup;
  
  dataSource: MatTableDataSource<PartsTransactionsItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['part_name', 'part_short_code', 'region_id', 'store_type', 'store_id', 'quantity', 'txn_date', 'txn_reference', 'created_by', 'status']
  
  constructor(public languageService: LanguageService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.FilterForm = this.fb.group({
      parts_master_id: [null],
      region_id: [null],
      store_type: [null],
      store_id: [null],
      city_id: [null],
      status: [null]
    });

    if(!!this.parts_master_id) {
      this.FilterForm.controls.parts_master_id.patchValue(this.parts_master_id)
    }

    if(!!this.region_id) {
      this.SelectedRegion(this.region_id);
      this.regions$.pipe(take(1)).subscribe(
        regionList => {
          this.city_id = regionList.find(m => m.region_id == this.region_id).city_id;
          this.FilterForm.controls.city_id.patchValue(this.city_id);
          this.SelectedCity(this.city_id);
          this.FilterForm.controls.region_id.patchValue(this.region_id);
        }
      )
    }

    if(!!this.store_type) {
      this.FilterForm.controls.store_type.patchValue(this.store_type)
      this.StoreTypeChanged(this.store_type);
    }

    if(!!this.store_id) {
      if(this.store_type != 4) {
        this.FilterForm.controls.store_id.patchValue(this.store_id)
      }
    }

    if(!!this.status) {
      this.FilterForm.controls.status.patchValue(this.status)
    }

    this.subs.add(this.transactions$.subscribe(
      transactions => {
        if(!!transactions) {
          this.dataSource = new MatTableDataSource(transactions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))

    this.subs.add(this.singleFsq$.subscribe(
      fsq => {
        if(!!fsq && !!this.store_type && this.store_type == 4 &&!!this.store_id) {
          this.selectedFsq = fsq;
          this.FilterForm.controls.store_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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
          this.FilterForm.controls.store_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    )
  }

  StoreTypeChanged(value: number) {
    console.log("Store Type:", value);
    this.FilterForm.controls.store_id.patchValue(null);
    this.FilterForm.controls.store_id.updateValueAndValidity();
    if(value == 4) {
      this.FilterForm.controls.store_id.disable();
    }
    else {
      this.FilterForm.controls.store_id.enable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  SelectedCity(city_id: number) {
    this.filteredRegion$ = this.regions$.pipe(map(
      regions => regions.filter(m => m.city_id == city_id)
    ))
    this.FilterForm.controls.region_id.patchValue(null);
  }

  SelectedRegion(region_id: number) {
    this.FilterForm.controls.store_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
    }
  }

  Filter() {
    if(this.FilterForm.controls.store_type.value == 4) {
      this.filter.emit({
        parts_master_id: !!this.FilterForm.controls.parts_master_id.value ? this.FilterForm.controls.parts_master_id.value : null,
        region_id: !!this.FilterForm.controls.region_id.value ? this.FilterForm.controls.region_id.value : null,
        store_type: !!this.FilterForm.controls.store_type.value ? this.FilterForm.controls.store_type.value : null,
        store_id: !!this.selectedFsq ? this.selectedFsq.admn_user_id : null,
        status: !!this.FilterForm.controls.status.value ? this.FilterForm.controls.status.value : null,
      })
    }
    else{
      this.filter.emit({
        parts_master_id: !!this.FilterForm.controls.parts_master_id.value ? this.FilterForm.controls.parts_master_id.value : null,
        region_id: !!this.FilterForm.controls.region_id.value ? this.FilterForm.controls.region_id.value : null,
        store_type: !!this.FilterForm.controls.store_type.value ? this.FilterForm.controls.store_type.value : null,
        store_id: !!this.FilterForm.controls.store_id.value ? this.FilterForm.controls.store_id.value : null,
        status: !!this.FilterForm.controls.status.value ? this.FilterForm.controls.status.value : null,
      })
    }
  }
}
