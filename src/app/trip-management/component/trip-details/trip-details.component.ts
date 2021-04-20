import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { singleTripDetails, tripEvent, ProblemItem, tripAssociationID, priceBreakup } from 'src/app/models/tripManagementModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubSink } from 'subsink';
import * as ol from 'openlayers';
import { SourceVectorComponent } from 'ngx-openlayers';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit, OnDestroy {
  TripDataForm: FormGroup;
  start_min: Date  = new Date(1, 1, 1);; 
  end_min: Date = new Date(9999, 12, 31);;
  public zoom = 11;
  flag :number;
  private subs = new SubSink();
  @Input() singletripdetails$ : Observable<singleTripDetails>;
  @Output() ShowData = new EventEmitter<singleTripDetails>();
  @Output() PreviousData = new EventEmitter<singleTripDetails>();
  @Output() NextData = new EventEmitter<singleTripDetails>();
  
  tripEventDisplayedColumns: string[] = ['event_name', 'lat', 'long', 'created_at','detail']
  tripPriceBreakupColumns: string[] = ['breakup_item_name', 'breakup_amount']
  trip_main: MatTableDataSource<tripEvent>;
  price_breakup: MatTableDataSource<priceBreakup>;
  pointList: ol.Coordinate[] = [];
  @ViewChild('pastMarkersSource', { static: false }) pastMarkersSource: SourceVectorComponent;
  @ViewChild('availableMarkersSource', { static: false }) availableMarkersSource: SourceVectorComponent;
  @ViewChild('onTripMarkersSource', { static: false }) onTripMarkersSource: SourceVectorComponent;
  @ViewChild('accidentMarkersSource', { static: false }) accidentMarkersSource: SourceVectorComponent;
  @ViewChild('geofenceMarkersSource', { static: false }) geofenceMarkersSource: SourceVectorComponent;
  @ViewChild('problemLowMarkersSource', { static: false }) problemLowMarkersSource: SourceVectorComponent;
  @ViewChild('problemMediumMarkersSource', { static: false }) problemMediumMarkersSource: SourceVectorComponent;
  @ViewChild('problemHighMarkersSource', { static: false }) problemHighMarkersSource: SourceVectorComponent;
  @ViewChild("tripEventpaginator", {static: true}) tripEventpaginator: MatPaginator;
  @ViewChild("tripEventsort", {static: true}) tripEventsort: MatSort;
  @ViewChild("trippricebreakuppaginator", {static: true}) trippricebreakuppaginator: MatPaginator;
  @ViewChild("trippricebreakupsort", {static: true}) trippricebreakupsort: MatSort;
  
  
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.TripDataForm = this.formbuilder.group({
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
    })
    this.subs.add(this.singletripdetails$.subscribe(data => {
      if(!!data) {
        this.trip_main = new MatTableDataSource(data.trip_main);
        this.trip_main.paginator = this.tripEventpaginator;
        this.trip_main.sort = this.tripEventsort;
        this.price_breakup = new MatTableDataSource(data.price_breakup);
        this.price_breakup.paginator = this.trippricebreakuppaginator;
        this.price_breakup.sort = this.trippricebreakupsort;
      }
      if(!!data && !!data.locations) {
        this.pastMarkersSource.instance.clear();
        this.pointList = [];
        for (var index = 0; index < data.locations.length; index++) {
          var locationItem = data.locations[index];
          if (index == 0) {
            this.addPoint(+((+locationItem.longitude).toFixed(4)), +((+locationItem.latitude).toFixed(4)));
            this.addMarker(+((+locationItem.longitude).toFixed(4)), +((+locationItem.latitude).toFixed(4)), data.vehicle_current_status, data.vehicle_problem_body);
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
    }))
  }

  addPoint(lon: number, lat: number) {
    this.pointList.push(ol.proj.fromLonLat([lon,lat]));
  }

  addMarker(lon: number, lat: number, status: number, problems: ProblemItem[]) {
    var markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    });
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




   DateAdjustment() {
    if (this.TripDataForm.controls.start_date.value) {
      if (this.TripDataForm.controls.end_date.value &&
        (this.TripDataForm.controls.start_date.value >= this.TripDataForm.controls.end_date.value)) {
        this.TripDataForm.get('end_date').reset();
      }
    }
    var fromDate: Date = new Date(this.TripDataForm.controls.start_date.value);
    this.start_min = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1 , fromDate.getTime() + 60000)
    this.end_min = fromDate;
   }



  showData() {
    this.store.select(state => state.trip_management.singletripdetails).pipe(take(1)).subscribe(
      (data) => {
        var showdata: singleTripDetails = {
          customer_trip_association_id : data.customer_trip_association_id,
        }
        showdata.start_date = this.TripDataForm.controls.start_date.value;
        showdata.end_date = this.TripDataForm.controls.end_date.value;
        this.PreviousData.emit(showdata)
        console.log(showdata);
        console.log(data);
 
      }
    )
  }
  // previous(){
  //   this.store.select(state => state.trip_management.singletripdetails).pipe(take(1)).subscribe(
  //     (data) => {
  //       var prevoiusdata: singleTripDetails = {
  //         customer_trip_association_id : data.customer_trip_association_id,
  //         flag: data.flag + 1,
  //       }
  //       this.PreviousData.emit(prevoiusdata)
  //       console.log(prevoiusdata);
  //       console.log(data);
 
  //     }
  //   )
  // }

  // next(){
  //   this.store.select(state => state.trip_management.singletripdetails).pipe(take(1)).subscribe(
  //     (data) => {
  //       var nextdata: singleTripDetails = {
  //         customer_trip_association_id : data.customer_trip_association_id,
  //         flag: data.flag - 1,
  //       }
  //       this.NextData.emit(nextdata)
  //       console.log(nextdata);
  //       console.log(data);
 
  //     }
  //   )
  // }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
