import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatListModule, MatExpansionModule, MAT_DATE_LOCALE, MatSnackBarModule } from '@angular/material'
import { UserEffects } from './store/effects/user.effects';
import { UserManagementEffects } from './store/effects/user_management.effects';
import { UserReducer } from './store/reducers/user.reducers';
import { UserManagementReducer } from './store/reducers/user_management.reducers';
import { AssetInventoryEffects } from './store/effects/asset_inventory.effects';
import { AssetInventoryReducer } from './store/reducers/asset_inventory.reducers';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RentalPointEffects } from './store/effects/rental_point.effects';
import { RentalpointReducer } from './store/reducers/rental_point.reducers';
import { LanguageReducer } from './store/reducers/language.reducer';
// import { MapmyIndiaEffects } from './store/effects/mapmy_india.effects';
// import { MapmyIndiaReducer } from './store/reducers/mapmy_india.reducers';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './router-strategy/router-strategy';
import { DomainReducer } from './store/reducers/domain.reducer';
import { DomainEffects } from './store/effects/domain.effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PricingManagementReducer } from './store/reducers/pricing_management.reducers';
import { PricingManagementEffects } from './store/effects/pricing_management.effects';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DirectivesModule } from './directives/directives.module';
import { DeployVehicleEffects } from './store/effects/deploy_vehicle.effects';
import { DeployVehicleReducer } from './store/reducers/deploy_vehicle.reducers';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { RegionManagementEffects } from './store/effects/region_management.effects';
import { RegionManagementReducer } from './store/reducers/region_management.reducers';
import { CorporateManagementEffects } from './store/effects/corporate_management.effects';
import { CorporaterManagementReducer } from './store/reducers/corporate_management.reducers';
import { CorporateCodeManagementEffects } from './store/effects/corporate_code_management.effects';
import { CorporateCodeManagementReducer } from './store/reducers/corporate_code_management.reducers';
import { CorporateRequestManagementEffects } from './store/effects/corporate_request_management.effects';
import { CorporateRequestManagementReducer } from './store/reducers/corporate_request_management.reducers';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CouponManagementEffects } from './store/effects/coupon_management.effects';
import { CouponManagementReducer } from './store/reducers/coupon_management_reducers';
import { FSQManagementEffects } from './store/effects/fsq_management.effects';
import { FSQManagementReducer } from './store/reducers/fsq_management.reducers';
import { CustomerManagementEffects } from './store/effects/customer_management.effects';
import { CustomerManagementReducer } from './store/reducers/customer_management.reducers';
import { TripManagementEffects } from './store/effects/trip_management.effect';
import { TripManagementReducer } from './store/reducers/trip_management.reducers';
import { ProfileManagementEffects } from './store/effects/profile_management.effects';
import { ProfileManagementReducer } from './store/reducers/profile_management.reducers';
import { ParameterManagementEffects } from './store/effects/parameter_management.effects';
import { ParameterManagementReducer } from './store/reducers/parameter_management.reducers';
import { FsqHubComponent } from './fsq-hub/component/fsq-hub/fsq-hub.component';
import { FsqHubContainerComponent } from './fsq-hub/container/fsq-hub-container/fsq-hub-container.component';
import { FsqHubPageComponent } from './fsq-hub/page/fsq-hub-page/fsq-hub-page.component';
import { FSQHubReducer } from './store/reducers/fsq_hub.reducers';
import { FSQHubEffects } from './store/effects/fsq_hub.effect';
import { DashboardReducer } from './store/reducers/dashboard.reducer';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { IotControllerEffects } from './store/effects/iot_controller.effects';
import { IotControllerReducer } from './store/reducers/iot_controller.reducers';
import { StateTaxEffects } from './store/effects/state_tax.effects';
import { StateTaxReducer } from './store/reducers/state_tax.reducers';
import { TransferPartsReducer } from './store/reducers/transfer_parts.reducers';
import { PartsTransferEffects } from './store/effects/transfer_parts.effects';
import { MaintenanceJobsEffects } from './store/effects/maintenance_jobs.effects';
import { MaintenanceJobsReducer } from './store/reducers/maintenance_jobs.reducers';
import { CorporateBillingEffects } from './store/effects/corporate_billing.effects';
import { CorporateBillingReducer } from './store/reducers/corporate_billing.reducers';
import { ProblemInventoryTaggingEffects } from './store/effects/problem_inventory_tagging.effects';
import { ProblemInventoryTaggingReducer } from './store/reducers/problem_inventory_tagging.reducers';
import { TermsandConditionsEffects } from './store/effects/terms_and_conditions.effect';
import { TermsandConditionsReducer } from './store/reducers/terms_and_conditions.reducers';
import { RoleManagementReducer } from './store/reducers/role-management.reducer';
import { RoleManagementEffects } from './store/effects/role-management.effect';
import { TransferDeviceBatteryReducer } from './store/reducers/transfer_device_battery.reducers';
import { TransferDeviceBatteryEffects } from './store/effects/transfer_device_battery.effects';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FranchiseeBillingEffects } from './store/effects/franchisee_billing.effects';
import { FranchiseeBillingReducer } from './store/reducers/franchisee_billing.reducer';
import { FranchiseEffects } from './store/effects/franchise_management.effects';
import { FranchiseReducer } from './store/reducers/franchise_management.reducers';
import { FranchiseVehicleEffects } from './store/effects/franchise_vehicle.effect';
import { FranchiseVehicleReducer } from './store/reducers/franchise_vehicle.reducers';
import { CustomerKycVerificationMainComponent } from './customer-kyc-verification/component/customer-kyc-verification-main/customer-kyc-verification-main.component';
import { CustomerKycVerificationMainContainerComponent } from './customer-kyc-verification/container/customer-kyc-verification-main-container/customer-kyc-verification-main-container.component';
import { CustomerKycVerificationViewContainerComponent } from './customer-kyc-verification/container/customer-kyc-verification-view-container/customer-kyc-verification-view-container.component';
import { CustomerKycVerificationViewComponent } from './customer-kyc-verification/component/customer-kyc-verification-view/customer-kyc-verification-view.component';
import { CustomerKycVerificationComponent } from './customer-kyc-verification/page/customer-kyc-verification/customer-kyc-verification.component';
import { CustomerKycVarificationReducer } from './store/reducers/customer_kyc_varification.reducers';
import { CustomerKycVarificationEffects } from './store/effects/customer_kyc_varification.effects';
import { FranchisePricingReducer } from './store/reducers/franchise_pricing.reducers';
import { FranchisePricingEffects } from './store/effects/franchise_pricing.effect';


const config: SocketIoConfig = { url: 'wss://192.168.0.28:8003', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CKEditorModule,
    EffectsModule.forRoot([
      UserEffects,
      UserManagementEffects,
      AssetInventoryEffects,
      RentalPointEffects,
      // MapmyIndiaEffects,
      DomainEffects,
      PricingManagementEffects,
      DeployVehicleEffects,
      AngularOpenlayersModule,
      RegionManagementEffects,
      CorporateManagementEffects,
      CorporateCodeManagementEffects,
      CorporateRequestManagementEffects,
      CouponManagementEffects,
      FSQManagementEffects,
      CustomerManagementEffects,
      TripManagementEffects,
      ProfileManagementEffects,
      ParameterManagementEffects,
      FSQHubEffects,
      DashboardEffects,
      IotControllerEffects,
      StateTaxEffects,
      PartsTransferEffects,
      MaintenanceJobsEffects,
      CorporateBillingEffects,
      ProblemInventoryTaggingEffects,
      TermsandConditionsEffects,
      RoleManagementEffects,
      TransferDeviceBatteryEffects,
      FranchiseeBillingEffects,
      FranchiseEffects,
      FranchiseVehicleEffects,
      CustomerKycVarificationEffects,
      FranchisePricingEffects
    ]),
    StoreModule.forRoot(
      {
        user: UserReducer,
        user_management: UserManagementReducer,
        asset_inventory: AssetInventoryReducer,
        rental_point: RentalpointReducer,
        language: LanguageReducer,
        deploy_vehicle: DeployVehicleReducer,
        // mapmyindia: MapmyIndiaReducer,
        domainData: DomainReducer,
        pricing_management: PricingManagementReducer,
        region_management: RegionManagementReducer,
        corporate_management: CorporaterManagementReducer,
        corporate_code_management: CorporateCodeManagementReducer,
        corporate_request_management: CorporateRequestManagementReducer,
        coupon_management: CouponManagementReducer,
        fsq_management: FSQManagementReducer,
        customer_management: CustomerManagementReducer,
        trip_management: TripManagementReducer,
        profile_management: ProfileManagementReducer,
        parameter_management: ParameterManagementReducer,
        fsq_hub: FSQHubReducer,
        dashboard: DashboardReducer,
        iot_bypass: IotControllerReducer,
        stateTaxManagement: StateTaxReducer,
        transferParts: TransferPartsReducer,
        maintenanceJobManagement: MaintenanceJobsReducer,
        corporate_billing: CorporateBillingReducer,
        problemInventoryTagging: ProblemInventoryTaggingReducer,
        terms_and_conditions: TermsandConditionsReducer,
        role_management: RoleManagementReducer,
        transferDeviceBattery: TransferDeviceBatteryReducer,
        franchisee_billing: FranchiseeBillingReducer,
        franchisee_rental_point: FranchiseReducer,
        franchisee_vehicle: FranchiseVehicleReducer,
        customer_kyc_verification: CustomerKycVarificationReducer,
        franchise_pricing: FranchisePricingReducer
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    SocketIoModule.forRoot(config),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    DirectivesModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-IN' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
