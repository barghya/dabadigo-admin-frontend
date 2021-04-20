import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { map, take } from 'rxjs/operators';
import { RegionService } from 'src/app/service/region/region.service';
import * as ol from 'openlayers';
import { MapComponent, SourceVectorComponent } from 'ngx-openlayers';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit, OnDestroy {
  RegionForm: FormGroup;
  @Output() increaseDistance = new EventEmitter();
  @Output() decreaseDistance = new EventEmitter();
  @Output() cancelAdd = new EventEmitter();
  @Output() addRegion = new EventEmitter<RegionItem>();
  @Input() countriesName$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() regions$: Observable<RegionItem[]>;
  @Input() cities$: Observable<CityItem[]>;
  public zoom = 11;
  public opacity = 1.0;
  public width = 5;
  radius: 10;
  event: any;
  @ViewChild('sourceVector', { static: false }) sourceVector: SourceVectorComponent;
  @ViewChild('vector', { static: false }) vector: any;
  @ViewChild('map', { static: false }) map: MapComponent;
  lastFeature: any;
  geometry: ol.geom.Geometry;
  otherLayer: any;
  oldFeatureList: ol.Feature[] = [];
  private subs = new SubSink();

  constructor(private fb: FormBuilder, public languageService: LanguageService,private regionService: RegionService) { }

  ngOnInit() {
    this.RegionForm = this.fb.group({
      region_code: ['', [Validators.required], [this.validateRegioncode.bind(this)]],
      region_name: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: [null, [Validators.required]],
      region_phone_no: ['', [Validators.required]],
      center_latitude: ['', [Validators.required]],
      center_longitude: ['', [Validators.required]],
      radius: ['', [Validators.required]],
    })

    this.subs.add(this.regions$.subscribe(
      (regionList) => {
        if(!!regionList) {
          console.log(regionList);
          regionList.forEach(region => {
            var centerLongitudeLatitude = ol.proj.fromLonLat([region.center_longitude, region.center_latitude]);
            this.oldFeatureList.push(new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, region.radius)));
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
          this.otherLayer = layer;
          this.map.instance.addLayer(layer);
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

  AddRegion() {
    this.geometry.transform('EPSG:3857', 'EPSG:4326');
    var radius = this._getDistanceFromLatLonInKm(this.geometry["A"][0], this.geometry["A"][1], this.geometry["A"][2], this.geometry["A"][3]);
    var data: RegionItem = {
      region_code: this.RegionForm.controls.region_code.value,
      region_name: this.RegionForm.controls.region_name.value,
      country_id: this.RegionForm.controls.country_id.value,
      state_id: this.RegionForm.controls.state_id.value,
      city_id: this.RegionForm.controls.city_id.value ? this.RegionForm.controls.city_id.value : null,
      region_phone_no: +this.RegionForm.controls.region_phone_no.value,
      center_latitude: +this.RegionForm.controls.center_latitude.value,
      center_longitude: +this.RegionForm.controls.center_longitude.value,
      radius: +this.RegionForm.controls.radius.value,
      //center_latitude: +((this.geometry["A"][1]).toFixed(4)),
      //center_longitude: +((this.geometry["A"][0]).toFixed(4)),
      //radius: +(+(radius * 1000).toFixed(4)),
    }
    this.addRegion.emit(data);
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
  

  Click(data: any) {
    console.log(data);
  }

  CancelAdd() {
    this.cancelAdd.emit();
  }
  formatResponseregionTag = map((val: any) => {
    return val.response ? { duplicateRegioncode: true } : null;
  });

  validateRegioncode(control: AbstractControl) {
    var booleanResponse = this.regionService.DuplicateRegion(control.value);
    return this.formatResponseregionTag(booleanResponse);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
