import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ParameterManagementService } from 'src/app/service/parameter-management/parameter-management.service';
import { ParameterManagementActionTypes, ParameterLoadAction, ParameterLoadSuccessAction, ParameterLoadFailureAction, AddParameterAction, AddParameterFailureAction, AddParameterSuccessAction, AddAnotherParameterAction, EditParameterLoadAction, EditParameterLoadFailureAction, EditParameterLoadSuccessAction, EditParameterAction, EditParameterSuccessAction, EditParameterFailureAction } from '../actions/parameter_management.action';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';


@Injectable()
export class ParameterManagementEffects {
    constructor(private actions$: Actions, private parameterService: ParameterManagementService, private router: Router,) {}

    parameterListLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(ParameterManagementActionTypes.Parameter_Management_Load),
        mergeMap((action: ParameterLoadAction) =>
            this.parameterService.getParameterList().pipe(
                map((response) => {
                    console.log(response);
                    return new ParameterLoadSuccessAction(response);
                }),
                catchError(error => of(new ParameterLoadFailureAction({
                    Info: [],
                    Business_Errors: [{
                        Code: "SE001"
                    }],
                    Warnings: [],
                    System_Errors: []
                })))
            )
        )
    )
);


addParameter$ = createEffect(() => this.actions$
.pipe(
    ofType(ParameterManagementActionTypes.Add_Parameter),
    exhaustMap((action: AddParameterAction) =>
        this.parameterService.AddParameter(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new AddParameterFailureAction(response.Errors)
                }
                else {
                    this.router.navigate(['parameter-management', 'parameter-management']);
                    return new AddParameterSuccessAction();
                }
            }),
            catchError(error => of(new AddParameterFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            })))
        )
    )
)
);


addAnotherParameter$ = createEffect(() => this.actions$
.pipe(
    ofType(ParameterManagementActionTypes.Add_Another_Parameter),
    exhaustMap((action: AddAnotherParameterAction) =>
        this.parameterService.AddParameter(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new AddParameterFailureAction(response.Errors)
                }
                else {
                    
                    return new AddParameterSuccessAction();
                }
            }),
            catchError(error => of(new AddParameterFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            })))
        )
    )
)
);

editLoadParameter$ = createEffect(() => this.actions$
.pipe(
    ofType(ParameterManagementActionTypes.Edit_Parameter_Load),
    mergeMap((action: EditParameterLoadAction) =>
        this.parameterService.singleParameterload(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new EditParameterLoadFailureAction(response.Errors)
                }
                else {
                    
                    return new EditParameterLoadSuccessAction(response);
                }
            }),
            catchError(error => of(new EditParameterLoadFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            })))
        )
    )
)
);

parameterEdit$ = createEffect(() => this.actions$.pipe(
    ofType(ParameterManagementActionTypes.Edit_Parameter),
    exhaustMap((action: EditParameterAction) =>
        this.parameterService.editParameter(action.payload)
        .pipe(
            map(response => {
                console.log(response);
                
                if(!!(<ErrorModel>response.Errors)) {
                    return new EditParameterFailureAction(response.Errors);
                }
                else{
                    this.router.navigate(['parameter-management', 'parameter-management'], { replaceUrl: true });
                    return new EditParameterSuccessAction();
                }
            }),
            catchError(error => of(new EditParameterFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);

}
