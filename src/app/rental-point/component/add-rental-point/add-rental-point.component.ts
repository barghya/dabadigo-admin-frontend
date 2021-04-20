import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input, DoCheck } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
// import { LatLng } from 'src/app/models/mapMyIndiaModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint2, AvailableFranchise } from 'src/app/models/rentalPoint';
import { Router } from '@angular/router';
import { countries } from 'src/app/models/asset-inventoryModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { map } from 'rxjs/operators';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { managers } from 'src/app/models/fsqhubModel';
//import { SendengRp } from 'src/app/models/rentalPoint';

// declare var MapmyIndia: any; // Declaring Mapmyindia
declare var L: any; // Declaring L
@Component({
  selector: 'app-add-rental-point',
  templateUrl: './add-rental-point.component.html',
  styleUrls: ['./add-rental-point.component.scss']
})
export class AddRentalPointComponent implements OnInit {
  Checked = false;
  map : any;
  latitude: number;
  longitude: number;
  position: any;
  // rentalPoints: LatLng[] = [];
  mk: any;
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  @ViewChild('m_result0', { static: true  }) results: ElementRef;
  public marker: any[] = [];
  addrentalpointForm: FormGroup;
  rentalpointFranchiseForm: FormGroup;
  batteryswap: boolean;
  Franchise: boolean = false;
  // @Output() reverseGeocodingEvent = new EventEmitter<LatLng>();

  @Input() rentalPointType$: Observable<DomainData[]>;
  @Input() ownerShipcode$: Observable<DomainData[]>;
  @Input() rentalPointStatus$: Observable<DomainData[]>;
  @Input() countries$: Observable<countries[]>; 
  @Input() regions$: Observable<RegionItem[]>;
  @Input() availableManagers$: Observable<managers[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() franchise$: Observable<AvailableFranchise[]>;
  @Output() addRentalPointData = new EventEmitter<RentalPoint2>();

  @Output() addAnotherRentalpointEvent = new EventEmitter<RentalPoint2>();

  constructor(public languageService: LanguageService, public fb: FormBuilder, private router: Router, private rentalPointService: RentalPointService) {
    
  }
  ngOnInit() { 
    // this.map = new MapmyIndia.Map('map',
    // {
    //   center: [22.6250, 88.4386],
    //   zoom: 12,
    // });
    this.createFrom();
    this.createFranchiseForm();
    //this.clickOnMap();
  }


  createFrom() {
    this.addrentalpointForm = this.fb.group({
      rentalpoint_type: ['',[Validators.required]],
      ownership_code: ['',[Validators.required]],
      rp_latitude: ['',[Validators.required, Ms3Validators.decimal]],
      rp_longitude: ['',[Validators.required, Ms3Validators.decimal]],
      rentalpoint_name: ['',[Validators.required]],
      rentalpoint_shortcode: ['',[Validators.required], [this.validateRentalPoint.bind(this)]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      country_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      max_capacity: ['',[Validators.required, Ms3Validators.integer]],
      available_capacity: ['',[Validators.required, Ms3Validators.integer]],
      commissioning_date: ['', [Validators.required]],
      termination_date: ['', [Validators.required]],
      status: ['',[Validators.required]],
      rp_open_hh: ['',[Validators.required, Ms3Validators.hours]],
      rp_open_mm: ['',[Validators.required, Ms3Validators.minutes]],
      rp_open_ss: ['',[Validators.required, Ms3Validators.second]],
      rp_close_hh: ['',[Validators.required, Ms3Validators.hours]],
      rp_close_mm: ['',[Validators.required, Ms3Validators.minutes]],
      rp_close_ss: ['',[Validators.required, Ms3Validators.second]],
      region_id: ['',[Validators.required]],
      battery_swapping_point: [''],
      admn_user_id: [''],
    });
  }

  createFranchiseForm() {
    this.rentalpointFranchiseForm = this.fb.group({
      franchise_id: [''],
    });
  }
  
  clickOnMap() {
    this.map.on("click", function(e){
      this.marker = [];
      var title = "Sample marker!";
      var mk = new L.Marker(e.latlng, {draggable: false, title: title});
      this.latitude = mk._latlng.lat;
      this.longitude = mk._latlng.lng;
      console.log('lat & lng: ',this.latitude, this.longitude);
      console.log(mk);
      if (this.latitude & this.longitude) {
        this.addrentalpointForm.controls.rp_latitude.patchValue(this.latitude);
        this.rp_longitude.patchValue(this.longitude);
        console.log('Hi');
      }
    });
  }

  // addmarker() {
  //   this.latitude = this.addrentalpointForm.controls.rp_latitude.value;
  //   this.longitude  = this.addrentalpointForm.controls.rp_longitude.value;
  //   var data: LatLng = {
  //     latitude: this.latitude,
  //     longitude: this.longitude
  //   }
  //   this.rentalPoints.push(data);
  //   console.log(this.rentalPoints);
  //   console.log(this.map);
  //   if (this.mk) {
  //     this.map.removeLayer(this.mk);
  //     this.mk = new L.Marker({lat: this.latitude, lng: this.longitude}, {draggable: false, title: "title"}).addTo(this.map); 
  //     console.log('if mk',this.mk);
  //     this.map.setView(this.mk.getLatLng(),12);
  //   }
  //   else {
  //     this.mk = new L.Marker({lat: this.latitude, lng: this.longitude}, {draggable: false, title: "title"}).addTo(this.map); 
  //     this.map.setView(this.mk.getLatLng(),12);
  //     console.log('else mkz',this.mk);
  //   }

  //   //this.reverseGeocodingEvent.emit(data);
  // } 

  get rp_latitude(): FormControl {
    return <FormControl>this.addrentalpointForm.get('rp_latitude');
  }

  get rp_longitude(): FormControl {
    return <FormControl>this.addrentalpointForm.get('rp_longitude');
  }

  addRentalPoint() {
    if(this.addrentalpointForm.value.ownership_code != 2){
    var openTime: string = this.addrentalpointForm.controls.rp_open_hh.value+":"+this.addrentalpointForm.controls.rp_open_mm.value+":"+this.addrentalpointForm.controls.rp_open_ss.value;
    var closeTime: string = this.addrentalpointForm.controls.rp_close_hh.value+":"+this.addrentalpointForm.controls.rp_close_mm.value+":"+this.addrentalpointForm.controls.rp_close_ss.value;
    var fromData: RentalPoint2 = {
      rentalpoint_type: this.addrentalpointForm.controls.rentalpoint_type.value,
      ownership_code: this.addrentalpointForm.controls.ownership_code.value,
      rentalpoint_shortcode: this.addrentalpointForm.controls.rentalpoint_shortcode.value,
      rentalpoint_name: this.addrentalpointForm.controls.rentalpoint_name.value,
      rentalpoint_det: {
        addressline1: this.addrentalpointForm.controls.addressline1.value,
        addressline2: this.addrentalpointForm.controls.addressline2.value,
        state_id: +this.addrentalpointForm.controls.state_id.value,
        country_id: this.addrentalpointForm.controls.country_id.value,
        pin: this.addrentalpointForm.controls.pin.value,
        city_id: this.addrentalpointForm.controls.city_id.value,
        commissioning_date: this.addrentalpointForm.controls.commissioning_date.value,
        termination_date: this.addrentalpointForm.controls.termination_date.value,
        status: +this.addrentalpointForm.controls.status.value,
        max_capacity: +this.addrentalpointForm.controls.max_capacity.value,
        available_capacity: +this.addrentalpointForm.controls.available_capacity.value,
        updated_by_id: "1",
        lat: +this.addrentalpointForm.controls.rp_latitude.value,
        lon: +this.addrentalpointForm.controls.rp_longitude.value,
        opening_hours: openTime,
        closing_hours: closeTime,
        region_id:  this.addrentalpointForm.controls.region_id.value,
        admn_user_id: this.addrentalpointForm.controls.admn_user_id.value ? +this.addrentalpointForm.controls.admn_user_id.value: null,
        battery_swapping_point: this.addrentalpointForm.controls.battery_swapping_point.value,
      }
    }

    console.log('post data:   ',fromData);
    
    this.addRentalPointData.emit(fromData);
  }

  else{
    var openTime: string = this.addrentalpointForm.controls.rp_open_hh.value+":"+this.addrentalpointForm.controls.rp_open_mm.value+":"+this.addrentalpointForm.controls.rp_open_ss.value;
    var closeTime: string = this.addrentalpointForm.controls.rp_close_hh.value+":"+this.addrentalpointForm.controls.rp_close_mm.value+":"+this.addrentalpointForm.controls.rp_close_ss.value;
    var fromData: RentalPoint2 = {
      rentalpoint_type: this.addrentalpointForm.controls.rentalpoint_type.value,
      ownership_code: this.addrentalpointForm.controls.ownership_code.value,
      franchise_id: this.rentalpointFranchiseForm.controls.franchise_id.value,
      rentalpoint_shortcode: this.addrentalpointForm.controls.rentalpoint_shortcode.value,
      rentalpoint_name: this.addrentalpointForm.controls.rentalpoint_name.value,
      rentalpoint_det: {
        addressline1: this.addrentalpointForm.controls.addressline1.value,
        addressline2: this.addrentalpointForm.controls.addressline2.value,
        state_id: +this.addrentalpointForm.controls.state_id.value,
        country_id: this.addrentalpointForm.controls.country_id.value,
        pin: this.addrentalpointForm.controls.pin.value,
        city_id: this.addrentalpointForm.controls.city_id.value,
        commissioning_date: this.addrentalpointForm.controls.commissioning_date.value,
        termination_date: this.addrentalpointForm.controls.termination_date.value,
        status: +this.addrentalpointForm.controls.status.value,
        max_capacity: +this.addrentalpointForm.controls.max_capacity.value,
        available_capacity: +this.addrentalpointForm.controls.available_capacity.value,
        updated_by_id: "1",
        lat: +this.addrentalpointForm.controls.rp_latitude.value,
        lon: +this.addrentalpointForm.controls.rp_longitude.value,
        opening_hours: openTime,
        closing_hours: closeTime,
        region_id:  this.addrentalpointForm.controls.region_id.value,
        admn_user_id: this.addrentalpointForm.controls.admn_user_id.value ? +this.addrentalpointForm.controls.admn_user_id.value: null,
        battery_swapping_point: this.addrentalpointForm.controls.battery_swapping_point.value,
      }
    }

    console.log('post data:   ',fromData);
    
    this.addRentalPointData.emit(fromData);
  }
  }

  // addAnotherRentalpoint() {
  //   var fromData: RentalPoint2 = {
  //     rentalpoint_type: this.addrentalpointForm.controls.rentalpoint_type.value,
  //     ownership_code: this.addrentalpointForm.controls.ownership_code.value,
  //     rentalpoint_shortcode: this.addrentalpointForm.controls.rentalpoint_shortcode.value,
  //     rentalpoint_name: this.addrentalpointForm.controls.rentalpoint_name.value,
  //     rentalpoint_det: {
  //       address_line1: this.addrentalpointForm.controls.address_line1.value,
  //       address_line2: this.addrentalpointForm.controls.address_line2.value,
  //       city: this.addrentalpointForm.controls.city.value,
  //       country_code: this.addrentalpointForm.controls.country_code.value,
  //       postal_code: +this.addrentalpointForm.controls.postal_code.value,
  //       commissioning_date: this.addrentalpointForm.controls.commissioning_date.value,
  //       termination_date: this.addrentalpointForm.controls.termination_date.value,
  //       status: +this.addrentalpointForm.controls.status.value,
  //       max_capacity: +this.addrentalpointForm.controls.max_capacity.value,
  //       available_capacity: +this.addrentalpointForm.controls.available_capacity.value,
  //       updated_by_id: "1",
  //       lat: +this.addrentalpointForm.controls.rp_latitude.value,
  //       lon: +this.addrentalpointForm.controls.rp_longitude.value,
  //       region_id: this.addrentalpointForm.controls.region_id.value,
  //     }
  //   }
  //   this.addAnotherRentalpointEvent.emit(fromData);
  //   this.addrentalpointForm.reset();
  //   this.addrentalpointForm.setErrors(null);
  //   this.addrentalpointForm.updateValueAndValidity();
  //   console.log(fromData);
  // }

  cancelRentalPoint() {
    this.router.navigate(['rental-point','rental-point-main']);
  }

  StartDateChange() {
    if (this.addrentalpointForm.controls.commissioning_date.value) {
      if (this.addrentalpointForm.controls.termination_date.value && 
         (this.addrentalpointForm.controls.commissioning_date.value >= this.addrentalpointForm.controls.termination_date.value)) {
         this.addrentalpointForm.get('termination_date').reset();
      }
    }
    var fromDate: Date = new Date(this.addrentalpointForm.controls.commissioning_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  maxCapacityValidation() {
    if (+this.addrentalpointForm.controls.max_capacity.value) {
      if (+this.addrentalpointForm.controls.available_capacity.value && 
        (+this.addrentalpointForm.controls.max_capacity.value < +this.addrentalpointForm.controls.available_capacity.value)) {
        this.addrentalpointForm.get('max_capacity').reset();
      }
    }
  }

  availableCapacityValidation() {
    if (+this.addrentalpointForm.controls.available_capacity.value) {
      if (+this.addrentalpointForm.controls.max_capacity.value && 
        (+this.addrentalpointForm.controls.available_capacity.value > +this.addrentalpointForm.controls.max_capacity.value)) {
          this.addrentalpointForm.get('available_capacity').reset();
      }
    }
  }

  formatResponse = map((val: any) => {
    return val.response ? {rentalpoint_shortcode: true } : null;
  });

  validateRentalPoint(control: AbstractControl) {
    var booleanResponse = this.rentalPointService.duplicaterentalpointShortcode(control.value);
    return this.formatResponse(booleanResponse);
  }

  // Batteryswap(data: any){
  //   if(!data.currentTarget.checked){
  //     this.Checked=true;
  //   }
  //   else{
  //     this.Checked=false;
  //   }
  // }

  OnChange(value: number) {
    console.log(value);
    if (value == 2) {
      this.rentalpointFranchiseForm.get('franchise_id').setValidators([Validators.required]);
      this.Franchise = true;
    }

    else {
      this.rentalpointFranchiseForm.get('franchise_id').clearValidators();
      this.Franchise = false;
    }
    this.rentalpointFranchiseForm.get('franchise_id').updateValueAndValidity();
  }
}
