import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ErrorModel } from 'src/app/models/errorModel';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActionTypes, LoginAction, LoginFailureAction, LoginSuccessAction, FirstTimePasswordChangeAction, FirstTimePasswordChangeFailureAction, FirstTimePasswordChangeSuccessAction, UserForgetPasswordAction, UserForgetPasswordSuccessAction, UserForgetPasswordFailureAction } from '../actions/user.action';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

    login$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserActionTypes.Login_Action),
            exhaustMap((action: LoginAction) =>
                this.userService.LoginService(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new LoginFailureAction(response.Errors);
                        }
                        // else {
                        //     this.router.navigate(['dashboard', 'dashboard-main'], { replaceUrl: true });
                        //     return new LoginSuccessAction(response);
                        // }

                        else if(!!response && !!response.userdetail && response.userdetail.login_flag==1){
                            this.router.navigate(['dashboard', 'dashboard-main'], { replaceUrl: true });
                            return new LoginSuccessAction(response);
                        }
                        else if(!!response &&  !!response.userdetail && response.userdetail.login_flag==0){
                            this.router.navigate(['login', 'first-time-password-change'], { replaceUrl: true });
                            return new LoginSuccessAction(response);
                        }
                    }),
                    catchError(() => of(new LoginFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "IN008"
                            }
                        ]
                    })))
                )
            )
        )
    );

    firsttimePasswordCreate = createEffect(() => this.actions$
        .pipe(
            ofType(UserActionTypes.First_Time_Password_Change_Action),
            exhaustMap((action: FirstTimePasswordChangeAction) =>
                this.userService.FirstTimePasswordChange(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Error) {
                            return new FirstTimePasswordChangeFailureAction(response);
                        }
                        else {
                            const snackbar = this._snackBar.open("Password Updated.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['login' , 'login-main']);
                            return new FirstTimePasswordChangeSuccessAction();
                        }
                    }),
                    catchError(error => of(new FirstTimePasswordChangeFailureAction({
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

    userForgetPassword = createEffect(() => this.actions$
    .pipe(
        ofType(UserActionTypes.User_Forget_Password_Action),
        exhaustMap((action: UserForgetPasswordAction) =>
            this.userService.UserForgetPassword(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if (!!<ErrorModel>response.Errors) {
                        return new UserForgetPasswordFailureAction(response.Errors);
                    }
                    else {
                        const snackbar = this._snackBar.open("Password Reset.Password Send To Your Registered Email.", "DISMISS", {
                            panelClass: ["info-snackbar"],
                            duration: 3000
                        });
                        this.router.navigate(['login' , 'login-main']);
                        return new UserForgetPasswordSuccessAction();
                    }
                }),
                catchError(error => of(new UserForgetPasswordFailureAction({
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

