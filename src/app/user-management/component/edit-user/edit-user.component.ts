import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { role, users, region, regionId } from 'src/app/models/userManagement';
import { DomainData } from 'src/app/models/domainModel';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map, take, switchMap } from 'rxjs/operators';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnChanges, OnDestroy {
  UserEditForm: FormGroup;
  UserCorporateEditForm: FormGroup;
  corporate: boolean = false;
  @Input() adminRole$: Observable<role[]>;
  @Input() region$: Observable<region[]>;
  @Input() userType$: Observable<DomainData[]>;
  @Input() userStatus$: Observable<DomainData[]>;
  @Input() editDetails$: Observable<users>;
  @Input() singleUser$: Observable<users>;
  @Input() corporate$: Observable<CorporateManagement[]>;
  @Input() countries$: Observable<countries[]>;
  @Input() statesName$: Observable<states[]>;
  @Input() cities$: Observable<CityItem[]>;
  @Output() adminEditForm = new EventEmitter<users>();
  @Output() canceluser = new EventEmitter();
  filteredCorporates$: Observable<CorporateManagement[]>;
  edituser: users;
  private subs = new SubSink();
  public updatedOn: Date;
  filteredRegions$: Observable<region[]>;
  @Input() availableRegions$: Observable<region[]>;
  regionsList: regionId[] = [];
  removable = true;
  selectable = true;
  constructor(public languageService: LanguageService, private formbuilder: FormBuilder, private router: Router, private store: Store<AppState>, ) { }

  ngOnInit() {
    this.UserEditForm = this.formbuilder.group({
      username: [''],
      // password: [''],
      // confirmpassword: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      contact_phone: ['', [Validators.required, Ms3Validators.phonenumber]],
      email_id: ['', [Validators.required, Ms3Validators.email]],
      addressline1: ['',[Validators.required]],
      addressline2: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      pin: ['',[Validators.required, Ms3Validators.integer]],
      country: ['',[Validators.required]],
      region: [''],
      role_id: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      user_status: ['', [Validators.required]],
    },
      // { 'validator': this.isMatching }
      );

    this.filteredRegions$ = this.UserEditForm.controls.region.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFnRegions(value)),
      switchMap(value => !!this.availableRegions$ ?
        this.availableRegions$.pipe(take(1), map(region => !!region ? region.filter(m => (m.region_name + " - " + m.region_code).toLowerCase().includes(value.trim().toLowerCase())) : region))
        : this.availableRegions$
      )
    )

    this.UserCorporateEditForm = this.formbuilder.group({
      corporate_id: [''],
      poc_name: [''],
      poc_email: [''],
      poc_phone: [''],
      poc_office_add: [''],
      poc_designation: [''],
    });
  }
  
  ngAfterViewInit() {
    this.subs.add(this.singleUser$.subscribe(
      (data) => {
        if (!!data) {
          console.log("Patching");
          console.log(data);
          if (data.user_type == 2) {
            this.UserEditForm.patchValue(data);
            this.filteredCorporates$ = this.corporate$.pipe(map(
              corporates => corporates.filter(m => m.partner_type == 1)))
            this.UserCorporateEditForm.patchValue(data);
            this.userTypeSelection(2);  
            this.corporate = true;
          }
          else if (data.user_type == 3) {
            this.UserEditForm.patchValue(data);
            this.filteredCorporates$ = this.corporate$.pipe(map(
              corporates => corporates.filter(m => m.partner_type == 2)))
            this.UserCorporateEditForm.patchValue(data);
            this.userTypeSelection(3);   
            this.corporate = true;
          }
          else {
            this.UserEditForm.patchValue(data);
            this.corporate = false;
          }
          this.username.disable();
          this.updatedOn = data.updated_on;

          this.regionsList = [];
          data.regions.forEach(region => {
            if (!!region) {
              this.regionsList.push({
                region_id: region.region_id
              })
            }
          })

        }
      }
    ));
  }
 
  displayFnRegions(region_id?: number): string | undefined {
    var region: region = !!region_id && !!this.availableRegions$ ? this.showRegion(region_id) : undefined;
    return region ? region.region_name + " - " + region.region_code : undefined;
  }


  showRegion(region_id?: number): region {
    // console.log("region id",region_id);
    var regions: region = {}
    this.availableRegions$.pipe(take(1)).subscribe(
      region => {
        regions = region.find(m => m.region_id == region_id)
      }
    );
    // console.log("show region",regions);

    return regions;
  }

  removeRegions(value: regionId): void {
    this.regionsList = this.regionsList.filter(m => m != value);
  }



  showRegions(value: number): void {
    this.regionsList.push({
      region_id: value
    });
    this.UserEditForm.controls.region.setValue("");
    
    console.log(this.regionsList.length);
  }


  ngOnChanges() {
  }

  saveUser() {
    if (+this.UserEditForm.controls.user_type.value != 2 && +this.UserEditForm.controls.user_type.value != 3) {
    this.singleUser$.pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data };
        formData.username = this.UserEditForm.controls.username.value;
        // formData.password = this.UserEditForm.controls.password.value;
        formData.firstname = this.UserEditForm.controls.firstname.value;
        formData.lastname = this.UserEditForm.controls.lastname.value;
        formData.contact_phone = this.UserEditForm.controls.contact_phone.value;
        formData.email_id = this.UserEditForm.controls.email_id.value;
        formData.addressline1 = this.UserEditForm.controls.addressline1.value;
        formData.addressline2 = this.UserEditForm.controls.addressline2.value;
        formData.state_id = +this.UserEditForm.controls.state.value;
        formData.city_id = this.UserEditForm.controls.city.value;
        formData.pin = +this.UserEditForm.controls.pin.value;
        formData.country_id = this.UserEditForm.controls.country.value;
        formData.regions = this.regionsList;
        formData.role_id = this.UserEditForm.controls.role_id.value;
        formData.user_type = this.UserEditForm.controls.user_type.value;
        formData.user_status = this.UserEditForm.controls.user_status.value;
        console.log(data);
        this.adminEditForm.emit(formData);
      }
    );

  }
  else{
    this.singleUser$.pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data };
        formData.username = this.UserEditForm.controls.username.value;
        // formData.password = this.UserEditForm.controls.password.value;
        formData.firstname = this.UserEditForm.controls.firstname.value;
        formData.lastname = this.UserEditForm.controls.lastname.value;
        formData.contact_phone = this.UserEditForm.controls.contact_phone.value;
        formData.email_id = this.UserEditForm.controls.email_id.value;
        formData.addressline1 = this.UserEditForm.controls.addressline1.value;
        formData.addressline2 = this.UserEditForm.controls.addressline2.value;
        formData.state_id = +this.UserEditForm.controls.state.value;
        formData.city_id = this.UserEditForm.controls.city.value;
        formData.pin = +this.UserEditForm.controls.pin.value;
        formData.country_id = this.UserEditForm.controls.country.value;
        formData.regions = this.regionsList;
        formData.role_id = this.UserEditForm.controls.role_id.value;
        formData.user_type = this.UserEditForm.controls.user_type.value;
        formData.user_status = this.UserEditForm.controls.user_status.value;
        formData.corporate_id = +this.UserCorporateEditForm.controls.corporate_id.value;
        formData.poc_designation = this.UserCorporateEditForm.controls.poc_designation.value;
        formData.poc_name = this.UserCorporateEditForm.controls.poc_name.value;
        formData.poc_email = this.UserCorporateEditForm.controls.poc_email.value;
        formData.poc_phone = this.UserCorporateEditForm.controls.poc_phone.value;
        formData.poc_office_add = this.UserCorporateEditForm.controls.poc_office_add.value;
        console.log(data);
        this.adminEditForm.emit(formData);
      }
    );
  }
}

  cancelUser() {
    this.canceluser.emit()
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  get username(): FormControl {
    return <FormControl>this.UserEditForm.get('username');
  }
  
  // isMatching(group: FormGroup) {
  //   var firstPassword = group.controls['password'].value;
  //   var secondPassword = group.controls['confirmpassword'].value;
  //   if ((firstPassword && secondPassword) && (firstPassword != secondPassword)) {
  //     return { "pw_mismatch": true };
  //   } else {
  //     return null;
  //   }
  // }

  userTypeSelection(value: number) {
    if (value == 2 || value == 3) {
      this.UserCorporateEditForm.get('corporate_id').setValidators([Validators.required]);
      this.UserCorporateEditForm.get('poc_name').setValidators([Validators.required]);
      this.UserCorporateEditForm.get('poc_email').setValidators([Validators.required, Ms3Validators.email]);
      this.UserCorporateEditForm.get('poc_phone').setValidators([Validators.required, Ms3Validators.phonenumber]);
      this.UserCorporateEditForm.get('poc_office_add').setValidators([Validators.required]);
      this.UserCorporateEditForm.get('poc_designation').setValidators([Validators.required]);
      this.corporate = true;
    } else {
      this.UserCorporateEditForm.get('corporate_id').clearValidators();
      this.UserCorporateEditForm.get('poc_name').clearValidators();
      this.UserCorporateEditForm.get('poc_email').clearValidators();
      this.UserCorporateEditForm.get('poc_phone').clearValidators();
      this.UserCorporateEditForm.get('poc_office_add').clearValidators();
      this.UserCorporateEditForm.get('poc_designation').clearValidators();
      this.corporate = false;
    }
    this.UserCorporateEditForm.get('corporate_id').updateValueAndValidity();
    this.UserCorporateEditForm.get('poc_name').updateValueAndValidity();
    this.UserCorporateEditForm.get('poc_email').updateValueAndValidity();
    this.UserCorporateEditForm.get('poc_phone').updateValueAndValidity();
    this.UserCorporateEditForm.get('poc_office_add').updateValueAndValidity();
    this.UserCorporateEditForm.get('poc_designation').updateValueAndValidity();
  }

  userTypeSelected(user_type: DomainData) {

    if(user_type.domain_code == 2){
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == 1)
      )
      )
    }else if( user_type.domain_code == 3){
      this.filteredCorporates$ = this.corporate$.pipe(map(
        corporates => corporates.filter(m => m.partner_type == 2)
      )
      )
    }

  }

}
