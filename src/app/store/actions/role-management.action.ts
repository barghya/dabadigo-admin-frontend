import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { userRole, PermissionDetails, UserType, domainData, EditUserType } from 'src/app/models/roleManagementModel';

export enum RoleManagementActionTypes {
    Role_Management_Load = "[ROLE] Role Management Load",
    Role_Management_Load_Success = "[ROLE] Role Management Load Success",
    Role_Management_Load_Failure = "[ROLE] Role Management Load Failure",
    Add_Role = "[ROLE] Add_Role",
    Add_Role_Success = "[ROLE] Add_Role_Success",
    Add_Role_Failure = "[ROLE] Add_Role_Failure",
    Edit_Role_Load = "[ROLE] Edit_Role_Load",
    Edit_Role_Load_Success = "[ROLE] Edit_Role_Load_Success",
    Edit_Role_Load_Failure = "[ROLE] Edit_Role_Load_Failure",
    Edit_Role = "[ROLE] Edit_Role",
    Edit_Role_Success = "[ROLE] Edit_Role_Success",
    Edit_Role_Failure = "[ROLE] Edit_Role_Failure",
    Permission_Load_Action = "[ROLE] Permission_Load_Action",
    Permission_Load_Success_Action = "[ROLE] Permission_Load_Success_Action",
    Permission_Load_Failure_Action = "[ROLE] Permission_Load_Failure_Action",
    Update_Permission_Action = "[ROLE] Update_Permission_Action",
    Update_Permission_Success_Action = "[ROLE] Update_Permission_Success_Action",
    Update_Permission_Failure_Action = "[ROLE] Update_Permission_Failure_Action",
    User_Type_Load_Action = "[ROLE] User_Type_Load_Action",
    User_Type_Load_Success_Action = "[ROLE] User_Type_Load_Success_Action",
    User_Type_Load_Failure_Action = "[ROLE] User_Type_Load_Failure_Action",
    Get_UserType_Load_Action = "[ROLE] Get_UserType_Load_Action",
    Get_UserType_Load_Success_Action = "[ROLE] Get_UserType_Load_Success_Action",
    Get_UserType_Load_Failure_Action = "[ROLE] Get_UserType_Load_Failure_Action",
    Update_User_Type_Action = "[ROLE] Update_User_Type_Action",
    Update_User_Type_Success_Action = "[ROLE] Update_User_Type_Success_Action",
    Update_User_Type_Failure_Action = "[ROLE] Update_User_Type_Failure_Action"
}
// Get Role
export class RoleManagementLoadAction implements Action {
    readonly type = RoleManagementActionTypes.Role_Management_Load;
}
export class RoleManagementLoadSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Role_Management_Load_Success;
    constructor(public payload: userRole[]) {}
}
export class RoleManagementLoadFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Role_Management_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Add Role
export class AddRoleAction implements Action {
    readonly type = RoleManagementActionTypes.Add_Role;
    constructor(public payload: userRole) {}
}

export class AddRoleSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Add_Role_Success;
}

export class AddRoleFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Add_Role_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Load  Role
export class EditRoleLoadAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role_Load;
    constructor(public payload: userRole) {}
}

export class EditRoleLoadSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role_Load_Success;
    constructor(public payload: any[]) {}
}

export class EditRoleLoadFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Role
export class EditRoleAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role;
    constructor(public payload: userRole) {}
}

export class EditRoleSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role_Success;
}

export class EditRoleFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Edit_Role_Failure;
    constructor(public payload: ErrorModel) {}
}

//Get All Permission
export class PermissionLoadAction implements Action {
    readonly type = RoleManagementActionTypes.Permission_Load_Action;
    constructor(public payload: PermissionDetails) {}
}

export class PermissionLoadSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Permission_Load_Success_Action;
    constructor( public payload: any ) { }
}

export class PermissionLoadFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Permission_Load_Failure_Action;
    constructor( public payload: ErrorModel ) { }
}
// update permission
export class UpdatePermissionAction implements Action {
    readonly type = RoleManagementActionTypes.Update_Permission_Action;
    constructor(public payload:PermissionDetails) {console.log(this.type)}
}

export class UpdatePermissionSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Update_Permission_Success_Action;
    constructor() { console.log(this.type)}
}

export class UpdatePermissionFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Update_Permission_Failure_Action;
    constructor(public payload: ErrorModel) { console.log(this.type) }
}
// Get User Type Name
export class GetUserTypeLoadAction implements Action {
    readonly type = RoleManagementActionTypes.Get_UserType_Load_Action;
   
}

export class GetUserTypeLoadSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Get_UserType_Load_Success_Action;
    constructor(public payload: any) {}
}

export class GetUserTypeLoadFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Get_UserType_Load_Failure_Action;
    constructor(public payload: ErrorModel) { }
}

//Get All User Type Load 
export class UserTypeLoadAction implements Action {
    readonly type = RoleManagementActionTypes.User_Type_Load_Action;
    constructor(public payload: UserType) {}
}

export class UserTypeLoadSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.User_Type_Load_Success_Action;
    constructor( public payload: any ) { }
}

export class UserTypeLoadFailureAction implements Action {
    readonly type = RoleManagementActionTypes.User_Type_Load_Failure_Action;
    constructor( public payload: ErrorModel ) { }
}

// update user type
export class UpdateUserTypeAction implements Action {
    readonly type = RoleManagementActionTypes.Update_User_Type_Action;
    constructor(public payload:UserType) {console.log(this.type)}
}

export class UpdateUserTypeSuccessAction implements Action {
    readonly type = RoleManagementActionTypes.Update_User_Type_Success_Action;
    constructor() { console.log(this.type)}
}

export class UpdateUserTypeFailureAction implements Action {
    readonly type = RoleManagementActionTypes.Update_User_Type_Failure_Action;
    constructor(public payload: ErrorModel) { console.log(this.type) }
}

export type RoleManagementActions = RoleManagementLoadAction
| RoleManagementLoadSuccessAction
| RoleManagementLoadFailureAction
| AddRoleAction
| AddRoleSuccessAction
| AddRoleFailureAction
| EditRoleLoadAction
| EditRoleLoadSuccessAction
| EditRoleLoadFailureAction
| EditRoleAction
| EditRoleSuccessAction
| EditRoleFailureAction
| PermissionLoadAction
| PermissionLoadSuccessAction
| PermissionLoadFailureAction
| UpdatePermissionAction
| UpdatePermissionSuccessAction
| UpdatePermissionFailureAction
| GetUserTypeLoadAction
| GetUserTypeLoadSuccessAction
| GetUserTypeLoadFailureAction
| UserTypeLoadAction
| UserTypeLoadSuccessAction
| UserTypeLoadFailureAction
| UpdateUserTypeAction
| UpdateUserTypeSuccessAction
| UpdateUserTypeFailureAction
