import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CorporateBillingService } from 'src/app/service/corporate-billing/corporate-billing.service';
import { CorporateBillingActionTypes, CorporateBillsListLoadAction, CorporateBillsListLoadSuccessAction, CorporateBillsListLoadFailureAction, SetupBillsLoadSuccessAction, SetupBillsLoadAction, SetupBillsLoadFailureAction, BillSetupsListLoadAction, BillSetupsListLoadSuccessAction, BillSetupsListLoadFailureAction, CreateSetupbillingAction, CreateSetupbillingFailureAction, CreateSetupbillingSuccessAction, BillDetailsLoadAction, BillDetailsLoadFailureAction, BillDetailsLoadSuccessAction, CorporateBillsFilterAction, CorporateBillsFilterFailureAction, CorporateBillsFilterSuccessAction, BillingGeneratePDFAction, BillingGeneratePDFFailureAction, BillingGeneratePDFSuccessAction, SendEmailLoadAction, SendEmailLoadFailureAction, SendEmailLoadSuccessAction, BillingSendEmailAction, BillingSendEmailFailureAction, BillingSendEmailSuccessAction, AddAdjustmentsAction, AddAdjustmentsSuccessAction, AddAdjustmentsFailureAction, BillPaymentStatusChangeAction, BillPaymentStatusChangeFailureAction, BillPaymentStatusChangeSuccessAction } from '../actions/corporate_billing.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/service/region/region.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Injectable()
export class CorporateBillingEffects {
    constructor( private actions$: Actions, private corporateBillingService: CorporateBillingService, private _snackBar: MatSnackBar, public router: Router,
        private regionService: RegionService, private rentalPointService: RentalPointService,
        private domainService: DomainService, private store: Store<AppState> ) { }
    
    //Bill Setups List Load Action
    billSetupsListLoadAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Bill_Setups_List_Load_Action),
            mergeMap((action: BillSetupsListLoadAction) =>
                this.corporateBillingService.GetAllBillSetups().pipe(
                    map((response) => {
                        console.log(response);
                        return new BillSetupsListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new BillSetupsListLoadFailureAction({
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

    //Set up bills load Action
    setupBillsLoadAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Setup_Bills_Load_Action),
            mergeMap((action: SetupBillsLoadAction) =>
                forkJoin([
                    this.corporateBillingService.GetLegalEntities(),
                    this.corporateBillingService.GetCorporates()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        return new SetupBillsLoadSuccessAction(response);
                    }),
                    catchError(error => of(new SetupBillsLoadFailureAction({
                        Info: [],
                        Warnings: [],
                        Business_Errors: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );

    //Create Setupbill 
    setupBillSubmitAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Create_Setup_Bill_Action),
            mergeMap((action: CreateSetupbillingAction) => 
                this.corporateBillingService.CreateSetup(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new CreateSetupbillingFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Successfully Added", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['corporate-billing', 'bills-set-up'], {replaceUrl: true});
                            return new CreateSetupbillingSuccessAction();
                        }
                    }),
                    catchError(error => of(new CreateSetupbillingFailureAction({
                        Info: [],
                        Warnings: [],
                        Business_Errors: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );

    //Get corporate bills
    getCorporateBills$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Corporate_Bills_List_Load_Action),
            mergeMap((action: CorporateBillsListLoadAction) => 
            forkJoin([
                this.corporateBillingService.FilterCorporateBills(action.payload),
                this.regionService.getCities(),
                this.regionService.GetStates(),
                this.rentalPointService.GetCountries(),
                this.corporateBillingService.GetAllBillSetups(),
                this.domainService.GetBillingStatuses(),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors)) {
                            return new CorporateBillsListLoadFailureAction(response[0].Errors)
                        } else {
                            return new CorporateBillsListLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CorporateBillsListLoadFailureAction({
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

    filterCorporateBills$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Corporate_Bills_Filter),
            mergeMap((action: CorporateBillsFilterAction) => 
                this.corporateBillingService.FilterCorporateBills(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new CorporateBillsFilterFailureAction(response.Errors)
                        } else {
                            return new CorporateBillsFilterSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CorporateBillsFilterFailureAction({
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

    // Bill Details Load Action
    billDetailsLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Bill_Details_Load_Action),
            mergeMap((action: BillDetailsLoadAction) => 
                this.corporateBillingService.GetBillDetails(action.payload)
                .pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new BillDetailsLoadFailureAction(response.Errors)
                        } else {
                            return new BillDetailsLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new BillDetailsLoadFailureAction({
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

    //generate PDF
    generatePDF$ = createEffect(() => this.actions$.pipe(
            ofType(CorporateBillingActionTypes.Billing_Generate_PDF),
            exhaustMap((action: BillingGeneratePDFAction) =>
                this.corporateBillingService.GeneratePDF(action.payload).pipe(
                    map(response => {
                        console.log(response);
                        if(<ErrorModel>response.Errors) {
                            return new BillingGeneratePDFFailureAction(response.Errors);
                        }
                        else {
                            return new BillingGeneratePDFSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new BillingGeneratePDFFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            ),
        )
    );

    //Send Email Load
    sendEmailLoad$ = createEffect(() => this.actions$.pipe(
        ofType(CorporateBillingActionTypes.Send_Email_Load_Action),
        mergeMap((action: SendEmailLoadAction) => 
            this.corporateBillingService.SendEmailLoadInfo(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if(!!(<ErrorModel>response.Errors)) {
                        return new SendEmailLoadFailureAction(response.Errors);
                    }
                    else {
                        return new SendEmailLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new SendEmailLoadFailureAction({
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

    //Send Email
    sendEmail$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Billing_Send_Email),
            mergeMap((action: BillingSendEmailAction) =>
                this.corporateBillingService.SendEmail(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new BillingSendEmailFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Successfully Sent E-mail", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 5000
                            });
                            return new BillingSendEmailSuccessAction();
                        }
                    }),
                    catchError(error => of(new BillingSendEmailFailureAction({
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

    //add Adjustments
    addAdjustments$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Add_Adjustments_Action),
            mergeMap((action: AddAdjustmentsAction) =>
                this.corporateBillingService.GenerateAdjustment(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new AddAdjustmentsFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Adjustments added Successfully", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['corporate-billing', 'corporate-bills'], {replaceUrl: true});
                            return new AddAdjustmentsSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddAdjustmentsFailureAction({
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

    
    //Bill payment Status Change
    billPayment$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateBillingActionTypes.Bill_Payment_Status_Change_Action),
            mergeMap((action: BillPaymentStatusChangeAction) => 
                this.corporateBillingService.BillPayment(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new BillPaymentStatusChangeFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Bill payment Status Changed Successfully", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 5000
                            });
                            return new BillPaymentStatusChangeSuccessAction();
                        }
                    }),
                    catchError(error => of(new BillPaymentStatusChangeFailureAction({
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
}