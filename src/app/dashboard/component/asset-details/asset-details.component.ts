import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleInDetail, ProblemItem, TripInfo, WorkItemDetails } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';
import * as ol from 'openlayers';
import { map } from 'rxjs/operators';
import { SourceVectorComponent, LayerVectorComponent } from 'ngx-openlayers';
import { SubSink } from 'subsink';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit, OnDestroy {
  public zoom = 11;
  private subs = new SubSink();
  end_min: Date;
  @Output() ViewAssetTripsEvent = new EventEmitter();
  @Input() assetDetail$: Observable<VehicleInDetail>;
  @Input() userType$: Observable<number>;
  deviceDisplayedColumns: string[] = ['device_name', 'device_imei', 'device_make', 'device_model', 'device_code', 'manufacturing_date', 'commissioning_date', 'country_of_origin', 'device_status_name'];
  batteryDisplayedColumns: string[] = ['battery_tag', 'battery_make', 'battery_model', 'battery_power', 'warranty_period', 'battery_manufacturing_date', 'country_of_origin_name', 'battery_state']; 
  // partsDisplayedColumns: string[] = ['part_name', 'part_code', 'part_manufacturer', 'part_source_country', 'part_price', 'vehicle_part_state']
  // tripInfoDisplayedColumns: string[] = ['trip_ref_no', 'customer_name', 'coupon_code', 'corporate_enabled', 'paid_amount', 'start_location_name', 'end_location_name', 'distance_travelled', 'booking_time', 'ontrip_start_time', 'end_time', 'riding_time', 'pause_time', 'total_trip_time', 'trip_status_name', 'action'];
  c1: string[] = ['trip_ref_no', 'customer_name', 'coupon_code', 'corporate_enabled', 'paid_amount','franchise_shared_amount' , 'start_location_name', 'end_location_name', 'distance_travelled', 'booking_time', 'ontrip_start_time', 'end_time', 'riding_time', 'pause_time', 'total_trip_time', 'trip_status_name', 'action'];
  c2: string[] =['trip_ref_no','coupon_code','paid_amount','franchise_shared_amount' ,'start_location_name', 'end_location_name', 'distance_travelled', 'booking_time', 'ontrip_start_time', 'end_time', 'riding_time', 'pause_time', 'total_trip_time', 'trip_status_name', 'action'];
  tripInfoDisplayedColumns: string[] = [];
  incidentHistoryDisplayedColumns: string[] = ['raised_by_name', 'reported_timestamp', 'problem_description', 'vehicle_currentstate_name', 'work_item_ref_no', 'assigned_to_name', 'assigned_on', 'reported_location_longitude', 'reported_location_latitude', 'queue_type_name', 'action_type_name', 'problem_status_name'];
  problemsDisplayedColumns: string[] = ['problem_code', 'display_desc', 'severity']

  trip_info: MatTableDataSource <TripInfo>;
  work_item_details: MatTableDataSource <WorkItemDetails>;

  pointList: ol.Coordinate[] = [];
  @ViewChild('pastMarkersSource', { static: false }) pastMarkersSource: SourceVectorComponent;
  @ViewChild('availableMarkersSource', { static: false }) availableMarkersSource: SourceVectorComponent;
  @ViewChild('onTripMarkersSource', { static: false }) onTripMarkersSource: SourceVectorComponent;
  @ViewChild('accidentMarkersSource', { static: false }) accidentMarkersSource: SourceVectorComponent;
  @ViewChild('geofenceMarkersSource', { static: false }) geofenceMarkersSource: SourceVectorComponent;
  @ViewChild('problemLowMarkersSource', { static: false }) problemLowMarkersSource: SourceVectorComponent;
  @ViewChild('problemMediumMarkersSource', { static: false }) problemMediumMarkersSource: SourceVectorComponent;
  @ViewChild('problemHighMarkersSource', { static: false }) problemHighMarkersSource: SourceVectorComponent;
  @ViewChild("tripInfopaginator", {static: true}) tripInfopaginator: MatPaginator;
  @ViewChild("tripInfosort", {static: true}) tripInfosort: MatSort;
  @ViewChild("incidentDetailspaginator", {static: true}) incidentDetailspaginator: MatPaginator;
  @ViewChild("incidentHistorysort", {static: true}) incidentHistorysort: MatSort;
  src: any;
  dateFilter: FormGroup;
  TripInfo: TripInfo[]=[];
  constructor(public languageService: LanguageService,private fb: FormBuilder) { }

  ngOnInit() {
    this.subs.add(this.userType$.subscribe(data => {
      if(!!data){
        if(data == 3){
          this.tripInfoDisplayedColumns = this.c2;
         }
        else{
        this.tripInfoDisplayedColumns = this.c1;
         }
      }
    }
    ));
    this.dateFilter = this.fb.group({
      filterStartTime: [null],
      filterEndTime:[null]
    })
    this.subs.add(this.assetDetail$.subscribe(asset => {
        if(!!asset){
        this.TripInfo = asset.trip_info
        this.trip_info = new MatTableDataSource(asset.trip_info);
        this.trip_info.paginator = this.tripInfopaginator;
        this.trip_info.sort = this.tripInfosort;
        this.work_item_details = new MatTableDataSource(asset.work_item_details);
        this.work_item_details.paginator = this.incidentDetailspaginator;
        this.work_item_details.sort = this.incidentHistorysort;
        }
      
      if (!!asset && !!asset.locations) {
        for (var index = 0; index < asset.locations.length; index++) {
          var locationItem = asset.locations[index];
          if (index == 0) {
            this.addPoint(+((+locationItem.longitude).toFixed(4)), +((+locationItem.latitude).toFixed(4)));
            this.addMarker(+((+locationItem.longitude).toFixed(4)), +((+locationItem.latitude).toFixed(4)), asset.vehicle_current_status, asset.vehicle_problem_body);
          }
          else {
            this.addPoint(+((+locationItem.longitude).toFixed(4)), +((+locationItem.latitude).toFixed(4)));
          }
        }
        var pointFeature = new ol.Feature({
          geometry: new ol.geom.LineString(this.pointList)
        });

        var style = this.styleFunction(pointFeature);
        pointFeature.setStyle(style);
        this.pastMarkersSource.instance.addFeature(pointFeature);
      }

    }
    ));
  }

  tripFilter(filterValue: string) {
    this.trip_info.filter = filterValue.trim().toLowerCase();

    if (this.trip_info.paginator) {
      this.trip_info.paginator.firstPage();
    }
  }

  incidenthistoryFilter(filterValue: string) {
    this.work_item_details.filter = filterValue.trim().toLowerCase();

    if (this.work_item_details.paginator) {
      this.work_item_details.paginator.firstPage();
    }
  }


  addPoint(lon: number, lat: number) {
    this.pointList.push(ol.proj.fromLonLat([lon,lat]));
  }

  addMarker(lon: number, lat: number, status: number, problems: ProblemItem[]) {
    var markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    });

    if(status == 3) {
      this.availableMarkersSource.instance.addFeature(markerFeature);
    }
    else if(status == 2 || status == 1) {
      this.onTripMarkersSource.instance.addFeature(markerFeature);
    }
    else if(status == 4) {
      //TODO: Implement Under Maintenance Icon and Feature
      this.problemLowMarkersSource.instance.addFeature(markerFeature);
    }
    else if(status == 6) {
      if(problems.find(m => m.severity == 1)) {
        this.problemHighMarkersSource.instance.addFeature(markerFeature);
      }
      else if(problems.find(m => m.severity == 2)) {
        this.problemMediumMarkersSource.instance.addFeature(markerFeature);
      }
      else {
        this.problemLowMarkersSource.instance.addFeature(markerFeature);
      }
    }
    else if(status == 7) {
      this.accidentMarkersSource.instance.addFeature(markerFeature);
    }
  }

  styleFunction(feature): ol.style.Style[] {
    var geometry = feature.getGeometry();
    var styles = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2
        })
      })
    ];
  
    geometry.forEachSegment(function(start, end) {
      var dx = start[0] - end[0];
      var dy = start[1] - end[1];
      var rotation = Math.atan2(dy, dx);
      // arrows
      styles.push(new ol.style.Style({
        geometry: new ol.geom.Point(start),
        image: new ol.style.Icon({
          src: './assets/arrow.svg',
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        })
      }));
    });
  
    return styles;
  };

  view(customer_trip_association_id: number) {
    this.ViewAssetTripsEvent.emit(customer_trip_association_id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  filterDate(){
    if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value == null){
      this.end_min= new Date(new Date(this.dateFilter.controls['filterStartTime'].value).getTime() + 6000)
      this.trip_info = new MatTableDataSource(this.TripInfo.filter(m=> new Date(m.booking_time).getTime() >= new Date(this.dateFilter.controls['filterStartTime'].value).getTime()));
      this.trip_info.paginator = this.tripInfopaginator;
      this.trip_info.sort = this.tripInfosort;
    }else if(this.dateFilter.controls['filterStartTime'].value == null && this.dateFilter.controls['filterEndTime'].value != null){
      this.end_min= null
      this.trip_info = new MatTableDataSource(this.TripInfo.filter(m=> new Date(m.booking_time).getTime() <= new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
      this.trip_info.paginator = this.tripInfopaginator;
      this.trip_info.sort = this.tripInfosort;
    }else if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value != null){
      this.end_min= new Date(new Date(this.dateFilter.controls['filterStartTime'].value).getTime() + 6000)
      this.trip_info = new MatTableDataSource(this.TripInfo.filter(m=> new Date(m.booking_time).getTime() >= new Date(this.dateFilter.controls['filterStartTime'].value).getTime()
       && new Date(m.booking_time).getTime() <= new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
      this.trip_info.paginator = this.tripInfopaginator;
      this.trip_info.sort = this.tripInfosort;
    }else{
      this.end_min= null
      this.trip_info = new MatTableDataSource(this.TripInfo);
      this.trip_info.paginator = this.tripInfopaginator;
      this.trip_info.sort = this.tripInfosort;
    }
  }
}
