import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { RentalPointLoadAction } from 'src/app/store/actions/rental_point.action';
import { SubSink } from 'subsink';
import * as ol from 'openlayers';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/service/language/language.service';


@Component({
  selector: 'app-rental-point-map-view',
  templateUrl: './rental-point-map-view.component.html',
  styleUrls: ['./rental-point-map-view.component.scss']
})
export class RentalPointMapViewComponent implements OnInit, OnDestroy {
  map: any;
  private subs = new SubSink();
  checked = true;
  constructor(private store: Store<AppState>, private router: Router, public languageService: LanguageService) {
    this.displayTooltip = this.displayTooltip.bind(this);
  }

  ngOnInit() {
    this.initializeMap();
    this.store.dispatch( new RentalPointLoadAction());
    this.subs.add(this.store.select(state => state.rental_point.RentalPoints).subscribe(
      rentalPint => {
        rentalPint.forEach(element => {
          this.addMarker(element.lon, element.lat, element.rentalpoint_name);
        });
      }
    ));
  }


  initializeMap() {
    var tooltip = document.getElementById('tooltip');    
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([88.442258, 22.623303]),
        zoom: 11
      }),
      overlays: [new ol.Overlay({
        element: tooltip,
        offset: [10, 0],
        positioning: 'bottom-left',
        id: "tooltip"
      })]
    });

    this.map.on('pointermove', this.displayTooltip);
  }

  displayTooltip(evt) {
    var tooltip = document.getElementById('tooltip');
    var pixel = evt.pixel;
    var feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature;
    });
    tooltip.style.display = feature ? '' : 'none';
    if (feature) {
      this.map.getOverlayById("tooltip").setPosition(evt.coordinate);
      tooltip.innerHTML = feature.get('name');
    }
  };

  addMarker(lon: number, lat: number, rentalpoint_name: string) {
    var iconFeatures = [];
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
        'EPSG:3857')),
      name: rentalpoint_name
    });

    iconFeatures.push(iconFeature);
    var vectorSource = new ol.source.Vector({
      features: iconFeatures //add an array of features
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 0.9],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 1,
        src: './assets/OnTrip.svg'
      }))
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    });

    this.map.addLayer(vectorLayer);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  changed(value: boolean) {
    this.checked = value;
    if (value) {
      this.router.navigate(['rental-point' , 'rental-point-map-view']);
    }
    else if(!value) {
      this.router.navigate(['rental-point' , 'rental-point-main']);
    }
  }

}
