import { Injectable } from "@angular/core";
import { TermsAndConditionsService } from 'src/app/service/terms-and-conditions/terms-and-conditions.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TermsandConditionsActionTypes, GetTermsAndConditionsAction, GetTermsAndConditionsSuccessAction, GetTermsAndConditionsFailureAction, AddTermsandConditionsAction, AddTermsandConditionsSuccessAction, AddTermsandConditionsFailureAction, EditTermsandConditionsLoadAction, EditTermsandConditionsLoadFailureAction, EditTermsandConditionsLoadSuccessAction, EditTermsandConditionsAction, EditTermsandConditionsFailureAction, EditTermsandConditionsSuccessAction } from '../actions/term_and_conditions.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { Router } from '@angular/router';

@Injectable()
export class TermsandConditionsEffects {
    constructor(private actions$: Actions, private termsAndConditionsService: TermsAndConditionsService,
        private router: Router) {}

    //get terms and conditions
    getTermssandCondition$ = createEffect(() => this.actions$
        .pipe(
            ofType(TermsandConditionsActionTypes.Get_Terms_and_Conditions_Action),
            mergeMap((action: GetTermsAndConditionsAction) => 
                this.termsAndConditionsService.GetTermsandConditions().pipe(
                    map((response) => {
                        console.log(response);
                        return new GetTermsAndConditionsSuccessAction(response);
                    }),
                    catchError(error => of(new GetTermsAndConditionsFailureAction({
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
    
    //Add terms and Conditions
    addTermsAndConditions$ = createEffect(() => this.actions$
        .pipe(
            ofType(TermsandConditionsActionTypes.Add_Terms_and_Conditions_Action),
            mergeMap((action: AddTermsandConditionsAction) => 
                this.termsAndConditionsService.AddTermsandConditions(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new AddTermsandConditionsFailureAction(response.Errors)
                        } else {
                            this.router.navigate(['terms-and-conditions', 'terms-and-conditions']);
                            return new AddTermsandConditionsSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddTermsandConditionsFailureAction({
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

    //Edit terms and Conditions Load
    editTandCLoad$ = createEffect (() => this.actions$
        .pipe(
            ofType(TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Action),
            mergeMap((action: EditTermsandConditionsLoadAction) =>
                this.termsAndConditionsService.UpdateTermsAndConditionLoad(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new EditTermsandConditionsLoadFailureAction(response.Errors);
                        } else {
                            return new EditTermsandConditionsLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditTermsandConditionsLoadFailureAction({
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

    //Edit Terms And Conditions
    editTandC$ = createEffect(() => this.actions$
        .pipe(
            ofType(TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Action),
            mergeMap((action: EditTermsandConditionsAction) => 
                this.termsAndConditionsService.UpdateTermsandConditions(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new EditTermsandConditionsFailureAction(response.Errors);
                        } else {
                            this.router.navigate(['dashboard', 'dashboard-main']);
                            return new EditTermsandConditionsSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditTermsandConditionsFailureAction({
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