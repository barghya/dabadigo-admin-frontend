import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { users, role, AddUser, region, regionId } from 'src/app/models/userManagement';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { DomainData } from 'src/app/models/domainModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import {  debounceTime } from 'rxjs/operators';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';
import { CorporateManagement, AddUserService } from 'src/app/models/corporateManagement';
import { startWith, map, take, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { SubSink } from 'subsink';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  AddUserData: users
  UserForm: FormGroup;
  UserCorporateForm: FormGroup;
  corporate: boolean = false;
  franchise: boolean = false;
  @Output() adminForm = new EventEmitter<AddUser>();
  @Output() addanotherUserevent = new EventEmitter();
  @Output() canceluser = new EventEmitter();
  @Input() adminRole$: Observable<role[]>;
  @Input() region$: Observable<region[]>;
  @Input() userType$: Observable<DomainData[]>;
  @Input() userStatus$: Observable<DomainData[]>;
  @Input() corporate$:  Observable<CorporateManagement[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  filteredCorporates$: Observable<CorporateManagement[]>;
  corporateId: number;
  partner_type: number;
  franchiseId: number;
  filteredRegions$: Observable<region[]>;
  @Input() availableRegions$: Observable<region[]>;
  regionsList: regionId[] = [];
  removable = true;
  selectable = true;
  private subs = new SubSink();
  constructor(private formbuilder: FormBuilder,public languageService: LanguageService,private router: Router, private userService: UserManagementService, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() { 
    this.createForm();
    this.createCorporateUserForm();
    this.getQueryParam();
  }

  AddUser(){
    if (+this.UserForm.value.user_type != 3 && +this.UserForm.value.user_type != 2) {
      var formData: AddUser = {
        username: this.UserForm.value.username,
        // password: this.UserForm.value.password,
        firstname: this.UserForm.value.firstname,
        lastname: this.UserForm.value.lastname,
        contact_phone: this.UserForm.value.contact_phone,
        email_id: this.UserForm.value.email_id,
        addressline1: this.UserForm.value.addressline1,
        addressline2: this.UserForm.value.addressline2,
        state_id: +this.UserForm.value.state_id,
        city_id: this.UserForm.value.city_id,
        pin: +this.UserForm.value.pin,
        country_id: this.UserForm.value.country_id,
        regions: this.regionsList,
        role_id: +this.UserForm.value.role_name,
        user_type: +this.UserForm.value.user_type,
        user_status: +this.UserForm.value.user_status,
      }
      this.adminForm.emit(formData);
      console.log(formData);
    } 
    else {
      var formData: AddUser = {
        username:this.UserForm.controls.username.value,
        // password:this.UserForm.controls.password.value,
        firstname:this.UserForm.controls.firstname.value,
        lastname:this.UserForm.controls.lastname.value,
        contact_phone:this.UserForm.controls.contact_phone.value,
        email_id:this.UserForm.controls.email_id.value,
        addressline1: this.UserForm.value.addressline1,
        addressline2: this.UserForm.value.addressline2,
        state_id: +this.UserForm.value.state_id,
        city_id: this.UserForm.value.city_id,
        pin: +this.UserForm.value.pin,
        country_id: this.UserForm.value.country_id,
        regions: this.regionsList,
        role_id: +this.UserForm.controls.role_name.value,
        user_type: +this.UserForm.controls.user_type.value,
        user_status: +this.UserForm.controls.user_status.value,
        poc_designation: this.UserCorporateForm.controls.poc_designation.value,
        corporate_id: +this.UserCorporateForm.controls.corporate_id.value,
        poc_name: this.UserCorporateForm.controls.poc_name.value,
        poc_email: this.UserCorporateForm.controls.poc_email.value,
        poc_phone: this.UserCorporateForm.controls.poc_phone.value,
        poc_office_add: this.UserCorporateForm.controls.poc_office_add.value,
      }
      this.adminForm.emit(formData);
      console.log(formData);
    }
  }

  createForm() {
    this.UserForm = this.formbuilder.group({
      username: ['', [Validators.required], [this.validateUsername.bind(this)]],
      // password: ['', [Validators.required]],
      // confirmpassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      contact_phone: ['', [Validators.required, Ms3Validators.phonenumber]],
      email_id: ['', [Validators.required, Ms3Validators.email]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      country_id: ['',[Validators.required]],
      region: [''],
      role_name: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      user_status: ['', [Validators.required]],
    },
    // {'validator': this.isMatching}
    );

    this.filteredRegions$ = this.UserForm.controls.region.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.showRegion(value).region_name + " - " + this.showRegion(value).region_code),
      switchMap(value => !!this.availableRegions$ ?
        this.availableRegions$.pipe(take(1), map(region => !!region ? region.filter(m => (m.region_name + " - " + m.region_code).toLowerCase().includes(value.trim().toLowerCase())) : region))
        : this.availableRegions$
      )
    )
  }

  displayFnRegions(region_id?: number): string | undefined {
    var regions: region = !!region_id && !!this.availableRegions$ ? this.showRegion(region_id) : undefined;
    return regions ? regions.region_name + " - " + regions.region_code : undefined;
  }

  showRegion(region_id?: number): region {
    var regions: region = {}
    this.availableRegions$.pipe(take(1)).subscribe(
      region => {
        regions = region.find(m => m.region_id == region_id)
      }
    );


    return regions;
  }

  removeRegions(value: regionId): void {
    this.regionsList = this.regionsList.filter(m => m != value);
  }

  showRegions(event: MatAutocompleteSelectedEvent): void {
    this.regionsList.push({
      region_id: event.option.value
    });
    this.UserForm.controls.region.setValue("");
    
    console.log(this.regionsList.length);
  }

  createCorporateUserForm() {
    this.UserCorporateForm = this.formbuilder.group({
      corporate_id: [''],
      poc_name: [''],
      poc_email: [''],
      poc_phone: [''],
      poc_office_add: [''],
      poc_designation: [''],
    });
  }

  cancelUser() {
    this.canceluser.emit()
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicateUsername: true } : null;
  });

  validateUsername(control: AbstractControl) {
    var booleanResponse = this.userService.DuplicateUser(control.value);
    return this.formatResponse(booleanResponse);
  }

  getQueryParam() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      this.corporateId = +params['id'];
      this.partner_type = +params['type'];
    }));
    if(this.corporateId && this.partner_type) {
      if(this.partner_type == 1) {
        this.UserForm.controls.user_type.setValue(2);
        this.corporate = true;
        this.OnChange(2);
      } else if (this.partner_type == 2) {
        this.UserForm.controls.user_type.setValue(3);
        this.corporate = false;
        this.OnChange(3);
      }
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == this.partner_type)
        )
      )
      this.UserCorporateForm.controls.corporate_id.patchValue(this.corporateId);
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == this.partner_type)
        )
      )
    }
  }

  OnChange(value: number) {
    console.log(value);
    if (value == 2) {
      this.UserCorporateForm.get('corporate_id').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_name').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_email').setValidators([Validators.required, Ms3Validators.email]);
      this.UserCorporateForm.get('poc_phone').setValidators([Validators.required, Ms3Validators.phonenumber]);
      this.UserCorporateForm.get('poc_office_add').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_designation').setValidators([Validators.required]);
      this.corporate = true;
    }
    else if (value == 3) {
      this.UserCorporateForm.get('corporate_id').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_name').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_email').setValidators([Validators.required, Ms3Validators.email]);
      this.UserCorporateForm.get('poc_phone').setValidators([Validators.required, Ms3Validators.phonenumber]);
      this.UserCorporateForm.get('poc_office_add').setValidators([Validators.required]);
      this.UserCorporateForm.get('poc_designation').setValidators([Validators.required]);
      this.corporate = true;
    }
    else {
      this.UserCorporateForm.get('corporate_id').clearValidators();
      this.UserCorporateForm.get('poc_name').clearValidators();
      this.UserCorporateForm.get('poc_email').clearValidators();
      this.UserCorporateForm.get('poc_phone').clearValidators();
      this.UserCorporateForm.get('poc_office_add').clearValidators();
      this.UserCorporateForm.get('poc_designation').clearValidators();
      this.corporate = false;
    }
    this.UserCorporateForm.get('corporate_id').updateValueAndValidity();
    this.UserCorporateForm.get('poc_name').updateValueAndValidity();
    this.UserCorporateForm.get('poc_email').updateValueAndValidity();
    this.UserCorporateForm.get('poc_phone').updateValueAndValidity();
    this.UserCorporateForm.get('poc_office_add').updateValueAndValidity();
    this.UserCorporateForm.get('poc_designation').updateValueAndValidity();
  }

  userTypeSelected(user_type: DomainData) {

    if(user_type.domain_code == 2){
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == 1)
      )
      )
    }else if(user_type.domain_code == 3){
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == 2)
      )
      )
    }

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
}
