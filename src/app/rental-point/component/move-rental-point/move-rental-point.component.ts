import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { GetRp, AvailableFranchise } from 'src/app/models/rentalPoint';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { countries } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers } from 'src/app/models/fsqhubModel';

@Component({
  selector: 'app-move-rental-point',
  templateUrl: './move-rental-point.component.html',
  styleUrls: ['./move-rental-point.component.scss']
})
export class MoveRentalPointComponent implements OnInit, OnDestroy, OnChanges {

  moverentalpointForm: FormGroup;
  rentalpointFranchisemoveForm: FormGroup;
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
  @Output() moverentalpoint = new EventEmitter<GetRp>();
  minDate: Date = new Date(1, 1, 1);
  maxDate: Date = new Date(9999, 12, 31);
  private subs = new SubSink();
  
  constructor(public languageService: LanguageService ,public fb: FormBuilder, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    // this.createFrom();
    this.moverentalpointForm = this.fb.group({
      rentalpoint_type: ['',[Validators.required]],
      ownership_code: ['',[Validators.required]],
      lat: ['',[Validators.required]],
      lon: ['',[Validators.required]],
      rentalpoint_name: ['',[Validators.required]],
      rentalpoint_shortcode: ['',[Validators.required]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country: ['',[Validators.required]],
      city: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      max_capacity: ['',[Validators.required]],
      available_capacity: ['',[Validators.required]],
      commissioning_date: [''],
      termination_date: [''],
      status: ['',[Validators.required]],
      rp_open_hh: ['',[Validators.required, Ms3Validators.hours]],
      rp_open_mm: ['',[Validators.required, Ms3Validators.minutes]],
      rp_open_ss: ['',[Validators.required, Ms3Validators.second]],
      rp_close_hh: ['',[Validators.required, Ms3Validators.hours]],
      rp_close_mm: ['',[Validators.required, Ms3Validators.minutes]],
      rp_close_ss: ['',[Validators.required, Ms3Validators.second]],
      region_id: ['',[Validators.required]],
      battery_swapping_point: [''],
      admn_user_id: ['',[Validators.required]],
    });

    this.rentalpointFranchisemoveForm = this.fb.group({
      franchise_id: [''],
    });

    this.subs.add(this.singleRentalpoint$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          if (+data.ownership_code == 2) {
            this.moverentalpointForm.patchValue(data);
            this.rentalpointFranchisemoveForm.patchValue(data);   
            this.OnChange(2);         
            this.Franchise = true;
          }
          else {
            this.moverentalpointForm.patchValue(data);
            this.Franchise = false;
          }

          if (data.opening_hours != null || data.closing_hours != null) {
            var rp_open_time = data.opening_hours.split(":");
            var rp_close_time = data.closing_hours.split(":");

            this.rp_open_hh.patchValue(rp_open_time[0]);
            this.rp_open_mm.patchValue(rp_open_time[1]);
            this.rp_open_ss.patchValue(rp_open_time[2]);

            this.rp_close_hh.patchValue(rp_close_time[0]);
            this.rp_close_mm.patchValue(rp_close_time[1]);
            this.rp_close_ss.patchValue(rp_close_time[2]);
          }
          console.log(data);
          this.moverentalpointForm.patchValue(data);
          this.rentalpointFranchisemoveForm.patchValue(data)
          this.rentalpoint_type.disable();
          this.ownership_code.disable();
          this.rentalpoint_name.disable();
          this.rentalpoint_shortcode.disable();
          this.franchise_id.disable();
          console.log('form sub sink data: ',data.lat,data.lon);
          //this.map.removeLayer(this.mk);
          // this.mk = new L.Marker({lat: data.lat, lng: data.lon}, {draggable: false, title: "title"}).addTo(this.map); 
          // console.log('else mk',this.mk);
          // this.map.setView(this.mk.getLatLng(),12);
        }
      }
    ));
  }

  get rp_open_hh(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_open_hh');
  }

  get rp_open_mm(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_open_mm');
  }

  get rp_open_ss(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_open_ss');
  }

  get rp_close_hh(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_close_hh');
  }

  get rp_close_mm(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_close_mm');
  }

  get rp_close_ss(): FormControl {
    return <FormControl>this.moverentalpointForm.get('rp_close_ss');
  }

  // createFrom() {}

  ngOnChanges() {
    this.subs.add(this.singleRentalpoint$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          if (data.closing_hours != null || data.opening_hours != null) {
            var rp_open_time = data.opening_hours.split(":");
            var rp_close_time = data.closing_hours.split(":"); 
          }
          if (!!this.moverentalpointForm) {
            this.moverentalpointForm.patchValue(data);
            this.rp_open_hh.patchValue(rp_open_time[0]);
            this.rp_open_mm.patchValue(rp_open_time[1]);
            this.rp_open_ss.patchValue(rp_open_time[2]);

            this.rp_close_hh.patchValue(rp_close_time[0]);
            this.rp_close_mm.patchValue(rp_close_time[1]);
            this.rp_close_ss.patchValue(rp_close_time[2]);
            this.StartDateChange();
          }
        }
      }
    ));
  }

  moveRentalPoint() {
    var openTime: string = this.moverentalpointForm.controls.rp_open_hh.value+":"+this.moverentalpointForm.controls.rp_open_mm.value+":"+this.moverentalpointForm.controls.rp_open_ss.value;
    var closeTime: string = this.moverentalpointForm.controls.rp_close_hh.value+":"+this.moverentalpointForm.controls.rp_close_mm.value+":"+this.moverentalpointForm.controls.rp_close_ss.value;
    this.singleRentalpoint$.pipe(take(1)).subscribe(
      (data) => {
        var formData = {...data};
        formData.rentalpoint_type = this.moverentalpointForm.controls.rentalpoint_type.value;
        formData.ownership_code = this.moverentalpointForm.controls.ownership_code.value;
        formData.lat = +this.moverentalpointForm.controls.lat.value;
        formData.lon = +this.moverentalpointForm.controls.lon.value;
        formData.rentalpoint_name = this.moverentalpointForm.controls.rentalpoint_name.value;
        formData.rentalpoint_shortcode = this.moverentalpointForm.controls.rentalpoint_shortcode.value;
        formData.addressline1 = this.moverentalpointForm.controls.addressline1.value;
        formData.addressline2 = this.moverentalpointForm.controls.addressline2.value;
        formData.state_id = +this.moverentalpointForm.controls.state.value;
        formData.country_id = this.moverentalpointForm.controls.country.value;
        formData.city_id = this.moverentalpointForm.controls.city.value;
        formData.pin = this.moverentalpointForm.controls.pin.value;
        formData.max_capacity = +this.moverentalpointForm.controls.max_capacity.value;
        formData.available_capacity = +this.moverentalpointForm.controls.available_capacity.value;
        formData.commissioning_date = this.moverentalpointForm.controls.commissioning_date.value;
        formData.termination_date = this.moverentalpointForm.controls.termination_date.value;
        formData.region_id = this.moverentalpointForm.controls.region_id.value;
        formData.status = this.moverentalpointForm.controls.status.value;
        formData.opening_hours = openTime;
        formData.closing_hours = closeTime;
        formData.admn_user_id = this.moverentalpointForm.controls.admn_user_id.value;
        formData.battery_swapping_point = this.moverentalpointForm.controls.battery_swapping_point.value;
        console.log(formData);

        this.moverentalpoint.emit(formData);
      }
    );
  }

  cancelRentalPoint() {
    this.router.navigate(['rental-point','rental-point-main']);
  }

  get rentalpoint_type(): FormControl {
    return <FormControl> this.moverentalpointForm.get('rentalpoint_type');
  }

  get ownership_code(): FormControl {
    return <FormControl> this.moverentalpointForm.get('ownership_code');
  }

  get rentalpoint_name(): FormControl {
    return <FormControl> this.moverentalpointForm.get('rentalpoint_name');
  }

  get rentalpoint_shortcode(): FormControl {
    return <FormControl> this.moverentalpointForm.get('rentalpoint_shortcode');
  }

  get franchise_id(): FormControl {
    return <FormControl> this.rentalpointFranchisemoveForm.get('franchise_id');
  }
  StartDateChange() {
    if (this.moverentalpointForm.controls.commissioning_date.value) {
      if (this.moverentalpointForm.controls.termination_date.value && 
         (this.moverentalpointForm.controls.commissioning_date.value >= this.moverentalpointForm.controls.termination_date.value)) {
         this.moverentalpointForm.get('termination_date').reset();
      }
    }
    var fromDate: Date = new Date(this.moverentalpointForm.controls.commissioning_date.value);
    this.minDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1)
    this.maxDate = fromDate;
  }

  maxCapacityValidation() {
    if (+this.moverentalpointForm.controls.max_capacity.value) {
      if (+this.moverentalpointForm.controls.available_capacity.value && 
        (+this.moverentalpointForm.controls.max_capacity.value < +this.moverentalpointForm.controls.available_capacity.value)) {
        this.moverentalpointForm.get('max_capacity').reset();
      }
    }
  }

  availableCapacityValidation() {
    if (+this.moverentalpointForm.controls.available_capacity.value) {
      if (+this.moverentalpointForm.controls.max_capacity.value && 
        (+this.moverentalpointForm.controls.available_capacity.value > +this.moverentalpointForm.controls.max_capacity.value)) {
          this.moverentalpointForm.get('available_capacity').reset();
      }
    }
  }

  OnChange(value: number) {
    console.log(value);
    if (value == 2) {
      this.rentalpointFranchisemoveForm.get('franchise_id').setValidators([Validators.required]);
      this.Franchise = true;
    }

    else {
      this.rentalpointFranchisemoveForm.get('franchise_id').clearValidators();
      this.Franchise = false;
    }
    this.rentalpointFranchisemoveForm.get('franchise_id').updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
