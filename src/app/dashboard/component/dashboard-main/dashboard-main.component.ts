import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import * as ol from 'openlayers';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SourceVectorComponent, MapComponent } from 'ngx-openlayers';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DashboardModel, PaymentItem, MaintenanceCountItem } from 'src/app/models/dashboard-model';
import { LanguageService } from 'src/app/service/language/language.service';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { take, map } from 'rxjs/operators';
import { users } from 'src/app/models/userManagement';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  public zoom = 11;
  private subs = new SubSink();
  incident_count: number;
  fsq_count: number;
  Emergency_Count: number;
  payment: PaymentItem;
  franchisee_payment: PaymentItem;
  maintenance: MaintenanceCountItem;
  @Input() pollingData$: Observable<DashboardModel>;
  @Input() regions$: Observable<RegionItem[]>;
  filteredRegions$: Observable<RegionItem[]>;
  @Input() userDetail$: Observable<users>;
  @Input() states$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @ViewChild('availableMarkersSource', { static: false }) availableMarkersSource: SourceVectorComponent;
  @ViewChild('onTripMarkersSource', { static: false }) onTripMarkersSource: SourceVectorComponent;
  @ViewChild('accidentMarkersSource', { static: false }) accidentMarkersSource: SourceVectorComponent;
  @ViewChild('geofenceMarkersSource', { static: false }) geofenceMarkersSource: SourceVectorComponent;
  @ViewChild('problemLowMarkersSource', { static: false }) problemLowMarkersSource: SourceVectorComponent;
  @ViewChild('problemMediumMarkersSource', { static: false }) problemMediumMarkersSource: SourceVectorComponent;
  @ViewChild('problemHighMarkersSource', { static: false }) problemHighMarkersSource: SourceVectorComponent;
  @ViewChild('timeExceededMarkersSource', { static: false }) timeExceededMarkersSource: SourceVectorComponent;
  @ViewChild('fsqUsingMarkersSource', { static: false }) fsqUsingMarkersSource: SourceVectorComponent;
  @ViewChild('maintenanceMarkersSource', { static: false }) maintenanceMarkersSource: SourceVectorComponent;
  @ViewChild('readyToDeployMarkersSource', { static: false }) readyToDeployMarkersSource: SourceVectorComponent;
  @ViewChild('map', { static: false }) map: MapComponent;
  atRentalPointFeatures: ol.Feature[] = [];
  ontripFeatures: ol.Feature[] = [];
  accidentFeatures: ol.Feature[] = [];
  geofenceFeatures: ol.Feature[] = [];
  problemLowFeatures: ol.Feature[] = [];
  problemMediumFeatures: ol.Feature[] = [];
  problemHighFeatures: ol.Feature[] = [];
  timeExceededFeatures: ol.Feature[] = [];
  fsqUsingFeatures: ol.Feature[] = [];
  maintenanceFeatures: ol.Feature[] = [];
  readyToDeployFeatures: ol.Feature[] = [];

  geofenceViolations = new Set();
  selectedRegion: RegionItem;
  regionSelectionForm: FormGroup;
  regionSource: ol.source.Vector;
  regionFeatures: ol.Feature[] = [];
  altRegionFeatures: ol.Feature[] = [];

  constructor(public languageService: LanguageService, private router: Router, private fb: FormBuilder) {
    this.displayTooltip = this.displayTooltip.bind(this);
  }

  ngOnInit() {
    var setCenter = 0;

    this.regionSelectionForm = this.fb.group({
      state_id: [null],
      city_id: [null],
      region_id: [null]
    })

    this.filteredRegions$ = this.regions$;

    this.subs.add(this.userDetail$.subscribe(
      (data) => {
        if (!!data) {
          var tooltip = document.getElementById('tooltip');
          data.regions.forEach(regionItem => {
            this.regions$.pipe(take(1)).subscribe(
              regions => {
                if (!!regions) {
                  var region = regions.find(m => m.region_id == regionItem.region_id);
                  var regionGeometry = this.createRegionGeometry(region, setCenter);
                  this.regionFeatures.push(new ol.Feature({
                    geometry: regionGeometry
                  }));
                }
              }
            )
          })
          this.regionSource = new ol.source.Vector({
            features: this.regionFeatures
          });
          var regionLayer = new ol.layer.Vector({
            source: this.regionSource,
            style: [
              new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: 'green',
                  width: 1
                }),
                fill: new ol.style.Fill({
                  color: 'rgba(0, 255, 0, 0.05)'
                })
              })
            ]
          });
          this.map.instance.addLayer(regionLayer);
          this.map.instance.addOverlay(new ol.Overlay({
            element: tooltip,
            offset: [10, 0],
            positioning: 'bottom-left',
            id: "tooltip"
          }));
          this.map.instance.on('pointermove', this.displayTooltip);
        }
      }
    ))

    this.subs.add(this.pollingData$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          this.incident_count = data.problem_count;
          this.fsq_count = data.shift_count;
          this.Emergency_Count = data.accident_count;
          this.payment = data.payment;
          this.maintenance = data.maintenance;
          this.franchisee_payment = data.franchisee_payment;
          
          //Clear Feature Arrays
          this.ontripFeatures = [];
          this.atRentalPointFeatures = [];
          this.accidentFeatures = [];
          this.geofenceFeatures = [];
          this.problemLowFeatures = [];
          this.problemMediumFeatures = [];
          this.problemHighFeatures = [];
          this.timeExceededFeatures = [];
          this.fsqUsingFeatures = [];
          this.maintenanceFeatures = [];
          this.readyToDeployFeatures = [];
          // Clear Geofence Violation Count
          this.geofenceViolations = new Set();

          data.locations.forEach(element => {
            var addMarker = ol.proj.fromLonLat([+(+element.longitude).toFixed(4), +(+element.latitude).toFixed(4)]);
            var feature = new ol.Feature({
              geometry: new ol.geom.Point(addMarker),
              name: "Vehicle: " + element.vehicle_number,
              charge: "Charge: " + element.battery_status + "%"
            });
            feature.setId(element.vehicle_id);
            feature.setProperties([{ "router": this.router }]);

            if (!!element.geofence_violation) {
              this.geofenceViolations.add(element.vehicle_id);
              this.geofenceFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 7) {
              this.accidentFeatures.push(feature);
            }
            else if (element.severity == 1) {
              this.problemHighFeatures.push(feature);
            }
            else if (element.severity == 2) {
              this.problemMediumFeatures.push(feature);
            }
            else if (element.severity == 3) {
              this.problemLowFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 6) {
              this.problemLowFeatures.push(feature);
            }
            else if (!!element.time_threshold_exceeded) {
              this.timeExceededFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 3) {
              this.atRentalPointFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 2 || element.vehicle_current_status == 1) {
              this.ontripFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 4) {
              this.maintenanceFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 5) {
              this.readyToDeployFeatures.push(feature);
            }
            else if (element.vehicle_current_status == 8) {
              this.fsqUsingFeatures.push(feature);
            }
            else {
              this.atRentalPointFeatures.push(feature);
            }

          });

          //Clear Marker Sources
          this.availableMarkersSource.instance.clear();
          this.onTripMarkersSource.instance.clear();
          this.geofenceMarkersSource.instance.clear();
          this.accidentMarkersSource.instance.clear();
          this.problemLowMarkersSource.instance.clear();
          this.problemMediumMarkersSource.instance.clear();
          this.problemHighMarkersSource.instance.clear();
          this.timeExceededMarkersSource.instance.clear();
          this.fsqUsingMarkersSource.instance.clear();
          this.maintenanceMarkersSource.instance.clear();
          this.readyToDeployMarkersSource.instance.clear();

          if (!!this.atRentalPointFeatures) {
            this.availableMarkersSource.instance.addFeatures(this.atRentalPointFeatures);
          }
          if (!!this.ontripFeatures) {
            this.onTripMarkersSource.instance.addFeatures(this.ontripFeatures);
          }
          if (!!this.accidentFeatures) {
            this.accidentMarkersSource.instance.addFeatures(this.accidentFeatures);
          }
          if (!!this.geofenceFeatures) {
            this.geofenceMarkersSource.instance.addFeatures(this.geofenceFeatures);
          }
          if (!!this.problemLowFeatures) {
            this.problemLowMarkersSource.instance.addFeatures(this.problemLowFeatures);
          }
          if (!!this.problemMediumFeatures) {
            this.problemMediumMarkersSource.instance.addFeatures(this.problemMediumFeatures);
          }
          if (!!this.problemHighFeatures) {
            this.problemHighMarkersSource.instance.addFeatures(this.problemHighFeatures);
          }
          if (!!this.timeExceededFeatures) {
            this.timeExceededMarkersSource.instance.addFeatures(this.timeExceededFeatures);
          }
          if (!!this.fsqUsingFeatures) {
            this.fsqUsingMarkersSource.instance.addFeatures(this.fsqUsingFeatures);
          }
          if (!!this.maintenanceFeatures) {
            this.maintenanceMarkersSource.instance.addFeatures(this.maintenanceFeatures);
          }
          if (!!this.readyToDeployFeatures) {
            this.readyToDeployMarkersSource.instance.addFeatures(this.readyToDeployFeatures);
          }
        }
      },
      (error) => {
        console.log(error);
      }

    ));
  }

  onCardClick() {
    this.router.navigate(['incident-management', 'incident-management-main']);
  }

  showRegion() {
    var state_id = this.regionSelectionForm.controls.state_id.value;
    var city_id = this.regionSelectionForm.controls.city_id.value;
    var region_id = this.regionSelectionForm.controls.region_id.value;

    if (!!state_id || !!city_id || !!region_id) {
      this.regionSource.clear();
      this.altRegionFeatures = [];
      var setCenter = 0;
      if (!!region_id) {
        this.regions$.pipe(take(1)).subscribe(
          regions => {
            if (!!regions) {
              var region = regions.find(m => m.region_id == region_id);
              var regionGeometry = this.createRegionGeometry(region, setCenter);
              setCenter = 1;
              this.altRegionFeatures.push(new ol.Feature(regionGeometry));
            }
          }
        )
      }
      else {
        this.filteredRegions$.pipe(take(1)).subscribe(
          regions => {
            regions.forEach(region => {
              var regionGeometry = this.createRegionGeometry(region, setCenter);
              setCenter = 1;
              this.altRegionFeatures.push(new ol.Feature(regionGeometry));
            })
          }
        )
      }
      this.regionSource.addFeatures(this.altRegionFeatures);
    }
    else {
      this.regionSource.addFeatures(this.regionFeatures);
      this.subs.add(this.userDetail$.subscribe(
        (data) => {
          if (!!data && !!data.regions && data.regions.length > 0) {
            var regionItem = data.regions[0];
            this.regions$.pipe(take(1)).subscribe(
              regions => {
                if (!!regions) {
                  var region = regions.find(m => m.region_id == regionItem.region_id);
                  this.createRegionGeometry(region, 0);
                }
              }
            )
          }
        }
      ))
    }
  }

  displayTooltip(evt) {
    var tooltip = document.getElementById('tooltip');
    var pixel = evt.pixel;
    var feature = this.map.instance.forEachFeatureAtPixel(pixel, function(feature) {
      if(!!feature.get('name')) {
        return feature;
      }      
    });
    tooltip.style.display = feature ? '' : 'none';
    if (feature) {
      this.map.instance.getOverlayById("tooltip").setPosition(evt.coordinate);
      tooltip.firstElementChild.innerHTML = feature.get('name');
      tooltip.lastElementChild.innerHTML = feature.get('charge');
    }
  };

  createRegionGeometry(region: RegionItem, setCenter: number): ol.geom.Circle {
    var centerLongitudeLatitude = ol.proj.fromLonLat([region.center_longitude, region.center_latitude]);
    if (setCenter == 0) {
      this.map.instance.setView(
        new ol.View({
          center: centerLongitudeLatitude,
          zoom: 11
        })
      )
    }
    var regionGeometry = new ol.geom.Circle(centerLongitudeLatitude, region.radius);
    return regionGeometry;
  }

  StateSelected(state_id: number) {
    this.regionSelectionForm.controls.city_id.setValue(null);
    if (!!state_id) {
      this.filteredRegions$ = this.regions$.pipe(map(
        regions => regions.filter(m => m.state_id == state_id)
      ))
    }
    else {
      this.filteredRegions$ = this.regions$;
    }
  }

  CitySelected(city_id: number) {
    if (!!city_id) {
      this.filteredRegions$ = this.regions$.pipe(map(
        regions => regions.filter(m => m.city_id == city_id)
      ))
    }
    else {
      this.filteredRegions$ = this.regions$;
    }
  }

  onCardClickfsq() {
    if (this.fsq_count != -1) {
      this.router.navigate(['fsq-request-management', 'shift-management']);
    }
  }

  mapOnClick(evt) {
    const map = evt.map;
    const point = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
        if (!!feature.getProperties() && !!feature.getProperties()[0] && !!feature.getProperties()[0].router && !!feature.getId()) {
          feature.getProperties()[0].router.navigate(["dashboard", "asset-details", feature.getId()]);
        }
      });
  }

  onPaymentCardClick() {
    this.router.navigate(['corporate-bills', 'corporate-bills-main']);
  }

  onFranchiseeCardClick() {
    this.router.navigate(['franchisee-bills', 'franchise-payments']);
  }

  onMaintenanceCardClick() {
    this.router.navigate(['maintenance-jobs', 'maintenance-jobs-main']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
