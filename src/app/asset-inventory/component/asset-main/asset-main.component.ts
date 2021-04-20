import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Assets } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { DomainData } from 'src/app/models/domainModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AvailableFranchise } from 'src/app/models/rentalPoint';

@Component({
  selector: 'app-asset-main',
  templateUrl: './asset-main.component.html',
  styleUrls: ['./asset-main.component.scss']
})
export class AssetMainComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = ['vehicle_idnumber', 'chassis_number', 'manufacturer', 'ownership_type_name', 'model', 'manufacture_date', 'vehicle_type', 'vehicle_status', 'action'];
  dataSource: MatTableDataSource<Assets>;
  @Input() assets$: Observable<Assets[]>;
  @Input() ownership_types$: Observable<DomainData[]>;
  @Output() addAssets = new EventEmitter();
  @Output() partsDefiniton = new EventEmitter();
  @Output() editAssets = new EventEmitter<number>();
  @Output() viewAsset = new EventEmitter<number>();
  @Input() franchise$: Observable<AvailableFranchise[]>;
  subs = new SubSink();
  @Output() deleteasset = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedOwnershipType: number = 0;
  totalList: Assets[];
  Filter: FormGroup;
  frnchiseDisable : boolean = true;

  constructor(private router: Router, public languageService: LanguageService,public fb: FormBuilder,   private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.Filter = this.fb.group({
      wonership: [0],
      franchise: [0],
    })
    this.subs.add(this.route.queryParams.subscribe(params => {
      var admn_partner_id = +params['id'];
      if(!!admn_partner_id){
        this.Filter.patchValue({
          wonership: 3,
          franchise: admn_partner_id
        })
      }
    }));
    this.subs.add(this.assets$.subscribe(
      (data) => {
        this.totalList = data;
        console.log(this.totalList);
        this.filter();
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ownershipTypeChange(value: number) {
    this.selectedOwnershipType = value;
    this.filter();
  }

  filter() {
    if(+this.Filter.controls.wonership.value == 0){
      this.Filter.controls.franchise.patchValue(0);
      this.frnchiseDisable = true;
      this.dataSource = new MatTableDataSource<Assets>(this.totalList);
    }else if(+this.Filter.controls.wonership.value == 3){
      this.frnchiseDisable = false;
      if(+this.Filter.controls.franchise.value == 0){
        this.dataSource = new MatTableDataSource<Assets>(this.totalList.filter(m => +m.ownership_type == 3));
      }else{
        this.dataSource = new MatTableDataSource<Assets>(this.totalList.filter(m => +m.ownership_type == 3 && m.franchise_id == +this.Filter.controls.franchise.value));
      }
    }else{
      this.frnchiseDisable = true;
      this.Filter.controls.franchise.patchValue(0);
      this.dataSource = new MatTableDataSource<Assets>(this.totalList.filter(m => +m.ownership_type == +this.Filter.controls.wonership.value));
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openBottomSheet(){
    this.addAssets.emit();
    //this.router.navigate(['asset-inventory', 'add-asset'])
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  editVehicle(vehicle_id: number) {
    this.editAssets.emit(vehicle_id);
  }

  viewDetails(vehicle_id: number) {
    this.viewAsset.emit(vehicle_id);
  }
  
  PartsDefinition() {
    this.partsDefiniton.emit();
  }
}
