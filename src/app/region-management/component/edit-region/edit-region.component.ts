import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ViewChild, ɵɵsetNgModuleScope } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { take } from 'rxjs/operators';
import * as ol from 'openlayers';
import { MapComponent, FeatureComponent, SourceVectorComponent, LayerVectorComponent } from 'ngx-openlayers';

@Component({
  selector: 'app-edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.scss']
})
export class EditRegionComponent implements OnInit,OnDestroy {
  RegionForm: FormGroup;
  @Output() cancel = new EventEmitter();
  @Output() editRegion = new EventEmitter();
  @Input() countriesName$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() singleRegion$: Observable<RegionItem>;
  @Input() cities$: Observable<CityItem[]>;
  subs = new SubSink();
  @Input() regions$: Observable<RegionItem[]>;
  public zoom = 11;
  public opacity = 1.0;
  public width = 5;
  radius: 10;
  event: any;
  @ViewChild('sourceVector', { static: false }) sourceVector: SourceVectorComponent;
  @ViewChild('map', { static: false }) map: MapComponent;
  @ViewChild('layerVector', { static: false }) layerVector: LayerVectorComponent;
  lastFeature: ol.Feature;
  geometry: ol.geom.Geometry;
  otherLayer: ol.layer.Vector;
  oldFeatureList: ol.Feature[] = [];
  public createdOn: Date;
  constructor(private fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.RegionForm = this.fb.group({
      region_code: [''],
      region_name: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: [null, [Validators.required]],
      region_phone_no: ['', [Validators.required]],
      center_latitude: ['', [Validators.required]],
      center_longitude: ['', [Validators.required]],
      radius: ['', [Validators.required]],
    })
    
    this.subs.add(this.singleRegion$.subscribe(
      (data) => {
        console.log(data);
        if (!!data) {
          console.log("Patching");
          console.log(data);
          this.RegionForm.patchValue(data);
          this.region_code.disable();
          this.createdOn = data.created_on;
          this.CustomDraw();
          // var centerLongitudeLatitude = ol.proj.fromLonLat([data.center_longitude, data.center_latitude]);
          // this.lastFeature = new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, data.radius));
          // this.sourceVector.instance.addFeature(this.lastFeature);
          this.regions$.pipe(take(1)).subscribe(
            (regionList) => {
              if(!!regionList) {
                console.log(regionList);
                regionList.forEach(region => {
                  if(region.region_id != data.region_id) {
                    var centerLongitudeLatitude = ol.proj.fromLonLat([region.center_longitude, region.center_latitude]);
                    this.oldFeatureList.push(new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, region.radius)));
                  }
                })
                var source = new ol.source.Vector({
                  features: this.oldFeatureList
                });
                var layer = new ol.layer.Vector({
                  source: source,
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
                this.map.instance.addLayer(layer);
              }
            }
          )
        }
      }
    ));
  }
 
  DrawStart(data: any) {
    this.sourceVector.instance.clear();
  }

  DrawEnd(data: ol.interaction.Draw.Event) {
    this.geometry = data.feature.getGeometry();
    this.geometry.transform('EPSG:3857', 'EPSG:4326');
    this.RegionForm.controls.center_latitude.patchValue(+((this.geometry["A"][1]).toFixed(4)));
    this.RegionForm.controls.center_longitude.patchValue(+((this.geometry["A"][0]).toFixed(4)));
    var radius = this._getDistanceFromLatLonInKm(this.geometry["A"][0], this.geometry["A"][1], this.geometry["A"][2], this.geometry["A"][3]);
    this.RegionForm.controls.radius.patchValue(+(+(radius * 1000).toFixed(4)));
    this.geometry.transform('EPSG:4326', 'EPSG:3857');
  }

  CustomDraw() {
    this.sourceVector.instance.clear();
    var centerLongitudeLatitude = ol.proj.fromLonLat([+this.RegionForm.controls.center_longitude.value, +this.RegionForm.controls.center_latitude.value]);
    var lastFeature = new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, +this.RegionForm.controls.radius.value))
    this.sourceVector.instance.addFeature(lastFeature);
  }

  EditRegion() {
    this.singleRegion$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.region_code = this.RegionForm.controls.region_code.value;
        formData.region_name = this.RegionForm.controls.region_name.value;
        formData.country_id = this.RegionForm.controls.country_id.value;
        formData.state_id = this.RegionForm.controls.state_id.value;
        formData.city_id = this.RegionForm.controls.city_id.value ? this.RegionForm.controls.city_id.value : null;
        formData.region_phone_no = +this.RegionForm.controls.region_phone_no.value;
        formData.center_latitude= +this.RegionForm.controls.center_latitude.value;
        formData.center_longitude= +this.RegionForm.controls.center_longitude.value;
        formData.radius= +this.RegionForm.controls.radius.value;
        this.editRegion.emit(formData);
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  _getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in kilometers
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in KM
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  CancelEdit() {
    this.cancel.emit();
  }

  get region_code(): FormControl {
    return <FormControl>this.RegionForm.get('region_code');
  }

}
