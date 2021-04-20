import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ProfileManagementActionTypes, ProfileManagementLoadAction, ProfileManagementLoadFailureAction, ProfileManagementLoadSuccessAction, ChangePasswordAction, ChangePasswordFailureAction, ChangePasswordSuccessAtion, ChangeMobileNumberAction, ChangeMobileNumberFailureAction, ChangeMobileNumberSuccessAction } from '../actions/profile_management.action';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';
import { mergeMap, catchError, map, take, exhaustMap } from 'rxjs/operators';
import { ErrorModel } from 'src/app/models/errorModel';
import { of } from 'rxjs';
import { ProfileManagementService } from 'src/app/service/profile-management/profile-management.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class ProfileManagementEffects {
    constructor(private actions$: Actions, private userManagementService: UserManagementService, private profileManagementService: ProfileManagementService, private router: Router, private _snackBar: MatSnackBar) { }

    userProfileLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(ProfileManagementActionTypes.Profile_Load_Action),
            mergeMap((action: ProfileManagementLoadAction) =>
                this.userManagementService.GetUserByID(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.error) {
                            return new ProfileManagementLoadFailureAction(response);
                        }
                        else {
                            return new ProfileManagementLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new ProfileManagementLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    }))
                    )
                )
            )
        )
    );

    newPasswordCreate = createEffect(() => this.actions$
        .pipe(
            ofType(ProfileManagementActionTypes.Change_Password_Action),
            exhaustMap((action: ChangePasswordAction) =>
                this.profileManagementService.CreateNewPassword(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Error) {
                            return new ChangePasswordFailureAction(response);
                        }
                        else {
                            this.router.navigate(['profile-management', 'profile-main']);
                            return new ChangePasswordSuccessAtion();
                        }
                    }),
                    catchError(error => of(new ChangePasswordFailureAction({
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

    changeMobileNumber$ = createEffect(() => this.actions$
        .pipe(
            ofType(ProfileManagementActionTypes.Change_Mobile_Number_Action),
            mergeMap((action: ChangeMobileNumberAction) => 
                this.profileManagementService.ChangeMobileNumber(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!<ErrorModel>response.Errors) {
                            return new ChangeMobileNumberFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Successfully Changed Mobile Number", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['dashboard']);
                            return new ChangeMobileNumberSuccessAction();
                        }
                    }),
                    catchError(error => of(new ChangeMobileNumberFailureAction({
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