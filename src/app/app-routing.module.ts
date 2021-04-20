import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { AuthenticatedLoadGuard, AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthorizedGuard, AuthorizedLoadGuard } from './guards/authorized.guard';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule )
  },
  {
    path: "user-management",
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'asset-inventory',
    loadChildren: () => import('./asset-inventory/asset-inventory.module').then( m => m.AssetInventoryModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'rental-point',
    loadChildren: () => import('./rental-point/rental-point.module').then( m => m.RentalPointModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'pricing-management',
    loadChildren: () => import('./pricing-management/pricing-management.module').then( m => m.PricingManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'deploy-vehicle',
    loadChildren: () => import('./deploy-vehicle/deploy-vehicle.module').then( m => m.DeployVehicleModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'corporate-management',
    loadChildren: () => import('./corporate-management/corporate-management.module').then(m => m.CorporateManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'corporate-request-management',
    loadChildren: () => import('./corporate-request-management/corporate-request-management.module').then(m => m.CorporateRequestManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'coupon-management',
    loadChildren: () => import('./coupon-management/coupon-management.module').then( m => m.CouponManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'region-management',
    loadChildren: () => import('./region-management/region-management.module').then( m => m.RegionManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'role-management',
    loadChildren: () => import('./role-management/role-management.module').then( m => m.RoleManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'corporate-code-management',
    loadChildren: () => import('./corporate-code-management/corporate-code-management.module').then( m => m.CorporateCodeManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
    canLoad: [AuthenticatedLoadGuard],
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'fsq-request-management',
    loadChildren: () => import('./fsq-request-management/fsq-request-management.module').then( m => m.FsqRequestManagementModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'customer-management',
    loadChildren: () => import('./customer-management/customer-management.module').then(m=>m.CustomerManagementModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'trip-management',
    loadChildren: () => import('./trip-management/trip-management.module').then(m=>m.TripManagementModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'incident-management',
    loadChildren: () => import('./incident-management/incident-management.module').then(m => m.IncidentManagementModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'parameter-management',
    loadChildren: () => import('./parameter-management/parameter-management.module').then(m => m.ParameterManagementModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'profile-management',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthenticatedLoadGuard],
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'fsq-hub',
    loadChildren: () => import('./fsq-hub/fsq-hub.module').then(m => m.FsqHubModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'state-tax',
    loadChildren: () => import('./state-tax/state-tax.module').then(m => m.StateTaxModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'iot-controller-bypass',
    loadChildren: () => import('./iot-bypass/iot-bypass.module').then(m => m.IotBypassModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'admin-fsq-hub',
    loadChildren: () => import('./admin-fsq-hub/admin-fsq-hub.module').then(m => m.AdminFsqHubModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'transfer-parts',
    loadChildren: () => import('./transfer-parts/transfer-parts.module').then(m => m.TransferPartsModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'maintenance-jobs',
    loadChildren: () => import('./maintenance-jobs/maintenance-jobs.module').then(m => m.MaintenanceJobsModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'corporate-billing',
    loadChildren: () => import('./corporarte-billing/corporarte-billing.module').then(m => m.CorporarteBillingModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'problem-inventory-tagging',
    loadChildren: () => import('./problem-inventory-tagging/problem-inventory-tagging.module').then(m => m.ProblemInventoryTaggingModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'transfer-device-battery',
    loadChildren: () => import('./transfer-device-battery/transfer-device-battery.module').then(m => m.TransferDeviceBatteryModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchisee-billing',
    loadChildren: () => import('./franchisee-billing/franchisee-billing.module').then(m => m.FranchiseeBillingModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchise-management-trip',
    loadChildren: () => import('./franchise-management-trip/franchise-management-trip.module').then(m => m.FranchiseManagementTripModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchise-management-asset',
    loadChildren: () => import('./franchise-management-asset/franchise-management-asset.module').then(m => m.FranchiseManagementAssetModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchise-rental-point',
    loadChildren: () => import('./franchise-rental-point/franchise-rental-point.module').then(m => m.FranchiseRentalPointModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'corporate-bills',
    loadChildren: () => import('./corporate-bills/corporate-bills.module').then(m => m.CorporateBillsModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchisee-bills',
    loadChildren: () => import('./franchise-bills/franchise-bills.module').then( m => m.FranchiseBillsModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'customer-kyc-verification',
    loadChildren: () => import('./customer-kyc-verification/customer-kyc-verification.module').then(m=>m.CustomerKycVerificationModule),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
  {
    path: 'franchise-pricing',
    loadChildren: () => import('./franchise-pricing/franchise-pricing.module').then( m => m.FranchisePricingModule ),
    canLoad: [AuthenticatedLoadGuard, AuthorizedLoadGuard],
    canActivate: [AuthenticatedGuard, AuthorizedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
