import { Action } from '@ngrx/store';
import { LoginModel, firsttimepasswordchange, forgetpassword } from 'src/app/models/userModel';
import { ErrorModel } from 'src/app/models/errorModel';

//Action Type Enum
export enum UserActionTypes {
    Login_Action = '[USER] Login Action',
    Login_Success_Action = '[USER] Login Success',
    Login_Failure_Action = '[USER] Login Failure',
    Logout_Action = "[USER] Logout Action",
    First_Time_Password_Change_Action = '[USER] First Time Password Change Action',
    First_Time_Password_Change_Success_Action = '[USER] First Time Pssword Change Success Action',
    First_Time_Password_Change_Failure_Action = '[USER] First Time Password Change Failure Action',
    User_Forget_Password_Action = '[USER] User Forget Password Action',
    User_Forget_Password_Success_Action = '[USER]  User Forget Password Success Action',
    User_Forget_Password_FailureAction = '[USER] User Forget Password Failure Action',
}

//Actions
export class LoginAction implements Action {
    readonly type = UserActionTypes.Login_Action;
    constructor(public payload: LoginModel){}
}

export class LoginSuccessAction implements Action {
    readonly type = UserActionTypes.Login_Success_Action;
    constructor(public payload: any) {}
}

export class LoginFailureAction implements Action {
    readonly type = UserActionTypes.Login_Failure_Action;
    constructor(public payload: ErrorModel){}
}

export class LogoutAction implements Action {
    readonly type = UserActionTypes.Logout_Action;
}
// First Time Password Change
export class FirstTimePasswordChangeAction implements Action {
    readonly type = UserActionTypes.First_Time_Password_Change_Action;
    constructor(public payload: firsttimepasswordchange){}
}

export class FirstTimePasswordChangeSuccessAction implements Action {
    readonly type = UserActionTypes.First_Time_Password_Change_Success_Action;
}

export class FirstTimePasswordChangeFailureAction implements Action {
    readonly type = UserActionTypes.First_Time_Password_Change_Failure_Action;
    constructor(public payload: ErrorModel){}
}

//ForgetPassword
export class UserForgetPasswordAction implements Action {
    readonly type = UserActionTypes.User_Forget_Password_Action
    constructor(public payload: forgetpassword){}
}
export class UserForgetPasswordSuccessAction implements Action {
    readonly type = UserActionTypes.User_Forget_Password_Success_Action
    constructor(){}
}

export class UserForgetPasswordFailureAction implements Action {
    readonly type = UserActionTypes.User_Forget_Password_FailureAction
    constructor(public payload: ErrorModel){}
}


//Consolidated Action
export type UserActions = LoginAction 
| LoginSuccessAction 
| LoginFailureAction
| LogoutAction
| FirstTimePasswordChangeAction
| FirstTimePasswordChangeSuccessAction
| FirstTimePasswordChangeFailureAction
| UserForgetPasswordAction
| UserForgetPasswordSuccessAction
| UserForgetPasswordFailureAction