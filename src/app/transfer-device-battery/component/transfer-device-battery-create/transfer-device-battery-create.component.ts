import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/service/language/language.service';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { Observable } from 'rxjs';
import { CityItem, RegionItem } from 'src/app/models/regionManagement';
import { map } from 'rxjs/operators';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint } from 'src/app/models/rentalPoint';
import { FsqSearchComponent } from '../../container/fsq-search/fsq-search.component';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { ItemStock, GetItemService, deployDevicebatteryRequest } from 'src/app/models/transferDeviceBatteryModel';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ngModuleJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-transfer-device-battery-create',
  templateUrl: './transfer-device-battery-create.component.html',
  styleUrls: ['./transfer-device-battery-create.component.scss']
})
export class TransferDeviceBatteryCreateComponent implements OnInit, OnDestroy {
  DestinationForm: FormGroup;
  SourceForm: FormGroup;
  @Input() cities$: Observable<CityItem[]>;
  @Input() regions$: Observable<RegionItem[]>;
  filteredRegions$: Observable<RegionItem[]>;
  @Input() storeTypes$: Observable<DomainData[]>;
  @Input() ItemType$: Observable<DomainData[]>;
  @Output() regionSelected = new EventEmitter<number>();
  @Input() rentalPoints$: Observable<RentalPoint[]>;
  @Output() itemChanged = new EventEmitter<GetItemService>();
  @Input() ItemStock$: Observable<ItemStock[]>;
  selectedFsq: FSQDetails;
  @Output() cancel = new EventEmitter();
  private subs = new SubSink();
  dataSource: MatTableDataSource<ItemStock>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select','item_tag', 'item_model', 'item_make','store_type','store', 'commissioning_date', 'item_status_name']
  deployRequest: deployDevicebatteryRequest;
  itemList: number[]=[];
  itemType: number;
  @Output() RequestCreate = new EventEmitter<deployDevicebatteryRequest>();
  constructor(private fb: FormBuilder, public dialog: MatDialog, public languageService: LanguageService) { }

  ngOnInit() {
    this.DestinationForm = this.fb.group({
      destination_city_id: [null, [Validators.required]],
      destination_region_id: [null, [Validators.required]],
      destination_store_type: [null, [Validators.required]],
      destination_store_id: [null, [Validators.required]],
    })

    this.SourceForm = this.fb.group({
      ItemType: [null, [Validators.required]],
      source_city_id: [null, [Validators.required]],
    })
    // this.SourceForm.controls['source_city_id'].disable();
    this.subs.add(this.ItemStock$.subscribe(
      ItemStock => {
        if(!!ItemStock) {
          this.dataSource = new MatTableDataSource<ItemStock>(ItemStock);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ))
  }
  CitySelected(city: CityItem) {
    this.filteredRegions$ = this.regions$.pipe(map(
      regionList => regionList.filter(m => m.city_id == city.city_id)
    ))
    this.DestinationForm.controls.destination_region_id.patchValue(null);
    this.SourceForm.controls.source_city_id.patchValue(city.city_id);
    this.SourceForm.controls.ItemType.patchValue(null);
    this.itemList= [];
    this.dataSource = new MatTableDataSource<ItemStock>();
  }
  RegionSelected(region_id: number) {
    this.DestinationForm.controls.destination_store_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
    }
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
  ItemChange(){
    this.itemChanged.emit({
      city: +this.SourceForm.controls.source_city_id.value,
      item_type: + this.SourceForm.controls.ItemType.value,
    })
    this.itemType = + this.SourceForm.controls.ItemType.value
    this.itemList=[];
  }
  Cancel() {
    this.cancel.emit();
  }
  ItemClick(element: ItemStock, value: any){
    if(value){
      this.itemList.push(element.item_id)
    }else{
      this.itemList=this.itemList.filter(m=> m!= element.item_id)
    }
    console.log(this.itemList);
  }
  AddRequest(){
    this.deployRequest = {
      updated_by: 1,
      destination_region_id: +this.DestinationForm.controls.destination_region_id.value,
      destination_store_type: +this.DestinationForm.controls.destination_store_type.value,
      item_type: +this.itemType,
      items: this.itemList
    }
    if(this.DestinationForm.controls.destination_store_type.value == 4){
      this.deployRequest.destination_store_id = this.selectedFsq.admn_user_id;
    }else if(this.DestinationForm.controls.destination_store_type.value == 2){
      this.deployRequest.destination_store_id = +this.DestinationForm.controls.destination_store_id.value
    }else{
      this.deployRequest.destination_store_id = +this.DestinationForm.controls.destination_region_id.value
    }
    console.log(this.deployRequest);
    this.RequestCreate.emit(this.deployRequest)
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
