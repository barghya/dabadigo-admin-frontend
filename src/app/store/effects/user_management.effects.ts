import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UserManagementActionTypes, UserListLoadAction, UserListLoadSuccessAction, UserListLoadFailureAction, AddUserAction, AddUserSuccessAction, AddUserFailureAction, AddAnotherUserAction, AddUserLoadAction, AddUserLoadSuccessAction, AddUserLoadFailureAction, EditUserLoadAction, EditUserLoadSuccessAction, EditUserLoadFailureAction, EditUserAction, EditUserSuccessAction, EditUserFailureAction, DeleteUserAction, DeleteUserFailureAction, DeleteUserSuccessAction, ResetPasswordAction, ResetPasswordFailureAction, ResetPasswordSuccessAction } from '../actions/user_management.action';
import { mergeMap, catchError, map, take, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionService } from 'src/app/service/region/region.service';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatSnackBar } from '@angular/material';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
@Injectable()
export class UserManagementEffects {
    constructor(private actions$: Actions, private userManagementService: UserManagementService, private assetInventoryService: AssetInventoryService, private domainService: DomainService, private regionService: RegionService, private router: Router, private corporateManagementService: CorporateManagementService,
        private store: Store<AppState>, private _snackBar: MatSnackBar) { }

    userList$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.User_List_Load),
            mergeMap((action: UserListLoadAction) =>
                this.userManagementService.GetUserList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        return new UserListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new UserListLoadFailureAction({
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

    AddUserLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.Add_User_Load_Action),
            mergeMap((action: AddUserLoadAction) =>
                forkJoin([
                    this.domainService.GetUserType(),
                    this.domainService.GetUserStatus(),
                    this.userManagementService.GetRoleName(action.payload),
                    this.regionService.getRegionList(),
                    this.corporateManagementService.getAllCorporate(),
                    this.assetInventoryService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors)) {
                            if (response[0].Errors) {
                                return new AddUserLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors) {
                                return new AddUserLoadFailureAction(response[1].Errors)
                            }
                        }
                        else {
                            return new AddUserLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AddUserLoadFailureAction({
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

    UserCreation$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.User_Create_Action),
            exhaustMap((action: AddUserAction) =>
                this.userManagementService.CreateUser(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Error) {
                            return new AddUserFailureAction(response);
                        }
                        else {
                            const snackbar = this._snackBar.open("User Created Successfully. Password Send to Email.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                        });
                        this.router.navigate(['user-management', 'admin-main']);
                        return new AddUserSuccessAction();
                    }
                    }),
                    catchError(error => of(new AddUserFailureAction({
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
    )

    addAnotherUser$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.Add_Another_User_Action),
            exhaustMap((action: AddAnotherUserAction) =>
                this.userManagementService.CreateUser(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.error) {
                            return new AddUserFailureAction(response);
                        }
                        else {
                            return new AddUserSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddUserFailureAction({
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

    editUserLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.Edit_User_Load_Action),
            mergeMap((action: EditUserLoadAction) =>
                forkJoin([
                    this.domainService.GetUserType(),
                    this.domainService.GetUserStatus(),
                    this.userManagementService.GetRoleName(action.payload.current_user),
                    this.regionService.getRegionList(),
                    this.userManagementService.GetUserByID({ admn_user_id: action.payload.admn_user_id }),
                    this.corporateManagementService.getAllCorporate(),
                    this.assetInventoryService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[4].Errors)) {
                            if (response[0].Errors) {
                                return new EditUserLoadFailureAction(response[0].Errors)
                            }
                            if (response[1].Errors) {
                                return new EditUserLoadFailureAction(response[1].Errors)
                            }
                            if (response[4].Errors) {
                                return new EditUserLoadFailureAction(response[4].Errors)
                            }
                        }
                        else {
                            return new EditUserLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditUserLoadFailureAction({
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

    UserEdit$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.Edit_User_Action),
            exhaustMap((action: EditUserAction) =>
                this.userManagementService.EditUser(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditUserFailureAction(response.Errors);
                        }
                        else {
                            const snackbar = this._snackBar.open("User Updated Successfully.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['user-management', 'admin-main']);
                            return new EditUserSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditUserFailureAction({
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

    DeleteUser$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.Delete_User_Action),
            exhaustMap((action: DeleteUserAction) =>
                this.userManagementService.DeleteUser(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeleteUserFailureAction(response.Errors)
                        }
                        else {
                            this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                                admn_user_id => {
                                    this.store.dispatch(new UserListLoadAction(admn_user_id));
                                }
                            );
                            return new DeleteUserSuccessAction();
                        }
                    }),
                    catchError(error => of(new DeleteUserFailureAction({
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

    ResetPassword$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserManagementActionTypes.reset_password_action),
            exhaustMap((action: ResetPasswordAction) =>
                this.userManagementService.resetpassword(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new ResetPasswordFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Password Reset.Password Send To Your Registered Email.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                                admn_user_id => {
                                    this.store.dispatch(new UserListLoadAction(admn_user_id));
                                }
                            );
                            return new ResetPasswordSuccessAction();
                        }
                    }),
                    catchError(error => of(new ResetPasswordFailureAction({
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