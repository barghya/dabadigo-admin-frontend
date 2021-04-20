import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DeployRequestVehicle, VehicleDetails, deploymentRequestID } from 'src/app/models/deployVehicleModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { RegionItem, CityItem, states } from 'src/app/models/regionManagement';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-deploy-vehicle-main',
  templateUrl: './deploy-vehicle-main.component.html',
  styleUrls: ['./deploy-vehicle-main.component.scss']
})
export class DeployVehicleMainComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['assigned_user_name', 'created_on','state_name','city_name','rentalpoint_name', 'region_name', 'updated_on','deployment_request_status_name', 'action']
  dataSource: MatTableDataSource<DeployRequestVehicle>;
  selectedData: DeployRequestVehicle[]=[]
  @Output() deployvehicle = new EventEmitter<DeployRequestVehicle>();
  @Output() canceldeployvehicle = new EventEmitter<deploymentRequestID>();
  @Input() vehicleRequest$: Observable<DeployRequestVehicle[]>;
  @Output() addRequestEvent= new EventEmitter<DeployRequestVehicle[]>();
  @Output() viewDeploymentRequests = new EventEmitter<DeployRequestVehicle>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subs = new SubSink();
  selectedRegion: number = 0;
  selectedCity: number = 0;
  selectedState: number = 0;
  Alldata:DeployRequestVehicle[];
  filteredRegions$: Observable<RegionItem[]>;
  @Input() regions$: Observable<RegionItem[]>;
  @Input() city$: Observable<CityItem[]>;
  @Input() state$: Observable<states[]>;
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    console.log(this.vehicleRequest$);
    
    this.subs.add(this.vehicleRequest$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<DeployRequestVehicle>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        this.Alldata = data;
        console.log(this.Alldata);
      }
    ));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired",filterValue);
  }
  regionChange(value: number) {
    this.selectedRegion = value;
    this.calculateFilter();
  }
  cityChange(value: number) {
    if (!!value) {
      this.filteredRegions$ = this.regions$.pipe(map(
        regions => regions.filter(m => m.city_id == value)
      ))
    }
    else {
      this.filteredRegions$ = this.regions$;
    }
    this.selectedCity = value;
    this.calculateFilter();
  }
 stateChange(value: number) {
  if (!!value) {
    this.filteredRegions$ = this.regions$.pipe(map(
      regions => regions.filter(m => m.state_id == value)
    ))
  }
  else {
    this.filteredRegions$ = this.regions$;
  }
    this.selectedState = value;
    this.calculateFilter();
  }

  calculateFilter() {
    if (this.selectedState == 0 &&  this.selectedCity == 0 && this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata);
    }
    
    else if (this.selectedState == 0 &&  this.selectedCity == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.region == this.selectedRegion));
    }

    else if (this.selectedRegion == 0 &&  this.selectedCity == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.state_id == this.selectedState));
    }

    else if (this.selectedState == 0 &&  this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.city_id == this.selectedCity));
    }
    else if (this.selectedState == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.region == this.selectedRegion  && m.city_id == this.selectedCity));
    }

    else if (this.selectedCity == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.region == this.selectedRegion  && m.state_id == this.selectedState));
    }
    
    else if (this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.city_id == this.selectedCity  && m.state_id == this.selectedState));
    }
    else {
      this.dataSource = new MatTableDataSource<DeployRequestVehicle>(this.Alldata.filter(m => m.city_id == this.selectedCity && m.region == this.selectedRegion  && m.state_id == this.selectedState));
    }
   
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  addRequest(){
    this.addRequestEvent.emit();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  deployVehicle(data:DeployRequestVehicle) {
    console.log(data);
    this.deployvehicle.emit(data)
  }

  cancelRequest(deployment_request_id:number) {
    console.log(deployment_request_id);
    var data: deploymentRequestID = {
      deployment_request_id: deployment_request_id
    }
    this.canceldeployvehicle.emit(data)
  }

  View(data: DeployRequestVehicle) {
    this.viewDeploymentRequests.emit(data);
  }
}
