import { StateTaxManagement } from "src/app/models/stateTaxModel";
import { StateTaxActions, StateTaxActionTypes } from '../actions/state_tax.action';

const initialState: StateTaxManagement = {
    error: undefined,
    loading: false,
    stateTaxList: [],
    singleStateTax: undefined
}

export function StateTaxReducer(state: StateTaxManagement = initialState, action: StateTaxActions) {
    switch (action.type) {
        case StateTaxActionTypes.State_Tax_Load:
            return {...state, loading: true, singleStateTax: undefined}
        case StateTaxActionTypes.State_Tax_Load_Success:
            return {...state, loading: false, stateTaxList: action.payload}
        case StateTaxActionTypes.State_Tax_Load_Failure:
            return {...state, loading: false, error: action.payload}
        case StateTaxActionTypes.State_Tax_Create_Load:
            return {...state, loading: true}
        case StateTaxActionTypes.State_Tax_Create_Load_Success:
            return {...state, loading: false, states: action.payload[0], taxTypes: action.payload[1]}
        case StateTaxActionTypes.State_Tax_Create_Load_Failure:
            return { ...state, loading: false, error: action.payload }
        case StateTaxActionTypes.State_Tax_Create:
            return { ...state, loading: true }
        case StateTaxActionTypes.State_Tax_Create_Success:
            return { ...state, loading: false }
        case StateTaxActionTypes.State_Tax_Create_Failure:
            return { ...state, loading: false, error: action.payload }
        case StateTaxActionTypes.State_Tax_Update_Load:
            return { ...state, loading: true, singleStateTax: undefined }
        case StateTaxActionTypes.State_Tax_Update_Load_Success:
            return { ...state, loading: false, states: action.payload[0], taxTypes: action.payload[1], singleStateTax: action.payload[2] }
        case StateTaxActionTypes.State_Tax_Update_Load_Failure:
            return { ...state, loading: false, error: action.payload }
        case StateTaxActionTypes.State_Tax_Update:
            return { ...state, loading: true }
        case StateTaxActionTypes.State_Tax_Update_Success:
            return { ...state, loading: false }
        case StateTaxActionTypes.State_Tax_Update_Failure:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}