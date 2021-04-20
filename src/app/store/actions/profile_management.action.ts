import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { userId } from 'src/app/models/userManagement';
import { changePassword, changeMobile } from 'src/app/models/profileManagement';

export enum ProfileManagementActionTypes {
    Profile_Load_Action = "[PROFILE] Profile Load",
    Profile_Load_Success_Action = "[PROFILE] Profile Load Success",
    Profile_Load_Failure_Action = "[PROFILE] Profile Load Failure",

    Change_Password_Action = "[CHANGE PASSWORD] Change Password Load",
    Change_Password_Success_Action = "[CHANGE PASSWORD] Change Password Success",
    Change_Password_Failure_Action = "[CHANGE PASSWORD] Change Password Failure",

    Change_Mobile_Number_Action = "[CHANGE MOBILE NUMBER] Change Mobile Number Action",
    Change_Mobile_Number_Success_Action = "[CHANGE MOBILE NUMBER] Change Mobile Number Success Action",
    Change_Mobile_Number_Failure_Action = "[CHANGE MOBILE NUMBER] Change Mobile Number Failure Action",
} 

export class ProfileManagementLoadAction implements Action {
    readonly type = ProfileManagementActionTypes.Profile_Load_Action;
    constructor(public payload:userId){}
}

export class ProfileManagementLoadSuccessAction implements Action {
    readonly type = ProfileManagementActionTypes.Profile_Load_Success_Action;
    constructor(public payload: any[]){}
}

export class ProfileManagementLoadFailureAction implements Action {
    readonly type = ProfileManagementActionTypes.Profile_Load_Failure_Action;
    constructor(public payload: ErrorModel){}
}

export class ChangePasswordAction implements Action {
    readonly type = ProfileManagementActionTypes.Change_Password_Action;
    constructor(public payload: changePassword) {}
}

export class ChangePasswordSuccessAtion implements Action {
    readonly type = ProfileManagementActionTypes.Change_Password_Success_Action;
}

export class ChangePasswordFailureAction implements Action {
    readonly type = ProfileManagementActionTypes.Change_Password_Failure_Action;
    constructor(public payload: ErrorModel){}
}


export class ChangeMobileNumberAction implements Action {
    readonly type = ProfileManagementActionTypes.Change_Mobile_Number_Action;
    constructor(public payload: changeMobile) {}
}

export class ChangeMobileNumberSuccessAction implements Action {
    readonly type = ProfileManagementActionTypes.Change_Mobile_Number_Success_Action;
}

export class ChangeMobileNumberFailureAction implements Action {
    readonly type = ProfileManagementActionTypes.Change_Mobile_Number_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

export type ProfileManagementAction = ProfileManagementLoadAction
| ProfileManagementLoadSuccessAction
| ProfileManagementLoadFailureAction
| ChangePasswordAction
| ChangePasswordSuccessAtion
| ChangePasswordFailureAction
| ChangeMobileNumberAction
| ChangeMobileNumberSuccessAction
| ChangeMobileNumberFailureAction