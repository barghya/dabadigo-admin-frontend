import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { users, AddUser, userId, userName, EditUserLoad } from 'src/app/models/userManagement';

export enum UserManagementActionTypes {
    User_List_Load = "[ADMIN] Admin List Load",
    User_List_Load_Success = "[ADMIN] Admin List Load Success",
    User_List_Load_Failure = "[ADMIN] Admin List Load Failure",

    User_Create_Action = "[ADMIN] Admin Create",
    User_Create_Success_Action = "[ADMIN] Admin Create Success",
    User_Create_Failure_Action = "[ADMIN] Admin Create Failure",

    Add_Another_User_Action = "[ADMIN] Add Another User Create", 

    Add_User_Load_Action = "[ADMIN] Adduser Load",
    Add_User_Load_Success_Action = "[ADMIN] Adduser Load Success",
    Add_User_Load_Failure_Action = "[ADMIN] Adduser Load Failure",

    Edit_User_Load_Action = "[ADMIN] Edit User Load",
    Edit_User_Load_Success_Action = "[ADMIN] Edit User Load Success",
    Edit_User_Load_Failure_Action = "[ADMIN] Edit User Load Failure",

    Edit_User_Action = "[ADMIN] Edit User Action",
    Edit_User_Action_Success = "[ADMIN] Edit User Action Success",
    Edit_User_Action_Failure = "[ADMIN] Edit User Action Failure",

    Delete_User_Action = "[ADMIN] Delete User Action",
    Delete_User_Action_Failure = "[ADMIN] Delete User Action Failure",
    Delete_User_Action_Success = "[ADMIN] Delete User Action Success",

    reset_password_action = "[ADMIN] Reset Password Action",
    reset_password_success_action = "[ADMIN] Reset Password Success Action",
    reset_password_failure_action = "[ADMIN] Reset Password Failure Action"

}

//User List Load
export class UserListLoadAction implements Action {
    readonly type = UserManagementActionTypes.User_List_Load;

    constructor(public payload: number){}
}

export class UserListLoadSuccessAction implements Action {
    readonly type = UserManagementActionTypes.User_List_Load_Success;

    constructor(public payload: users[]){}
}

export class UserListLoadFailureAction implements Action {
    readonly type = UserManagementActionTypes.User_List_Load_Failure;

    constructor(public payload: ErrorModel){}
}
//Add User
export class AddUserAction implements Action {
    readonly type = UserManagementActionTypes.User_Create_Action;

    constructor(public payload:AddUser){}
}
export class AddUserSuccessAction implements Action {
    readonly type = UserManagementActionTypes.User_Create_Success_Action;
}
export class AddUserFailureAction implements Action {
    readonly type = UserManagementActionTypes.User_Create_Failure_Action;

    constructor(public payload: ErrorModel){}
}
//Add Another User
export class AddAnotherUserAction implements Action {
    readonly type = UserManagementActionTypes.Add_Another_User_Action;

    constructor(public payload:AddUser){}
}
//Add User Dropdown
export class AddUserLoadAction implements Action {
    readonly type = UserManagementActionTypes.Add_User_Load_Action;

    constructor(public payload: number){}
}
export class AddUserLoadSuccessAction implements Action {
    readonly type = UserManagementActionTypes.Add_User_Load_Success_Action;
    
    constructor(public payload:any[]){}
}
export class AddUserLoadFailureAction implements Action {
    readonly type = UserManagementActionTypes.Add_User_Load_Failure_Action;

    constructor(public payload: ErrorModel){}
}
//Edit User Load
export class EditUserLoadAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Load_Action;

    constructor(public payload:EditUserLoad){}
}
export class EditUserLoadSuccessAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Load_Success_Action;

    constructor(public payload: any[]){}
}
export class EditUserLoadFailureAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Load_Failure_Action;

    constructor(public payload: ErrorModel){}
}

//Edit User
export class EditUserAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Action;

    constructor(public payload: users){}
}
export class EditUserSuccessAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Action_Success;
}
export class EditUserFailureAction implements Action {
    readonly type = UserManagementActionTypes.Edit_User_Action_Failure;

    constructor(public payload: ErrorModel){}
}

//Delete User
export class DeleteUserAction implements Action {
    readonly type = UserManagementActionTypes.Delete_User_Action;

    constructor(public payload:userId){}
}

export class DeleteUserFailureAction implements Action {
    readonly type = UserManagementActionTypes.Delete_User_Action_Failure;
    
    constructor(public payload: ErrorModel){}
}

export class DeleteUserSuccessAction implements Action {
    readonly type = UserManagementActionTypes.Delete_User_Action_Success;
}

//Reset Password
export class ResetPasswordAction implements Action {
    readonly type = UserManagementActionTypes.reset_password_action;

    constructor(public payload:userId){}
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = UserManagementActionTypes.reset_password_success_action;
}

export class ResetPasswordFailureAction implements Action {
    readonly type = UserManagementActionTypes.reset_password_failure_action;
    
    constructor(public payload: ErrorModel){}
}

export type UserManagementAction = UserListLoadAction
| UserListLoadSuccessAction
| UserListLoadFailureAction
| AddUserAction
| AddUserSuccessAction
| AddUserFailureAction
| AddAnotherUserAction
| AddUserLoadAction
| AddUserLoadSuccessAction
| AddUserLoadFailureAction
| EditUserLoadAction
| EditUserLoadSuccessAction
| EditUserLoadFailureAction
| EditUserAction
| EditUserSuccessAction
| EditUserFailureAction
| DeleteUserAction
| DeleteUserFailureAction
| DeleteUserSuccessAction
| ResetPasswordAction
| ResetPasswordSuccessAction
| ResetPasswordFailureAction