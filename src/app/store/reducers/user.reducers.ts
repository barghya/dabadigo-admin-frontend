import { UserDetails } from "src/app/models/userModel";
import { UserActions, UserActionTypes } from '../actions/user.action';

const initialState: UserDetails = {
    loading: false,
    error: undefined,
    userdetail: {
        admn_user_id: 0
    },
    permissions: undefined
}

export function UserReducer(state: UserDetails = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.Login_Action:
            return { ...state, loading: true };
        case UserActionTypes.Login_Success_Action:
            return { ...state, loading: false, error: undefined, ...action.payload };
        case UserActionTypes.Login_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case UserActionTypes.Logout_Action:
            return initialState;
        case UserActionTypes.First_Time_Password_Change_Action:
            return { ...state, loading: true };
        case UserActionTypes.First_Time_Password_Change_Success_Action:
            return { ...state, loading: false };
        case UserActionTypes.First_Time_Password_Change_Failure_Action:
            return { ...state, loading: false, error: action.payload };
        case UserActionTypes.User_Forget_Password_Action:
            return {...state, loading: true }
        case UserActionTypes.User_Forget_Password_Success_Action:
            return{...state, loading: false }
        case UserActionTypes.User_Forget_Password_FailureAction:
            return{...state, loading: false, error: action.payload}
        default:
            return state;
    }
}