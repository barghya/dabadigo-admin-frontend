import { UserManagementAction, UserManagementActionTypes } from '../actions/user_management.action';
import { adminMain } from 'src/app/models/userManagement';

const initialState: adminMain = {
    error: undefined,
    loading: false,
    Users: [],
    user_type: [],
    user_status: [],
    Role: [],
    Region: [],
    singleUser: undefined,
    corporate: [],
    countries: [],
    States: [],
    cities: []
}

export function UserManagementReducer(state: adminMain = initialState, action: UserManagementAction) {
    switch (action.type) {
        case UserManagementActionTypes.User_List_Load:
            return { ...state, loading: true };
        case UserManagementActionTypes.User_List_Load_Success:
            return { ...state, loading: false, Users: action.payload };
        case UserManagementActionTypes.User_List_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case UserManagementActionTypes.User_Create_Action:
            return { ...state, loading: true };
        case UserManagementActionTypes.User_Create_Success_Action:
            return { ...state, loading: false };
        case UserManagementActionTypes.User_Create_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case UserManagementActionTypes.Add_Another_User_Action:
            return { ...state, loading: true };
        case UserManagementActionTypes.Add_User_Load_Action:
            return { ...state, loading: true };
        case UserManagementActionTypes.Add_User_Load_Success_Action:
            return { ...state, loading: false, user_type: action.payload[0], user_status: action.payload[1], Role: action.payload[2], Region: action.payload[3], corporate: action.payload[4], countries: action.payload[5], States: action.payload[6], cities: action.payload[7]}
        case UserManagementActionTypes.Add_User_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case UserManagementActionTypes.Edit_User_Load_Action:
            return { ...state, loading: true, Role: [], Region: [], user_type: [], user_status: [], singleUser: undefined, corporate: undefined };
        case UserManagementActionTypes.Edit_User_Load_Success_Action:
            return { ...state, loading: false, user_type: action.payload[0], user_status: action.payload[1], Role: action.payload[2], Region: action.payload[3], singleUser: action.payload[4], corporate: action.payload[5], countries: action.payload[6], States: action.payload[7],cities: action.payload[8] };
        case UserManagementActionTypes.Edit_User_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case UserManagementActionTypes.Edit_User_Action:
            return { ...state, loading: true };
        case UserManagementActionTypes.Edit_User_Action_Success:
            return { ...state, loading: false };
        case UserManagementActionTypes.Edit_User_Action_Failure:
            return { ...state, loading: false, error: action.payload };
        case UserManagementActionTypes.Delete_User_Action:
            return { ...state };
        case UserManagementActionTypes.Delete_User_Action_Failure:
            return { ...state, error: action.payload };
        case UserManagementActionTypes.Delete_User_Action_Success:
            return { ...state };
        case UserManagementActionTypes.reset_password_action:
            return { ...state };
        case UserManagementActionTypes.reset_password_success_action:
            return { ...state };
        case UserManagementActionTypes.reset_password_failure_action:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}