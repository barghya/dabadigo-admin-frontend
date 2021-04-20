import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { MatAutocompleteSelectedEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { take, map, startWith, switchMap, filter } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { SubSink } from 'subsink';
import { RegionItem, EditRegion, states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { managers,editFSQHub, FSQHubDetails, HubRegion, HubManager, Region, FSQDetails, AddFSQHub, hubmanager, hubregion, singleFSQHub, regions, Hubmanager } from 'src/app/models/fsqhubModel';
import { region, regionId } from 'src/app/models/userManagement';
import { EditFSQHubLoadAction } from 'src/app/store/actions/fsq_hub.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { state } from '@angular/animations';

@Component({
  selector: 'app-edit-fsq-hub',
  templateUrl: './edit-fsq-hub.component.html',
  styleUrls: ['./edit-fsq-hub.component.scss']
})
export class EditFsqHubComponent implements OnInit, OnDestroy {
  editfsqHubForm: FormGroup;
  fsqHubRegionEditForm: FormGroup;
  fsqHubManagerEditForm: FormGroup;
  dataSource: MatTableDataSource<HubRegion>;
  dataSourceWithoutInactive: MatTableDataSource<HubRegion>;
  dataSourceWithInactive: MatTableDataSource<HubRegion>;
  dataSource1: MatTableDataSource<HubManager>;
  dataSource1WithoutInactive: MatTableDataSource<HubManager>;
  dataSource1WithInactive: MatTableDataSource<HubManager>;
  dataSource3: MatTableDataSource<FSQDetails>;
  createEditRegionService: HubRegion;
  EditedRegion: HubRegion[]=[];
  EditedManager:HubManager[]=[];
  AvailableRegion: HubRegion[]=[];
  AvailableManager: HubManager[]=[];
  region_id: regions[]=[];
  admn_user_id: Hubmanager[]=[];
  createEditManagerService: HubManager;
  @Output() cancelAddfsqHubevent = new EventEmitter();
  @Output() RemoveRegionHubevent = new EventEmitter();
  @Output() RemoveManagerHubevent = new EventEmitter();
  @Input() availableRegions$: Observable<Region[]>;
  @Input() availableManagers$: Observable<managers[]>;
  @Input() HubstatusName$: Observable<DomainData[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() countriesName$: Observable<countries[]>;
  @Output() EditFSQHub = new EventEmitter<singleFSQHub>();
  @Input() region$;
  @Input() cities$: Observable<CityItem[]>;
  private subs = new SubSink();
  @Output() editfsqHubevent = new EventEmitter();
  availableRegions: Region[]=[];
  availableManager: managers[]=[]
  selectedregion: Region;
  @Input() singleFSQHub$: Observable<editFSQHub>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  FilterRegion: HubRegion[]=[]
  FilterManager: HubManager[]=[]
  displayedColumnsRegion: string[] = ["region_name", "start_date", "end_date", "hub_region_status_name","action"];
  displayedColumnsmanager: string[] = ["manager_name", "start_date", "end_date", "hub_manager_status_name","action"];
  displayedColumnsFSQ: string[] = ["fsq_name", "start_date", "end_date", "fsq_status_name"];

  hub_manager: MatTableDataSource<HubManager>
  @ViewChild("hubManagerpaginator", {static: true}) hubManagerpaginator: MatPaginator;
  @ViewChild("hubManagersort", {static: true}) hubManagersort: MatSort;

  hub_region: MatTableDataSource<HubRegion>
  @ViewChild("hubRegionpaginator", {static: true}) hubRegionpaginator: MatPaginator;
  @ViewChild("hubRegionsort", {static: true}) hubRegionsort: MatSort;
 
  hub_fsq: MatTableDataSource<FSQDetails>
  @ViewChild("hubFSQpaginator", {static: true}) hubFSQpaginator: MatPaginator;
  @ViewChild("hubFSQsort", {static: true}) hubFSQsort: MatSort;

  datasourceWithoutInactiveRegion: MatTableDataSource<HubRegion>;
  datasourceWithInactiveRegion: MatTableDataSource<HubRegion>;

  datasourceWithoutInactiveManager: MatTableDataSource<HubManager>;
  datasourceWithInactiveManager: MatTableDataSource<HubManager>;

  datasourceWithoutInactiveFSQ: MatTableDataSource<FSQDetails>;
  datasourceWithInactiveFSQ: MatTableDataSource<FSQDetails>;

  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private router: Router, private fsqHubService: FsqHubService,private store: Store<AppState> ) { }

  ngOnInit() {
    this.editfsqHubForm = this.formbuilder.group({
      hub_short_code: [''],
      hub_name: ['', [Validators.required]],
      addressline1: ['', [Validators.required]],
      addressline2: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pin: ['', [Validators.required, Ms3Validators.integer]],
      hub_status: ['', [Validators.required]],
    });
      this.fsqHubRegionEditForm = this.formbuilder.group({
        hub_region: [''],
      });
  
      this.fsqHubManagerEditForm = this.formbuilder.group({
        hub_manager: [''],
      });     

      this.subs.add(this.availableRegions$.subscribe(
        (data) => {
          this.FilterRegion= data
          this.AvailableRegion= data;        
        }
      ))

      this.subs.add(this.availableManagers$.subscribe(
        (data) => {
          this.FilterManager = data;
          this.AvailableManager = data;
        }
      ))
  }
  ngAfterViewInit() {
    console.log("After view init");
    
    this.subs.add(this.singleFSQHub$.subscribe(
      (data) => {
        if (!!data) {
          this.editfsqHubForm.patchValue(data);
          console.log(data);
          // var reducedData1 = data.hub_manager.filter(m => m.hub_manager_status != 0);
          // this.dataSourceWithInactive = new MatTableDataSource<HubRegion>(data.hub_region);
          // this.dataSourceWithoutInactive = new MatTableDataSource<HubRegion>(reducedData);
          // this.dataSource1WithInactive = new MatTableDataSource<HubManager>(data.hub_manager);
          // this.dataSource1WithoutInactive = new MatTableDataSource<HubManager>(reducedData1);
          this.hub_short_code.disable();
          this.EditedRegion = JSON.parse(JSON.stringify(data.hub_region));
          // this.availableRegions$.pipe(take(1)).subscribe(
          //   data=>{
          //     this.FilterRegion= data;
          //   }
          // )
          
          // this.availableRegions.forEach(m => {
          //   console.log("regin",m);
            
          //   if(!!this.EditedRegion.find(e=>e.region_id!=m.region_id)){
          //     console.log("my filter");
          //     console.log(m)
          //     this.FilterRegion.push(m)
          //   }
          // })
          this.EditedManager = JSON.parse(JSON.stringify(data.hub_manager));
          // this.dataSource = new MatTableDataSource<HubRegion>(reducedData);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource1 = new MatTableDataSource<HubManager>(reducedData1);
          // this.dataSource1.sort = this.sort;
          // this.dataSource1.paginator = this.paginator;
          // this.dataSource3 = new MatTableDataSource<FSQDetails>(data.hub_fsq);
          // this.dataSource3.sort = this.sort;
          // this.dataSource3.paginator = this.paginator;

          var reducedDataRegion = data.hub_region.filter(m => m.hub_region_status == 1);
          console.log(reducedDataRegion);
          this.datasourceWithInactiveRegion = new MatTableDataSource<HubRegion>(data.hub_region);
          this.datasourceWithoutInactiveRegion = new MatTableDataSource<HubRegion>(reducedDataRegion);
          this.hub_region = this.datasourceWithoutInactiveRegion;
          this.hub_region.paginator = this.hubRegionpaginator;
          this.hub_region.sort = this.hubRegionsort;

          var reducedDataManager = data.hub_manager.filter(m => m.hub_manager_status == 1);
          console.log(reducedDataManager);
          this.datasourceWithInactiveManager = new MatTableDataSource<HubManager>(data.hub_manager);
          this.datasourceWithoutInactiveManager = new MatTableDataSource<HubManager>(reducedDataManager);
          this.hub_manager = this.datasourceWithoutInactiveManager;
          this.hub_manager.paginator = this.hubManagerpaginator;
          this.hub_manager.sort = this.hubManagersort;

          var reducedDataFSQ = data.hub_fsq.filter(m => m.user_status == 3);
          console.log(reducedDataFSQ);
          this.datasourceWithInactiveFSQ = new MatTableDataSource<FSQDetails>(data.hub_fsq);
          this.datasourceWithoutInactiveFSQ = new MatTableDataSource<FSQDetails>(reducedDataFSQ);
          this.hub_fsq = this.datasourceWithoutInactiveFSQ;
          this.hub_fsq.paginator = this.hubFSQpaginator;
          this.hub_fsq.sort = this.hubFSQsort;

        }
      }
    ));
  }
  get hub_short_code(): FormControl {
    return <FormControl> this.editfsqHubForm.get('hub_short_code');
  }
  
 
  ShowHideInactiveRegion(checked: boolean) {
    if(checked) {
      console.log(this.datasourceWithInactiveRegion);
      this.hub_region = this.datasourceWithInactiveRegion;
      this.hub_region.sort = this.hubRegionsort;
      this.hub_region.paginator = this.hubRegionpaginator;
      this.hub_region.paginator.firstPage();
    }
    else {
      console.log(this.datasourceWithoutInactiveRegion);   
      this.hub_region = this.datasourceWithoutInactiveRegion;
      this.hub_region.sort = this.hubRegionsort;
      this.hub_region.paginator = this.hubRegionpaginator;
      this.hub_region.paginator.firstPage();
    }
  }


  ShowHideInactiveManager(checked: boolean) {
    if(checked) {
      this.hub_manager = this.datasourceWithInactiveManager;
      this.hub_manager.sort = this.hubManagersort;
      this.hub_manager.paginator = this.hubManagerpaginator;
      this.hub_manager.paginator.firstPage();
    }
    else {
      this.hub_manager = this.datasourceWithoutInactiveManager;
      this.hub_manager.sort = this.hubManagersort;
      this.hub_manager.paginator = this.hubManagerpaginator;
      this.hub_manager.paginator.firstPage();
    }
  }

  ShowHideInactiveFSQ(checked: boolean) {
    if(checked) {
      this.hub_fsq = this.datasourceWithInactiveFSQ;
      this.hub_fsq.sort = this.hubManagersort;
      this.hub_fsq.paginator = this.hubFSQpaginator;
      this.hub_fsq.paginator.firstPage();
    }
    else {
      this.hub_fsq = this.datasourceWithoutInactiveFSQ;
      this.hub_fsq.sort = this.hubManagersort;
      this.hub_fsq.paginator = this.hubFSQpaginator;
      this.hub_fsq.paginator.firstPage();
    }
  }

  removeRegion(element: HubRegion){
    console.log(this.region_id);
    
    if(element.hub_region_status==1){
      var data: hubregion = {
        hub_region_id: element.hub_region_id,
        hub_id: element.hub_id,
      }
      this.hub_region = new MatTableDataSource<HubRegion>(this.EditedRegion.filter(m=>m.hub_region_id!=element.hub_region_id && m.hub_region_status==1));
      this.RemoveRegionHubevent.emit(data);
    }else{
      this.FilterRegion.push(element);
      this.EditedRegion= this.EditedRegion.filter(m=> m.region_id != element.region_id)
      this.hub_region= new MatTableDataSource<HubRegion>(this.EditedRegion);
      this.region_id = this.region_id.splice(this.region_id.findIndex(m => m == element.region_id), 1)
    }
    console.log(this.region_id);
    
  }

  removeManager(element: HubManager){
    // var data: hubmanager = {
    //   admn_user_id: value2,
    //   hub_id:value1
    // }
    // this.hub_manager = new MatTableDataSource<HubManager>(this.EditedManager.filter(m=>m.admn_user_id!=value2 && m.hub_manager_status==1));
    // this.RemoveManagerHubevent.emit(data);

    if(element.hub_manager_status==1){
      var data: hubmanager = {
       admn_user_id: element.admn_user_id,
       hub_id: element.hub_id,
      }
      this.hub_manager = new MatTableDataSource<HubManager>(this.EditedManager.filter(m=>m.admn_user_id!=element.admn_user_id && m.hub_manager_status==1));
      this.RemoveManagerHubevent.emit(data);
    }else{
      this.FilterManager.push(element);
      this.EditedManager= this.EditedManager.filter(m=> m.admn_user_id != element.admn_user_id)
      this.hub_manager= new MatTableDataSource<HubManager>(this.EditedManager);
      this.admn_user_id = this.admn_user_id.filter(m=> m.admn_user_id != element.admn_user_id)
    }
  }

  cancelAddFSQHub() {
    this.cancelAddfsqHubevent.emit();
  }

  saveFSQHub() {
    console.log(this.region_id);
    console.log();
    
    this.store.select(state => state.fsq_hub.SingleHub).pipe(take(1)).subscribe(
      (data) => {
        var formdata: singleFSQHub = {
          created_by: data.created_by,
          created_on: data.created_on,
          hub_short_code: data.hub_short_code,
          hub_id: data.hub_id,
          // hub_name : this.editfsqHubForm.controls.hub_name.value,
          // hub_region: this.region_id,
        };
        console.log(formdata);
        formdata.hub_name = this.editfsqHubForm.controls.hub_name.value;
        formdata.addressline1 = this.editfsqHubForm.controls.addressline1.value;
        formdata.addressline2 = this.editfsqHubForm.controls.addressline2.value;
        formdata.hub_status = this.editfsqHubForm.controls.hub_status.value;
        formdata.country_id = this.editfsqHubForm.controls.country.value;
        formdata.state_id = +this.editfsqHubForm.controls.state.value;
        formdata.city_id = this.editfsqHubForm.controls.city.value;
        formdata.pin = +this.editfsqHubForm.controls.pin.value;
        formdata.hub_region= this.region_id,
        formdata.hub_manager= this.admn_user_id,
        // this.store.select(state => state.fsq_hub.SingleHub.hub_id).pipe(take(1)).subscribe(
        //   hub_id => {
        //     formdata.hub_id = hub_id;
        //   }
        // )
        console.log(formdata);
        this.EditFSQHub.emit(formdata);
      }
    )
  }

  // BuildData(): EditFSQHubLoadAction {
  //   var HubData;
  //   this.singleFSQHub$.pipe(take(1)).subscribe(
  //     (data) => {
  //       HubData = { ...data };
  //       // HubData.hub_id = this.editfsqHubForm.controls.hub_id.value;
  //       HubData.hub_name = this.editfsqHubForm.controls.hub_name.value;
  //       HubData.hub_addressline1 = this.editfsqHubForm.controls.hub_addressline1.value;
  //       HubData.hub_addressline2 = this.editfsqHubForm.controls.hub_addressline2.value;
  //       HubData.hub_status = this.editfsqHubForm.controls.hub_status.value;
  //       HubData.hub_country = this.editfsqHubForm.controls.hub_country.value;
  //       HubData.hub_state = this.editfsqHubForm.controls.hub_state.value;
  //       HubData.hub_pin_no = this.editfsqHubForm.controls.hub_pin_no.value;
  //       HubData.hub_region= [{
  //         region_id: +this.fsqHubRegionEditForm.controls.hub_region.value,
  //       }],
  
  //       HubData.hub_manager= [{
  //         admn_user_id: +this.fsqHubManagerEditForm.controls.hub_manager.value,
  //       }]
  //       console.log(HubData);
  //       this.EditFSQHub.emit(HubData);
  //     }
  //   );
  
  //   // return HubData;
  // }



 
  validateHubcode(control: AbstractControl) {
    var booleanResponse = this.fsqHubService.duplicateHubcode(control.value);
    return this.formatResponse(booleanResponse);
  }

  formatResponse = map((val: any) => {
    return val.response ? { duplicateHubcode: true } : null;
  }); 

  addFSQHubRegion() {
    var region_id = +this.fsqHubRegionEditForm.controls['hub_region'].value;
    console.log("region id=",region_id);
    this.availableRegions$.pipe(take(1)).subscribe(
      regions => {
        var selectedRegion = regions.find(m => m.region_id == region_id)
        this.EditedRegion.push({
          region_name: selectedRegion.region_name,
          region_id: +selectedRegion.region_id,
          end_date: null,
          hub: null,
          hub_region_id: null,
          hub_region_status: null,
          start_date: null
        });
        this.FilterRegion= this.FilterRegion.filter(m=> m.region_id!=region_id);
        this.region_id.push({
          region_id: selectedRegion.region_id
        })
        this.hub_region = new MatTableDataSource<HubRegion>(this.EditedRegion);
        console.log(this.region_id);
      }
    )
    
  }
  
  
  addFSQHubManager() {
   
    var admn_user_id = +this.fsqHubManagerEditForm.controls['hub_manager'].value;
    this.availableManagers$.pipe(take(1)).subscribe(
      manager => {
        var selectedManager = manager.find(m => m.admn_user_id == admn_user_id)
        this.EditedManager.push({
          manager_name: selectedManager.manager_name,
          admn_user_id: +selectedManager.admn_user_id,
        });
        this.FilterManager = this.FilterManager.filter(m=> m.admn_user_id != admn_user_id);
        console.log("afterAdd",this.FilterManager);
        this.admn_user_id.push({
          admn_user_id: admn_user_id,
        });
        this.hub_manager = new MatTableDataSource<HubManager>(this.EditedManager);
      }
    )

    
    
    // this.availableManagers$.pipe(take(1)).subscribe(
    //   regions => {
    //     var selectedManager = regions.find(m => m.admn_user_id == region_id)
    //     this.EditedRegion.push({
    //       region_name: selectedRegion.region_name,
    //       region_id: +selectedRegion.region_id,
    //       end_date: null,
    //       hub: null,
    //       hub_region_id: null,
    //       hub_region_status: null,
    //       start_date: null
    //     });
    //     var intermediateRegion: HubRegion[]=[]
    //     this.AvailableRegion.forEach(element => {
    //       if(!(this.EditedRegion.find(m=> m.region_id ==element.region_id))){
    //         intermediateRegion.push({
    //           region_name: element.region_name,
    //           region_id: +element.region_id,
    //           end_date: null,
    //           hub: null,
    //           hub_region_id: null,
    //           hub_region_status: null,
    //           start_date: null
    //         });
    //       }
    //       this.FilterRegion= intermediateRegion;
    //     })
    //     console.log("afterAdd",this.FilterRegion);
        
    //     this.hub_region = new MatTableDataSource<HubRegion>(this.EditedRegion);
    //   }
    // )
  }

  applyFilterRegion(filterValue: string) {
    this.hub_region.filter = filterValue.trim().toLowerCase();

    if (this.hub_region.paginator) {
      this.hub_region.paginator.firstPage();
    }
    console.log(filterValue);
  }

  applyFilterManager(filterValue: string) {
    this.hub_manager.filter = filterValue.trim().toLowerCase();

    if (this.hub_manager.paginator) {
      this.hub_manager.paginator.firstPage();
    }
    console.log(filterValue);
  }

  applyFilterFSQ(filterValue: string) {
    this.hub_fsq.filter = filterValue.trim().toLowerCase();

    if (this.hub_fsq.paginator) {
      this.hub_fsq.paginator.firstPage();
    }
    console.log(filterValue);
  }


  regionSelection(data){
    console.log(data);
    
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
