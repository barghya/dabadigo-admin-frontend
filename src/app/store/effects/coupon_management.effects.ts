import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CouponManagementService } from 'src/app/service/coupon-management/coupon-management.service';
import { Router } from '@angular/router';
import { CouponManagementActiontypes, AddCouponLoadSuccessAction, AddCouponLoadFailureAction, AddCouponLoadAction, AddCouponAction, AddCouponSuccessAction, AddCouponFailureAction, AddAnotherCouponAction, EditCouponLoadAction, EditCouponLoadSuccessAction, EditCouponLoadFailureAction, EditCouponAction, EditCouponSuccessAction, EditCouponFailureAction, DeleteCouponAction, DeleteCouponFailureAction, CouponListLoadSuccessAction, CouponListLoadFailureAction, CouponListLoadAction, AssignCouponLoadAction, AssignCouponLoadFailureAction, AssignCouponLoadSuccessAction, AssignCouponAction, AssignCouponFailureAction, AssignCouponSuccessAction, AssignCouponCustomerLoadAction, AssignCouponCustomerLoadFailureAction, AssignCouponCustomerLoadSuccessAction, UsageHistoryLoadAction, UsageHistoryLoadFailureAction, UsageHistoryLoadSuccessAction, ReferralListLoadAction, ReferralListLoadSuccessAction, ReferralListLoadFailureAction } from '../actions/coupon_management.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DomainService } from 'src/app/service/domain/domain.service';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionService } from 'src/app/service/region/region.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { CustomerManagementService } from 'src/app/service/customer-management/customer-management.service';

@Injectable()
export class CouponManagementEffects {

    constructor(private actions$: Actions, private couponManagementService: CouponManagementService, 
        private domainService: DomainService, private router: Router,
        private regionService: RegionService, private rentalPointService: RentalPointService,
        private customerService: CustomerManagementService) { }
    //All Coupon List Load
    couponManagementListLoadAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Coupon_List_Load),
            mergeMap((action: CouponListLoadAction) =>
                this.couponManagementService.getCouponList().pipe(
                    map((response) => {
                        return new CouponListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new CouponListLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );
    //Add Coupon Dropdown Load
    couponAddLoadAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Add_Coupon_Load),
            mergeMap((action: AddCouponLoadAction) =>
                forkJoin([
                    this.domainService.GetCouponDiscountType(),
                    this.domainService.GetCouponType(),
                    this.domainService.GetCouponUsageRestriction(),
                    this.rentalPointService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities(),
                ]).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors)){
                            if(response[0].Errors){
                                return new AddCouponLoadFailureAction(response[0].Errors)
                            }
                            else if(response[1].Errors){
                                return new AddCouponLoadFailureAction(response[1].Errors)
                            }
                            else if(response[2].Errors){
                                return new AddCouponLoadFailureAction(response[2].Errors)
                            }
                        }
                        else{
                            return new AddCouponLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AddCouponLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );
    //Add Coupon
    couponAdd$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Add_Coupon),
            exhaustMap((action: AddCouponAction) =>
                this.couponManagementService.createCoupon(action.payload).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response.Errors)){
                            return new AddCouponFailureAction(response.Errors)
                        }
                        else{
                            this.router.navigate(['coupon-management', 'coupon-list'])
                            return new AddCouponSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddCouponFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );
    //Add Another Coupon
    couponAddAnother$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Add_Another_Coupon_Action),
            exhaustMap((action: AddAnotherCouponAction) =>
                this.couponManagementService.createCoupon(action.payload).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response.Errors)){
                            return new AddCouponFailureAction(response.Errors);
                        }
                        else{
                            return new AddCouponSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddCouponFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );
    //Edit Coupon Load
    couponEditLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Edit_Coupon_Load_Action),
            mergeMap((action: EditCouponLoadAction) =>
                forkJoin([
                    this.domainService.GetCouponDiscountType(),
                    this.domainService.GetCouponType(),
                    this.domainService.GetCouponUsageRestriction(),
                    this.couponManagementService.getCouponByID(action.payload),
                    this.rentalPointService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities(),
                ]).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors || <ErrorModel>response[3].Errors)){
                            if(response[0].Errors){
                                return new EditCouponLoadFailureAction(response[0].Errors)
                            }
                            else if(response[1].Errors){
                                return new EditCouponLoadFailureAction(response[1].Errors)
                            }
                            else if(response[2].Errors){
                                return new EditCouponLoadFailureAction(response[2].Errors)
                            }
                            else if(response[3].Errors){
                                return new EditCouponLoadFailureAction(response[3].Errors)
                            }
                        }
                        else{
                            return new EditCouponLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditCouponLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );
    //Edit Coupon
    couponEdit$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Edit_Coupon),
            exhaustMap((action: EditCouponAction) =>
                this.couponManagementService.updateCoupon(action.payload).pipe(
                    map((response) => {
                        if(!!<ErrorModel>response.Errors){
                            return new EditCouponFailureAction(response.Errors)
                        }
                        else{
                            this.router.navigate(['coupon-management', 'coupon-list']);
                            return new EditCouponSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditCouponFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );
    
    //Delete Coupon
    couponDelete$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Delete_Coupon),
            exhaustMap((action: DeleteCouponAction) =>
                this.couponManagementService.deleteCoupon(action.payload).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response.Errors)){
                            return new DeleteCouponFailureAction(response.Errors);
                        }
                        else{
                            return new CouponListLoadAction();
                        }
                    }),
                    catchError(error => of(new DeleteCouponFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );

    //Assign Coupon Load
    couponAssignLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Assign_Coupon_Load),
            mergeMap((action: AssignCouponLoadAction) =>
                this.couponManagementService.getUserList(action.payload).pipe(
                    map((response) => {
                        if(!!response.Errors){
                            return new AssignCouponLoadFailureAction(response.Errors)
                        }
                        else{
                            return new AssignCouponLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AssignCouponLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );
    couponCustomerLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Assign_Coupon_Customer_Load),
            mergeMap((action: AssignCouponCustomerLoadAction) =>
                this.customerService.searchCustomer(action.payload).pipe(
                    map((response) => {
                        if(!!response.Errors){
                            return new AssignCouponCustomerLoadFailureAction(response.Errors)
                        }
                        else{
                            return new AssignCouponCustomerLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AssignCouponCustomerLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );
    //Assign Coupon
    couponAssign$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Assign_Coupon),
            exhaustMap((action: AssignCouponAction) =>
                this.couponManagementService.assignCoupon(action.payload).pipe(
                    map((response) => {
                        if(!!<ErrorModel>response.Errors){
                            return new AssignCouponFailureAction(response.Errors)
                        }
                        else{
                            this.router.navigate(['coupon-management', 'coupon-list']);
                            return new AssignCouponSuccessAction();
                        }
                    }),
                    catchError(error => of(new AssignCouponFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );

    //Usage History
    usageHistoryLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Usage_History_Load),
            exhaustMap((action: UsageHistoryLoadAction) =>
                this.couponManagementService.getUsageHistory(action.payload).pipe(
                    map((response) => {
                        if(!!<ErrorModel>response.Errors){
                            return new UsageHistoryLoadFailureAction(response.Errors)
                        }
                        else{
                            return new UsageHistoryLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new UsageHistoryLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );

    // Referrals List
    referralListLoadaction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CouponManagementActiontypes.Referrals_List_Load_Action),
            mergeMap((action: ReferralListLoadAction) => 
                this.couponManagementService.getReferralList().pipe(
                    map((response) => {
                        console.log(response);
                        return new ReferralListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new ReferralListLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }], 
                    })))
                )
            )
        )
    );
}