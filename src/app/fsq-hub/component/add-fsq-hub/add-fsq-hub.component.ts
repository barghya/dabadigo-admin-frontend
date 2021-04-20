import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { MatAutocompleteSelectedEvent, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { managers, AddFSQHub, Hubregion, Hubmanager, HubRegion, HubManager, Region, regions} from 'src/app/models/fsqhubModel';
import { take, map, startWith, switchMap } from 'rxjs/operators';
import { countries } from 'src/app/models/asset-inventoryModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { SubSink } from 'subsink';
import { states, EditRegion, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { region, regionId } from 'src/app/models/userManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Component({
  selector: 'app-add-fsq-hub',
  templateUrl: './add-fsq-hub.component.html',
  styleUrls: ['./add-fsq-hub.component.scss']
})
export class AddFsqHubComponent implements OnInit, OnDestroy {
  fsqHubForm: FormGroup;
  fsqHubManagerForm: FormGroup;
  fsqHubRegionForm: FormGroup;
  createAddRegionService: Region;
  AddedRegion: Region[]=[];
  AddedManager:managers[]=[];
  createAddManagerService: managers;
  dataSource: MatTableDataSource<Region>;
  region: Region[] = [];
  regionList:any;
  manager: managers[] = [];
  dataSource1: MatTableDataSource<managers>;
  @Output() cancelAddfsqHubevent = new EventEmitter();
  removable = true;
  selectable = true;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  regionsList: Hubregion[] = [];
  managersList: Hubmanager[] = [];
  FilterRegion: HubRegion[]=[];
  FilterManager: HubManager[]=[]
  AvailableRegion: HubRegion[]=[];
  AvailableManager: HubManager[]=[];
  addedRegion: HubRegion[]=[];
  region_id: regions[]=[];
  admn_user_id: managers[]=[];
  addedManager: HubManager[]=[];
  availableRegions: Region[]=[];
  availableManager: managers[]=[]
  @Input() availableRegions$: Observable<Region[]>;
  @Input() availableManagers$: Observable<managers[]>;
  @Input() HubstatusName$: Observable<DomainData[]>;
  @Input() countriesName$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Output() addfsqHubevent = new EventEmitter();
  @Output() AddRegionEvent = new EventEmitter();
  private subs = new SubSink();
  // filteredRegions$: Observable<region[]>;
  // filteredmanagers$: Observable<managers[]>;
  displayedColumns: string[] = ["region_name", "action"];
  displayedColumnsmanager: string[] = ["manager_name", "action"];
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private router: Router, private fsqHubService: FsqHubService,private store: Store<AppState> ) { }

  ngOnInit() {

    // this.subs.add(this.availableRegions$.subscribe(
    //   (data) => {
    //     if (data) {
    //       console.log(data);

    //     }
    //   }
    // ));

    // this.subs.add(this.availableManagers$.subscribe(
    //   (data) => {
    //     if (!!data) {
    //       console.log(data);

    //     }
    //   }
    // ));
    this.fsqHubForm = this.formbuilder.group({
      hub_short_code: ['', [Validators.required], [this.validateHubcode.bind(this)]],
      hub_name: ['', [Validators.required]],
      addressline1: ['', [Validators.required]],
      addressline2: [''],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      pin: ['', [Validators.required, Ms3Validators.integer]],
      hub_status: ['', [Validators.required]],
    });
    this.fsqHubRegionForm = this.formbuilder.group({
      hub_region: [''],
    });

    this.fsqHubManagerForm = this.formbuilder.group({
      hub_manager: [''],
    });

    this.dataSource = new MatTableDataSource<Region>(this.AddedRegion);
    this.dataSource1 = new MatTableDataSource<managers>(this.AddedManager);

    this.subs.add(this.availableRegions$.subscribe(
      (data) => {
        this.AvailableRegion = data;
        this.FilterRegion = data;
      }
    ))

    this.subs.add(this.availableManagers$.subscribe(
      (data) => {
        this.FilterManager = data;
        this.AvailableManager = data;
      }
    ))

  }

  // clear() {

  // }

  cancelAddFSQHub() {
    this.cancelAddfsqHubevent.emit();
  }
  addFSQHub() {
    var postedData: AddFSQHub = {
      hub_short_code: this.fsqHubForm.controls.hub_short_code.value,
      hub_name: this.fsqHubForm.controls.hub_name.value,
      addressline1: this.fsqHubForm.controls.addressline1.value,
      addressline2: this.fsqHubForm.controls.addressline2.value,
      hub_status: this.fsqHubForm.controls.hub_status.value,
      country_id: this.fsqHubForm.controls.country_id.value,
      state_id: +this.fsqHubForm.controls.state_id.value,
      city_id: this.fsqHubForm.controls.city_id.value,
      pin: +this.fsqHubForm.controls.pin.value,
      hub_region: this.region_id,
      hub_manager: this.admn_user_id,
    }
    this.addfsqHubevent.emit(postedData);
    console.log(postedData);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  validateHubcode(control: AbstractControl) {
    var booleanResponse = this.fsqHubService.duplicateHubcode(control.value);
    return this.formatResponse(booleanResponse);
  }

  formatResponse = map((val: any) => {
    return val.response ? { duplicateHubcode: true } : null;
  });

  addFSQHubRegion() {
    this.createAddRegionService = {
      region_id: this.fsqHubRegionForm.controls['hub_region'].value,
    }
    var region_id = +this.fsqHubRegionForm.controls['hub_region'].value;
    // console.log("region id=",region_id);
    var region: region = {}
    this.availableRegions$.pipe(take(1)).subscribe(
      // data=>{
      //   region = data.find(m=> m.region_id == this.createAddRegionService.region_id);
      //   console.log(data.find(e=>e.region_id==this.createAddRegionService.region_id));
        
      //   this.AddedRegion.push(data.find(e=>e.region_id==this.createAddRegionService.region_id)) ;
      //        this.dataSource.data= this.AddedRegion;
      //        console.log(data);
      //        console.log(this.AddedRegion);
             
             
      // }
      region => {
        var selectedRegion = region.find(m => m.region_id == region_id)
        this.addedRegion.push({
          region_name: selectedRegion.region_name,
          region_id: +selectedRegion.region_id,
          end_date: null,
          hub: null,
          hub_region_id: null,
          hub_region_status: null,
          start_date: null
        }); 
        
        this.region_id.push({
          region_id: region_id
        })
        this.FilterRegion = this.FilterRegion.filter(m=> m.region_id != region_id); 
        // this.FilterRegion = this.availableRegions.splice(this.availableRegions.findIndex(m=>m.region_id == region_id), 1);
        this.dataSource = new MatTableDataSource<HubRegion>(this.addedRegion);
        
      }
    )

  }

  addFSQHubManager() {
    this.createAddManagerService = {
      admn_user_id: this.fsqHubManagerForm.controls['hub_manager'].value,
    }
    console.log(this.createAddManagerService);
    var manager: managers = {}
    // this.availableManagers$.pipe(take(1)).subscribe(
    //   data=>{
    //     manager = data.find(m=> m.admn_user_id == this.createAddManagerService.admn_user_id);
    //     this.AddedManager.push(data.find(e=>e.admn_user_id==this.createAddManagerService.admn_user_id)) ;
    //          this.dataSource1.data= this.AddedManager;
           
    // //          console.log(data);
    // //           var reducedData = data.filter(m => m.admn_user_id != this.createAddManagerService.admn_user_id);
    // // console.log(reducedData);

    //   }
    // );

    var admn_user_id = +this.fsqHubManagerForm.controls['hub_manager'].value;
    this.availableManagers$.pipe(take(1)).subscribe(
      manager => {
        var selectedManager = manager.find(m => m.admn_user_id == admn_user_id)
        this.addedManager.push({
          manager_name: selectedManager.manager_name,
          admn_user_id: +selectedManager.admn_user_id,
        });
        this.admn_user_id.push({
          admn_user_id: admn_user_id
        });
        this.FilterManager = this.FilterManager.filter(m=> m.admn_user_id != admn_user_id);
        console.log("afterAdd",this.FilterManager);

        this.dataSource1 = new MatTableDataSource<HubManager>(this.addedManager);
        console.log(this.admn_user_id);

      }
    )

  }
  
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  removeRegion(element: HubRegion){
   
    this.FilterRegion.push(element);
    this.addedRegion= this.addedRegion.filter(m=> m.region_id != element.region_id)
    this.dataSource= new MatTableDataSource<HubRegion>(this.addedRegion);
    this.region_id = this.region_id.splice(this.region_id.findIndex(m => m == element.region_id), 1)
    console.log(this.region_id);
  }

  removeManager(element: HubManager){
    console.log(element);
    
    this.FilterManager.push(element);
    this.addedManager= this.addedManager.filter(m=> m.admn_user_id != element.admn_user_id)
    this.dataSource1= new MatTableDataSource<HubManager>(this.addedManager);
    this.admn_user_id = this.admn_user_id.splice(this.admn_user_id.findIndex(m => m == element.admn_user_id), 1)
    console.log(this.admn_user_id);
    console.log(this.admn_user_id.findIndex(m => m == element.admn_user_id));
    
    
  }
}
