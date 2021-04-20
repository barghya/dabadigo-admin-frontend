import { roleMain } from "src/app/models/roleManagementModel";
import { RoleManagementActions, RoleManagementActionTypes } from '../actions/role-management.action';


const initialState: roleMain = {
    error: undefined,
    loading: false,
    UserRole: [],
    SingleRole: undefined,
    permissionDetails: undefined,
    permission_code: undefined,
    usertype: undefined,
    user_type: undefined

}

export function RoleManagementReducer(state: roleMain = initialState, action: RoleManagementActions) {
    switch (action.type) {
        case RoleManagementActionTypes.Role_Management_Load:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Role_Management_Load_Success:
            return { ...state, loading: false, UserRole: action.payload };
        case RoleManagementActionTypes.Role_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case RoleManagementActionTypes.Add_Role:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Add_Role_Success:
            return { ...state, loading: false };
        case RoleManagementActionTypes.Add_Role_Failure:
            return { ...state, loading: false, error: action.payload };
        case RoleManagementActionTypes.Edit_Role_Load:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Edit_Role_Load_Success:
            return { ...state, loading: false, SingleRole: action.payload };
        case RoleManagementActionTypes.Edit_Role_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case RoleManagementActionTypes.Edit_Role:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Edit_Role_Success:
            return { ...state, loading: false };
        case RoleManagementActionTypes.Edit_Role_Failure:
            return { ...state, loading: false, error: action.payload };
        case RoleManagementActionTypes.Permission_Load_Action:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Permission_Load_Success_Action:
            return { ...state, loading: false, permissionDetails: action.payload[0], permission_code: action.payload[1] };
        case RoleManagementActionTypes.Permission_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case RoleManagementActionTypes.Update_Permission_Action:
            return { ...state, loading: true};
        case RoleManagementActionTypes.Update_Permission_Action:
            return { ...state, loading: false };
        case RoleManagementActionTypes.Update_Permission_Action:
            return { ...state, loading: false, error: action.payload };
        case RoleManagementActionTypes.Get_UserType_Load_Action:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Get_UserType_Load_Success_Action:
            return { ...state, loading: false, user_type: action.payload };
        case RoleManagementActionTypes.Get_UserType_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        // case RoleManagementActionTypes.User_Type_Load_Action:
        //     return { ...state, loading: true };
        // case RoleManagementActionTypes.User_Type_Load_Success_Action:
        //     return { ...state, loading: false, usertype: action.payload[0], user_type: action.payload[1] };
        // case RoleManagementActionTypes.User_Type_Load_Failure_Action:
        //     return { ...state, loading: false, error: action.payload }
        case RoleManagementActionTypes.User_Type_Load_Action:
            return { ...state, loading: true };
        case RoleManagementActionTypes.User_Type_Load_Success_Action:
            return { ...state, loading: false, usertype: action.payload };
        case RoleManagementActionTypes.User_Type_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        case RoleManagementActionTypes.Update_User_Type_Action:
            return { ...state, loading: true };
        case RoleManagementActionTypes.Update_User_Type_Action:
            return { ...state, loading: false };
        case RoleManagementActionTypes.Update_User_Type_Action:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}