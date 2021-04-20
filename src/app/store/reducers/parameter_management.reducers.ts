import { ParameterManagementMain } from "src/app/models/parametermanagementModel";
import { ParameterManagementAction, ParameterManagementActionTypes } from '../actions/parameter_management.action';

const initialState: ParameterManagementMain = {
    error: undefined,
    loading: false,
    ParameterList: [],
    SingleParameter: undefined,
}

export function ParameterManagementReducer(state: ParameterManagementMain = initialState, action: ParameterManagementAction) {
    switch (action.type) {

        case ParameterManagementActionTypes.Parameter_Management_Load:
            return { ...state, loading: true };
        case ParameterManagementActionTypes.Parameter_Management_Load_Success:
            return { ...state, loading: false, ParameterList: action.payload };
        case ParameterManagementActionTypes.Parameter_Management_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case ParameterManagementActionTypes.Add_Parameter:
            return { ...state, loading: true };
        case ParameterManagementActionTypes.Add_Parameter_Success:
            return { ...state, loading: false };
        case ParameterManagementActionTypes.Add_Parameter_Failure:
            return { ...state, loading: false, error: action.payload };
        case ParameterManagementActionTypes.Add_Another_Parameter:
            return { ...state, loading: true };
        case ParameterManagementActionTypes.Edit_Parameter_Load:
            return { ...state, loading: true };
        case ParameterManagementActionTypes.Edit_Parameter_Load_Success:
            return { ...state, loading: false, SingleParameter: action.payload };
        case ParameterManagementActionTypes.Edit_Parameter_Load_Failure:
            return { ...state, loading: false, error: action.payload };
        case ParameterManagementActionTypes.Edit_Parameter:
            return { ...state, loading: true };
        case ParameterManagementActionTypes.Edit_Parameter_Success:
            return { ...state, loading: false };
        case ParameterManagementActionTypes.Edit_Parameter_Failure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}