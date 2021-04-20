import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceJobItem, MaintenanceJobsFilterPayload } from 'src/app/models/maintenanceJobsModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SubSink } from 'subsink';
import { countries, Assets } from 'src/app/models/asset-inventoryModel';
import { states, RegionItem, CityItem } from 'src/app/models/regionManagement';
import { FSQDetails } from 'src/app/models/fsqManagement';
import { GetRp } from 'src/app/models/rentalPoint';
import { DomainData } from 'src/app/models/domainModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FsqSearchComponent } from 'src/app/transfer-parts/container/fsq-search/fsq-search.component';
import { FsqSearchDialogComponent } from '../../container/fsq-search-dialog-component/fsq-search-dialog-component.component';
import { map } from 'rxjs/operators';
import { users } from 'src/app/models/userManagement';

@Component({
  selector: 'app-maintenance-jobs-main',
  templateUrl: './maintenance-jobs-main.component.html',
  styleUrls: ['./maintenance-jobs-main.component.scss']
})
export class MaintenanceJobsMainComponent implements OnInit {
  @Input() maintenanceJobs$: Observable<MaintenanceJobItem[]>;
  @Input() countries$?: Observable<countries[]>;
  @Input() states$?: Observable<states[]>;
  @Input() regions$?: Observable<RegionItem[]>;
  filteredRegions$?: Observable<RegionItem[]>;
  @Input() vehicles$?: Observable<Assets[]>;
  @Input() rentalPointList$?: Observable<GetRp[]>;
  @Input() problemStatusList$?: Observable<DomainData[]>;
  @Input() fsqLevelList$?: Observable<DomainData[]>;
  @Input() cities$?: Observable<CityItem[]>;
  @Input() activeBeus$?: Observable<users[]>;
  @Input() beu_id?: number;
  @Output() filterMaintenanceData = new EventEmitter<MaintenanceJobsFilterPayload>();
  @Output() view = new EventEmitter<number>();
  @Output() create = new EventEmitter();
  @Output() regionSelected = new EventEmitter<number>();
  selectedFsq: FSQDetails;
  private subs = new SubSink();

  dataSource: MatTableDataSource<MaintenanceJobItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "work_item_ref_no",
    "vehicle_idnumber",
    "reported_timestamp",
    "days_under_maintenance",
    "region_name",
    "countries_name",
    "states_name",
    "city_name",
    "rentalpoint_name",
    "problem_status_name",
    "assigned_fsq",
    "beu_name",
    "action",
  ]
  
  past_flag: boolean = false;
  FilterForm: FormGroup;
  minDate: Date = new Date(0,0,0);

  constructor(public languageService: LanguageService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.FilterForm = this.fb.group({
      city_id: [null],
      country_id: [null],
      days_under_maintenance: [null],
      franchisee_id: [null],
      fsq_id: [null],
      fsq_level: [null],
      managing_beu: [null],
      problem_status: [null],
      region_id: [null],
      rentalpoint_id: [null],
      state_id: [null],
      vehicle_id: [null],
      start_date: [null],
      end_date: [null]
    })
    this.FilterForm.controls.fsq_id.disable();
    
    if (!!this.beu_id) {
      this.FilterForm.controls.managing_beu.patchValue(this.beu_id);
    }

    this.subs.add(this.maintenanceJobs$.subscribe(
      maintenanceJobs => {
        if(!!maintenanceJobs) {
          this.dataSource = new MatTableDataSource<MaintenanceJobItem>(maintenanceJobs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Search() {
    var dialogRef = this.dialog.open(
      FsqSearchDialogComponent,
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
          this.FilterForm.controls.fsq_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
        }
      }
    )
  }

  RegionSelection(region_id: number) {
    this.FilterForm.controls.rentalpoint_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
    }
  }

  CitySelected(city_id: number) {
    this.FilterForm.controls.region_id.patchValue(null);
    this.FilterForm.controls.rentalpoint_id.patchValue(null);
    this.filteredRegions$ = this.regions$.pipe(map(
      regionList => regionList.filter(m => m.city_id == city_id)
    ))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Filter() {
    this.filterMaintenanceData.emit({
      past_flag: this.past_flag,
      city_id: (this.FilterForm.controls.city_id.value ? this.FilterForm.controls.city_id.value : null),
      country_id: (this.FilterForm.controls.country_id.value ? this.FilterForm.controls.country_id.value : null),
      days_under_maintenance: (this.FilterForm.controls.days_under_maintenance.value ? this.FilterForm.controls.days_under_maintenance.value : null),
      franchisee_id: (this.FilterForm.controls.franchisee_id.value ? this.FilterForm.controls.franchisee_id.value : null),
      fsq_id: (!!this.selectedFsq && !!this.selectedFsq.admn_user_id ? this.selectedFsq.admn_user_id : null),
      fsq_level: (this.FilterForm.controls.fsq_level.value ? this.FilterForm.controls.fsq_level.value : null),
      managing_beu: (this.FilterForm.controls.managing_beu.value ? this.FilterForm.controls.managing_beu.value : null),
      problem_status: (this.FilterForm.controls.problem_status.value ? this.FilterForm.controls.problem_status.value : null),
      region_id: (this.FilterForm.controls.region_id.value ? this.FilterForm.controls.region_id.value : null),
      rentalpoint_id: (this.FilterForm.controls.rentalpoint_id.value ? this.FilterForm.controls.rentalpoint_id.value : null),
      state_id: (this.FilterForm.controls.state_id.value ? this.FilterForm.controls.state_id.value : null),
      vehicle_id: (this.FilterForm.controls.vehicle_id.value ? this.FilterForm.controls.vehicle_id.value : null),
      start_date: (this.FilterForm.controls.start_date.value ? this.FilterForm.controls.start_date.value : null),
      end_date: (this.FilterForm.controls.end_date.value ? this.FilterForm.controls.end_date.value : null),
    })
  }

  ClearFilter() {
    this.FilterForm.controls.city_id.patchValue(null);
    this.FilterForm.controls.country_id.patchValue(null);
    this.FilterForm.controls.days_under_maintenance.patchValue(null);
    this.FilterForm.controls.franchisee_id.patchValue(null);
    this.FilterForm.controls.fsq_id.patchValue(null);
    this.FilterForm.controls.fsq_level.patchValue(null);
    this.FilterForm.controls.managing_beu.patchValue(null);
    this.FilterForm.controls.problem_status.patchValue(null);
    this.FilterForm.controls.region_id.patchValue(null);
    this.FilterForm.controls.rentalpoint_id.patchValue(null);
    this.FilterForm.controls.state_id.patchValue(null);
    this.FilterForm.controls.vehicle_id.patchValue(null);
    this.FilterForm.controls.start_date.patchValue(null);
    this.FilterForm.controls.end_date.patchValue(null);
    this.selectedFsq = undefined;
    this.Filter();
  }

  StartDateChanged(){
    if (this.FilterForm.controls.start_date.value) {
      if (this.FilterForm.controls.end_date.value && 
        (this.FilterForm.controls.start_date.value >= this.FilterForm.controls.end_date.value)) {
          this.FilterForm.get('end_date').reset();
        }
    }
    var fromDate: Date = new Date(this.FilterForm.controls.start_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
  }

  View(work_item_id: number) {
    this.view.emit(work_item_id);
  }

  ShowHidePastData(past_flag: boolean) {
    this.past_flag = past_flag;
    this.Filter();
  }

  Create() {
    this.create.emit();
  }

}
