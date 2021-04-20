import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { RentalPoint, GetRp, AvailableFranchise } from 'src/app/models/rentalPoint';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { countries } from 'src/app/models/asset-inventoryModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers } from 'src/app/models/fsqhubModel';
// declare var MapmyIndia: any; // Declaring Mapmyindia
declare var L: any; // Declaring L

@Component({
  selector: 'app-edit-rental-point',
  templateUrl: './edit-rental-point.component.html',
  styleUrls: ['./edit-rental-point.component.scss']
})
export class EditRentalPointComponent implements OnInit, OnChanges, OnDestroy {

  editrentalpointForm: FormGroup;
  rentalpointFranchiseForm: FormGroup;
  Franchise: boolean = false;
  @Input() rentalPointType$: Observable<DomainData[]>;
  @Input() ownerShipcode$: Observable<DomainData[]>;
  @Input() rentalPointStatus$: Observable<DomainData[]>;
  @Input() singleRentalpoint$: Observable<GetRp>;
  @Input() countries$: Observable<countries[]>; 
  @Input() regions$: Observable<RegionItem[]>;
  @Input() availableManagers$: Observable<managers[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Input() franchise$: Observable<AvailableFranchise[]>;
  @Output() editrentalpoint = new EventEmitter<GetRp>();
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  map : any;
  latitude: number;
  longitude: number;
  mk: any;

  private subs = new SubSink();
  constructor(public languageService: LanguageService, public fb: FormBuilder, private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.editrentalpointForm = this.fb.group({
      rentalpoint_type: ['',[Validators.required]],
      ownership_code: ['',[Validators.required]],
      lat: ['',[Validators.required, Ms3Validators.decimal]],
      lon: ['',[Validators.required, Ms3Validators.decimal]],
      rentalpoint_name: ['',[Validators.required]],
      rentalpoint_shortcode: ['',[Validators.required]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country : ['',[Validators.required]],
      city : ['',[Validators.required]],
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

    this.rentalpointFranchiseForm = this.fb.group({
      franchise_id: [''],
    });

    this.subs.add(this.singleRentalpoint$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          if (+data.ownership_code == 2) {
            this.editrentalpointForm.patchValue(data);
            this.rentalpointFranchiseForm.patchValue(data);   
            this.OnChange(2);         
            this.Franchise = true;
          }
          else {
            this.editrentalpointForm.patchValue(data);
            this.Franchise = false;
          }

          if (data.closing_hours != null || data.opening_hours != null) {
            var rp_open_time = data.opening_hours.split(":");
            var rp_close_time = data.closing_hours.split(":"); 
            this.rp_open_hh.patchValue(rp_open_time[0]);
            this.rp_open_mm.patchValue(rp_open_time[1]);
            this.rp_open_ss.patchValue(rp_open_time[2]);

            this.rp_close_hh.patchValue(rp_close_time[0]);
            this.rp_close_mm.patchValue(rp_close_time[1]);
            this.rp_close_ss.patchValue(rp_close_time[2]);
          }
          if (!!this.editrentalpointForm) {
            this.editrentalpointForm.patchValue(data);
            this.rentalpoint_shortcode.disable();
            this.StartDateChange();
            //console.log('form sub sink data: ',data.lat,data.lon);
            //this.map.removeLayer(this.mk);
            // this.mk = new L.Marker({lat: data.lat, lng: data.lon}, {draggable: false, title: "title"}).addTo(this.map); 
            // console.log('else mk',this.mk);
            // this.map.setView(this.mk.getLatLng(),12); 
          }
        }
      }
    ));
    // this.patchFrom()
  }

  // patchFrom() {
    
  //   this.subs.add(this.singleRentalpoint$.subscribe(
  //     (data) => {
  //       if (!!data) {
  //         console.log(data);
  //         if (data.opening_hours != null || data.closing_hours != null) {
  //           var rp_open_time = data.opening_hours.split(":");
  //           var rp_close_time = data.closing_hours.split(":");
  //           this.rp_open_hh.patchValue(rp_open_time[0]);
  //           this.rp_open_mm.patchValue(rp_open_time[1]);
  //           this.rp_open_ss.patchValue(rp_open_time[2]);

  //           this.rp_close_hh.patchValue(rp_close_time[0]);
  //           this.rp_close_mm.patchValue(rp_close_time[1]);
  //           this.rp_close_ss.patchValue(rp_close_time[2]);  
  //         }
  //         this.editrentalpointForm.patchValue(data);
  //         this.rentalpoint_shortcode.disable();
  //         console.log('form sub sink data: ',data.lat,data.lon);
  //         //this.map.removeLayer(this.mk);
  //         // this.mk = new L.Marker({lat: data.lat, lng: data.lon}, {draggable: false, title: "title"}).addTo(this.map); 
  //         // console.log('else mk',this.mk);
  //         // this.map.setView(this.mk.getLatLng(),12);
  //       }
  //     }
  //   ));
  // }

  ngOnChanges() {
  }

  get rp_open_hh(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_open_hh');
  }

  get rp_open_mm(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_open_mm');
  }

  get rp_open_ss(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_open_ss');
  }

  get rp_close_hh(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_close_hh');
  }

  get rp_close_mm(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_close_mm');
  }

  get rp_close_ss(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rp_close_ss');
  }

  get rentalpoint_shortcode(): FormControl {
    return <FormControl>this.editrentalpointForm.get('rentalpoint_shortcode');
  }

  cancelRentalPoint() {
    this.router.navigate(['rental-point','rental-point-main']);
  }

  editRentalPoint() {
    if(this.editrentalpointForm.value.ownership_code != 2){
    var openTime: string = this.editrentalpointForm.controls.rp_open_hh.value+":"+this.editrentalpointForm.controls.rp_open_mm.value+":"+this.editrentalpointForm.controls.rp_open_ss.value;
    var closeTime: string = this.editrentalpointForm.controls.rp_close_hh.value+":"+this.editrentalpointForm.controls.rp_close_mm.value+":"+this.editrentalpointForm.controls.rp_close_ss.value;
    this.singleRentalpoint$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.rentalpoint_type = this.editrentalpointForm.controls.rentalpoint_type.value;
        formData.ownership_code = this.editrentalpointForm.controls.ownership_code.value;
        // formData.franchise_id = null;
        formData.lat = this.editrentalpointForm.controls.lat.value;
        formData.lon = this.editrentalpointForm.controls.lon.value;
        formData.rentalpoint_name = this.editrentalpointForm.controls.rentalpoint_name.value;
        formData.rentalpoint_shortcode = this.editrentalpointForm.controls.rentalpoint_shortcode.value;
        formData.addressline1 = this.editrentalpointForm.controls.addressline1.value;
        formData.addressline2 = this.editrentalpointForm.controls.addressline2.value;
        formData.state_id = +this.editrentalpointForm.controls.state.value;
        formData.country_id = this.editrentalpointForm.controls.country.value;
        formData.city_id = this.editrentalpointForm.controls.city.value;
        formData.pin = this.editrentalpointForm.controls.pin.value;
        formData.max_capacity = this.editrentalpointForm.controls.max_capacity.value;
        formData.available_capacity = this.editrentalpointForm.controls.available_capacity.value;
        formData.commissioning_date = this.editrentalpointForm.controls.commissioning_date.value;
        formData.termination_date = this.editrentalpointForm.controls.termination_date.value;
        formData.region_id = this.editrentalpointForm.controls.region_id.value;
        formData.status = this.editrentalpointForm.controls.status.value;
        formData.opening_hours = openTime;
        formData.closing_hours = closeTime;
        formData.admn_user_id = this.editrentalpointForm.controls.admn_user_id.value ? +this.editrentalpointForm.controls.admn_user_id.value: null;
        formData.battery_swapping_point = this.editrentalpointForm.controls.battery_swapping_point.value;
        console.log(formData);

        this.editrentalpoint.emit(formData);
      }
    );
    }
    else {
      var openTime: string = this.editrentalpointForm.controls.rp_open_hh.value+":"+this.editrentalpointForm.controls.rp_open_mm.value+":"+this.editrentalpointForm.controls.rp_open_ss.value;
      var closeTime: string = this.editrentalpointForm.controls.rp_close_hh.value+":"+this.editrentalpointForm.controls.rp_close_mm.value+":"+this.editrentalpointForm.controls.rp_close_ss.value;
      this.singleRentalpoint$.pipe(take(1)).subscribe(
        (data) => {
          var formData = {...data};
          formData.rentalpoint_type = this.editrentalpointForm.controls.rentalpoint_type.value;
          formData.ownership_code = this.editrentalpointForm.controls.ownership_code.value;
          formData.franchise_id = this.rentalpointFranchiseForm.controls.franchise_id.value;
          formData.lat = this.editrentalpointForm.controls.lat.value;
          formData.lon = this.editrentalpointForm.controls.lon.value;
          formData.rentalpoint_name = this.editrentalpointForm.controls.rentalpoint_name.value;
          formData.rentalpoint_shortcode = this.editrentalpointForm.controls.rentalpoint_shortcode.value;
          formData.addressline1 = this.editrentalpointForm.controls.addressline1.value;
          formData.addressline2 = this.editrentalpointForm.controls.addressline2.value;
          formData.state_id = +this.editrentalpointForm.controls.state.value;
          formData.country_id = this.editrentalpointForm.controls.country.value;
          formData.city_id = this.editrentalpointForm.controls.city.value;
          formData.pin = this.editrentalpointForm.controls.pin.value;
          formData.max_capacity = this.editrentalpointForm.controls.max_capacity.value;
          formData.available_capacity = this.editrentalpointForm.controls.available_capacity.value;
          formData.commissioning_date = this.editrentalpointForm.controls.commissioning_date.value;
          formData.termination_date = this.editrentalpointForm.controls.termination_date.value;
          formData.region_id = this.editrentalpointForm.controls.region_id.value;
          formData.status = this.editrentalpointForm.controls.status.value;
          formData.opening_hours = openTime;
          formData.closing_hours = closeTime;
          formData.admn_user_id = this.editrentalpointForm.controls.admn_user_id.value ? +this.editrentalpointForm.controls.admn_user_id.value: null;
          formData.battery_swapping_point = this.editrentalpointForm.controls.battery_swapping_point.value;
          console.log(formData);
  
          this.editrentalpoint.emit(formData);
        }
      );
    }
  }

  // addmarker(lat: number, lon: number) {
  //   this.latitude = lat;
  //   this.longitude = lon;
  //   console.log('form add marker edit rental point:  ',this.latitude, this.longitude);
  //   if (mk) {
  //     this.map.removeLayer(mk);
  //     var mk = new L.Marker({lat: this.latitude, lng: this.longitude}, {draggable: false, title: "title"}).addTo(this.map); 
  //     this.map.setView(mk.getLatLng(),12);
  //   }
  //   else {
  //     var mk = new L.Marker({lat: this.latitude, lng: this.longitude}, {draggable: false, title: "title"}).addTo(this.map); 
  //     this.map.setView(mk.getLatLng(),12);
  //   }
  // }

  StartDateChange() {
    if (this.editrentalpointForm.controls.commissioning_date.value) {
      if (this.editrentalpointForm.controls.termination_date.value && 
         (this.editrentalpointForm.controls.commissioning_date.value >= this.editrentalpointForm.controls.termination_date.value)) {
         this.editrentalpointForm.get('termination_date').reset();
      }
    }
    var fromDate: Date = new Date(this.editrentalpointForm.controls.commissioning_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  maxCapacityValidation() {
    if (+this.editrentalpointForm.controls.max_capacity.value) {
      if (+this.editrentalpointForm.controls.available_capacity.value && 
        (+this.editrentalpointForm.controls.max_capacity.value < +this.editrentalpointForm.controls.available_capacity.value)) {
        this.editrentalpointForm.get('max_capacity').reset();
      }
    }
  }

  availableCapacityValidation() {
    if (+this.editrentalpointForm.controls.available_capacity.value) {
      if (+this.editrentalpointForm.controls.max_capacity.value && 
        (+this.editrentalpointForm.controls.available_capacity.value > +this.editrentalpointForm.controls.max_capacity.value)) {
          this.editrentalpointForm.get('available_capacity').reset();
      }
    }
  }

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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
