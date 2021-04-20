import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { RegionItem } from 'src/app/models/regionManagement';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Rentalpointdet, GetRp } from 'src/app/models/rentalPoint';
import { SubSink } from 'subsink';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { VehicleDetails, DeployRequestVehicle, drlineitems } from 'src/app/models/deployVehicleModel';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-add-deploy-request',
  templateUrl: './add-deploy-request.component.html',
  styleUrls: ['./add-deploy-request.component.scss']
})
export class AddDeployRequestComponent implements OnInit, OnDestroy, OnChanges{
  addDeployForm:FormGroup
  @Output() cancelDeployRequest = new EventEmitter;
  @Output() emitRequestVehicle = new EventEmitter();
  @Output() selectVehicleEvent = new EventEmitter<VehicleDetails[]>();
  @Input() user$;
  @Input() region$;
  @Input() rentalPoint$;
  @Input() emitSelectVehicle;
  @Input() deployVehicle: VehicleDetails[];
  requestVehicleList:drlineitems[]=[]
  subs = new SubSink();
  FilterRegion: RegionItem[]=[];
  FilterRentalPoint: GetRp[]=[];
  Region: RegionItem[]=[];
  RentalPoint: GetRp[]=[];
  SelectVehicle: VehicleDetails[]=[];
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,private store: Store<AppState>) { }
  displayedColumns: string[] = ['vehicle_idnumber', 'manufacturer', 'model', 'manufacture_date', 'warranty_expiry', 'warranty_terms', 'QRCode', 'vehicle_type_name', 'vehicle_current_status_name'];
  dataSource: MatTableDataSource<VehicleDetails>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.addDeployForm = this.formbuilder.group({
      region: ['',[Validators.required]],
      rentalpoint: ['',[Validators.required]],
      assigned_user: ['',[Validators.required]],
    })
    this.subs.add(this.region$.subscribe(
      (data)=>{
        this.Region= data;
        this.FilterRegion= data
        console.log("region",this.Region);
        
      }
    ))
    this.subs.add(this.rentalPoint$.subscribe(
      (data)=>{
        this.RentalPoint= data;
        this.FilterRentalPoint= data;
        console.log("rental point",this.RentalPoint);
      }
    ))

  }
  selectVehicle(){
    this.selectVehicleEvent.emit(this.deployVehicle)
  }

  regionSelection(data){
    this.FilterRentalPoint=this.RentalPoint.filter(element => element.region_id==data.value)
    console.log(data);
  }
  rentalPointSelection(data){  
    this.addDeployForm.patchValue({
      region: this.FilterRentalPoint.find(element => element.rentalpoint_id==data.value).region_id
    })

  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<VehicleDetails>(this.deployVehicle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  AddRequestVehicle(){
    this.deployVehicle.forEach(element => {
      this.requestVehicleList.push({vehicle:element.vehicle_id});
    });
    var formData: DeployRequestVehicle = {
      region: +this.addDeployForm.controls.region.value,
      rentalpoint: +this.addDeployForm.controls.rentalpoint.value,
      assigned_user: +this.addDeployForm.controls.assigned_user.value,
      drlineitems: this.requestVehicleList,
    }
    this.emitRequestVehicle.emit(formData)
    console.log(formData);
  }

  cancel(){
    this.cancelDeployRequest.emit()
  }
}
