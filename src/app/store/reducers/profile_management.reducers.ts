import { ProfileManagementAction, ProfileManagementActionTypes } from '../actions/profile_management.action';
import { profileMain } from 'src/app/models/profileManagement';

const initialState: profileMain = {
    error: undefined,
    loading: false,
    singleProfile: undefined,
}

export function ProfileManagementReducer(state: profileMain = initialState, action: ProfileManagementAction) {
    switch (action.type) {
        case ProfileManagementActionTypes.Profile_Load_Action:
            return { ...state, loading: true }
        case ProfileManagementActionTypes.Profile_Load_Success_Action:
            return { ...state, loading: false, singleProfile: action.payload };
        case ProfileManagementActionTypes.Profile_Load_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case ProfileManagementActionTypes.Change_Password_Action:
            return { ...state, loading: true };
        case ProfileManagementActionTypes.Change_Password_Success_Action:
            return { ...state, loading: false };
        case ProfileManagementActionTypes.Change_Password_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case ProfileManagementActionTypes.Change_Mobile_Number_Action:
            return { ...state, loading: true }
        case ProfileManagementActionTypes.Change_Mobile_Number_Success_Action:
            return { ...state, loading: false }
        case ProfileManagementActionTypes.Change_Mobile_Number_Failure_Action:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}