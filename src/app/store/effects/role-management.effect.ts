import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleManagementService } from 'src/app/service/role-management/role-management.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { RoleManagementActionTypes, RoleManagementLoadAction, RoleManagementLoadSuccessAction, RoleManagementLoadFailureAction, AddRoleAction, AddRoleSuccessAction, AddRoleFailureAction, EditRoleLoadAction, EditRoleLoadSuccessAction, EditRoleLoadFailureAction, EditRoleAction, EditRoleSuccessAction, EditRoleFailureAction, PermissionLoadAction, PermissionLoadSuccessAction, PermissionLoadFailureAction, UpdatePermissionAction, UpdatePermissionSuccessAction, UpdatePermissionFailureAction, UserTypeLoadAction, UserTypeLoadSuccessAction, UserTypeLoadFailureAction, GetUserTypeLoadAction, GetUserTypeLoadSuccessAction, GetUserTypeLoadFailureAction, UpdateUserTypeAction, UpdateUserTypeSuccessAction, UpdateUserTypeFailureAction } from '../actions/role-management.action';
import { DomainService } from 'src/app/service/domain/domain.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Injectable()
export class RoleManagementEffects {
    constructor(private actions$: Actions, private router: Router, private store: Store<AppState>, private _snackBar: MatSnackBar, private domainService: DomainService, private roleManagementService: RoleManagementService) { }
    roleListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Role_Management_Load),
            mergeMap((action: RoleManagementLoadAction) =>
                this.roleManagementService.getRoleList().pipe(
                    map((response) => {
                        console.log(response);
                        return new RoleManagementLoadSuccessAction(response);
                    }),
                    catchError(error => of(new RoleManagementLoadFailureAction({
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

    addRole$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Add_Role),
            mergeMap((action: AddRoleAction) =>
                this.roleManagementService.AddRole(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddRoleFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['role-management', 'role-management-main']);
                            return new AddRoleSuccessAction();
                        }
                    }),
                    catchError(() => of(new AddRoleFailureAction({
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

    editLoadRole$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Edit_Role_Load),
            mergeMap((action: EditRoleLoadAction) =>
                this.roleManagementService.singleRoleload(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditRoleLoadFailureAction(response.Errors)
                        }
                        else {

                            return new EditRoleLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditRoleLoadFailureAction({
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
        ofType(RoleManagementActionTypes.Edit_Role),
        mergeMap((action: EditRoleAction) =>
            this.roleManagementService.editRole(action.payload)
                .pipe(
                    map(response => {
                        console.log(response);

                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditRoleFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['role-management', 'role-management-main'], { replaceUrl: true });
                            return new EditRoleSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditRoleFailureAction({
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



    permissionListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Permission_Load_Action),
            mergeMap((action: PermissionLoadAction) =>
                forkJoin([
                    this.roleManagementService.getPermissionList(action.payload),
                    this.domainService.GetPermissionType()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors)) {
                            return new PermissionLoadFailureAction(response[0].Errors)
                        }
                        else if (!!(<ErrorModel>response[1].Errors)) {
                            return new PermissionLoadFailureAction(response[1].Errors)
                        }
                        return new PermissionLoadSuccessAction(response);
                    }),
                    catchError(error => of(new PermissionLoadFailureAction({
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
    )


    updatePermission$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Update_Permission_Action),
            mergeMap((action: UpdatePermissionAction) =>
                this.roleManagementService.updatePermission(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (<ErrorModel>response.Errors) {
                            return new UpdatePermissionFailureAction(response.Errors);
                        }
                        else {

                            const snackbar = this._snackBar.open("User Permission has been tagged succesfuly", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            return new UpdatePermissionSuccessAction();
                        }
                    }),
                    catchError(error => of(new UpdatePermissionFailureAction({
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
    )

    // get all user type
    //    userTypeListLoad$ = createEffect(() => this.actions$
    //     .pipe(
    //         ofType(RoleManagementActionTypes.User_Type_Load_Action),
    //         mergeMap((action: UserTypeLoadAction) =>
    //             forkJoin([
    //                 this.roleManagementService.getUserTypeList(action.payload),
    //                 this.domainService.GetusertypenameType()
    //             ]).pipe(
    //                 map((response) => {
    //                     console.log(response);
    //                     if (!!(<ErrorModel>response[0].Errors)) {
    //                         return new UserTypeLoadFailureAction(response[0].Errors)
    //                     }
    //                     else if (!!(<ErrorModel>response[1].Errors)) {
    //                         return new UserTypeLoadFailureAction(response[1].Errors)
    //                     }
    //                     return new UserTypeLoadSuccessAction(response);
    //                 }),
    //                 catchError(error => of(new UserTypeLoadFailureAction({
    //                     Info: [],
    //                     Business_Errors: [],
    //                     Warnings: [],
    //                     System_Errors: [{
    //                         Code: "SE001"
    //                     }],
    //                 })))
    //             )
    //         )
    //     )
    // )

    userTypenameListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Get_UserType_Load_Action),
            mergeMap((action: GetUserTypeLoadAction) =>
                this.domainService.GetusertypenameType().pipe(
                    map((response) => {
                        console.log(response);
                        if (<ErrorModel>response.Errors) {
                            return new GetUserTypeLoadFailureAction(response.Errors);
                        }
                        else {
                            return new GetUserTypeLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetUserTypeLoadFailureAction({
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



    userTypeListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.User_Type_Load_Action),
            mergeMap((action: UserTypeLoadAction) =>
                this.roleManagementService.getUserTypeList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        return new UserTypeLoadSuccessAction(response);
                    }),
                    catchError(error => of(new UserTypeLoadFailureAction({
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


    updateUsertype$ = createEffect(() => this.actions$
        .pipe(
            ofType(RoleManagementActionTypes.Update_User_Type_Action),
            mergeMap((action: UpdateUserTypeAction) =>
                this.roleManagementService.updateUserType(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (<ErrorModel>response.Errors) {
                            return new UpdateUserTypeFailureAction(response.Errors);
                        }
                        else {

                            const snackbar = this._snackBar.open("User Type has been tagged succesfuly", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            return new UpdateUserTypeSuccessAction();
                        }
                    }),
                    catchError(error => of(new UpdateUserTypeFailureAction({
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
    )

}